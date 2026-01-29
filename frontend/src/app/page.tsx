'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { JobCard } from "@/components/JobCard";
import { mockJobs } from "@/lib/mock-data";
import { Search, Filter, Briefcase, Users, Code, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'it' | 'non-it'>('it');

  const filteredJobs = mockJobs.filter(job => {
    // If category is present, use it for filtering
    if (job.category) {
      const itCategories = ['Engineering', 'Design'];
      const isIT = itCategories.includes(job.category);
      return activeTab === 'it' ? isIT : !isIT;
    }

    // Fallback for efficient backward compatibility if category is missing
    const itTags = ['React', 'Java', 'AWS', 'DevOps', 'Figma', 'Python', 'Node.js', 'Engineering'];
    const isIT = job.tags.some(tag => itTags.some(itTag => tag.includes(itTag)));

    return activeTab === 'it' ? isIT : !isIT;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300 overflow-hidden">

        {/* Dark Mode Background Effects */}
        {/* Dark Mode Background Effects */}
        {/* Dark Mode Background Effects */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl pointer-events-none dark:opacity-40" />
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-30" />

        <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Zap className="h-3.5 w-3.5 fill-blue-700 dark:fill-blue-400" />
            <span>New jobs added every hour</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-6 max-w-4xl mx-auto leading-tight">
            Find your next role. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Get referred.</span> <br className="hidden md:block" /> Beat the ATS.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The only job board that helps you optimize your resume and find connection paths to hiring managers.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl mx-auto bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl p-2 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-blue-900/10 border border-slate-100 dark:border-white/10 transition-all group hover:border-blue-200 dark:hover:border-blue-500/30">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Job title, keywords, or company..."
                className="h-12 pl-10 text-base border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-zinc-700 hidden md:block"></div>
            <div className="relative flex-1 w-full md:w-auto">
              <Input
                placeholder="City, state, or remote"
                className="h-12 text-base border-0 shadow-none focus-visible:ring-0 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>
            <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold rounded-xl w-full md:w-auto shadow-lg shadow-blue-200 dark:shadow-blue-900/20 transition-all hover:scale-[1.02]">
              Search Jobs
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">Popular:</span>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 cursor-pointer text-slate-600 dark:text-slate-300 font-normal border dark:border-zinc-700">Remote Developer</Badge>
              <Badge variant="secondary" className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 cursor-pointer text-slate-600 dark:text-slate-300 font-normal border dark:border-zinc-700">Product Manager</Badge>
              <Badge variant="secondary" className="bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 cursor-pointer text-slate-600 dark:text-slate-300 font-normal border dark:border-zinc-700">Marketing Lead</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <button
              onClick={() => setActiveTab('it')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'it'
                ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800'
                }`}
            >
              <Code className="h-4 w-4" />
              IT & Engineering
            </button>
            <button
              onClick={() => setActiveTab('non-it')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'non-it'
                ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800'
                }`}
            >
              <Users className="h-4 w-4" />
              Marketing, Sales & Ops
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

          {/* Sidebar Filters */}
          <div className="hidden md:block sticky top-24 space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 text-lg">
                <Filter className="h-4 w-4" /> Filters
              </h3>

              <div className="space-y-8">
                {/* Location */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Location</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox id="remote" className="rounded-[4px] border-slate-300 dark:border-zinc-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900" />
                      <label htmlFor="remote" className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-none cursor-pointer select-none">Remote</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="onsite" className="rounded-[4px] border-slate-300 dark:border-zinc-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900" />
                      <label htmlFor="onsite" className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-none cursor-pointer select-none">On-site</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="hybrid" className="rounded-[4px] border-slate-300 dark:border-zinc-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900" />
                      <label htmlFor="hybrid" className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-none cursor-pointer select-none">Hybrid</label>
                    </div>
                  </div>
                </div>

                <Separator className="dark:bg-zinc-800" />

                {/* Job Type */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Job Type</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox id="fulltime" defaultChecked className="rounded-[4px] border-slate-300 dark:border-zinc-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900" />
                      <label htmlFor="fulltime" className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-none cursor-pointer select-none">Full-time</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="contract" className="rounded-[4px] border-slate-300 dark:border-zinc-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900" />
                      <label htmlFor="contract" className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-none cursor-pointer select-none">Contract</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="freelance" className="rounded-[4px] border-slate-300 dark:border-zinc-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900" />
                      <label htmlFor="freelance" className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-none cursor-pointer select-none">Freelance</label>
                    </div>
                  </div>
                </div>

                <Separator className="dark:bg-zinc-800" />

                {/* Salary Range */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Salary</h4>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded-md">$100k+</span>
                  </div>
                  <Slider defaultValue={[100]} max={300} step={10} className="py-2" />
                </div>

              </div>
            </div>
          </div>

          {/* Job Feed */}
          <div className="md:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                {activeTab === 'it' ? 'Latest Tech Roles' : 'Latest Business Roles'}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-50 dark:bg-zinc-800 px-3 py-1 rounded-full border border-slate-100 dark:border-zinc-700">
                  {filteredJobs.length} Jobs Found
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
                  <div className="h-16 w-16 bg-slate-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No jobs found</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">Try adjusting your filters or checking back later for new opportunities.</p>
                  <Button variant="outline" className="mt-6 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800" onClick={() => setActiveTab(activeTab === 'it' ? 'non-it' : 'it')}>
                    View {activeTab === 'it' ? 'Business' : 'Tech'} Jobs
                  </Button>
                </div>
              )}
            </div>

            {filteredJobs.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg" className="px-8 font-medium border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800">Load More Jobs</Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
