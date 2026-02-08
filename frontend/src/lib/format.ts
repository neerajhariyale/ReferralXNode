/**
 * Format ISO date string to relative time (e.g., "2 hours ago")
 */
export function timeAgo(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
}

/**
 * Format ISO date string to readable date
 */
export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

/**
 * Generate avatar/logo URL from company name
 */
export function getCompanyLogo(companyName: string): string {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(companyName)}`;
}

/**
 * Check if a job was posted recently (within 24 hours)
 */
export function isRecentJob(isoString: string): boolean {
    const date = new Date(isoString);
    const now = new Date();
    const hoursDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    return hoursDiff <= 24;
}
