// Backend API Types
export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string; // Rich text HTML
    salaryRange: string;
    postedAt: string; // ISO 8601 format
    sourceUrl: string;
    tags: string[];
    createdAt: string; // ISO 8601 format
}

export interface JobRequest {
    title: string;
    company: string;
    location: string;
    description: string; // Rich text HTML
    salaryRange: string;
    postedAt: string; // ISO 8601 format
    sourceUrl: string;
    tags: string[];
}

export interface PageResponse<T> {
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface JobFilters {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: 'ASC' | 'DESC';
    company?: string;
    location?: string;
    title?: string;
    tags?: string;
}

export interface ErrorResponse {
    status: number;
    message: string;
    timestamp: string;
    path: string;
}

export interface ValidationError {
    status: number;
    errors: Record<string, string>;
    timestamp: string;
    path: string;
}

// Legacy types for compatibility
export interface UserProfile {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    connectionDegree: '1st' | '2nd' | '3rd';
}

export interface AnalysisResult {
    matchScore: number;
    missingKeywords: string[];
}

// Referral Suggestions
export interface ReferralSuggestion {
    name: string;
    title: string;
    department: string;
    yearsAtCompany: number;
    linkedinUrl: string;
    summary: string;
    whyContact: string;
}

export interface ReferralSuggestionsResponse {
    company: string;
    jobTitle?: string;
    suggestions: ReferralSuggestion[];
    disclaimer: string;
}
