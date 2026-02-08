# ReferralXNode Backend API Documentation

## Overview
This backend provides a comprehensive job management system with admin capabilities, filtering, and pagination.

## Base URL
```
http://localhost:8080
```

## API Endpoints

### Public Endpoints

#### 1. Get All Jobs (with Pagination & Filtering)
Get a paginated list of jobs with optional filters.

**Endpoint:** `GET /api/jobs`

**Query Parameters:**
- `page` (optional, default: 0) - Page number
- `size` (optional, default: 10) - Number of items per page
- `sortBy` (optional, default: postedAt) - Field to sort by
- `sortDir` (optional, default: DESC) - Sort direction (ASC/DESC)
- `company` (optional) - Filter by company name
- `location` (optional) - Filter by location
- `title` (optional) - Filter by job title
- `tags` (optional) - Filter by tags (comma-separated)

**cURL Examples:**

```bash
# Get first page (10 jobs)
curl -X GET "http://localhost:8080/api/jobs"

# Get second page with 5 jobs per page
curl -X GET "http://localhost:8080/api/jobs?page=1&size=5"

# Filter by company
curl -X GET "http://localhost:8080/api/jobs?company=Google"

# Filter by location
curl -X GET "http://localhost:8080/api/jobs?location=Remote"

# Filter by title
curl -X GET "http://localhost:8080/api/jobs?title=Developer"

# Filter by tags
curl -X GET "http://localhost:8080/api/jobs?tags=Java,React"

# Combined filters with pagination
curl -X GET "http://localhost:8080/api/jobs?company=Google&location=Remote&page=0&size=10&sortBy=postedAt&sortDir=DESC"

# Sort by company name ascending
curl -X GET "http://localhost:8080/api/jobs?sortBy=company&sortDir=ASC"
```

**Response Example:**
```json
{
  "content": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Senior Java Developer",
      "company": "Google",
      "location": "Remote",
      "description": "We are looking for a talented engineer...",
      "salaryRange": "$120k - $180k",
      "postedAt": "2026-02-08T08:00:00",
      "sourceUrl": "https://linkedin.com/jobs/view/123456",
      "tags": ["Java", "Spring Boot", "React", "Remote"],
      "createdAt": "2026-02-08T08:30:00"
    }
  ],
  "pageNumber": 0,
  "pageSize": 10,
  "totalElements": 25,
  "totalPages": 3,
  "first": true,
  "last": false
}
```

---

### Admin Endpoints

#### 2. Create a New Job
Create a new job posting.

**Endpoint:** `POST /api/admin/jobs`

**Note:** The `description` field accepts **rich text HTML** from Quill editor. You can send formatted HTML content.

**cURL Example:**
```bash
curl -X POST "http://localhost:8080/api/admin/jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Backend Engineer",
    "company": "TechCorp",
    "location": "San Francisco, CA",
    "description": "<h2>About the Role</h2><p>We are seeking an experienced backend engineer to join our team.</p><h3>Requirements:</h3><ul><li>5+ years of Java experience</li><li>Spring Boot expertise</li><li>Microservices architecture</li></ul><h3>Benefits:</h3><ul><li>Competitive salary</li><li>Health insurance</li><li>Remote work options</li></ul>",
    "salaryRange": "$150k - $200k",
    "postedAt": "2026-02-08T08:00:00",
    "sourceUrl": "https://techcorp.com/careers/backend-engineer",
    "tags": ["Java", "Spring Boot", "Microservices", "PostgreSQL"]
  }'
```

**Response Example:**
```json
{
  "id": "987e6543-e21b-12d3-a456-426614174000",
  "title": "Senior Backend Engineer",
  "company": "TechCorp",
  "location": "San Francisco, CA",
  "description": "We are seeking an experienced backend engineer...",
  "salaryRange": "$150k - $200k",
  "postedAt": "2026-02-08T08:00:00",
  "sourceUrl": "https://techcorp.com/careers/backend-engineer",
  "tags": ["Java", "Spring Boot", "Microservices", "PostgreSQL"],
  "createdAt": "2026-02-08T08:33:29"
}
```

