# ==============================================================================
# POWER HOUSE — Launch Script (PowerShell)
# Launches Backend (FastAPI on :8000) and Frontend (Vite on :5173)
# ==============================================================================

$RootPath = $PSScriptRoot
$BackendPath = Join-Path $RootPath "backend"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Starting POWER HOUSE Compliance Operating System" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Ensure port 8000 is clean (prevents WinError 10013 socket collisions)
$port8000 = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue
if ($port8000) {
    Write-Host "Freeing port 8000 from existing process (PID: $(.OwningProcess))..." -ForegroundColor Yellow
    Stop-Process -Id $port8000.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# Ensure port 5173 is clean
$port5173 = Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
if ($port5173) {
    Write-Host "Freeing port 5173 from existing process (PID: $(.OwningProcess))..." -ForegroundColor Yellow
    Stop-Process -Id $port5173.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# 1. Start Backend in a new window
Write-Host "
[1/2] Starting Backend API on http://127.0.0.1:8000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$BackendPath'; Write-Host 'POWER HOUSE Backend running at http://127.0.0.1:8000' -ForegroundColor Green; .\.venv\Scripts\uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload"

# 2. Start Frontend in a new window
Write-Host "[2/2] Starting Frontend UI on http://localhost:5173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$RootPath'; Write-Host 'POWER HOUSE Frontend running at http://localhost:5173' -ForegroundColor Cyan; npm run dev"

Write-Host "
✓ Both services launched cleanly in separate windows!" -ForegroundColor Green
Write-Host "→ App URL:    http://localhost:5173" -ForegroundColor Yellow
Write-Host "→ API Docs:   http://127.0.0.1:8000/docs" -ForegroundColor Yellow
Write-Host "→ Demo User:  mohith@powerhouse.io
" -ForegroundColor Yellow
