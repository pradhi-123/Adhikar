import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { laws } from "@/lib/data/laws";
import { schemes } from "@/lib/data/schemes";

export async function POST(req: Request) {
    let situation = '';
    let language = 'English';

    try {
        const body = await req.json();
        situation = body.situation;
        language = body.language || 'English';
    } catch (e) {
        return NextResponse.json({ error: "Invalid Request: Body must be JSON" }, { status: 400 });
    }

    try {
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();
        if (!apiKey) {
            console.error("CRITICAL: GOOGLE_GEMINI_API_KEY is missing.");
            return NextResponse.json({
                aiExplanation: "DEPLOYMENT ERROR: The 'GOOGLE_GEMINI_API_KEY' is missing in your Vercel/Netlify settings. Please inspect the 'Deployment Guide' artifact for instructions.",
                relevantLaws: [],
                relevantSchemes: []
            }, { status: 500 });
        }

        // Use Gemini 2.5 Flash for high intelligence and speed
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Create a mini-index of laws for the AI context (optimizing token usage)
        const lawIndex = laws.map(l => `ID: ${l.id} | Category: ${l.category} | Title: ${l.title.en} | Desc: ${l.description.en.substring(0, 150)}`).join('\n');
        const schemeIndex = schemes.map(s => `ID: ${s.id} | Category: ${s.category} | Title: ${s.title.en} | Desc: ${s.description.en.substring(0, 150)}`).join('\n');

        const systemPrompt = `
            You are a Senior Legal Advisor for Indian Citizens.
            Your task is to analyze a user's situation and identify the MOST relevant Indian Laws and Government Schemes from the provided list.
            
            Available Laws:
            ${lawIndex}

            Available Schemes:
            ${schemeIndex}

            User Situation: "${situation}"
            User Language: ${language}

            CRITICAL RULES:
            1. ONLY select laws that are DIRECTLY relevant to the specific problem.
            2. Do NOT select "Constitution of India" unless it is a violation of Fundamental Rights by the State/Police. For private disputes (theft, fraud, family), choose specific acts (Consumer, BNS, etc.).
            3. Do NOT select "Women's Safety" laws for property/theft issues unless a woman is the victim.
            4. Return ONLY a valid JSON object. No markdown.
            
            Output JSON Format:
            {
                "lawIds": ["exact_id_from_list_1"],
                "schemeIds": ["exact_id_from_list"],
                "explanation": "A short, empathetic explanation of why these laws apply, in the user's language ("${language}").",
                "nextSteps": ["Step 1", "Step 2"]
            }
        `;

        const result = await model.generateContent(systemPrompt);
        const response = result.response;
        let text = response.text();

        console.log("AI Analysis Response:", text);

        // Clean JSON
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiData = JSON.parse(text);

        // Hydrate the response with full objects based on AI's selected IDs
        const relevantLaws = laws
            .filter(l => aiData.lawIds?.includes(l.id))
            .map(l => ({
                ...l,
                aiReason: aiData.explanation // Sharing the main explanation for now, or could ask for per-law logic
            }));

        const relevantSchemes = schemes
            .filter(s => aiData.schemeIds?.includes(s.id))
            .map(s => ({
                ...s,
                aiReason: "Recommended based on your situation."
            }));

        return NextResponse.json({
            relevantLaws,
            relevantSchemes,
            aiExplanation: aiData.explanation,
            nextSteps: aiData.nextSteps
        });

    } catch (error: any) {
        console.error("AI Analysis Error - Full Details:", error);

        let errorMsg = "We are currently experiencing high traffic";

        // Check for specific API Key errors to help the user (but do NOT block them)
        if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('403')) {
            errorMsg = "Offline Mode: Using local legal database (API Key Invalid)";
        }

        // FALLBACK TO SIMPLE KEYWORD MATCHING
        // Safe to use 'situation' here because we parsed it at the top
        const query = (situation || "").toLowerCase();
        const firstWord = query.split(' ')[0] || "general";

        const fallbackLaws = laws.filter(l =>
            (l.title.en + l.description.en).toLowerCase().includes(firstWord)
        ).slice(0, 2);

        return NextResponse.json({
            relevantLaws: fallbackLaws,
            relevantSchemes: [],
            aiExplanation: `${errorMsg}. Showing you some laws that might be relevant based on keywords. (Debug: ${error.message})`,
        });
    }
}
