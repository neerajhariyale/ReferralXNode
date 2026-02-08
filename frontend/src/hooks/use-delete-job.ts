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
