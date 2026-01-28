'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScanSearch, CheckCircle2 } from 'lucide-react';

export function ATSScanner() {
    const [status, setStatus] = useState<'upload' | 'analyzing' | 'result'>('upload');

    const startAnalysis = () => {
        setStatus('analyzing');
        setTimeout(() => {
            setStatus('result');
        }, 2000);
    };

    return (
        <div className="space-y-4">
            {status === 'upload' && (
                <div
                    className="border-2 border-dashed border-slate-300 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={startAnalysis}
                >
                    <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <ScanSearch className="h-6 w-6 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Upload your Resume</h3>
                    <p className="text-sm text-slate-500 mt-1">Drag and drop or click to upload PDF</p>
                    <Button variant="outline" className="mt-4">Select File</Button>
                </div>
            )}

            {status === 'analyzing' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                    <p className="text-slate-600 font-medium animate-pulse">Analyzing Keywords...</p>
                </div>
            )}

            {status === 'result' && (
                <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-500 mb-2">
                            <span className="text-3xl font-bold text-green-700">85%</span>
                        </div>
                        <p className="font-semibold text-slate-900">Great Match!</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <h4 className="font-medium text-slate-900">Missing Keywords</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-100">
                                <CheckCircle2 className="h-4 w-4 text-red-500" />
                                <span className="text-sm text-slate-700">Next.js 14 Server Actions</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-100">
                                <CheckCircle2 className="h-4 w-4 text-red-500" />
                                <span className="text-sm text-slate-700">System Design</span>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full bg-slate-900">Optimize Resume</Button>
                </div>
            )}
        </div>
    );
}
