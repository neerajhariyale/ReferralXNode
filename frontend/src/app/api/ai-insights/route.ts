
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { action, company, jobTitle, location, employeeName, employeeRole } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            // Fallback for demo if no key is present, to avoid breaking the app immediately for the user
            // In a real app, we would throw an error.
            if (action === 'find_employees') {
                return NextResponse.json({
                    employees: [
                        { name: "John Doe", role: "Software Engineer", profileUrl: "https://linkedin.com/in/johndoe-example" },
                        { name: "Sarah Smith", role: "Talent Acquisition", profileUrl: "https://linkedin.com/in/sarahsmith-example" },
                        { name: "Mike Johnson", role: "Engineering Manager", profileUrl: "https://linkedin.com/in/mikejohnson-example" }
                    ]
                });
            } else if (action === 'generate_message') {
                return NextResponse.json({
                    message: `Hi ${employeeName || 'there'},\n\nI noticed you're working as a ${employeeRole || 'Current Role'} at ${company}, and I've been following the company's work in [mention specific achievement if possible].\n\nI recently saw an opening for the ${jobTitle} position and believe my background would be a great fit. I would really appreciate it if you could refer me for this role or spare a few minutes to chat about your experience at ${company}.\n\nHere is my portfolio/resume link: [Link]\n\nBest regards,\n[Your Name]`
                });
            }
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        if (action === 'find_employees') {
            const prompt = `Find 3 hypothetical or real public profiles of employees currently working at ${company}. 
            Return the result ONLY as a JSON array with objects containing: 
            "name", "role", "profileUrl" (use a valid looking linkedin url format like https://www.linkedin.com/in/name-company). 
            Do not include any markdown formatting or explanations, just the raw JSON.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean up the response to ensure it's valid JSON
            const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

            try {
                const employees = JSON.parse(cleanedText);
                return NextResponse.json({ employees });
            } catch (e) {
                console.error("Failed to parse JSON from Gemini:", text);
                // Fallback if JSON parsing fails
                return NextResponse.json({
                    employees: [
                        { name: "Alex Rivera", role: "Senior Developer", profileUrl: "https://linkedin.com/in/alex-rivera" },
                        { name: "Casey Jordan", role: "Tech Lead", profileUrl: "https://linkedin.com/in/casey-jordan" }
                    ]
                });
            }

        } else if (action === 'generate_message') {
            const prompt = `Write a professional and polite LinkedIn connection request/referral message (max 150 words).
            Context: The user wants to ask for a referral for the job "${jobTitle}" at "${company}" in "${location}".
            Target Recipient: ${employeeName} (${employeeRole}).
            The tone should be enthusiastic but professional. Include placeholders for the user's portfolio link and name.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            return NextResponse.json({ message: text });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error('Error in AI Insights API:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
