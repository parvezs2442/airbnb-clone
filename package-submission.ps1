# package-submission.ps1
# Automates bundling the Airbnb clone submission zip file

$Destination = "airbnb-clone-submission.zip"
if (Test-Path $Destination) {
    Remove-Item -Force $Destination
}

$IncludeFiles = @(
    "src",
    "public",
    "index.html",
    "package.json",
    "package-lock.json",
    "vite.config.js",
    "README.md",
    "ARCHITECTURE.md",
    "ARCHITECTURE_DIAGRAM.svg",
    "ARCHITECTURE_DIAGRAM.png",
    "ARCHITECTURE_DIAGRAM.pdf",
    "PROMPTS_LOG.md",
    ".agents",
    "screenshot_home.png",
    "screenshot_phototour.png",
    "screenshot_lightbox.png"
)

Write-Host "Packaging submission files into $Destination..." -ForegroundColor Cyan

# Create a clean temp staging folder
$StagingDir = Join-Path $env:TEMP "airbnb-submission-staging"
if (Test-Path $StagingDir) {
    Remove-Item -Recurse -Force $StagingDir
}
New-Item -ItemType Directory -Path $StagingDir | Out-Null

foreach ($item in $IncludeFiles) {
    if (Test-Path $item) {
        Copy-Item -Path $item -Destination $StagingDir -Recurse -Force
        Write-Host "  Added $item" -ForegroundColor Green
    }
}

Compress-Archive -Path "$StagingDir\*" -DestinationPath $Destination -Force
Remove-Item -Recurse -Force $StagingDir

$ZipSize = (Get-Item $Destination).Length / 1MB
Write-Host "Successfully generated $Destination ($([math]::Round($ZipSize, 2)) MB)" -ForegroundColor Green
