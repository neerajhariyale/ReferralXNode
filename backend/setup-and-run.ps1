# ReferralXNode Backend Setup and Run Script
# This script helps you set up and run the backend

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "ReferralXNode Backend Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check Java
Write-Host "Checking Java installation..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✓ Java is installed: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Java is NOT installed!" -ForegroundColor Red
    Write-Host "  Please install JDK 21 from: https://adoptium.net/" -ForegroundColor Yellow
    Write-Host "  After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check Maven
Write-Host "Checking Maven installation..." -ForegroundColor Yellow
try {
    $mvnVersion = mvn -version 2>&1 | Select-String "Apache Maven"
    Write-Host "✓ Maven is installed: $mvnVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Maven is NOT installed!" -ForegroundColor Red
    Write-Host "  Install options:" -ForegroundColor Yellow
    Write-Host "  1. Using Chocolatey: choco install maven" -ForegroundColor Yellow
    Write-Host "  2. Manual: https://maven.apache.org/download.cgi" -ForegroundColor Yellow
    Write-Host "  After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check PostgreSQL
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version 2>&1
    Write-Host "✓ PostgreSQL is installed: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠ PostgreSQL might not be installed or not in PATH" -ForegroundColor Yellow
    Write-Host "  If you haven't installed it, get it from: https://www.postgresql.org/download/" -ForegroundColor Yellow
    Write-Host "  Continuing anyway..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Configuration Check" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check application.properties
$propsFile = "src\main\resources\application.properties"
if (Test-Path $propsFile) {
    Write-Host "✓ Found application.properties" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠ IMPORTANT: Make sure you've configured your database connection!" -ForegroundColor Yellow
    Write-Host "  Edit: $propsFile" -ForegroundColor Yellow
    Write-Host "  Update these properties:" -ForegroundColor Yellow
    Write-Host "    - spring.datasource.url" -ForegroundColor Gray
    Write-Host "    - spring.datasource.username" -ForegroundColor Gray
    Write-Host "    - spring.datasource.password" -ForegroundColor Gray
    Write-Host ""
    
    $continue = Read-Host "Have you configured the database? (y/n)"
    if ($continue -ne 'y') {
        Write-Host "Please configure the database first, then run this script again." -ForegroundColor Yellow
        exit 0
    }
} else {
    Write-Host "✗ application.properties not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Starting Backend Server" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Running: mvn spring-boot:run" -ForegroundColor Yellow
Write-Host ""
Write-Host "The server will start on http://localhost:8080" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Run the backend
mvn spring-boot:run
