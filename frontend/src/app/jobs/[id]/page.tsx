'use client';

import { useParams } from 'next/navigation';
import { mockJobs, mockProfiles } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MapPin, Building2, Timer, ScanSearch, Users, ArrowRight, Share2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Simple ATS Scanner Mock Component for the Modal
import { ATSScanner } from '@/components/ATSScanner';


export default function JobDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const job = mockJobs.find(j => j.id === id) || mockJobs[0]; // Fallback to first job if not found

    const [referralsVisible, setReferralsVisible] = useState(false);

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
                    <Card className="border-blue-100 bg-blue-50/50 shadow-sm sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-900">
                                <ScanSearch className="h-5 w-5 text-blue-600" />
                                AI Insights
                            </CardTitle>
                            <CardDescription className="text-blue-700/80">
                                Boost your chances by 40%
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            {/* Action 1: Referrals */}
                            <div className="space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full justify-between bg-white hover:bg-white/80 border-blue-200 text-slate-700 hover:text-blue-700 transition-all font-medium h-auto py-3"
                                    onClick={() => setReferralsVisible(!referralsVisible)}
                                >
                                    <span className="flex items-center gap-2">
                                        <Users className="h-4 w-4" /> Check Connections
                                    </span>
                                    {referralsVisible ? (
                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">3 Found</span>
                                    ) : (
                                        <ArrowRight className="h-4 w-4 text-slate-400" />
                                    )}
                                </Button>

                                {referralsVisible && (
                                    <div className="bg-white rounded-lg border border-blue-100 p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Likely to refer you</p>
                                        {mockProfiles.map((profile) => (
                                            <div key={profile.id} className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 border border-zinc-100">
                                                    <AvatarImage src={profile.avatar} />
                                                    <AvatarFallback>{profile.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-slate-900 truncate">{profile.name}</p>
                                                    <p className="text-xs text-slate-500 truncate">{profile.role}</p>
                                                </div>
                                                <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-blue-50 text-blue-700 border-blue-100">{profile.connectionDegree}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Action 2: Scanner */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-md">
                                        Scan Resume for this Job
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>ATS Resume Scanner</DialogTitle>
                                        <DialogDescription>
                                            Upload your resume to see how well you match this job description.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <ATSScanner />
                                </DialogContent>
                            </Dialog>

                        </CardContent>
                    </Card>

                </div>

            </div>
        </div>
    );
}
