# Frontend API Integration Guide

This guide provides everything your frontend team needs to integrate with the ReferralXNode backend APIs.

---

## 📋 Table of Contents
1. [Base Configuration](#base-configuration)
2. [API Endpoints](#api-endpoints)
3. [TypeScript Types](#typescript-types)
4. [API Service Functions](#api-service-functions)
5. [React Hooks Examples](#react-hooks-examples)
6. [Error Handling](#error-handling)
7. [Rich Text Editor Integration](#rich-text-editor-integration)

---

## Base Configuration

### Environment Variables

Create a `.env.local` file in your frontend project:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### API Client Setup

Create `src/lib/api-client.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const apiClient = {
  baseURL: API_BASE_URL,
  
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },
};
```

---

## API Endpoints

### Base URL
```
http://localhost:8080
```

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs with pagination & filters |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/jobs` | Create a new job |
| GET | `/api/admin/jobs/{id}` | Get job by ID |
| PUT | `/api/admin/jobs/{id}` | Update a job |
| DELETE | `/api/admin/jobs/{id}` | Delete a job |

---

## TypeScript Types

Create `src/types/job.ts`:

```typescript
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string; // Rich text HTML
  salaryRange: string;
  postedAt: string; // ISO 8601 format
  sourceUrl: string;
  tags: string[];
  createdAt: string; // ISO 8601 format
}

export interface JobRequest {
  title: string;
  company: string;
  location: string;
  description: string; // Rich text HTML
  salaryRange: string;
  postedAt: string; // ISO 8601 format
  sourceUrl: string;
  tags: string[];
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface JobFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'ASC' | 'DESC';
  company?: string;
  location?: string;
  title?: string;
  tags?: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
  path: string;
}

export interface ValidationError {
  status: number;
  errors: Record<string, string>;
  timestamp: string;
  path: string;
}
```

---

## API Service Functions

Create `src/services/job-service.ts`:

```typescript
import { apiClient } from '@/lib/api-client';
import { Job, JobRequest, PageResponse, JobFilters } from '@/types/job';

export const jobService = {
  /**
   * Get all jobs with pagination and filters
   */
  async getJobs(filters?: JobFilters): Promise<PageResponse<Job>> {
    const params = new URLSearchParams();
    
    if (filters?.page !== undefined) params.append('page', filters.page.toString());
    if (filters?.size !== undefined) params.append('size', filters.size.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortDir) params.append('sortDir', filters.sortDir);
    if (filters?.company) params.append('company', filters.company);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.title) params.append('title', filters.title);
    if (filters?.tags) params.append('tags', filters.tags);
    
    const queryString = params.toString();
    const endpoint = `/api/jobs${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.request<PageResponse<Job>>(endpoint);
  },

  /**
   * Get a single job by ID
   */
  async getJobById(id: string): Promise<Job> {
    return apiClient.request<Job>(`/api/admin/jobs/${id}`);
  },

  /**
   * Create a new job (Admin)
   */
  async createJob(job: JobRequest): Promise<Job> {
    return apiClient.request<Job>('/api/admin/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    });
  },

  /**
   * Update an existing job (Admin)
   */
  async updateJob(id: string, job: JobRequest): Promise<Job> {
    return apiClient.request<Job>(`/api/admin/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(job),
    });
  },

  /**
   * Delete a job (Admin)
   */
  async deleteJob(id: string): Promise<void> {
    await fetch(`${apiClient.baseURL}/api/admin/jobs/${id}`, {
      method: 'DELETE',
    });
  },
};
```

---

## React Hooks Examples

### 1. Fetch Jobs Hook

Create `src/hooks/use-jobs.ts`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { jobService } from '@/services/job-service';
import { Job, PageResponse, JobFilters } from '@/types/job';

export function useJobs(filters?: JobFilters) {
  const [data, setData] = useState<PageResponse<Job> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);
        const response = await jobService.getJobs(filters);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
}
```

### 2. Create Job Hook

Create `src/hooks/use-create-job.ts`:

```typescript
'use client';

import { useState } from 'react';
import { jobService } from '@/services/job-service';
import { Job, JobRequest } from '@/types/job';

export function useCreateJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createJob = async (jobData: JobRequest): Promise<Job | null> => {
    try {
      setLoading(true);
      setError(null);
      const job = await jobService.createJob(jobData);
      return job;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createJob, loading, error };
}
```

### 3. Update Job Hook

Create `src/hooks/use-update-job.ts`:

```typescript
'use client';

import { useState } from 'react';
import { jobService } from '@/services/job-service';
import { Job, JobRequest } from '@/types/job';

export function useUpdateJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateJob = async (id: string, jobData: JobRequest): Promise<Job | null> => {
    try {
      setLoading(true);
      setError(null);
      const job = await jobService.updateJob(id, jobData);
      return job;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update job');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateJob, loading, error };
}
```

### 4. Delete Job Hook

Create `src/hooks/use-delete-job.ts`:

```typescript
'use client';

import { useState } from 'react';
import { jobService } from '@/services/job-service';

export function useDeleteJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteJob = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await jobService.deleteJob(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteJob, loading, error };
}
```

---

## Usage Examples

### Example 1: Job List Component

```typescript
'use client';

import { useJobs } from '@/hooks/use-jobs';
import { useState } from 'react';

export default function JobList() {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    page,
    size: 10,
    sortBy: 'postedAt',
    sortDir: 'DESC' as const,
  });

  const { data, loading, error } = useJobs(filters);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>Jobs ({data.totalElements})</h1>
      
      {data.content.map((job) => (
        <div key={job.id} className="job-card">
          <h2>{job.title}</h2>
          <p>{job.company} - {job.location}</p>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
          <p>{job.salaryRange}</p>
          <div>
            {job.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => setFilters({ ...filters, page: page - 1 })}
          disabled={data.first}
        >
          Previous
        </button>
        <span>Page {data.pageNumber + 1} of {data.totalPages}</span>
        <button 
          onClick={() => setFilters({ ...filters, page: page + 1 })}
          disabled={data.last}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Example 2: Create Job Form

```typescript
'use client';

import { useState } from 'react';
import { useCreateJob } from '@/hooks/use-create-job';
import RichTextEditor from '@/components/RichTextEditor';

export default function CreateJobForm() {
  const { createJob, loading, error } = useCreateJob();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '', // Rich text HTML
    salaryRange: '',
    postedAt: new Date().toISOString(),
    sourceUrl: '',
    tags: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const job = await createJob(formData);
    
    if (job) {
      alert('Job created successfully!');
      // Reset form or redirect
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />

      {/* Rich Text Editor for Description */}
      <RichTextEditor
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
        placeholder="Job Description"
      />

      <input
        type="text"
        placeholder="Salary Range"
        value={formData.salaryRange}
        onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
      />

      <input
        type="url"
        placeholder="Source URL"
        value={formData.sourceUrl}
        onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
        required
      />

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Job'}
      </button>
    </form>
  );
}
```

### Example 3: Job Filters

```typescript
'use client';

import { useState } from 'react';
import { useJobs } from '@/hooks/use-jobs';

export default function JobsWithFilters() {
  const [filters, setFilters] = useState({
    page: 0,
    size: 10,
    company: '',
    location: '',
    title: '',
  });

  const { data, loading, error } = useJobs(filters);

  return (
    <div>
      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by company"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value, page: 0 })}
        />

        <input
          type="text"
          placeholder="Filter by location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value, page: 0 })}
        />

        <input
          type="text"
          placeholder="Filter by title"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value, page: 0 })}
        />
      </div>

      {/* Results */}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          <p>Found {data.totalElements} jobs</p>
          {data.content.map((job) => (
            <div key={job.id}>{job.title} at {job.company}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Error Handling

### Error Types

```typescript
// 404 Not Found
{
  "status": 404,
  "message": "Job not found with id: xxx",
  "timestamp": "2026-02-08T09:17:11",
  "path": "/api/admin/jobs/xxx"
}

// 400 Validation Error
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

### Error Handler Utility

Create `src/lib/error-handler.ts`:

```typescript
export function handleApiError(error: any): string {
  if (error.errors) {
    // Validation errors
    return Object.values(error.errors).join(', ');
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}
```

---

## Rich Text Editor Integration

### Important Notes

1. **HTML Format**: The description field uses **HTML format** from Quill editor
2. **Sanitization**: Backend automatically sanitizes HTML for security
3. **Rendering**: Use `dangerouslySetInnerHTML` to render HTML in React

### Example: Rendering Job Description

```typescript
// ✅ Correct way to render HTML
<div dangerouslySetInnerHTML={{ __html: job.description }} />

// ❌ Wrong - will show HTML tags as text
<div>{job.description}</div>
```

### Example: Using RichTextEditor

```typescript
import RichTextEditor from '@/components/RichTextEditor';

function JobForm() {
  const [description, setDescription] = useState('');

  return (
    <RichTextEditor
      value={description}
      onChange={setDescription}
      placeholder="Enter job description"
    />
  );
}
```

The editor will output HTML like:
```html
<h2>About the Role</h2>
<p>We are looking for a <strong>talented</strong> developer.</p>
<ul>
  <li>5+ years experience</li>
  <li>Spring Boot expertise</li>
</ul>
```

---

## Query Parameters Reference

### GET /api/jobs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 0 | Page number (0-indexed) |
| size | number | 10 | Items per page |
| sortBy | string | postedAt | Field to sort by |
| sortDir | string | DESC | Sort direction (ASC/DESC) |
| company | string | - | Filter by company name |
| location | string | - | Filter by location |
| title | string | - | Filter by job title |
| tags | string | - | Filter by tags (comma-separated) |

### Example URLs

```typescript
// Get first page
'/api/jobs'

// Get second page with 20 items
'/api/jobs?page=1&size=20'

// Filter by company
'/api/jobs?company=Google'

// Multiple filters
'/api/jobs?company=Google&location=Remote&page=0&size=10'

// Filter by tags
'/api/jobs?tags=Java,React'

// Sort by company ascending
'/api/jobs?sortBy=company&sortDir=ASC'
```

---

## Complete Integration Checklist

- [ ] Create `.env.local` with API base URL
- [ ] Copy `api-client.ts` to `src/lib/`
- [ ] Copy `job.ts` types to `src/types/`
- [ ] Copy `job-service.ts` to `src/services/`
- [ ] Copy hooks to `src/hooks/`
- [ ] Update RichTextEditor to handle HTML
- [ ] Test GET /api/jobs endpoint
- [ ] Test POST /api/admin/jobs endpoint
- [ ] Test PUT /api/admin/jobs/{id} endpoint
- [ ] Test DELETE /api/admin/jobs/{id} endpoint
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Test pagination
- [ ] Test filters
- [ ] Test rich text editor integration

---

## Testing the Integration

### 1. Test Fetching Jobs

```typescript
// In your component or test file
import { jobService } from '@/services/job-service';

async function testFetchJobs() {
  try {
    const jobs = await jobService.getJobs({ page: 0, size: 10 });
    console.log('Jobs:', jobs);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 2. Test Creating a Job

```typescript
async function testCreateJob() {
  try {
    const newJob = await jobService.createJob({
      title: 'Test Job',
      company: 'Test Company',
      location: 'Remote',
      description: '<h2>Test</h2><p>This is a test job</p>',
      salaryRange: '$100k - $150k',
      postedAt: new Date().toISOString(),
      sourceUrl: 'https://example.com',
      tags: ['Test', 'JavaScript'],
    });
    console.log('Created job:', newJob);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## Support

If you encounter any issues:

1. Check that backend is running on `http://localhost:8080`
2. Verify CORS is enabled (already configured in backend)
3. Check browser console for errors
4. Verify API responses in Network tab
5. Check backend logs for errors

---

## Summary

✅ **API Client** - Configured with base URL and error handling  
✅ **TypeScript Types** - Full type safety for all API responses  
✅ **Service Functions** - Clean API abstraction layer  
✅ **React Hooks** - Ready-to-use hooks for all operations  
✅ **Error Handling** - Comprehensive error handling  
✅ **Rich Text Support** - Full HTML support from Quill editor  
✅ **Examples** - Complete working examples for all features  

Your frontend team can now integrate all APIs seamlessly! 🚀
