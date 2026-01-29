'use client';

import { useParams } from 'next/navigation';
import { mockJobs } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MapPin, Building2, Timer, Share2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Simple ATS Scanner Mock Component for the Modal
import { ATSScanner } from '@/components/ATSScanner';
import { AIInsights } from '@/components/AIInsights';


export default function JobDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const job = mockJobs.find(j => j.id === id) || mockJobs[0]; // Fallback to first job if not found

    // const [referralsVisible, setReferralsVisible] = useState(false); // Removed unused state

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <Avatar className="h-16 w-16 rounded-xl border border-zinc-100">
                                    <AvatarImage src={job.logo} />
                                    <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
                                    <p className="text-lg text-slate-600 font-medium flex items-center gap-2 mt-1">
                                        <Building2 className="h-4 w-4" /> {job.company}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-3">
                                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                                        <span className="flex items-center gap-1"><Timer className="h-3.5 w-3.5" /> {job.postedAt}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex gap-2">
                                <Button variant="outline"><Share2 className="h-4 w-4" /></Button>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                                Apply Now
                            </Button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm space-y-4">
                        <h2 className="text-xl font-bold text-slate-900">About the Role</h2>
                        <p className="text-slate-600 leading-relaxed">
                            {job.description}
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            We are looking for someone who is passionate about building great products. You will join a dynamic team and work on edge-cutting technologies.
                            <br /><br />
                            <strong>Requirements:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>5+ years of experience with React and TypeScript</li>
                                <li>Experience with Next.js App Router</li>
                                <li>Strong understanding of CSS and Tailwind</li>
                                <li>Experience with State Management</li>
                            </ul>
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* AI Insights Card */}
                    {/* AI Insights Component */}
                    <div className="sticky top-24">
                        <AIInsights
                            company={job.company}
                            jobTitle={job.title}
                            location={job.location}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}
