'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateJob } from '@/hooks/use-create-job';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/RichTextEditor';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CreateJobPage() {
    const router = useRouter();
    const { createJob, loading, error } = useCreateJob();
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        salaryRange: '',
        sourceUrl: '',
        tags: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);

        // Validate form
        if (!formData.title || !formData.company || !formData.description || !formData.sourceUrl) {
            alert('Please fill in all required fields');
            return;
        }

        // Create job
        const job = await createJob({
            title: formData.title,
            company: formData.company,
            location: formData.location || 'Remote',
            description: formData.description,
            salaryRange: formData.salaryRange || 'Competitive',
            postedAt: new Date().toISOString(),
            sourceUrl: formData.sourceUrl,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        });

        if (job) {
            setSuccess(true);
            // Reset form
            setFormData({
                title: '',
                company: '',
                location: '',
                description: '',
                salaryRange: '',
                sourceUrl: '',
                tags: '',
            });

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Post a New Job</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Fill in the details below to create a new job posting
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div>
                            <p className="font-semibold text-green-900 dark:text-green-100">Job posted successfully!</p>
                            <p className="text-sm text-green-700 dark:text-green-300">Redirecting to home page...</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="font-semibold text-red-900 dark:text-red-100">Error</p>
                        <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                )}

                {/* Form */}
                <Card className="border-slate-200 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Job Details</CardTitle>
                        <CardDescription>Enter the job information. Fields marked with * are required.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Job Title */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    Job Title *
                                </label>
                                <Input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="e.g., Senior Full Stack Developer"
                                    className="w-full"
                                    required
                                />
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    Company Name *
                                </label>
                                <Input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => handleChange('company', e.target.value)}
                                    placeholder="e.g., TechCorp Inc."
                                    className="w-full"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    Location
                                </label>
                                <Input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleChange('location', e.target.value)}
                                    placeholder="e.g., Remote, New York, NY, or Hybrid"
                                    className="w-full"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Leave empty to default to "Remote"
                                </p>
                            </div>

                            {/* Salary Range */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    Salary Range
                                </label>
                                <Input
                                    type="text"
                                    value={formData.salaryRange}
                                    onChange={(e) => handleChange('salaryRange', e.target.value)}
                                    placeholder="e.g., $100k - $150k or Competitive"
                                    className="w-full"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Leave empty to default to "Competitive"
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    Job Description *
                                </label>
                                <div className="border border-slate-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                                    <RichTextEditor
                                        value={formData.description}
                                        onChange={(value) => handleChange('description', value)}
                                        placeholder="Enter a detailed job description with formatting..."
                                    />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Use the editor to format your job description with headers, lists, bold text, etc.
                                </p>
                            </div>

                            {/* Source URL */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    Application URL *
                                </label>
                                <Input
                                    type="url"
                                    value={formData.sourceUrl}
                                    onChange={(e) => handleChange('sourceUrl', e.target.value)}
                                    placeholder="https://company.com/careers/job-id"
                                    className="w-full"
                                    required
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    The URL where candidates can apply for this job
                                </p>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    Skills/Tags
                                </label>
                                <Input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => handleChange('tags', e.target.value)}
                                    placeholder="e.g., React, Node.js, TypeScript, AWS"
                                    className="w-full"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Separate tags with commas
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Creating Job...
                                        </>
                                    ) : (
                                        'Post Job'
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push('/admin/dashboard')}
                                    disabled={loading}
                                    className="px-8"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Preview Card */}
                {formData.title && (
                    <Card className="mt-8 border-slate-200 dark:border-zinc-800">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>This is how your job posting will appear</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                        {formData.title || 'Job Title'}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {formData.company || 'Company Name'} • {formData.location || 'Remote'}
                                    </p>
                                </div>
                                {formData.salaryRange && (
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                                        {formData.salaryRange}
                                    </p>
                                )}
                                {formData.description && (
                                    <div
                                        className="prose dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: formData.description }}
                                    />
                                )}
                                {formData.tags && (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.split(',').map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
