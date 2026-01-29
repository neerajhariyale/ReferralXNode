
import React from 'react';

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Privacy Policy</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last Updated: January 29, 2026</p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="lead text-lg text-slate-600 dark:text-slate-300">
                        At ReferralXNode, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our job referral platform.
                    </p>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">1. Information We Collect</h2>
                        <p>We collect information to provide better services to all our users. This includes:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-700 dark:text-slate-300">
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and professional details (resume, LinkedIn profile) when you apply for jobs or create a profile.</li>
                            <li><strong>Usage Data:</strong> Information about how you use our website, such as pages visited, time spent, and referral links clicked.</li>
                            <li><strong>Cookies:</strong> We use cookies to improve user experience and analyze website traffic.</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">2. How We Use Your Information</h2>
                        <p>We use the collected data for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-700 dark:text-slate-300">
                            <li>To facilitate job referrals and applications.</li>
                            <li>To connect candidates with referrers and employers.</li>
                            <li>To improve our platform's functionality and user experience.</li>
                            <li>To send important updates, such as job alerts and application status changes.</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">3. Data Sharing and Disclosure</h2>
                        <p>We do not sell your personal information. We may share your data in the following circumstances:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-700 dark:text-slate-300">
                            <li><strong>With Employers/Referrers:</strong> To process your job application and referral requests.</li>
                            <li><strong>Legal Compliance:</strong> If required by law or to protect the rights and safety of ReferralXNode and its users.</li>
                            <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our platform (e.g., hosting, analytics).</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">4. Data Security</h2>
                        <p className="text-slate-700 dark:text-slate-300">
                            We implement robust security measures to protect your data from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">5. Your Rights</h2>
                        <p className="text-slate-700 dark:text-slate-300">
                            You have the right to access, correct, or delete your personal information. You can manage your profile settings or contact us directly to exercise these rights.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">6. Contact Us</h2>
                        <p className="text-slate-700 dark:text-slate-300">
                            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@referralxnode.com" className="text-blue-600 hover:underline">support@referralxnode.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
