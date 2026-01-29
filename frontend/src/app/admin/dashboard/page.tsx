
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Briefcase, TrendingUp, Calendar, ArrowUpRight, DollarSign } from "lucide-react";
import { mockJobs } from "@/lib/mock-data";

export default function AdminStatsPage() {
    // Calculate simple stats from mock data
    const totalJobs = mockJobs.length;
    const engineeringJobs = mockJobs.filter(j => j.category === "Engineering").length;

    // Mock daily/monthly stats
    const stats = [
        {
            title: "Total Visitors",
            value: "12,345",
            change: "+12%",
            trend: "up",
            icon: Users,
            color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
        },
        {
            title: "Jobs Posted Today",
            value: "8",
            change: "+4",
            trend: "up",
            icon: Calendar,
            color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20"
        },
        {
            title: "Jobs This Month",
            value: "42",
            change: "+8%",
            trend: "up",
            icon: Briefcase,
            color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20"
        },
        {
            title: "Active Applications",
            value: "156",
            change: "+23%",
            trend: "up",
            icon: TrendingUp,
            color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20"
        }
    ];

    const updates = [
        { message: "New job posted: Senior Frontend Engineer at TechFlow AI", time: "2 hours ago", type: "job" },
        { message: "Server maintenance scheduled for Sunday 2 AM", time: "5 hours ago", type: "system" },
        { message: "New user registration: John Doe (Engineering)", time: "1 day ago", type: "user" },
        { message: "Resume Scanner usage peaked at 500 scans/hour", time: "1 day ago", type: "alert" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
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
                {/* Recent Activity / Updates */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-100 dark:border-slate-800 shadow-sm h-full">
                        <CardHeader>
                            <CardTitle>Recent Updates</CardTitle>
                            <CardDescription>Latest system activities and notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {updates.map((update, i) => (
                                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                        <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                                            {
                                                update.type === 'job' ? <Briefcase className="h-4 w-4" /> :
                                                    update.type === 'user' ? <Users className="h-4 w-4" /> :
                                                        update.type === 'alert' ? <TrendingUp className="h-4 w-4" /> :
                                                            <Calendar className="h-4 w-4" />
                                            }
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{update.message}</p>
                                            <p className="text-xs text-slate-500 mt-1">{update.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Distribution Stats */}
                <div className="space-y-6">
                    <Card className="border-slate-100 dark:border-slate-800 shadow-sm h-full bg-white dark:bg-slate-900">
                        <CardHeader>
                            <CardTitle>Job Distribution</CardTitle>
                            <CardDescription>By Category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                                        <span>Engineering</span>
                                        <span className="font-bold">{Math.round((engineeringJobs / totalJobs) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[60%]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                                        <span>Marketing</span>
                                        <span className="font-bold">15%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 w-[15%]"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-slate-700 dark:text-slate-300">
                                        <span>Sales</span>
                                        <span className="font-bold">10%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[10%]"></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

