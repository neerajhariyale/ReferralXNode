'use client';

import { useState } from 'react';
import { useJobs } from '@/hooks/use-jobs';
import { useDeleteJob } from '@/hooks/use-delete-job';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    Plus,
    Trash2,
    ExternalLink,
    Loader2,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { timeAgo, formatDate } from '@/lib/format';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function AdminJobsPage() {
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const { data, loading, error, refetch } = useJobs({
        page,
        size: 20,
        sortBy: 'createdAt',
        sortDir: 'DESC',
        title: searchQuery || undefined,
    });

    const { deleteJob, loading: deleting } = useDeleteJob();

    const handleSearch = () => {
        setPage(0);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        const success = await deleteJob(deleteId);
        if (success) {
            setDeleteId(null);
            refetch();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        Manage Jobs
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        View, edit, and delete job postings
                    </p>
                </div>
                <Link href="/post-job">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <Card className="border-slate-200 dark:border-zinc-800">
                <CardContent className="pt-6">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search jobs by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="pl-10"
                            />
                        </div>
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            {data && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-slate-200 dark:border-zinc-800">
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {data.totalElements}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Jobs</p>
                        </CardContent>
                    </Card>
                    <Card className="border-slate-200 dark:border-zinc-800">
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {data.totalPages}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Pages</p>
                        </CardContent>
                    </Card>
                    <Card className="border-slate-200 dark:border-zinc-800">
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {data.pageSize}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Jobs Per Page</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            )}

            {/* Error State */}
            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                            <AlertCircle className="h-5 w-5" />
                            <div>
                                <p className="font-semibold">Error loading jobs</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Jobs List */}
            {!loading && !error && data && (
                <>
                    <Card className="border-slate-200 dark:border-zinc-800">
                        <CardHeader>
                            <CardTitle>
                                Jobs ({data.totalElements})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {data.content.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-slate-500 dark:text-slate-400">No jobs found</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {data.content.map((job) => (
                                        <div
                                            key={job.id}
                                            className="p-4 border border-slate-200 dark:border-zinc-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 truncate">
                                                        {job.title}
                                                    </h3>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                                        {job.company} • {job.location}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                                                        <span>{job.salaryRange}</span>
                                                        <span>•</span>
                                                        <span>Posted {timeAgo(job.postedAt)}</span>
                                                        <span>•</span>
                                                        <span>Created {formatDate(job.createdAt)}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {job.tags.slice(0, 5).map((tag) => (
                                                            <Badge
                                                                key={tag}
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                        {job.tags.length > 5 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{job.tags.length - 5} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <a
                                                        href={job.sourceUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-2"
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                            View
                                                        </Button>
                                                    </a>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setDeleteId(job.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pagination */}
                    {data.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setPage(Math.max(0, page - 1))}
                                disabled={data.first}
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                Page {data.pageNumber + 1} of {data.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setPage(page + 1)}
                                disabled={data.last}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Job</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this job posting? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteId(null)}
                            disabled={deleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
