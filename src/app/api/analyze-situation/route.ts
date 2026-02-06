import { NextResponse } from "next/server";
import { laws } from "@/lib/data/laws";
import { schemes } from "@/lib/data/schemes";

// --- MOCK LOGIC FOR SIMULATION MODE ---
// This acts as a fallback or primary engine when API keys are missing/failing.

export async function POST(req: Request) {
    try {
        const { situation, language } = await req.json();
        const query = situation.toLowerCase();

        // --- INTELLIGENT TOPIC MAPPING ---
        // Maps common words to specific Law IDs to improve relevance 
        const topicMap: Record<string, string[]> = {
            'consumer-2019': ['shop', 'buy', 'product', 'item', 'defective', 'bill', 'warranty', 'refund', 'service', 'fraud', 'cheat', 'price', 'mrp'],
            'mva-1988': ['car', 'bike', 'scooter', 'traffic', 'police', 'fine', 'challan', 'speed', 'accident', 'license', 'rto', 'drive', 'road'],
            'it-act-2000': ['online', 'internet', 'cyber', 'scam', 'hack', 'password', 'bank', 'upi', 'money', 'transfer', 'fake', 'profile', 'data'],
            'senior-2007': ['old', 'parent', 'father', 'mother', 'son', 'daughter', 'abandon', 'property', 'maintenance', 'care', 'age'],
            'bns-women': ['girl', 'woman', 'lady', 'wife', 'harass', 'stalk', 'touch', 'abuse', 'dowry', 'domestic', 'violence'],
            'rti-2005': ['government', 'official', 'office', 'delay', 'status', 'application', 'reply', 'fund', 'money', 'road', 'water'],
            'dv-act-2005': ['domestic', 'violence', 'husband', 'wife', 'beat', 'hit', 'torture', 'abuse', 'home', 'evict', 'maike', 'sasural'],
            'hsa-2005': ['property', 'land', 'ancestral', 'share', 'partition', 'heir', 'father', 'brother', 'sister', 'will', 'inheritance'],
            'dowry-act': ['dowry', 'marriage', 'cash', 'demand', 'gold', 'car', 'groom', 'bride', 'wedding', 'gift']
        };


        let boostedLawIds: string[] = [];

        // Check for topic matches
        Object.entries(topicMap).forEach(([lawId, keywords]) => {
            if (keywords.some(k => query.includes(k))) {
                boostedLawIds.push(lawId);
            }
        });

        // 1. Filter Laws with Boost Logic
        let matchedLaws = laws.filter(law => {
            // Priority 1: Direct Topic Match
            if (boostedLawIds.includes(law.id)) return true;

            // Priority 2: Text Search
            const searchText = (
                law.title.en + " " +
                law.description.en
            ).toLowerCase();

            return query.split(' ').some((word: string) =>
                word.length > 3 && searchText.includes(word)
            );
        }).sort((a, b) => {
            // Sort boosted items first
            const aBoost = boostedLawIds.includes(a.id) ? 1 : 0;
            const bBoost = boostedLawIds.includes(b.id) ? 1 : 0;
            return bBoost - aBoost;
        });


        // 2. Keyword Matching for SCHEMES
        let matchedSchemes = schemes.filter(scheme => {
            const searchText = (
                scheme.title.en + " " +
                scheme.description.en
            ).toLowerCase();


            return query.split(' ').some((word: string) =>
                word.length > 3 && searchText.includes(word)
            );
        });

        // Fallback Scheme
        if (matchedSchemes.length === 0) {
            // Just pick the first one as a generic fallback (usually NREGA or similar)
            if (schemes.length > 0) matchedSchemes.push(schemes[0]);
        }

        matchedSchemes = matchedSchemes.slice(0, 2);


        // 3. Hydrate Response
        const relevantLaws = matchedLaws.map(law => ({
            ...law,
            // Mock AI Reason
            aiReason: language === 'hi'
                ? "आपके विवरण के आधार पर, यह कानून सीधे आपकी स्थिति से संबंधित है।"
                : language === 'ta'
                    ? "உங்கள் விவரங்களின் அடிப்படையில், இந்த சட்டம் உங்கள் சூழ்நிலைக்கு நேரடியாக தொடர்புடையது."
                    : "Based on your description, this law is directly relevant to your rights."
        }));

        const relevantSchemes = matchedSchemes.map(scheme => ({
            ...scheme,
            aiReason: language === 'hi'
                ? "आप इस योजना के लिए पात्र हो सकते हैं।"
                : language === 'ta'
                    ? "நீங்கள் இந்த திட்டத்திற்கு தகுதி பெறலாம்."
                    : "You may be eligible for benefits under this government scheme."
        }));

        // Simulate Network Delay for "AI Feel"
        await new Promise(resolve => setTimeout(resolve, 1500));

        return NextResponse.json({
            relevantLaws,
            relevantSchemes
        });

    } catch (error) {
        console.error("Mock Analysis Error:", error);
        return NextResponse.json({ error: "Failed to analyze situation." }, { status: 500 });
    }
}
