import { Scheme } from "@/types";

export const schemes: Scheme[] = [
    {
        id: "pmay-urban",
        title: {
            en: "Pradhan Mantri Awas Yojana (Urban)",
            hi: "प्रधानमंत्री आवास योजना (शहरी)",
            ta: "பிரதமர் வீட்டு வசதித் திட்டம் (நகர்ப்புறம்)"
        },
        category: "Housing",
        ministry: {
            en: "Ministry of Housing and Urban Affairs",
            hi: "आवास और शहरी मामलों के मंत्रालय",
            ta: "வீட்டுவசதி மற்றும் நகர்ப்புற விவகாரங்கள் அமைச்சகம்"
        },
        description: {
            en: "Affordable housing for all eligible urban households through financial assistance and interest subsidies.",
            hi: "वित्तीय सहायता और ब्याज सब्सिडी के माध्यम से सभी पात्र शहरी परिवारों के लिए किफायती आवास।",
            ta: "நிதி உதவி மற்றும் வட்டி மானியங்கள் மூலம் தகுதியுள்ள அனைத்து நகர்ப்புற குடும்பங்களுக்கும் மலிவு விலை வீடுகள்."
        },
        benefits: {
            en: [
                "Financial assistance for house construction",
                "Interest subsidy on home loans",
                "Preference to women and senior citizens"
            ],
            hi: [
                "घर निर्माण के लिए वित्तीय सहायता",
                "होम लोन पर ब्याज सब्सिडी",
                "महिलाओं और वरिष्ठ नागरिकों को प्राथमिकता"
            ],
            ta: [
                "வீடு கட்டுவதற்கு நிதி உதவி",
                "வீட்டுக் கடன்களுக்கான வட்டி மானியம்",
                "பெண்கள் மற்றும் முதியவர்களுக்கு முன்னுரிமை"
            ]
        },
        eligibility: {
            incomeLimit: 1800000,
            occupation: ["EWS", "LIG", "MIG"]
        },
        portalLink: "https://pmaymis.gov.in/",
        documentsResult: {
            en: ["Aadhaar Card", "Income Certificate", "Identity Proof", "Address Proof"],
            hi: ["आधार कार्ड", "आय प्रमाण पत्र", "पहचान प्रमाण", "पते का प्रमाण"],
            ta: ["ஆதார் அட்டை", "வருமானச் சான்றிதழ்", "அடையாளச் சான்று", "முகவரிச் சான்று"]
        }
    },
    {
        id: "ab-pmjay",
        title: {
            en: "Ayushman Bharat (PM-JAY)",
            hi: "आयुष्मान भारत (पीएम-जय)",
            ta: "ஆயுஷ்மான் பாரத் (PM-JAY)"
        },
        category: "Health",
        ministry: {
            en: "Ministry of Health and Family Welfare",
            hi: "स्वास्थ्य और परिवार कल्याण मंत्रालय",
            ta: "சுகாதார மற்றும் குடும்ப நல அமைச்சகம்"
        },
        description: {
            en: "Worlds largest health insurance scheme providing ₹5 lakh coverage per family per year for secondary and tertiary care.",
            hi: "माध्यमिक और तृतीयक देखभाल के लिए प्रति वर्ष प्रति परिवार ₹5 लाख का कवरेज प्रदान करने वाली दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना।",
            ta: "இரண்டாம் நிலை மற்றும் மூன்றாம் நிலை சிகிச்சைக்காக வருடத்திற்கு ஒரு குடும்பத்திற்கு ₹5 லட்சம் காப்பீடு வழங்கும் உலகின் மிகப்பெரிய சுகாதார காப்பீட்டுத் திட்டம்."
        },
        benefits: {
            en: [
                "₹5 Lakh health coverage per family per year",
                "Cashless treatment at over 27,000 hospitals",
                "Covers pre-existing conditions from day one"
            ],
            hi: [
                "प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवरेज",
                "27,000 से अधिक अस्पतालों में कैशलेस उपचार",
                "पहले दिन से पहले से मौजूद बीमारियों को कवर करता है"
            ],
            ta: [
                "வருடத்திற்கு ஒரு குடும்பத்திற்கு 5லட்சம் சுகாதார காப்பீடு",
                "27,000 க்கும் மேற்பட்ட மருத்துவமனைகளில் பணமில்லா சிகிச்சை",
                "முதல் நாளிலிருந்தே ஏற்கனவே உள்ள நோய்களை உள்ளடக்கியது"
            ]
        },
        eligibility: {
            incomeLimit: 120000,
            occupation: ["Rural Poor", "Urban Workers", "SC/ST", "Senior Citizens"]
        },
        portalLink: "https://pmjay.gov.in",
        documentsResult: {
            en: ["Aadhaar Card", "Ration Card", "PM-JAY Letter/Card"],
            hi: ["आधार कार्ड", "राशन कार्ड", "पीएम-जय पत्र/कार्ड"],
            ta: ["ஆதார் அட்டை", "ரேஷன் கார்டு", "PM-JAY கடிதம்/அட்டை"]
        }
    },
    {
        id: "pm-kisan",
        title: {
            en: "PM-KISAN Samman Nidhi",
            hi: "पीएम-किसान सम्मान निधि",
            ta: "பிஎம்-கிசான் சம்மான் நிதி"
        },
        category: "Farmers",
        ministry: {
            en: "Ministry of Agriculture and Farmers Welfare",
            hi: "कृषि और किसान कल्याण मंत्रालय",
            ta: "வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம்"
        },
        description: {
            en: "Direct income support to landholding farmer families to supplement their financial needs.",
            hi: "अपनी वित्तीय जरूरतों को पूरा करने के लिए भूमिधारक किसान परिवारों को प्रत्यक्ष आय सहायता।",
            ta: "நிலம் வைத்திருக்கும் விவசாய குடும்பங்களின் நிதித் தேவைகளைப் பூர்த்தி செய்ய நேரடி வருமான ஆதரவு."
        },
        benefits: {
            en: [
                "₹6,000 per year in three installments",
                "Direct Benefit Transfer (DBT) to bank account",
                "No middleman intervention"
            ],
            hi: [
                "तीन किस्तों में ₹6,000 प्रति वर्ष",
                "बैंक खाते में प्रत्यक्ष लाभ अंतरण (DBT)",
                "कोई बिचौलिया हस्तक्षेप नहीं"
            ],
            ta: [
                "மூன்று தவணைகளில் ஆண்டுக்கு ₹6,000",
                "வங்கி கணக்கிற்கு நேரடி பலன் பரிமாற்றம் (DBT)",
                "இடைத்தரகர் தலையீடு இல்லை"
            ]
        },
        eligibility: {
            occupation: ["Farmer"]
        },
        portalLink: "https://pmkisan.gov.in/",
        documentsResult: {
            en: ["Aadhaar Card", "Land Ownership Proof", "Bank Account Details"],
            hi: ["आधार कार्ड", "भूमि स्वामित्व प्रमाण", "बैंक खाते का विवरण"],
            ta: ["ஆதார் அட்டை", "நில உரிமை சான்று", "வங்கி கணக்கு விவரங்கள்"]
        }
    },
    {
        id: "sukanya-samriddhi",
        title: {
            en: "Sukanya Samriddhi Yojana",
            hi: "सुकन्या समृद्धि योजना",
            ta: "சுகன்யா சம்ரிதி யோஜனா"
        },
        category: "Women",
        ministry: {
            en: "Ministry of Finance",
            hi: "वित्त मंत्रालय",
            ta: "நிதி அமைச்சகம்"
        },
        description: {
            en: "A small savings scheme for the girl child to secure her higher education and marriage expenses.",
            hi: "बालिकाओं के लिए उनकी उच्च शिक्षा और विवाह खर्च को सुरक्षित करने के लिए एक छोटी बचत योजना।",
            ta: "பெண் குழந்தைகளின் உயர்கல்வி மற்றும் திருமணச் செலவுகளைப் பாதுகாப்பதற்கான சிறு சேமிப்புத் திட்டம்."
        },
        benefits: {
            en: [
                "Highest interest rate among small savings schemes (8.2%)",
                "Triple Tax Exempt (80C benefit, interest, and maturity)",
                "Partial withdrawal after age 18 for education"
            ],
            hi: [
                "छोटी बचत योजनाओं में उच्चतम ब्याज दर (8.2%)",
                "ट्रिपल टैक्स छूट (80C लाभ, ब्याज और परिपक्वता)",
                "शिक्षा के लिए 18 वर्ष की आयु के बाद आंशिक निकासी"
            ],
            ta: [
                "சிறு சேமிப்புத் திட்டங்களில் அதிக வட்டி விகிதம் (8.2%)",
                "முழுமையான வரி விலக்கு (80C பலன், வட்டி மற்றும் முதிர்வு)",
                "கல்விக்காக 18 வயதுக்கு பின் பகுதி திரும்பப் பெறுதல்"
            ]
        },
        eligibility: {
            gender: "Female",
            maxAge: 10
        },
        portalLink: "https://www.nsiindia.gov.in/",
        documentsResult: {
            en: ["Birth Certificate of Girl Child", "Identity Proof of Parent", "Address Proof"],
            hi: ["बालिका का जन्म प्रमाण पत्र", "माता-पिता का पहचान प्रमाण", "पते का प्रमाण"],
            ta: ["பெண் குழந்தையின் பிறப்புச் சான்றிதழ்", "பெற்றோரின் அடையாளச் சான்று", "முகவரிச் சான்று"]
        }
    },
    {
        id: "pm-vidyalaxmi",
        title: {
            en: "PM Vidyalaxmi",
            hi: "पीएम विद्यालक्ष्मी",
            ta: "பிஎம் வித்யாலக்ஷ்மி"
        },
        category: "Education",
        ministry: {
            en: "Ministry of Education",
            hi: "शिक्षा मंत्रालय",
            ta: "கல்வி அமைச்சகம்"
        },
        description: {
            en: "Education loan support for students to pursue higher education in top-quality institutions.",
            hi: "उच्च गुणवत्ता वाले संस्थानों में उच्च शिक्षा प्राप्त करने के लिए छात्रों के लिए शिक्षा ऋण सहायता।",
            ta: "உயர்தர கல்வி நிறுவனங்களில் உயர்கல்வியைத் தொடர மாணவர்களுக்கான கல்விக்கடன் உதவி."
        },
        benefits: {
            en: [
                "Collateral-free and guarantor-free loans up to ₹10 lakh",
                "75% credit guarantee by Govt of India",
                "Interest subvention of 3% for students with family income < ₹8L"
            ],
            hi: [
                "₹10 लाख तक के संपार्श्विक-मुक्त और गारंटर-मुक्त ऋण",
                "भारत सरकार द्वारा 75% क्रेडिट गारंटी",
                "जिन छात्रों की पारिवारिक आय < ₹8L है, उनके लिए 3% की ब्याज सब्सिडी"
            ],
            ta: [
                "₹10 லட்சம் வரை பிணையம் மற்றும் ஜாமீன் இல்லாத கடன்கள்",
                "இந்திய அரசால் 75% கடன் உத்தரவாதம்",
                "குடும்ப வருமானம் < ₹8L உள்ள மாணவர்களுக்கு 3% வட்டி மானியம்"
            ]
        },
        eligibility: {
            incomeLimit: 800000,
            occupation: ["Student"]
        },
        portalLink: "https://www.vidyalakshmi.co.in/",
        documentsResult: {
            en: ["Admission Letter", "Fee Structure", "Parental Income Proof", "Academic Records"],
            hi: ["प्रवेश पत्र", "शुल्क संरचना", "माता-पिता की आय का प्रमाण", "शैक्षणिक रिकॉर्ड"],
            ta: ["சேர்க்கை கடிதம்", "கட்டண அமைப்பு", "பெற்றோரின் வருமானச் சான்று", "கல்வி சான்றிதழ்கள்"]
        }
    }
];