---

#### 3. Get Job by ID
Retrieve a specific job by its ID.

**Endpoint:** `GET /api/admin/jobs/{id}`

**cURL Example:**
```bash
# Replace {job-id} with actual UUID
curl -X GET "http://localhost:8080/api/admin/jobs/987e6543-e21b-12d3-a456-426614174000"
```

---

#### 4. Update an Existing Job
Update a job posting.

**Endpoint:** `PUT /api/admin/jobs/{id}`

**cURL Example:**
```bash
# Replace {job-id} with actual UUID
curl -X PUT "http://localhost:8080/api/admin/jobs/987e6543-e21b-12d3-a456-426614174000" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lead Backend Engineer",
    "company": "TechCorp",
    "location": "Remote",
    "description": "Updated description for the position...",
    "salaryRange": "$160k - $220k",
    "postedAt": "2026-02-08T08:00:00",
    "sourceUrl": "https://techcorp.com/careers/lead-backend-engineer",
    "tags": ["Java", "Spring Boot", "Microservices", "PostgreSQL", "AWS"]
  }'
```

---

#### 5. Delete a Job
Delete a job posting.

**Endpoint:** `DELETE /api/admin/jobs/{id}`

**cURL Example:**
```bash
# Replace {job-id} with actual UUID
curl -X DELETE "http://localhost:8080/api/admin/jobs/987e6543-e21b-12d3-a456-426614174000"
```

**Response:** `204 No Content`

---

## Testing Workflow

### 1. Start the Backend
```bash
cd backend
mvn spring-boot:run
```

### 2. Wait for Mock Jobs
The application automatically creates mock jobs every minute (up to 50 jobs). Wait a minute or two for some jobs to be created.

### 3. Test Get All Jobs
```bash
# Get all jobs (first 10)
curl -X GET "http://localhost:8080/api/jobs"
```

### 4. Test Filtering
```bash
# Filter by company
curl -X GET "http://localhost:8080/api/jobs?company=Google"

# Filter by location
curl -X GET "http://localhost:8080/api/jobs?location=Remote"
```

### 5. Test Pagination
```bash
# Get page 2 with 5 items
curl -X GET "http://localhost:8080/api/jobs?page=1&size=5"
```

### 6. Create a New Job
```bash
curl -X POST "http://localhost:8080/api/admin/jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer",
    "company": "StartupXYZ",
    "location": "New York, NY",
    "description": "Join our innovative startup!",
    "salaryRange": "$100k - $150k",
    "postedAt": "2026-02-08T10:00:00",
    "sourceUrl": "https://startupxyz.com/jobs",
    "tags": ["JavaScript", "React", "Node.js"]
  }'
```

**Note the `id` from the response for the next steps.**

### 7. Get Job by ID
```bash
# Replace with actual ID from step 6
curl -X GET "http://localhost:8080/api/admin/jobs/YOUR-JOB-ID-HERE"
```

### 8. Update the Job
```bash
# Replace with actual ID from step 6
curl -X PUT "http://localhost:8080/api/admin/jobs/YOUR-JOB-ID-HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Full Stack Developer",
    "company": "StartupXYZ",
    "location": "Remote",
    "description": "Updated: Join our innovative startup remotely!",
    "salaryRange": "$120k - $170k",
    "postedAt": "2026-02-08T10:00:00",
    "sourceUrl": "https://startupxyz.com/jobs",
    "tags": ["JavaScript", "React", "Node.js", "TypeScript"]
  }'
```

### 9. Delete the Job
```bash
# Replace with actual ID from step 6
curl -X DELETE "http://localhost:8080/api/admin/jobs/YOUR-JOB-ID-HERE"
```

### 10. Verify Deletion
```bash
# This should return 404
curl -X GET "http://localhost:8080/api/admin/jobs/YOUR-JOB-ID-HERE"
```

---

## Error Responses

