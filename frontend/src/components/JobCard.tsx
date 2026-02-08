import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Building2, Timer, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo, getCompanyLogo, isRecentJob } from "@/lib/format";

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    const isNew = isRecentJob(job.postedAt);
    const logo = getCompanyLogo(job.company);

    return (
        <Card className="group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-white/10 dark:hover:border-blue-500/50 overflow-hidden backdrop-blur-sm rounded-2xl h-full flex flex-col">

            {/* Continuous Shine Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/5 dark:via-blue-400/5 to-transparent -skew-x-12 -translate-x-[150%] animate-[shimmer_4s_infinite]" />
            </div>

            {/* Badge */}
            {isNew && (
                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-blue-600 dark:bg-blue-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-lg shadow-blue-500/20 border border-blue-400 dark:border-blue-400 animate-pulse">
                        New
                    </div>
                </div>
            )}

            <div className="relative z-10 p-5 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-5">
                    <Avatar className="h-14 w-14 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 shadow-sm p-2 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <AvatarImage src={logo} alt={job.company} className="rounded-lg object-contain" />
                        <AvatarFallback className="rounded-lg font-bold text-slate-500 dark:text-slate-400 bg-transparent text-lg">{job.company.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate pr-8">
                            {job.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center gap-1.5 mt-0.5">
                            <Building2 className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                            {job.company}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 mb-6 bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                        <span className="truncate max-w-[80px] sm:max-w-none">{job.location}</span>
                    </div>
                    <div className="h-4 w-px bg-slate-200 dark:bg-zinc-700 mx-auto"></div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                        {job.salaryRange}
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white dark:bg-zinc-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 group-hover:border-blue-200 dark:group-hover:border-blue-800/50 transition-colors font-medium text-xs py-1 px-2.5 rounded-lg shadow-sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                            <Timer className="h-3.5 w-3.5" />
                            {timeAgo(job.postedAt)}
                        </div>

                        <Button asChild size="sm" className="rounded-lg bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-zinc-900 shadow-md transition-all group-hover:translate-x-1 h-8 px-4">
                            <Link href={`/jobs/${job.id}`} className="flex items-center gap-2 font-bold text-xs">
                                Apply <ArrowRight className="h-3 w-3" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
