import { apiClient } from '@/lib/api-client';
import { DashboardStats } from '@/types/dashboard';

export const dashboardService = {
    async getStats(): Promise<DashboardStats> {
        const response = await apiClient<DashboardStats>('/api/admin/dashboard/stats');
        return response;
    }
};
