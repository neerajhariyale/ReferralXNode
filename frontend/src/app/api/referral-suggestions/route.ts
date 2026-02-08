import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { company, jobTitle } = await request.json();

        if (!company) {
            return NextResponse.json(
                { error: 'Company name is required' },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'Gemini API key not configured' },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `You are a professional networking assistant. Generate 3 realistic employee profiles who currently work at ${company}${jobTitle ? ` in roles related to ${jobTitle}` : ''}.

For each person, provide:
1. Full name (realistic, diverse names)
2. Current job title at ${company}
3. Department/Team
4. Years at company (between 1-8 years)
5. LinkedIn profile URL (format: https://linkedin.com/in/firstname-lastname)
6. Brief professional summary (2-3 sentences about their role and expertise)
7. Why they might be a good referral contact (1 sentence)

Important guidelines:
- These should be realistic-sounding profiles that could exist
- Ensure diversity in names, roles, and backgrounds
- Focus on roles that would be relevant for providing referrals
- Include a mix of seniority levels (senior, mid-level, lead)
- Make the profiles professional and credible

Format the response as a JSON array with this structure:
[
  {
    "name": "Full Name",
    "title": "Job Title",
    "department": "Department Name",
    "yearsAtCompany": number,
    "linkedinUrl": "https://linkedin.com/in/profile",
    "summary": "Professional summary...",
    "whyContact": "Reason to contact..."
  }
]

Return ONLY the JSON array, no additional text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from the response
        let jsonText = text.trim();

        // Remove markdown code blocks if present
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '');
        }

        const suggestions = JSON.parse(jsonText);

        return NextResponse.json({
            company,
            jobTitle,
            suggestions,
            disclaimer: 'These are AI-generated suggestions based on typical company structures. Please verify profiles on LinkedIn before reaching out.'
        });

    } catch (error) {
        console.error('Error generating referral suggestions:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate referral suggestions',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
