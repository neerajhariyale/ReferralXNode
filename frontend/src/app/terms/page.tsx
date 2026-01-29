
import React from 'react';

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Terms of Service</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last Updated: January 29, 2026</p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="lead text-lg text-slate-600 dark:text-slate-300">
                        Welcome to ReferralXNode. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
                    </p>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-slate-700 dark:text-slate-300">
                            By using ReferralXNode, you agree to comply with and be bound by these terms. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">2. User Accounts</h2>
                        <p className="text-slate-700 dark:text-slate-300 mb-2">
                            To access certain features, you may be required to create an account. You are responsible for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-700 dark:text-slate-300">
                            <li>Maintaining the confidentiality of your account credentials.</li>
                            <li>All activities that occur under your account.</li>
                            <li>Providing accurate and up-to-date information.</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">3. Job Applications and Referrals</h2>
                        <p className="text-slate-700 dark:text-slate-300 mb-2">
                            ReferralXNode connects candidates with potential referrers. We do not guarantee:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-700 dark:text-slate-300">
                            <li>That a referral will lead to a job interview or offer.</li>
                            <li>The accuracy or validity of job postings provided by third parties.</li>
                        </ul>
                        <p className="mt-2 text-slate-700 dark:text-slate-300">
                            Users agree to use the platform professionally and ethically. Spamming referrers or submitting false information is strictly prohibited.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">4. Prohibited Conduct</h2>
                        <p className="text-slate-700 dark:text-slate-300">
                            You agree not to engage in any of the following activities:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-700 dark:text-slate-300">
                            <li>Violating any applicable laws or regulations.</li>
                            <li>Infringing on the intellectual property rights of others.</li>
                            <li>Transmitting viruses, malware, or any other harmful code.</li>
                            <li>Attempting to interfere with the proper functioning of the site.</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">5. Limitation of Liability</h2>
                        <p className="text-slate-700 dark:text-slate-300">
                            ReferralXNode is provided "as is" without any warranties. We shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the service.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">6. Changes to Terms</h2>
                        <p className="text-slate-700 dark:text-slate-300">
                            We reserve the right to modify these terms at any time. Continued use of the platform after any such changes constitutes your acceptance of the new terms.
                        </p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">7. Contact Information</h2>
                        <p className="text-slate-700 dark:text-slate-300">
                            For any questions regarding these Terms of Service, please contact us at: <a href="mailto:legal@referralxnode.com" className="text-blue-600 hover:underline">legal@referralxnode.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
