'use client';

import { useState, useEffect } from 'react';
import { jobService } from '@/services/job-service';
import { Job, PageResponse, JobFilters } from '@/types/job';

export function useJobs(filters?: JobFilters) {
    const [data, setData] = useState<PageResponse<Job> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = async () => {
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
    };

    useEffect(() => {
        refetch();
    }, [JSON.stringify(filters)]);

    return { data, loading, error, refetch };
}
