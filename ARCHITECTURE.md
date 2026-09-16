# Production-Scale Architecture Strategy: Vacation-Rental Marketplace

This document outlines the engineering blueprint and scaling strategy for an enterprise-grade vacation-rental platform (architected at Airbnb scale) capable of supporting **100M+ active listings**, **10M+ daily booking queries**, and **global sub-100ms response times** with 99.999% availability.

Accompanying visual diagrams:
- Vector Diagram: [ARCHITECTURE_DIAGRAM.svg](./ARCHITECTURE_DIAGRAM.svg)
- High-Resolution Render: [ARCHITECTURE_DIAGRAM.png](./ARCHITECTURE_DIAGRAM.png)

---

## 1. System Topology Overview

```
[ Clients: Web (Next.js SSR), iOS, Android Native ]
                        │
                        ▼
[ Layer 1: Global Edge & CDN (Cloudflare Anycast + WAF + Edge Workers) ]
                        │
                        ▼
[ Layer 2: API Gateway & Service Mesh (Envoy Gateway + Apollo Router) ]
                        │
    ┌───────────────────┼───────────────────┬───────────────────┐
    ▼                   ▼                   ▼                   ▼
[Listing Service] [Booking Engine]   [Search Service]   [Pricing/Promo]
    │                   │                   │                   │
    └───────────────────┼───────────────────┼───────────────────┘
                        ▼
[ Layer 3: Distributed Data, Cache & Event Bus ]
 ├── Redis Enterprise: Distributed Holds (Redlock) & Listing Cache
 ├── CockroachDB / Sharded Aurora PostgreSQL: Multi-Region ACID Booking Ledger
 ├── Elasticsearch Cluster + Vector DB (Milvus/Pinecone): Spatial & AI Search
 ├── Apache Kafka Event Mesh: Event Sourcing & Real-time CDC
 └── AWS S3 + Cloudflare Images: Media Pipeline & AVIF/WebP Transcoding
                        │
                        ▼
[ Layer 4: Multi-Region Kubernetes (AWS EKS) + ArgoCD GitOps ]
```

---

## 2. Scaling Strategies by Tier

### A. Frontend Tier & Edge Delivery
1. **Edge-Rendered SSR & Selective Hydration**:
   - Web application is served via Next.js with Server-Side Rendering (SSR) deployed across Cloudflare Edge Workers in 300+ Point of Presence (PoP) locations.
   - Initial HTML is generated at the edge closest to the visitor with critical CSS inlined, ensuring First Contentful Paint (FCP) < 0.6s and Largest Contentful Paint (LCP) < 1.2s.
   - Dynamic user-specific data (wishlists, auth status) is progressively hydrated via React Server Components.
2. **Dynamic Media Optimization Pipeline**:
   - Property listing imagery is ingested via presigned S3 URLs and transcoded asynchronously via serverless GPU workers into next-generation AVIF and WebP formats.
   - Cloudflare Images dynamically resizes, sharpens, and delivers responsive srcset variants matching client DPR (Device Pixel Ratio) and viewport breakpoints.
3. **Edge Caching & Stale-While-Revalidate (SWR)**:
   - Public listing payloads (`/api/listings/:id`) are cached at the CDN edge with `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.
   - Edge Cache Purge events are broadcast over Cloudflare's global API whenever a host updates photos, amenities, or pricing.

---

### B. Backend Microservices & API Gateway
1. **Federated GraphQL & Envoy API Gateway**:
   - Envoy Gateway handles Layer 7 routing, SSL termination, token-bucket rate limiting, and DDoS scrubbing.
   - Apollo Router federates domain subgraphs (`listings`, `reservations`, `pricing`, `reviews`, `users`) into a unified, type-safe supergraph schema.
2. **Zero-Trust Service Mesh**:
   - Internal microservices communicate via gRPC over HTTP/2 within an Istio service mesh with mutual TLS (mTLS) authentication.
   - Strict network policies isolate sensitive PCI-DSS payment zones from public listing query zones.

---

### C. Search & Discovery Engine
1. **Geo-Spatial Search with Elasticsearch**:
   - Listings are indexed in an Elasticsearch cluster using `geo_shape` and `geo_point` datatypes (H3 hexagonal hierarchical spatial index).
   - Radius searches (e.g. "Candolim, Goa within 5km") execute bounding box queries with composite filtering on availability bitmasks, guest capacity, price bands, and amenity flags in under 15ms.
2. **Vector Similarity & Multimodal Recommendation**:
   - Property imagery and description text are embedded using CLIP / multilingual transformer models into 512-dimensional vectors stored in Pinecone/Milvus.
   - Enables semantic discovery ("cozy bohemian apartment with jacuzzi near beach") and visual similarity queries.

---

### D. Booking Engine & Transactional Storage (Preventing Double Booking)
1. **Distributed Lock & Temporary Inventory Holds**:
   - When a guest begins checkout, the Booking Engine acquires a distributed lock via **Redis Redlock** with a deterministic resource key: `lock:listing:{id}:date:{yyyy-mm-dd}`.
   - A 10-minute hold reservation is created. If payment confirmation is not received within TTL, the hold expires and releases the calendar inventory back to the pool.
2. **Multi-Region ACID Consistency**:
   - The primary financial ledger and reservation records utilize **CockroachDB / Sharded Aurora PostgreSQL** configured with Serializable Isolation (`SERIALIZABLE`).
   - Strict unique constraints on `(listing_id, booking_date)` at the database engine level guarantee mathematical impossibility of double-booking, even under network partitions.
3. **Event Sourcing with Apache Kafka**:
   - All state transitions (`ReservationRequested`, `PaymentCaptured`, `ReservationConfirmed`, `ReservationCancelled`) are published as immutable events to partitioned Kafka topics.
   - Downstream consumers update the read-optimized Elasticsearch indices, send transactional emails/push notifications, and synchronize host calendar iCal feeds.

---

### E. Infrastructure, CI/CD & Deployment
1. **Multi-Region Active-Active Kubernetes (AWS EKS)**:
   - Production clusters are deployed across 3 primary geographic regions (US-East, EU-West, AP-South) to guarantee data sovereignty and local execution.
   - Karpenter manages dynamic node auto-scaling, provisioning EC2 Spot and Graviton ARM instances in seconds during peak traffic spikes.
2. **GitOps with ArgoCD & Progressive Delivery**:
   - Infrastructure is codified using Terraform and Crossplane.
   - Deployments use Argo Rollouts with automated Canary stages (5% -> 25% -> 100%) and automatic rollbacks triggered if Datadog APM detects p99 latency spikes or error rates exceeding 0.05%.
3. **Disaster Recovery & Chaos Testing**:
   - RPO (Recovery Point Objective) < 1 minute via streaming WAL backups to cross-region S3 Glacier.
   - RTO (Recovery Time Objective) < 5 minutes with automated DNS failover via Route 53 latency routing.
   - Chaos Mesh continuously injects pod failures and latency in staging to validate system resilience.
