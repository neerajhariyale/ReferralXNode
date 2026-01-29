import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-950 text-slate-600 dark:text-slate-400 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-slate-900 dark:bg-slate-50 rounded-lg flex items-center justify-center transition-colors">
                                <span className="text-white dark:text-slate-900 font-bold">R</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 transition-colors">
                                Referral<span className="text-shimmer">X</span>Node
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Connecting talented professionals with hiring managers through the power of referrals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-slate-900 dark:text-slate-100 font-semibold mb-4 transition-colors">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Browse Jobs</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resume Scanner</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Get Referred</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-slate-900 dark:text-slate-100 font-semibold mb-4 transition-colors">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careeer Tips</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">ATS Guide</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h3 className="text-slate-900 dark:text-slate-100 font-semibold mb-4 transition-colors">Connect</h3>
                        <div className="flex gap-4 mb-6">
                            <Link href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Linkedin className="h-5 w-5" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Instagram className="h-5 w-5" /></Link>
                        </div>
                        <div className="space-y-2 text-sm">
                            <Link href="/privacy" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 text-center text-sm text-slate-500 dark:text-slate-500 transition-colors">
                    &copy; {new Date().getFullYear()} ReferralXNode. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
