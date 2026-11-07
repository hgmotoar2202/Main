<# Genera un git bundle con todas las ramas y tags, lo verifica y rota copias. #>
param(
  [string]$BackupDir = "D:\Backups\insure-ai",
  [int]$Keep = 10
)
$ErrorActionPreference = "Stop"
$repo = (git rev-parse --show-toplevel)
Set-Location $repo
if (-not (Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }

$stamp  = Get-Date -Format "yyyyMMdd-HHmmss"
$name   = Split-Path $repo -Leaf
$bundle = Join-Path $BackupDir "$name-$stamp.bundle"

git bundle create $bundle --all
if ($LASTEXITCODE -ne 0) { throw "Falló la creación del bundle." }
git bundle verify $bundle
if ($LASTEXITCODE -ne 0) { throw "El bundle no pasó la verificación." }
Write-Host "Backup creado: $bundle" -ForegroundColor Green

Get-ChildItem $BackupDir -Filter "*.bundle" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -Skip $Keep |
  Remove-Item -Force