'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction, Hammer, Wrench } from "lucide-react";
import Link from "next/link";

export default function WorkInProgress({ title = "Coming Soon" }: { title?: string }) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700" />

            <div className="relative z-10 text-center space-y-8 max-w-lg mx-auto">
                <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-full animate-ping opacity-75" />
                    <div className="relative bg-white dark:bg-zinc-900 rounded-full p-6 shadow-xl border border-blue-100 dark:border-blue-900 flex items-center justify-center h-full w-full">
                        <Construction className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-bounce" />
                    </div>
                    {/* Floating tools animations */}
                    <Hammer className="absolute -right-4 -top-2 h-6 w-6 text-slate-400 animate-[spin_3s_linear_infinite]" />
                    <Wrench className="absolute -left-4 -bottom-2 h-6 w-6 text-slate-400 animate-[bounce_2s_infinite] delay-150" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium animate-in fade-in slide-in-from-bottom-2 duration-1000">
                        Currently <span className="text-shimmer font-bold">In Progress</span>
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-zinc-800/50 border border-blue-100 dark:border-blue-900/30 text-xs font-semibold text-blue-600 dark:text-blue-400 animate-pulse mx-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Developer is working on it!
                    </div>

                    <p className="text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
                        We are crafting an amazing experience for you. This feature will be available shortly!
                    </p>
                </div>

                <div className="pt-4">
                    <Button asChild size="lg" className="rounded-full px-8 bg-slate-900 dark:bg-slate-50 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Return Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
