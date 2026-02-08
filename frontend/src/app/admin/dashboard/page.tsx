"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, TrendingUp, Calendar, ArrowUpRight, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";

export default function AdminStatsPage() {
    const { data: stats, loading, error, refetch } = useDashboardStats();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-slate-600 dark:text-slate-400">Loading dashboard statistics...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <div className="text-center space-y-4 max-w-md">
                    <div className="h-16 w-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Failed to Load Dashboard</h3>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
                    </div>
                    <Button onClick={refetch} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </div>
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
            trend: stats.jobsGrowthPercentage >= 0 ? "up" : "down",
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <Button onClick={refetch} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
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
                                    <span className={`text-xs font-semibold flex items-center mb-1 ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                                        }`}>
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
                {/* Recent Activity / Updates */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <CardHeader>
                            <CardTitle>Recent Updates</CardTitle>
                            <CardDescription>Latest system activities and notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {stats.recentActivities.length > 0 ? (
                                <div className="space-y-6">
                                    {stats.recentActivities.map((activity, i) => (
                                        <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                            <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                                                {
                                                    activity.type === 'job' ? <Briefcase className="h-4 w-4" /> :
                                                        activity.type === 'user' ? <Users className="h-4 w-4" /> :
                                                            activity.type === 'alert' ? <TrendingUp className="h-4 w-4" /> :
                                                                <Calendar className="h-4 w-4" />
                                                }
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{activity.message}</p>
                                                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 text-center py-8">No recent activities</p>
                            )}
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
                            {stats.topLocations.length > 0 ? (
                                <div className="space-y-4">
                                    {stats.topLocations.slice(0, 5).map((location, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                                                <span className="truncate flex-1 mr-2">{location.location}</span>
                                                <span className="font-bold">{location.percentage.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 transition-all duration-500"
                                                    style={{ width: `${Math.min(location.percentage, 100)}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500">{location.count} jobs</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 text-center py-8">No location data</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Top Companies */}
            {stats.topCompanies.length > 0 && (
                <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
                    <CardHeader>
                        <CardTitle>Top Companies</CardTitle>
                        <CardDescription>Companies with most job postings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {stats.topCompanies.map((company, i) => (
                                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{company.count}</span>
                                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{company.percentage.toFixed(1)}%</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{company.company}</p>
                                    <p className="text-xs text-slate-500 mt-1">job postings</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
