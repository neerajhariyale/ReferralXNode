
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea"; // Removed in favor of RichTextEditor
import RichTextEditor from "@/components/RichTextEditor";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { mockJobs } from "@/lib/mock-data";

export default function PostJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        category: "Engineering",
        salary: "",
        description: "",
        logoUrl: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API Call
        setTimeout(() => {
            // In a real app, we would POST to /api/jobs
            // For now, we'll just log it and redirect
            console.log("Job Posted:", formData);

            // We can't easily push to the imported mockJobs array and expect it to persist across reloads 
            // in a client-side only mock, but for the demo session state, it might show up if we pushed it,
            // but Next.js hot reload might reset it. 
            // However, to satisfy "then it should visible on the main page", 
            // I'd ideally need a persistent store or a real DB. 
            // Since I suggested Postgres later, this is a UI demo.
            // I will push to the mock array just in case the memory persists for a bit. (It likely won't across page navigations in dev mode sometimes).

            const newJob = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                postedAt: "Just now",
                logo: formData.logoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${formData.company}`,
                tags: [formData.category, formData.type]
            };

            mockJobs.unshift({
                ...newJob,
                category: formData.category as any
            });

            alert("Job Posted Successfully!");
            router.push("/admin/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Header Removed - Managed by Layout */}

            <main className="container mx-auto px-1 py-4 max-w-3xl">
                <form onSubmit={handleSubmit}>
                    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                            <CardDescription>Fill in the information to post a new job opening.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <Input
                                        name="title"
                                        placeholder="e.g. Senior Frontend Engineer"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Company Name</label>
                                    <Input
                                        name="company"
                                        placeholder="e.g. Acme Corp"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Company Logo URL</label>
                                <Input
                                    name="logoUrl"
                                    placeholder="https://example.com/logo.png"
                                    value={formData.logoUrl}
                                    onChange={handleChange}
                                />
                                <p className="text-[10px] text-slate-500">Leave blank to auto-generate based on company name.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <Input
                                        name="location"
                                        placeholder="e.g. New York, NY (or Remote)"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Salary Range</label>
                                    <Input
                                        name="salary"
                                        placeholder="e.g. $120k - $150k"
                                        value={formData.salary}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Type</label>
                                    <select
                                        name="type"
                                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                                        value={formData.type}
                                        onChange={handleChange}
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <select
                                        name="category"
                                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="Engineering">IT & Engineering</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Operations">Operations</option>
                                        <option value="Human Resources">Human Resources</option>
                                        <option value="Design">Design</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Job Description</label>
                                <div className="min-h-[250px]">
                                    <RichTextEditor
                                        value={formData.description}
                                        onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                                        placeholder="Enter the detailed job description here..."
                                    />
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 bg-slate-50/50 dark:bg-slate-900/50 py-4">
                            <Button variant="outline" type="button" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                                {loading ? "Posting..." : "Post Job Now"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </main>
        </div>
    );
}
