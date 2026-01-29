
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Briefcase,
    FilePlus,
    LogOut,
    Menu,
    X,
    User,
    Bell,
    Settings
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Default open on desktop, but we handle mobile visibility via CSS classes mostly
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Job Postings",
            href: "/admin/dashboard/jobs",
            icon: Briefcase,
        },
        {
            title: "Post New Job",
            href: "/admin/dashboard/post",
            icon: FilePlus,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative">

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out flex flex-col 
                ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"} 
                `}
            >
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 px-4">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-slate-900 dark:bg-slate-50 rounded-lg flex items-center justify-center transition-colors">
                                <span className="text-white dark:text-slate-900 font-bold">R</span>
                            </div>
                            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-50">
                                Referral<span className="text-shimmer">X</span>Node
                            </span>
                        </div>
                    ) : (
                        <div className="h-10 w-10 bg-slate-900 dark:bg-slate-50 rounded-lg flex items-center justify-center transition-colors">
                            <span className="text-white dark:text-slate-900 font-bold text-xl">R</span>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative
                                ${isActive
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-100 dark:shadow-blue-900/20"
                                        : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10"
                                    }`}
                                onClick={() => {
                                    // Close sidebar on mobile when link is clicked
                                    if (window.innerWidth < 768) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                            >
                                <item.icon className={`h-5 w-5 ${!isSidebarOpen && "mx-auto"}`} />
                                {isSidebarOpen && <span className="font-medium">{item.title}</span>}

                                {/* Tooltip for collapsed mode */}
                                {!isSidebarOpen && (
                                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                        {item.title}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <Link
                        href="/"
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors
                        ${!isSidebarOpen && "justify-center"}`}
                    >
                        <LogOut className="h-5 w-5" />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 
                ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}
            >
                {/* Top Header */}
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-6 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 hidden md:block">
                            Admin Portal
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-blue-600">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="pl-2 pr-4 py-2 h-auto flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-800">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start text-xs hidden sm:flex">
                                        <span className="font-bold text-slate-700 dark:text-slate-200">Admin User</span>
                                        <span className="text-slate-500 dark:text-slate-400">Super Admin</span>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" asChild>
                                    <Link href="/admin/dashboard/profile" className="flex items-center w-full">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                    <Link href="/" className="flex items-center w-full">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
