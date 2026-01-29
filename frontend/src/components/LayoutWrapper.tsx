
"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Check if the current path is part of the admin portal
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Navbar />}
            <main className={`min-h-screen transition-colors duration-300 ${!isAdmin ? 'bg-zinc-50/50 dark:bg-zinc-950' : ''}`}>
                {children}
            </main>
            {!isAdmin && <Footer />}
        </>
    );
}
