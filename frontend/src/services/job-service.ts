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
