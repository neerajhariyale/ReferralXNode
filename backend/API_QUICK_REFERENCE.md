# API Quick Reference Card

## 🔗 Base URL
```
http://localhost:8080
```

---

## 📍 Endpoints

### Public
```
GET  /api/jobs              # Get all jobs (paginated)
```

### Admin
```
POST   /api/admin/jobs      # Create job
GET    /api/admin/jobs/{id} # Get job by ID
PUT    /api/admin/jobs/{id} # Update job
DELETE /api/admin/jobs/{id} # Delete job
```

---

## 📦 Request/Response Types

### Job Object
```typescript
{
  id: string;              // UUID
  title: string;
  company: string;
  location: string;
  description: string;     // HTML format
  salaryRange: string;
  postedAt: string;        // ISO 8601
  sourceUrl: string;
  tags: string[];
  createdAt: string;       // ISO 8601
}
```

### Page Response
```typescript
{
  content: Job[];
  pageNumber: number;      // 0-indexed
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
```

---

## 🔍 Query Parameters (GET /api/jobs)

| Param | Type | Default | Example |
|-------|------|---------|---------|
| page | number | 0 | `?page=1` |
| size | number | 10 | `?size=20` |
| sortBy | string | postedAt | `?sortBy=company` |
| sortDir | ASC/DESC | DESC | `?sortDir=ASC` |
| company | string | - | `?company=Google` |
| location | string | - | `?location=Remote` |
| title | string | - | `?title=Developer` |
| tags | string | - | `?tags=Java,React` |

---

## 💻 Quick Code Examples

### Fetch Jobs
```typescript
const response = await fetch('http://localhost:8080/api/jobs?page=0&size=10');
const data = await response.json();
```

### Create Job
```typescript
const response = await fetch('http://localhost:8080/api/admin/jobs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Senior Developer',
    company: 'TechCorp',
    location: 'Remote',
    description: '<h2>About</h2><p>We are hiring!</p>',
    salaryRange: '$150k',
    postedAt: new Date().toISOString(),
    sourceUrl: 'https://example.com',
    tags: ['Java', 'React']
  })
});
const job = await response.json();
```

### Update Job
```typescript
const response = await fetch(`http://localhost:8080/api/admin/jobs/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(jobData)
});
const updated = await response.json();
```

### Delete Job
```typescript
await fetch(`http://localhost:8080/api/admin/jobs/${id}`, {
  method: 'DELETE'
});
```

---

## ⚠️ Error Responses

### 404 Not Found
```json
{
  "status": 404,
  "message": "Job not found with id: xxx",
  "timestamp": "2026-02-08T09:17:11",
  "path": "/api/admin/jobs/xxx"
}
```

### 400 Validation Error
```json
{
  "status": 400,
  "errors": {
    "title": "Title is required",
    "company": "Company is required"
  },
  "timestamp": "2026-02-08T09:17:11",
  "path": "/api/admin/jobs"
}
```

---

## 🎨 Rich Text HTML

### Supported Tags
- Headers: `<h1>`, `<h2>`, `<h3>`
- Format: `<strong>`, `<em>`, `<u>`, `<s>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Links: `<a>`
- Other: `<p>`, `<br>`, `<blockquote>`, `<pre>`, `<code>`

### Example
```html
<h2>About the Role</h2>
<p>We are looking for a <strong>talented</strong> developer.</p>
<ul>
  <li>5+ years experience</li>
  <li>Spring Boot expertise</li>
</ul>
```

### Rendering in React
```tsx
<div dangerouslySetInnerHTML={{ __html: job.description }} />
```

---

## 🔐 Security Notes

✅ CORS enabled for `localhost:3000` and `localhost:5173`  
✅ HTML automatically sanitized (scripts removed)  
✅ All endpoints currently open (add auth in production)  

---

## 📚 Full Documentation

- **API Docs**: `API_DOCUMENTATION.md`
- **Frontend Integration**: `FRONTEND_INTEGRATION.md`
- **Rich Text Support**: `RICH_TEXT_SUPPORT.md`
- **cURL Commands**: `CURL_COMMANDS.md`
