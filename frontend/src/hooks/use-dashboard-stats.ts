import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboard-service';
import { DashboardStats } from '@/types/dashboard';

export function useDashboardStats() {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);
                const stats = await dashboardService.getStats();
                setData(stats);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const refetch = async () => {
        try {
            setLoading(true);
            setError(null);
            const stats = await dashboardService.getStats();
            setData(stats);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch };
}