### 404 Not Found
```json
{
  "status": 404,
  "message": "Job not found with id: 123e4567-e89b-12d3-a456-426614174000",
  "timestamp": "2026-02-08T08:33:29",
  "path": "/api/admin/jobs/123e4567-e89b-12d3-a456-426614174000"
}
```

### 400 Bad Request (Validation Error)
```json
{
  "status": 400,
  "errors": {
    "title": "Title is required",
    "company": "Company is required"
  },
  "timestamp": "2026-02-08T08:33:29",
  "path": "/api/admin/jobs"
}
```

---

## Features Implemented

✅ **Admin CRUD Operations**
- Create new jobs
- Update existing jobs
- Delete jobs
- Get job by ID

✅ **Public Job Listing**
- Pagination (default 10 items per page)
- Sorting by any field (ASC/DESC)
- Filter by company name
- Filter by location
- Filter by job title
- Filter by tags

✅ **Additional Features**
- Automatic mock job generation (every minute, up to 50 jobs)
- Global exception handling
- Input validation
- CORS support for frontend integration
- PostgreSQL array support for tags

---

## Database Schema

The `jobs` table includes:
- `id` (UUID, Primary Key)
- `title` (VARCHAR, NOT NULL)
- `company` (VARCHAR, NOT NULL)
- `location` (VARCHAR)
- `description` (TEXT, NOT NULL)
- `salary_range` (VARCHAR)
- `posted_at` (TIMESTAMP, NOT NULL)
- `source_url` (VARCHAR, NOT NULL)
- `tags` (TEXT ARRAY)
- `created_at` (TIMESTAMP)

---

## Rich Text HTML Support

The backend fully supports **rich text HTML** from the Quill editor used in the frontend.

### How It Works

1. **Frontend (Quill Editor)**: The frontend uses React Quill which outputs HTML format with tags like `<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`, `<strong>`, `<em>`, etc.

2. **Backend Processing**: 
   - The `description` field accepts HTML strings
   - HTML is automatically **sanitized** to remove dangerous content (scripts, event handlers, etc.)
   - Safe HTML tags are preserved for proper formatting

3. **Storage**: The sanitized HTML is stored in PostgreSQL's TEXT column

4. **Response**: The HTML is returned as-is to the frontend, where Quill can render it properly

### Supported HTML Tags

The following HTML tags from Quill editor are supported:
- Headers: `<h1>`, `<h2>`, `<h3>`
- Text formatting: `<strong>`, `<em>`, `<u>`, `<s>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Links: `<a>`
- Paragraphs: `<p>`, `<br>`
- Quotes: `<blockquote>`
- Code: `<pre>`, `<code>`

### Security

The backend automatically:
- ✅ Removes `<script>` tags
- ✅ Removes JavaScript event handlers (onclick, onerror, etc.)
- ✅ Removes `javascript:` protocol from links
- ✅ Removes `<iframe>` tags
- ✅ Validates HTML structure

### Example

**Frontend sends:**
```json
{
  "description": "<h2>About the Role</h2><p>We are hiring!</p><ul><li>Java</li><li>Spring Boot</li></ul>"
}
```

**Backend stores (sanitized):**
```html
<h2>About the Role</h2><p>We are hiring!</p><ul><li>Java</li><li>Spring Boot</li></ul>
```

**Frontend receives:**
```json
{
  "description": "<h2>About the Role</h2><p>We are hiring!</p><ul><li>Java</li><li>Spring Boot</li></ul>"
}
```

The Quill editor can then render this HTML with proper formatting!

---

## Notes

1. **Security**: Currently, all endpoints are open for testing. In production, you should add authentication/authorization for admin endpoints.

2. **Database**: Make sure to configure your PostgreSQL connection in `application.properties` before running.

3. **Pagination**: The default page size is 10. You can adjust this using the `size` query parameter.

4. **Filtering**: All text filters use case-insensitive partial matching.

5. **Tags**: When filtering by tags, jobs matching ANY of the provided tags will be returned.

6. **Rich Text**: The description field accepts and preserves HTML formatting from the Quill editor. All HTML is sanitized for security.
