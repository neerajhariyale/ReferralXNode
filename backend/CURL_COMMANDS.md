# Quick cURL Test Commands

## Prerequisites
Make sure your backend is running on http://localhost:8080

---

## 1. GET ALL JOBS (First 10)
```bash
curl -X GET "http://localhost:8080/api/jobs"
```

---

## 2. GET JOBS WITH PAGINATION (Page 2, 5 items)
```bash
curl -X GET "http://localhost:8080/api/jobs?page=1&size=5"
```

---

## 3. FILTER BY COMPANY
```bash
curl -X GET "http://localhost:8080/api/jobs?company=Google"
```

---

## 4. FILTER BY LOCATION
```bash
curl -X GET "http://localhost:8080/api/jobs?location=Remote"
```

---

## 5. FILTER BY TITLE
```bash
curl -X GET "http://localhost:8080/api/jobs?title=Developer"
```

---

## 6. FILTER BY TAGS
```bash
curl -X GET "http://localhost:8080/api/jobs?tags=Java,React"
```

---

## 7. COMBINED FILTERS
```bash
curl -X GET "http://localhost:8080/api/jobs?company=Google&location=Remote&page=0&size=10&sortBy=postedAt&sortDir=DESC"
```

---

## 8. CREATE A NEW JOB
**Note:** The description field accepts rich text HTML from Quill editor.

```bash
curl -X POST "http://localhost:8080/api/admin/jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Backend Engineer",
    "company": "TechCorp",
    "location": "San Francisco, CA",
    "description": "<h2>About the Role</h2><p>We are seeking an experienced backend engineer to join our team.</p><h3>Requirements:</h3><ul><li>5+ years Java</li><li>Spring Boot</li><li>Microservices</li></ul>",
    "salaryRange": "$150k - $200k",
    "postedAt": "2026-02-08T08:00:00",
    "sourceUrl": "https://techcorp.com/careers/backend-engineer",
    "tags": ["Java", "Spring Boot", "Microservices", "PostgreSQL"]
  }'
```

**Save the `id` from the response for the next commands!**

---

## 9. GET JOB BY ID
```bash
# Replace YOUR-JOB-ID with the actual ID from step 8
curl -X GET "http://localhost:8080/api/admin/jobs/YOUR-JOB-ID"
```

---

## 10. UPDATE A JOB
```bash
# Replace YOUR-JOB-ID with the actual ID from step 8
curl -X PUT "http://localhost:8080/api/admin/jobs/YOUR-JOB-ID" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lead Backend Engineer",
    "company": "TechCorp",
    "location": "Remote",
    "description": "Updated description for the position.",
    "salaryRange": "$160k - $220k",
    "postedAt": "2026-02-08T08:00:00",
    "sourceUrl": "https://techcorp.com/careers/lead-backend-engineer",
    "tags": ["Java", "Spring Boot", "Microservices", "PostgreSQL", "AWS"]
  }'
```

---

## 11. DELETE A JOB
```bash
# Replace YOUR-JOB-ID with the actual ID from step 8
curl -X DELETE "http://localhost:8080/api/admin/jobs/YOUR-JOB-ID"
```

---

## Alternative: Use PowerShell Test Script

Instead of running cURL commands manually, you can use the automated test script:

```powershell
cd backend
.\test-api.ps1
```

This will automatically test all endpoints and show you the results!

---

## Expected Response Format

### Paginated Response
```json
{
  "content": [...],
  "pageNumber": 0,
  "pageSize": 10,
  "totalElements": 25,
  "totalPages": 3,
  "first": true,
  "last": false
}
```

### Single Job Response
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Senior Java Developer",
  "company": "Google",
  "location": "Remote",
  "description": "...",
  "salaryRange": "$120k - $180k",
  "postedAt": "2026-02-08T08:00:00",
  "sourceUrl": "https://linkedin.com/jobs/view/123456",
  "tags": ["Java", "Spring Boot", "React", "Remote"],
  "createdAt": "2026-02-08T08:30:00"
}
```
