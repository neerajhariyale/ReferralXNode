
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Linkedin, Copy, Check, MessageSquare, User, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
// Actually I don't see sonner installed in package.json, so I'll just use a simple state for "Copied!".

interface Employee {
    name: string;
    role: string;
    profileUrl: string;
}

interface AIInsightsProps {
    company: string;
    jobTitle: string;
    location: string;
}

export function AIInsights({ company, jobTitle, location }: AIInsightsProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(false);

    const [message, setMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [copied, setCopied] = useState(false);

    // Fetch employees on mount
    useEffect(() => {
        const fetchEmployees = async () => {
            setLoadingEmployees(true);
            try {
                // Use the new referral-suggestions API
                const res = await fetch('/api/referral-suggestions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        company,
                        jobTitle
                    })
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch referral suggestions');
                }

                const data = await res.json();

                if (data.suggestions && Array.isArray(data.suggestions)) {
                    // Transform the suggestions to match the Employee interface
                    const transformedEmployees = data.suggestions.map((suggestion: any) => ({
                        name: suggestion.name,
                        role: `${suggestion.title} • ${suggestion.department}`,
                        profileUrl: suggestion.linkedinUrl
                    }));
                    setEmployees(transformedEmployees);
                }
            } catch (error) {
                console.error("Failed to fetch referral suggestions", error);
                // Set empty array on error
                setEmployees([]);
            } finally {
                setLoadingEmployees(false);
            }
        };

        if (company) {
            fetchEmployees();
        }
    }, [company, jobTitle]);

    const generateMessage = async (employeeName?: string, employeeRole?: string) => {
        setLoadingMessage(true);
        setMessage(""); // Clear previous
        try {
            const res = await fetch('/api/ai-insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'generate_message',
                    company,
                    jobTitle,
                    location,
                    employeeName: employeeName || "Hiring Manager",
                    employeeRole: employeeRole || "Recruiter"
                })
            });
            const data = await res.json();
            if (data.message) {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Failed to generate message", error);
        } finally {
            setLoadingMessage(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Employee Finder Card */}
            <Card className="border-indigo-100 bg-indigo-50/30 overflow-hidden">
                <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 pb-3">
                    <CardTitle className="flex items-center gap-2 text-indigo-900 text-lg">
                        <Sparkles className="h-5 w-5 text-indigo-600 fill-indigo-100" />
                        AI Insider Insights
                    </CardTitle>
                    <CardDescription className="text-indigo-700/80">
                        Employees at {company} who might refer you
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    {loadingEmployees ? (
                        <div className="flex flex-col items-center justify-center py-6 text-slate-500">
                            <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-2" />
                            <p className="text-xs">Analyzing company structure...</p>
                        </div>
                    ) : employees.length > 0 ? (
                        <div className="space-y-3">
                            {employees.map((emp, i) => (
                                <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-indigo-50 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                                        <User className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-slate-900 truncate">{emp.name}</p>
                                            <a href={emp.profileUrl} target="_blank" rel="noopener noreferrer">
                                                <Linkedin className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                                            </a>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate mb-2">{emp.role}</p>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-7 text-xs w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                            onClick={() => generateMessage(emp.name, emp.role)}
                                        >
                                            Draft Message
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 italic text-center py-4">No public profiles found via AI search.</p>
                    )}
                </CardContent>
            </Card>

            {/* Referral Message Generator Card */}
            <Card className="border-emerald-100 bg-emerald-50/30">
                <CardHeader className="pb-3 border-b border-emerald-100 bg-emerald-50/50">
                    <CardTitle className="text-lg flex items-center gap-2 text-emerald-900">
                        <MessageSquare className="h-5 w-5 text-emerald-600" />
                        Referral Message Generator
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    {!message && !loadingMessage && (
                        <div className="text-center py-4 space-y-3">
                            <p className="text-sm text-slate-600">
                                Click "Draft Message" on a profile above, or generate a general one below.
                            </p>
                            <Button
                                onClick={() => generateMessage()}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
                            >
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate General Message
                            </Button>
                        </div>
                    )}

                    {loadingMessage && (
                        <div className="flex items-center justify-center py-8 text-emerald-600">
                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                            <span className="text-sm font-medium">Crafting the perfect message...</span>
                        </div>
                    )}

                    {message && !loadingMessage && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                            <div className="relative">
                                <Textarea
                                    readOnly
                                    value={message}
                                    className="min-h-[200px] bg-white border-emerald-200 text-slate-700 text-sm p-4 resize-none focus-visible:ring-emerald-500"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-2 right-2 h-8 w-8 text-emerald-600 hover:bg-emerald-50"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                onClick={() => setMessage("")}
                            >
                                Clear / Generate New
                            </Button>
                            <p className="text-[10px] text-center text-slate-400">
                                *Copy this code and paste it into LinkedIn DM
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
