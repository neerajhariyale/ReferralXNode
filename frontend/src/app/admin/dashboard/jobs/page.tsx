
"use client";

import { useState } from "react";
import Link from "next/link";
import { mockJobs, Job } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus, Search, Briefcase, MapPin,
    MoreHorizontal, Calendar, ArrowUpRight, ChevronLeft, ChevronRight, Pencil, Trash2
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboardPage() {
    const [jobs, setJobs] = useState<Job[]>(mockJobs);

    // Filters
    const [filterCompany, setFilterCompany] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterCategory, setFilterCategory] = useState<string>("all");
    const [showOnlyThisMonth, setShowOnlyThisMonth] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Apply filters
    const filteredJobs = jobs.filter(job => {
        const matchCompany = job.company.toLowerCase().includes(filterCompany.toLowerCase());
        const matchRole = job.title.toLowerCase().includes(filterRole.toLowerCase());
        const matchCategory = filterCategory === "all" || job.category === filterCategory;
        const matchDate = !showOnlyThisMonth || !job.postedAt.includes("week");

        return matchCompany && matchRole && matchCategory && matchDate;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <main className="container mx-auto px-1 py-1">

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Job Postings</h1>
                        <p className="text-slate-500 mt-1">Manage and track all job listings</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/admin/dashboard/post">
                            <Plus className="h-4 w-4 mr-2" />
                            Post a Job
                        </Link>
                    </Button>
                </div>

                {/* Filters Section */}
                <Card className="mb-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                    <Input
                                        placeholder="Search Company..."
                                        className="pl-9"
                                        value={filterCompany}
                                        onChange={(e) => { setFilterCompany(e.target.value); setCurrentPage(1); }}
                                    />
                                </div>
                                <div className="relative">
                                    <Briefcase className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                    <Input
                                        placeholder="Search Job Title..."
                                        className="pl-9"
                                        value={filterRole}
                                        onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
                                    />
                                </div>
                                <div>
                                    <select
                                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                                        value={filterCategory}
                                        onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Operations">Operations</option>
                                        <option value="Design">Design</option>
                                        <option value="Human Resources">Human Resources</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={showOnlyThisMonth ? "secondary" : "outline"}
                                        onClick={() => { setShowOnlyThisMonth(!showOnlyThisMonth); setCurrentPage(1); }}
                                        className="w-full justify-start"
                                    >
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {showOnlyThisMonth ? "Results: Recent" : "Filter: Recent Only"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Jobs Table */}
                <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Role / Title</th>
                                    <th className="px-6 py-4">Company</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Posted</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {paginatedJobs.length > 0 ? (
                                    paginatedJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-slate-900 dark:text-slate-100">{job.title}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                    <MapPin className="h-3 w-3" /> {job.location}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded text-[10px] items-center justify-center flex bg-slate-100 dark:bg-slate-800 shrink-0">
                                                        {job.company.substring(0, 1)}
                                                    </div>
                                                    <span className="font-medium">{job.company}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant="outline" className="font-normal bg-slate-50">
                                                    {job.category || 'Other'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                    {job.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                                {job.postedAt}
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/jobs/${job.id}`} className="cursor-pointer flex items-center">
                                                                <ArrowUpRight className="h-4 w-4 mr-2" /> View Live
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Pencil className="h-4 w-4 mr-2" /> Edit Listing
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                            No jobs found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col-reverse gap-4 sm:flex-row items-center justify-between">
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredJobs.length)}</span> of <span className="font-medium">{filteredJobs.length}</span> results
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => goToPage(page)}
                                            className={`h-8 w-8 p-0 ${currentPage === page ? "bg-slate-900 text-white" : ""}`}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="h-8 w-8 p-0"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
