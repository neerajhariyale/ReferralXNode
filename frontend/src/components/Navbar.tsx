import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, FileText, Briefcase } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-slate-900 dark:bg-slate-50 rounded-lg flex items-center justify-center transition-colors">
                        <span className="text-white dark:text-slate-900 font-bold">R</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 transition-colors">
                        Referral<span className="text-shimmer">X</span>Node
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors flex items-center gap-2"
                    >
                        <Briefcase className="h-4 w-4" />
                        Jobs
                    </Link>
                    <Link
                        href="/resume-scanner"
                        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors flex items-center gap-2"
                    >
                        <FileText className="h-4 w-4" />
                        Resume Scanner
                    </Link>
                    <Link
                        href="/alerts"
                        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors flex items-center gap-2"
                    >
                        <Bell className="h-4 w-4" />
                        Alerts
                    </Link>
                </div>

                {/* User Actions */}
                {/* User Actions */}
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button variant="ghost" size="sm" asChild className="font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hidden sm:inline-flex cursor-pointer">
                        <Link href="/signin">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild className="bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-semibold transition-colors cursor-pointer">
                        <Link href="/post-job">Post a Job</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
