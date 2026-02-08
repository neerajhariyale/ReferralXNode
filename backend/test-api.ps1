# ReferralXNode API Test Script
# Make sure the backend is running on http://localhost:8080

$baseUrl = "http://localhost:8080"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "ReferralXNode API Testing Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Get All Jobs
Write-Host "1. Testing GET /api/jobs (Get all jobs - first page)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl/api/jobs" -Method Get
Write-Host "   Total Jobs: $($response.totalElements)" -ForegroundColor Green
Write-Host "   Page: $($response.pageNumber + 1) of $($response.totalPages)" -ForegroundColor Green
Write-Host "   Jobs on this page: $($response.content.Count)" -ForegroundColor Green
Write-Host ""

# Test 2: Get Jobs with Pagination
Write-Host "2. Testing GET /api/jobs?page=0&size=5 (Pagination)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl/api/jobs?page=0&size=5" -Method Get
Write-Host "   Page Size: $($response.pageSize)" -ForegroundColor Green
Write-Host "   Jobs returned: $($response.content.Count)" -ForegroundColor Green
Write-Host ""

# Test 3: Filter by Company
Write-Host "3. Testing GET /api/jobs?company=Google (Filter by company)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl/api/jobs?company=Google" -Method Get
Write-Host "   Jobs found: $($response.totalElements)" -ForegroundColor Green
if ($response.content.Count -gt 0) {
    Write-Host "   First job: $($response.content[0].title) at $($response.content[0].company)" -ForegroundColor Green
}
Write-Host ""

# Test 4: Filter by Location
Write-Host "4. Testing GET /api/jobs?location=Remote (Filter by location)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl/api/jobs?location=Remote" -Method Get
Write-Host "   Remote jobs found: $($response.totalElements)" -ForegroundColor Green
Write-Host ""

# Test 5: Create a New Job
Write-Host "5. Testing POST /api/admin/jobs (Create new job)" -ForegroundColor Yellow
$newJob = @{
    title = "PowerShell Test Job"
    company = "TestCorp"
    location = "Remote"
    description = "This is a test job created via PowerShell script"
    salaryRange = "`$100k - `$150k"
    postedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
    sourceUrl = "https://testcorp.com/jobs"
    tags = @("PowerShell", "Testing", "Automation")
} | ConvertTo-Json

$createdJob = Invoke-RestMethod -Uri "$baseUrl/api/admin/jobs" -Method Post -Body $newJob -ContentType "application/json"
$jobId = $createdJob.id
Write-Host "   Job created successfully!" -ForegroundColor Green
Write-Host "   Job ID: $jobId" -ForegroundColor Green
Write-Host "   Title: $($createdJob.title)" -ForegroundColor Green
Write-Host ""

# Test 6: Get Job by ID
Write-Host "6. Testing GET /api/admin/jobs/{id} (Get job by ID)" -ForegroundColor Yellow
$job = Invoke-RestMethod -Uri "$baseUrl/api/admin/jobs/$jobId" -Method Get
Write-Host "   Retrieved: $($job.title) at $($job.company)" -ForegroundColor Green
Write-Host ""

# Test 7: Update the Job
Write-Host "7. Testing PUT /api/admin/jobs/{id} (Update job)" -ForegroundColor Yellow
$updateJob = @{
    title = "Updated PowerShell Test Job"
    company = "TestCorp Updated"
    location = "Hybrid"
    description = "This job has been updated via PowerShell script"
    salaryRange = "`$120k - `$170k"
    postedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
    sourceUrl = "https://testcorp.com/jobs/updated"
    tags = @("PowerShell", "Testing", "Automation", "Updated")
} | ConvertTo-Json

$updatedJob = Invoke-RestMethod -Uri "$baseUrl/api/admin/jobs/$jobId" -Method Put -Body $updateJob -ContentType "application/json"
Write-Host "   Job updated successfully!" -ForegroundColor Green
Write-Host "   New Title: $($updatedJob.title)" -ForegroundColor Green
Write-Host "   New Company: $($updatedJob.company)" -ForegroundColor Green
Write-Host ""

# Test 8: Test Sorting
Write-Host "8. Testing GET /api/jobs?sortBy=company&sortDir=ASC (Sorting)" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl/api/jobs?sortBy=company&sortDir=ASC&size=5" -Method Get
Write-Host "   First 5 jobs sorted by company (ascending):" -ForegroundColor Green
foreach ($job in $response.content) {
    Write-Host "   - $($job.company): $($job.title)" -ForegroundColor Gray
}
Write-Host ""

# Test 9: Test Multiple Filters
Write-Host "9. Testing GET /api/jobs with multiple filters" -ForegroundColor Yellow
$response = Invoke-RestMethod -Uri "$baseUrl/api/jobs?location=Remote&sortBy=postedAt&sortDir=DESC&size=3" -Method Get
Write-Host "   Remote jobs (latest 3):" -ForegroundColor Green
foreach ($job in $response.content) {
    Write-Host "   - $($job.title) at $($job.company) | Posted: $($job.postedAt)" -ForegroundColor Gray
}
Write-Host ""

# Test 10: Delete the Job
Write-Host "10. Testing DELETE /api/admin/jobs/{id} (Delete job)" -ForegroundColor Yellow
try {
    Invoke-RestMethod -Uri "$baseUrl/api/admin/jobs/$jobId" -Method Delete
    Write-Host "   Job deleted successfully!" -ForegroundColor Green
} catch {
    Write-Host "   Error deleting job: $_" -ForegroundColor Red
}
Write-Host ""

# Test 11: Verify Deletion
Write-Host "11. Verifying deletion (should get 404)" -ForegroundColor Yellow
try {
    $job = Invoke-RestMethod -Uri "$baseUrl/api/admin/jobs/$jobId" -Method Get
    Write-Host "   ERROR: Job still exists!" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "   Confirmed: Job not found (404) - Deletion successful!" -ForegroundColor Green
    } else {
        Write-Host "   Unexpected error: $_" -ForegroundColor Red
    }
}
Write-Host ""

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "All tests completed!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
