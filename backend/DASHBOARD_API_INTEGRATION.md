# Admin Dashboard Statistics API - Integration Guide

## Overview

This API provides comprehensive statistics for the admin dashboard, including job counts, growth metrics, top locations/companies, and recent activities.

---

## API Endpoint

### GET `/api/admin/dashboard/stats`

**Description**: Fetches all dashboard statistics

**Authentication**: None (add authentication in production)

**Request**: No parameters required

**Response**: `DashboardStatsResponse`

---

## Response Structure

```json
{
  "totalJobs": 150,
  "jobsPostedToday": 8,
  "jobsPostedThisMonth": 42,
  "totalVisitors": 12345,
  "activeApplications": 156,
  "jobsGrowthPercentage": 8.5,
  "visitorsGrowthPercentage": 12.0,
  "applicationsGrowthPercentage": 23.0,
  "topLocations": [
    {
      "location": "Remote",
      "count": 45,
      "percentage": 30.0
    },
    {
      "location": "San Francisco, CA",
      "count": 30,
      "percentage": 20.0
    },
    {
      "location": "New York, NY",
      "count": 25,
      "percentage": 16.67
    }
  ],
  "topCompanies": [
    {
      "company": "Google",
      "count": 15,
      "percentage": 10.0
    },
    {
      "company": "Microsoft",
      "count": 12,
      "percentage": 8.0
    },
    {
      "company": "Amazon",
      "count": 10,
      "percentage": 6.67
    }
  ],
  "recentActivities": [
    {
      "message": "New job posted: Senior Frontend Engineer at TechFlow AI",
      "time": "2 hours ago",
      "type": "job"
    },
    {
      "message": "New job posted: Backend Developer at StartupXYZ",
      "time": "5 hours ago",
      "type": "job"
    },
    {
      "message": "New job posted: DevOps Engineer at CloudCorp",
      "time": "1 day ago",
      "type": "job"
    }
  ]
}
```

---

## Field Descriptions

### Main Statistics

| Field | Type | Description |
|-------|------|-------------|
| `totalJobs` | Long | Total number of jobs in the system |
| `jobsPostedToday` | Long | Number of jobs posted today |
| `jobsPostedThisMonth` | Long | Number of jobs posted this month |
| `totalVisitors` | Long | Total visitors (mock data for now) |
| `activeApplications` | Long | Active applications (mock data for now) |

### Growth Metrics

| Field | Type | Description |
|-------|------|-------------|
| `jobsGrowthPercentage` | Double | Month-over-month growth percentage for jobs |
| `visitorsGrowthPercentage` | Double | Visitor growth percentage |
| `applicationsGrowthPercentage` | Double | Application growth percentage |

### Location Statistics

| Field | Type | Description |
|-------|------|-------------|
| `location` | String | Location name |
| `count` | Long | Number of jobs in this location |
| `percentage` | Double | Percentage of total jobs |

### Company Statistics

| Field | Type | Description |
|-------|------|-------------|
| `company` | String | Company name |
| `count` | Long | Number of jobs from this company |
| `percentage` | Double | Percentage of total jobs |

### Recent Activities

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Activity description |
| `time` | String | Human-readable time (e.g., "2 hours ago") |
| `type` | String | Activity type: "job", "user", "system", "alert" |

---

## Frontend Integration

### 1. Create TypeScript Types

Create `src/types/dashboard.ts`:

```typescript
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
```

### 2. Create Dashboard Service

Create `src/services/dashboard-service.ts`:

```typescript
import { apiClient } from '@/lib/api-client';
import { DashboardStats } from '@/types/dashboard';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient<DashboardStats>('/api/admin/dashboard/stats');
    return response;
  }
};
```

### 3. Create React Hook

Create `src/hooks/use-dashboard-stats.ts`:

```typescript
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
```

### 4. Update Dashboard Page

Update `src/app/admin/dashboard/page.tsx`:

