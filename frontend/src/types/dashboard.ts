export interface DashboardStats {
    totalJobs: number;
    jobsPostedToday: number;
    jobsPostedThisMonth: number;
    totalVisitors: number;
    activeApplications: number;
    jobsGrowthPercentage: number;
    visitorsGrowthPercentage: number;
    applicationsGrowthPercentage: number;
    topLocations: LocationStats[];
    topCompanies: CompanyStats[];
    recentActivities: RecentActivity[];
}

export interface LocationStats {
    location: string;
    count: number;
    percentage: number;
}

export interface CompanyStats {
    company: string;
    count: number;
    percentage: number;
}

export interface RecentActivity {
    message: string;
    time: string;
    type: 'job' | 'user' | 'system' | 'alert';
}
