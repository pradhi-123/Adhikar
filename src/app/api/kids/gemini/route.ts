import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        if (!apiKey) {
            console.warn("Kids API: Key Missing - using fallback.");
            throw new Error("API_KEY_MISSING");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const { action, payload } = await req.json();
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 1. Legal Advice
        if (action === 'advice') {
            const { issue, lang } = payload;
            const systemPrompt = `
                You are "Justice Bot", a friendly and supportive legal assistant for Indian juveniles (ages 10-17).
                Your goal is to explain legal rights and steps in a way a child can understand.
                
                CRITICAL: You must return ONLY a valid valid JSON object. Do not include any markdown formatting, backticks, or extra text.
                
                Input: User Issue: "${issue}"
                Tone: Calm, supportive, empowering, non-graphic.
                Language: ${lang === 'hi' ? 'Hindi' : lang === 'ta' ? 'Tamil' : 'English'}.
                
                Output JSON Format:
                {
                  "whatIsHappening": "Simple explanation of the situation",
                  "yourRight": "The specific Indian law or right that protects them (e.g., POCSO, JJ Act)",
                  "whatYouCanDo": ["Actionable step 1", "Actionable step 2"],
                  "needHelp": ["1098 (Childline)", "112 (Emergency)"]
                }
            `;

            const result = await model.generateContent(systemPrompt);
            const response = result.response;
            let text = response.text();

            console.log("Raw AI Response (Advice):", text); // Debug log

            // Robust JSON Cleanup
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            try {
                return NextResponse.json(JSON.parse(text));
            } catch (e) {
                console.error("JSON Parse Failed:", text);
                throw e;
            }
        }

        // 2. Adventure Generation
        if (action === 'adventure') {
            const { scenarioTitle, category, history, lang } = payload;

            const systemPrompt = `
                You are a Scenario Designer for "Adhikar", a legal app for Indian kids (10-17).
                Task: Generate the NEXT round of an interactive adventure.
                Theme: ${scenarioTitle} (${category}).
                History: ${history.join(" | ")}.
                
                Rules: 
                1. No repeats. 2. Logical next step. 3. 3 Options (Best 10pts, Good 5pts, Bad 0pts). 4. Feedback & Explanation (Indian Laws). 5. Tone: Educational. 6. Lang: ${lang}.
                
                CRITICAL: You must return ONLY a valid valid JSON object. Do not include any markdown formatting.
                
                Output JSON Format: 
                { "id": ${Date.now()}, "text": "Scenario description", "options": [{ "text": "Option A", "feedback": "Outcome...", "points": 10, "explanation": "Why this is legally correct" }] }
            `;

            const result = await model.generateContent(systemPrompt);
            const response = result.response;
            let text = response.text();

            console.log("Raw AI Response (Adventure):", text); // Debug log

            // Cleanup JSON
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            try {
                return NextResponse.json(JSON.parse(text));
            } catch (e) {
                console.error("JSON Parse Failed (Adventure):", text);
                throw e;
            }
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error: any) {
        console.error("Kids API Logic Error - Details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        // Return Mock/Fallback if AI fails
        // Return Mock/Fallback if AI fails
        const isKeyError = error.message?.includes("API_KEY");
        return NextResponse.json({
            whatIsHappening: isKeyError ? "I'm working in Offline Mode right now." : "I'm having a little trouble connecting to my books.",
            yourRight: "Every child has the right to be heard and protected.",
            whatYouCanDo: ["Talk to a trusted adult.", "Call Childline at 1098."],
            needHelp: ["1098", "112"]
        });
    }
}