```typescript
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Briefcase, TrendingUp, Calendar, ArrowUpRight, Loader2 } from "lucide-react";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";

export default function AdminStatsPage() {
    const { data: stats, loading, error } = useDashboardStats();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-8">
                <p>Error loading dashboard: {error}</p>
            </div>
        );
    }

    if (!stats) return null;

    const mainStats = [
        {
            title: "Total Visitors",
            value: stats.totalVisitors.toLocaleString(),
            change: `+${stats.visitorsGrowthPercentage.toFixed(1)}%`,
            trend: "up",
            icon: Users,
            color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
        },
        {
            title: "Jobs Posted Today",
            value: stats.jobsPostedToday.toString(),
            change: `+${stats.jobsPostedToday}`,
            trend: "up",
            icon: Calendar,
            color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20"
        },
        {
            title: "Jobs This Month",
            value: stats.jobsPostedThisMonth.toString(),
            change: `+${stats.jobsGrowthPercentage.toFixed(1)}%`,
            trend: "up",
            icon: Briefcase,
            color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20"
        },
        {
            title: "Active Applications",
            value: stats.activeApplications.toLocaleString(),
            change: `+${stats.applicationsGrowthPercentage.toFixed(1)}%`,
            trend: "up",
            icon: TrendingUp,
            color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainStats.map((stat, i) => (
                    <Card key={i} className="border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                                <div className="flex items-end gap-2 mt-1">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{stat.value}</h3>
                                    <span className="text-xs font-semibold text-emerald-600 flex items-center mb-1">
                                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <CardHeader>
                            <CardTitle>Recent Updates</CardTitle>
                            <CardDescription>Latest system activities and notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {stats.recentActivities.map((activity, i) => (
                                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                        <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                                            {activity.type === 'job' ? <Briefcase className="h-4 w-4" /> :
                                             activity.type === 'user' ? <Users className="h-4 w-4" /> :
                                             activity.type === 'alert' ? <TrendingUp className="h-4 w-4" /> :
                                             <Calendar className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{activity.message}</p>
                                            <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Locations */}
                <div className="space-y-6">
                    <Card className="border-slate-100 dark:border-slate-800 shadow-sm h-full bg-white dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle>Top Locations</CardTitle>
                            <CardDescription>By Job Count</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.topLocations.slice(0, 5).map((location, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                                            <span className="truncate">{location.location}</span>
                                            <span className="font-bold">{location.percentage.toFixed(1)}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-blue-500" 
                                                style={{ width: `${location.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
```

---

## Example cURL Request

```bash
curl -X GET http://localhost:8080/api/admin/dashboard/stats
```

---

## Testing

### 1. Start Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 2. Test API
```bash
curl http://localhost:8080/api/admin/dashboard/stats | jq
```

### 3. Expected Response
You should see JSON with all dashboard statistics.

---

## Features

### ✅ Real-Time Statistics
- Total jobs count
- Jobs posted today
- Jobs posted this month
- Growth percentages (month-over-month)

### ✅ Top Locations
- Top 5 locations by job count
- Percentage distribution
- Sorted by count (descending)

### ✅ Top Companies
- Top 5 companies by job count
- Percentage distribution
- Sorted by count (descending)

### ✅ Recent Activities
- Last 5 job postings
- Human-readable timestamps ("2 hours ago")
- Activity type classification

---

## Future Enhancements

### Planned Features

1. **Real Visitor Tracking**
   - Integrate with analytics service
   - Track unique visitors
   - Page view statistics

2. **Application Tracking**
   - Create Application entity
   - Track application status
   - Application success rate

3. **Time-Series Data**
   - Daily job posting trends
   - Weekly/monthly charts
   - Year-over-year comparison

4. **Advanced Filters**
   - Date range selection
   - Filter by location/company
   - Custom time periods

5. **Export Functionality**
   - Export stats to CSV
   - Generate PDF reports
   - Email scheduled reports

---

## Error Handling

### Common Errors

#### 404 Not Found
```json
{
  "status": 404,
  "message": "Endpoint not found",
  "timestamp": "2024-02-08T09:40:00",
  "path": "/api/admin/dashboard/stats"
}
```

**Solution**: Check that backend is running and endpoint is correct.

#### 500 Internal Server Error
```json
{
  "status": 500,
  "message": "Internal server error",
  "timestamp": "2024-02-08T09:40:00",
  "path": "/api/admin/dashboard/stats"
}
```

**Solution**: Check backend logs for errors.

---

## Summary

✅ **Endpoint**: `GET /api/admin/dashboard/stats`  
✅ **Real statistics** from database  
✅ **Growth metrics** calculated automatically  
✅ **Top locations** and companies  
✅ **Recent activities** with timestamps  
✅ **Easy frontend integration** with hooks  
✅ **TypeScript support** with full types  

**The admin dashboard API is ready for integration!** 🎉

---

## Quick Integration Checklist

- [ ] Backend running on `http://localhost:8080`
- [ ] Test API with cURL
- [ ] Create TypeScript types
- [ ] Create dashboard service
- [ ] Create React hook
- [ ] Update dashboard page
- [ ] Test in browser
- [ ] Verify all stats display correctly

**Ready to integrate!** 🚀
