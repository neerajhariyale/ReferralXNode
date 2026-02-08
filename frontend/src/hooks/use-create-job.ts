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
