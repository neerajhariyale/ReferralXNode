# Ready-to-Use Code Snippets

Copy and paste these code snippets directly into your frontend project.

---

## 📁 File Structure

```
src/
├── lib/
│   ├── api-client.ts          # API client configuration
│   └── error-handler.ts       # Error handling utilities
├── types/
│   └── job.ts                 # TypeScript types
├── services/
│   └── job-service.ts         # API service functions
└── hooks/
    ├── use-jobs.ts            # Fetch jobs hook
    ├── use-create-job.ts      # Create job hook
    ├── use-update-job.ts      # Update job hook
    └── use-delete-job.ts      # Delete job hook
```

---

## 1️⃣ Environment Setup

### `.env.local`
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

---

## 2️⃣ API Client

### `src/lib/api-client.ts`
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
      const error = await response.json().catch(() => ({ 
        message: 'An error occurred' 
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  },
};
```

---

## 3️⃣ TypeScript Types

### `src/types/job.ts`
```typescript
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salaryRange: string;
  postedAt: string;
  sourceUrl: string;
  tags: string[];
  createdAt: string;
}

export interface JobRequest {
  title: string;
  company: string;
  location: string;
  description: string;
  salaryRange: string;
  postedAt: string;
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
```

---

## 4️⃣ Job Service

### `src/services/job-service.ts`
```typescript
import { apiClient } from '@/lib/api-client';
import { Job, JobRequest, PageResponse, JobFilters } from '@/types/job';

export const jobService = {
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

  async getJobById(id: string): Promise<Job> {
    return apiClient.request<Job>(`/api/admin/jobs/${id}`);
  },

  async createJob(job: JobRequest): Promise<Job> {
    return apiClient.request<Job>('/api/admin/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    });
  },

  async updateJob(id: string, job: JobRequest): Promise<Job> {
    return apiClient.request<Job>(`/api/admin/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(job),
    });
  },

  async deleteJob(id: string): Promise<void> {
    await fetch(`${apiClient.baseURL}/api/admin/jobs/${id}`, {
      method: 'DELETE',
    });
  },
};
```

---

## 5️⃣ React Hooks

### `src/hooks/use-jobs.ts`
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

  return { data, loading, error, refetch: () => {} };
}
```

### `src/hooks/use-create-job.ts`
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

### `src/hooks/use-update-job.ts`
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

### `src/hooks/use-delete-job.ts`
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

## 6️⃣ Component Examples

### Job List Component
```typescript
'use client';

import { useJobs } from '@/hooks/use-jobs';
import { useState } from 'react';

export default function JobList() {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useJobs({ page, size: 10 });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        Jobs ({data.totalElements})
      </h1>

      <div className="grid gap-4">
        {data.content.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <div 
              className="mt-2 prose" 
              dangerouslySetInnerHTML={{ __html: job.description }} 
            />
            <p className="mt-2 font-medium">{job.salaryRange}</p>
            <div className="flex gap-2 mt-2">
              {job.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={data.first}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {data.pageNumber + 1} of {data.totalPages}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={data.last}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Create Job Form
```typescript
'use client';

import { useState } from 'react';
import { useCreateJob } from '@/hooks/use-create-job';
import RichTextEditor from '@/components/RichTextEditor';
import { useRouter } from 'next/navigation';

export default function CreateJobForm() {
  const router = useRouter();
  const { createJob, loading, error } = useCreateJob();
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salaryRange: '',
    sourceUrl: '',
    tags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const job = await createJob({
      ...formData,
      postedAt: new Date().toISOString(),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    
    if (job) {
      alert('Job created successfully!');
      router.push('/admin/jobs');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Job Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Company *</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., Remote, New York, NY"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <RichTextEditor
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder="Enter job description with formatting..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Salary Range</label>
        <input
          type="text"
          value={formData.salaryRange}
          onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., $100k - $150k"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Source URL *</label>
        <input
          type="url"
          value={formData.sourceUrl}
          onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="https://..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full border rounded px-3 py-2"
          placeholder="Java, Spring Boot, Remote (comma-separated)"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Job'}
      </button>
    </form>
  );
}
```

### Job Filters Component
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

  const updateFilter = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value, page: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <h2 className="font-semibold text-lg">Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Company"
            value={filters.company}
            onChange={(e) => updateFilter('company', e.target.value)}
            className="border rounded px-3 py-2"
          />
          
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="border rounded px-3 py-2"
          />
          
          <input
            type="text"
            placeholder="Job Title"
            value={filters.title}
            onChange={(e) => updateFilter('title', e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Results */}
      {loading && <div>Loading jobs...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}
      
      {data && (
        <div className="space-y-4">
          <p className="text-gray-600">
            Found {data.totalElements} jobs
          </p>
          
          {data.content.map((job) => (
            <div key={job.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company} - {job.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 7️⃣ Utility Functions

### Date Formatter
```typescript
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Usage
formatDate(job.postedAt); // "February 8, 2026"
```

### Relative Time
```typescript
export function timeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Usage
timeAgo(job.postedAt); // "2h ago"
```

---

## 8️⃣ Testing

### Test API Connection
```typescript
// Create a test page: app/test-api/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { jobService } from '@/services/job-service';

export default function TestAPI() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    async function test() {
      try {
        const jobs = await jobService.getJobs({ page: 0, size: 1 });
        setStatus(`✅ Success! Found ${jobs.totalElements} jobs`);
      } catch (error) {
        setStatus(`❌ Error: ${error}`);
      }
    }
    test();
  }, []);

  return <div className="p-8 text-xl">{status}</div>;
}
```

---

## ✅ Installation Checklist

1. Copy all files to your project
2. Install dependencies (if needed):
   ```bash
   npm install react-quill-new
   ```
3. Create `.env.local` with API URL
4. Test API connection
5. Start using the hooks in your components!

---

## 🚀 You're Ready!

All code is ready to use. Just copy the files and start building! 🎉
