import { Law } from "@/types";

export const laws: Law[] = [
    // --- CONSTITUTION OF INDIA (Fundamental Rights) ---
    {
        id: "const-india",
        title: {
            en: "Constitution of India",
            hi: "भारत का संविधान",
            ta: "இந்திய அரசியலமைப்பு"
        },
        year: 1950,
        category: "Fundamental Rights",
        description: {
            en: "The supreme law of India, guaranteeing fundamental rights to all citizens.",
            hi: "भारत का सर्वोच्च कानून, जो सभी नागरिकों को मौलिक अधिकारों की गारंटी देता है।",
            ta: "இந்தியாவின் மிக உயரிய சட்டம், அனைத்து குடிமக்களுக்கும் அடிப்படை உரிமைகளை உறுதி செய்கிறது."
        },
        sections: [
            {
                id: "art-14",
                number: "14",
                text: {
                    en: "Equality before law",
                    hi: "विधि के समक्ष समानता",
                    ta: "சட்டத்தின் முன் அனைவரும் சமம்"
                },
                simplified: {
                    en: "The State shall not deny to any person equality before the law or the equal protection of the laws.",
                    hi: "राज्य किसी भी व्यक्ति को कानून के समक्ष समानता या कानूनों के समान संरक्षण से वंचित नहीं करेगा।",
                    ta: "அரசு எந்தவொரு நபருக்கும் சட்டத்தின் முன் சமத்துவத்தையோ அல்லது சட்டங்களின் சமமான பாதுகாப்பையோ மறுக்கக்கூடாது."
                },
                cases: {
                    en: ["Discrimination", "Unfair treatment by Govt"],
                    hi: ["भेदभाव", "सरकार द्वारा अनुचित व्यवहार"],
                    ta: ["பாகுபாடு", "அரசின் நியாயமற்ற நடவடிக்கை"]
                }
            },
            {
                id: "art-21",
                number: "21",
                text: {
                    en: "Protection of Life",
                    hi: "जीवन का संरक्षण",
                    ta: "வாழ்வுக்கான பாதுகாப்பு"
                },
                simplified: {
                    en: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
                    hi: "किसी भी व्यक्ति को कानून द्वारा स्थापित प्रक्रिया के अलावा उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा।",
                    ta: "சட்டத்தால் நிறுவப்பட்ட நடைமுறையின்படி தவிர எந்தவொரு நபரின் உயிரோ அல்லது தனிப்பட்ட சுதந்திரமோ பறிக்கப்படக்கூடாது."
                },
                cases: {
                    en: ["Right to privacy", "Illegal detention"],
                    hi: ["निजता का अधिकार", "अवैध हिरासत"],
                    ta: ["தனிநபர் ரகசிய காப்பு", "சட்டவிரோத காவலில் வைப்பு"]
                }
            }
        ],
        actionGuide: {
            en: [
                "Document any violation of your fundamental rights.",
                "File a Writ Petition in the High Court or Supreme Court."
            ],
            hi: [
                "अपने मौलिक अधिकारों के किसी भी उल्लंघन का दस्तावेजीकरण करें।",
                "उच्च न्यायालय या सर्वोच्च न्यायालय में रिट याचिका दायर करें।"
            ],
            ta: [
                "உங்கள் அடிப்படை உரிமைகள் மீறப்பட்டால் அதை ஆவணப்படுத்தவும்.",
                "உயர்நீதிமன்றம் அல்லது உச்சநீதிமன்றத்தில் ரிட் மனு தாக்கல் செய்யவும்."
            ]
        },
        authority: {
            name: {
                en: "National Human Rights Commission",
                hi: "राष्ट्रीय मानवाधिकार आयोग",
                ta: "தேசிய மனித உரிமைகள் ஆணையம்"
            },
            contact: "14433",
            email: "covdnhrc@nic.in"
        }
    },

    // --- RIGHT TO INFORMATION (RTI) ACT ---
    {
        id: "rti-2005",
        title: {
            en: "Right to Information (RTI) Act",
            hi: "सूचना का अधिकार (आरटीआई) अधिनियम",
            ta: "தகவல் அறியும் உரிமைச் சட்டம்"
        },
        year: 2005,
        category: "Government Transparency",
        description: {
            en: "Law that enables every citizen to ask questions to the government and receive information.",
            hi: "वह कानून जो प्रत्येक नागरिक को सरकार से प्रश्न पूछने और जानकारी प्राप्त करने में सक्षम बनाता है।",
            ta: "ஒவ்வொரு குடிமகனும் அரசாங்கத்திடம் கேள்விகளைக் கேட்கவும் தகவல்களைப் பெறவும் உதவும் சட்டம்."
        },
        sections: [
            {
                id: "rti-6",
                number: "6",
                text: {
                    en: "Request for obtaining information",
                    hi: "सूचना प्राप्त करने के लिए अनुरोध",
                    ta: "தகவல் பெறுவதற்கான கோரிக்கை"
                },
                simplified: {
                    en: "Any person can make a request for information in writing or through electronic means.",
                    hi: "कोई भी व्यक्ति लिखित रूप में या इलेक्ट्रॉनिक माध्यम से सूचना के लिए अनुरोध कर सकता है।",
                    ta: "யார் வேண்டுமானாலும் எழுத்துப்பூர்வமாக அல்லது மின்னணு முறையில் தகவல் கோரலாம்."
                },
                cases: {
                    en: ["Asking for status of a government project", "Spending details"],
                    hi: ["सरकारी परियोजना की स्थिति पूछना", "खर्च का विवरण"],
                    ta: ["அரசு திட்டத்தின் நிலை பற்றி கேட்டல்", "செலவு விவரங்கள்"]
                }
            }
        ],
        actionGuide: {
            en: [
                "Submit an application to the Public Information Officer (PIO).",
                "Information must be provided within 30 days."
            ],
            hi: [
                "लोक सूचना अधिकारी (PIO) को आवेदन जमा करें।",
                "सूचना 30 दिनों के भीतर प्रदान की जानी चाहिए।"
            ],
            ta: [
                "பொது தகவல் அலுவலரிடம் (PIO) விண்ணப்பத்தை சமர்ப்பிக்கவும்.",
                "30 நாட்களுக்குள் தகவல் வழங்கப்பட வேண்டும்."
            ]
        },
        authority: {
            name: {
                en: "Central Information Commission",
                hi: "केंद्रीय सूचना आयोग",
                ta: "மத்திய தகவல் ஆணையம்"
            },
            contact: "011-26717355"
        }
    },

    // --- WOMEN PROTECTION (BNS 2023) ---
    {
        id: "bns-women",
        title: {
            en: "Women's Safety (BNS 2023)",
            hi: "महिलाओं की सुरक्षा (बीएनएस 2023)",
            ta: "பெண்கள் பாதுகாப்பு (BNS 2023)"
        },
        year: 2023,
        category: "Women & Child",
        description: {
            en: "Key laws under Bharatiya Nyaya Sanhita designed to protect the dignity and safety of women.",
            hi: "भारतीय न्याय संहिता के तहत महिलाओं की गरिमा और सुरक्षा की रक्षा के लिए बनाए गए प्रमुख कानून।",
            ta: "பெண்களின் கண்ணியம் மற்றும் பாதுகாப்பைப் பேணுவதற்காக பாரதிய நியாய சன்ஹிதாவின் கீழ் உள்ள முக்கிய சட்டங்கள்."
        },
        sections: [
            {
                id: "bns-74",
                number: "74",
                text: {
                    en: "Assault to outrage modesty",
                    hi: "शील भंग करने के लिए हमला",
                    ta: "பெண்ணின் கண்ணியத்தைக் குலைக்க தாக்குதல்"
                },
                simplified: {
                    en: "Directly addresses physical harassment or force used against a woman's dignity.",
                    hi: "महिला की गरिमा के खिलाफ शारीरिक उत्पीड़न या बल प्रयोग को संबोधित करता है।",
                    ta: "ஒரு பெண்ணின் கண்ணியத்திற்கு எதிராகப் பயன்படுத்தப்படும் உடல் ரீதியான துன்புறுத்தல் அல்லது வலுக்கட்டாயத்தை இது கையாள்கிறது."
                },
                cases: {
                    en: ["Eve-teasing", "Physical harassment"],
                    hi: ["छेड़छाड़", "शारीरिक उत्पीड़न"],
                    ta: ["பெண்களை கிண்டல் செய்தல்", "உடல் ரீதியான தொல்லை"]
                }
            }
        ],
        actionGuide: {
            en: [
                "Dial 1091 (Women Helpline) or 112 immediately.",
                "Visit the police station to register an FIR."
            ],
            hi: [
                "तुरंत 1091 (महिला हेल्पलाइन) या 112 डायल करें।",
                "FIR दर्ज करने के लिए पुलिस स्टेशन जाएं।"
            ],
            ta: [
                "உடனடியாக 1091 (பெண்கள் உதவி எண்) அல்லது 112 ஐ அழைக்கவும்.",
                "FIR பதிவு செய்ய காவல் நிலையத்திற்குச் செல்லவும்."
            ]
        },
        authority: {
            name: {
                en: "National Commission for Women",
                hi: "राष्ट्रीय महिला आयोग",
                ta: "தேசிய மகளிர் ஆணையம்"
            },
            contact: "011-26942751"
        }
    },

    // --- POCSO ACT 2012 (Child Safety) ---
    {
        id: "pocso-2012",
        title: {
            en: "Child Safety (POCSO Act)",
            hi: "बाल सुरक्षा (पॉक्सो अधिनियम)",
            ta: "குழந்தைகள் பாதுகாப்பு (POCSO சட்டம்)"
        },
        year: 2012,
        category: "Women & Child",
        description: {
            en: "Protection of Children from Sexual Offences – ensures safety and child-friendly legal procedures.",
            hi: "यौन अपराधों से बच्चों का संरक्षण - सुरक्षा और बच्चों के अनुकूल कानूनी प्रक्रियाएं सुनिश्चित करता है।",
            ta: "பாலியல் குற்றங்களிலிருந்து குழந்தைகளைப் பாதுகாத்தல் - பாதுகாப்பு மற்றும் குழந்தைகளுக்கு உகந்த சட்ட நடைமுறைகளை உறுதி செய்கிறது."
        },
        sections: [
            {
                id: "pocso-19",
                number: "19",
                text: {
                    en: "Mandatory reporting",
                    hi: "अनिवार्य रिपोर्टिंग",
                    ta: "கட்டாயப் புகார்"
                },
                simplified: {
                    en: "Mandates that ANY person who knows of a child sexual offense must report it.",
                    hi: "यह अनिवार्य करता है कि कोई भी व्यक्ति जिसे बाल यौन अपराध के बारे में पता है, उसे इसकी रिपोर्ट करनी चाहिए।",
                    ta: "குழந்தை பாலியல் குற்றம் பற்றி தெரிந்த எவரும் கட்டாயமாக புகார் அளிக்க வேண்டும் என்று இது வலியுறுத்துகிறது."
                },
                cases: {
                    en: ["Community safety", "Legal duty to report"],
                    hi: ["सामुदायिक सुरक्षा", "रिपोर्ट करने का कानूनी कर्तव्य"],
                    ta: ["சமூக பாதுகாப்பு", "புகார் அளிக்கும் சட்டப்பூர்வ கடமை"]
                }
            }
        ],
        actionGuide: {
            en: [
                "Call 1098 (Childline) or report on NCPCR e-Box.",
                "The statement must be recorded by a woman officer."
            ],
            hi: [
                "1098 (चाइल्डलाइन) पर कॉल करें या NCPCR ई-बॉक्स पर रिपोर्ट करें।",
                "बयान एक महिला अधिकारी द्वारा दर्ज किया जाना चाहिए।"
            ],
            ta: [
                "1098 (சைல்டுலைன்) ஐ அழைக்கவும் அல்லது NCPCR e-Box இல் புகார் அளிக்கவும்.",
                "வாக்குமூலம் ஒரு பெண் அதிகாரியால் பதிவு செய்யப்பட வேண்டும்."
            ]
        },
        authority: {
            name: {
                en: "Childline India",
                hi: "चाइल्डलाइन इंडिया",
                ta: "சைல்டுலைன் இந்தியா"
            },
            contact: "1098"
        }
    },
    // --- CONSUMER PROTECTION ACT 2019 ---
    {
        id: "consumer-2019",
        title: { en: "Consumer Protection Act", hi: "उपभोक्ता संरक्षण अधिनियम", ta: "நுகர்வோர் பாதுகாப்பு சட்டம்" },
        year: 2019,
        category: "Consumer Rights",
        description: {
            en: "Protects consumers from unfair trade practices, defective goods, and misleading advertisements.",
            hi: "उपभोक्ताओं को अनुचित व्यापार प्रथाओं, दोषपूर्ण वस्तुओं और भ्रामक विज्ञापनों से बचाता है।",
            ta: "நியாயமற்ற வர்த்தக நடைமுறைகள், குறைபாடுள்ள பொருட்கள் மற்றும் தவறாக வழிநடத்தும் விளம்பரங்களிலிருந்து நுகர்வோரைப் பாதுகாக்கிறது."
        },
        sections: [
            {
                id: "cpa-35",
                number: "35",
                text: { en: "Filing a Complaint", hi: "शिकायत दर्ज करना", ta: "புகார் அளித்தல்" },
                simplified: {
                    en: "Allows consumers to file complaints electronically from home without a lawyer.",
                    hi: "उपभोक्ताओं को वकील के बिना घर से इलेक्ट्रॉनिक रूप से शिकायत दर्ज करने की अनुमति देता है।",
                    ta: "வழக்கறிஞர் இல்லாமல் வீட்டிலிருந்தே மின்னணு முறையில் புகார் அளிக்க நுகர்வோரை அனுமதிக்கிறது."
                },
                cases: {
                    en: ["Defective product", "Service deficiency", "Overcharging"],
                    hi: ["दोषपूर्ण उत्पाद", "सेवा में कमी", "अधिक शुल्क"],
                    ta: ["குறைபாடுள்ள தயாரிப்பு", "சேவை குறைபாடு", "கூடுதல் கட்டணம்"]
                }
            }
        ],
        actionGuide: {
            en: ["Keep the bill/invoice safe.", "File a complaint on e-Daakhil portal."],
            hi: ["बिल/चालान सुरक्षित रखें।", "ई-दाखिल पोर्टल पर शिकायत दर्ज करें।"],
            ta: ["ரசீது/விலைப்பட்டியலைப் பாதுகாப்பாக வைத்திருக்கவும்.", "e-Daakhil போர்ட்டலில் புகார் அளிக்கவும்."]
        },
        authority: {
            name: { en: "Central Consumer Protection Authority", hi: "केंद्रीय उपभोक्ता संरक्षण प्राधिकरण", ta: "மத்திய நுகர்வோர் பாதுகாப்பு ஆணையம்" },
            contact: "1800-11-4000"
        }
    },
    // --- MOTOR VEHICLES ACT ---
    {
        id: "mva-1988",
        title: { en: "Motor Vehicles Act", hi: "मोटर वाहन अधिनियम", ta: "மோட்டார் வாகனச் சட்டம்" },
        year: 1988,
        category: "Traffic & Transport",
        description: {
            en: "Governs traffic rules, driving licenses, and penalties for traffic violations.",
            hi: "यातायात नियमों, ड्राइविंग लाइसेंस और यातायात उल्लंघन के लिए दंड को नियंत्रित करता है।",
            ta: "போக்குவரத்து விதிகள், ஓட்டுநர் உரிமங்கள் மற்றும் போக்குவரத்து விதிமீறல்களுக்கான அபராதங்களை நிர்வகிக்கிறது."
        },
        sections: [
            {
                id: "mva-184",
                number: "184",
                text: { en: "Dangerous Driving", hi: "खतरनाक ड्राइविंग", ta: "ஆபத்தான வாகனம் ஓட்டுதல்" },
                simplified: {
                    en: "Penalizes driving dangerously (speeding, red light jumping, using mobile while driving).",
                    hi: "खतरनाक तरीके से गाड़ी चलाने (तेज गति, रेड लाइट जंपिंग, मोबाइल का उपयोग) पर दंडित करता है।",
                    ta: "ஆபத்தான முறையில் வாகனம் ஓட்டுவதைத் தண்டிக்கிறது (வேகம், சிவப்பு விளக்கு தாண்டுதல், மொபைல் பயன்பாடு)."
                },
                cases: {
                    en: ["Speeding ticket", "Challan dispute", "Accident claim"],
                    hi: ["तेज गति का चालान", "चालान विवाद", "दुर्घटना का दावा"],
                    ta: ["வேகமாக செல்வதற்கான அபராதம்", "செல்லான் தகராறு", "விபத்து காப்பீடு"]
                }
            }
        ],
        actionGuide: {
            en: ["Do not argue with traffic police on the road.", "Pay challan online via Parivahan Sewa."],
            hi: ["सड़क पर ट्रैफिक पुलिस से बहस न करें।", "परिवहन सेवा के माध्यम से ऑनलाइन चालान भरें।"],
            ta: ["சாலையில் போக்குவரத்து போலீசாருடன் வாக்குவாதம் செய்ய வேண்டாம்.", "பரிவஹன் சேவா மூலம் ஆன்லைனில் அபராதம் செலுத்துங்கள்."]
        },
        authority: {
            name: { en: "RTO / Traffic Police", hi: "आरटीओ / ट्रैफिक पुलिस", ta: "RTO / போக்குவரத்து காவல்துறை" },
            contact: "100"
        }
    },
    // --- IT ACT 2000 (Cyber Crime) ---
    {
        id: "it-act-2000",
        title: { en: "Information Technology Act", hi: "सूचना प्रौद्योगिकी अधिनियम", ta: "தகவல் தொழில்நுட்ப சட்டம்" },
        year: 2000,
        category: "Cyber Law",
        description: {
            en: "Legal framework for electronic commerce and cyber crimes.",
            hi: "इलेक्ट्रॉनिक कॉमर्स और साइबर अपराधों के लिए कानूनी ढांचा।",
            ta: "மின்னணு வணிகம் மற்றும் இணைய குற்றங்களுக்கான சட்டக் கட்டமைப்பு."
        },
        sections: [
            {
                id: "it-66d",
                number: "66D",
                text: { en: "Cheating by Personation", hi: "प्रतिरूपण द्वारा धोखाधड़ी", ta: "ஆள்மாறாட்டம் மூலம் ஏமாற்றுதல்" },
                simplified: {
                    en: "Punishes cheating using computer resources (phishing, fake profiles, online scams).",
                    hi: "कंप्यूटर संसाधनों (फ़िशिंग, नकली प्रोफ़ाइल, ऑनलाइन घोटाले) का उपयोग करके धोखाधड़ी को दंडित करता है।",
                    ta: "கணினி வளங்களைப் பயன்படுத்தி ஏமாற்றுவதைத் தண்டிக்கிறது (பிஷிங், போலி சுயவிவரங்கள், ஆன்லைன் மோசடிகள்)."
                },
                cases: {
                    en: ["Online banking fraud", "Fake social media profile", "Cyber stalking"],
                    hi: ["ऑनलाइन बैंकिंग धोखाधड़ी", "नकली सोशल मीडिया प्रोफाइल", "साइबर स्टॉकिंग"],
                    ta: ["ஆன்லைன் வங்கி மோசடி", "போலி சமூக ஊடக சுயவிவரம்", "இணைய பின்தொடர்தல்"]
                }
            }
        ],
        actionGuide: {
            en: ["Take screenshots of evidence.", "Report at cybercrime.gov.in or call 1930."],
            hi: ["सबूतों के स्क्रीनशॉट लें।", "cybercrime.gov.in पर रिपोर्ट करें या 1930 पर कॉल करें।"],
            ta: ["ஆதாரங்களின் ஸ்கிரீன்ஷாட்களை எடுக்கவும்.", "cybercrime.gov.in இல் புகார் அளிக்கவும் அல்லது 1930 ஐ அழைக்கவும்."]
        },
        authority: {
            name: { en: "Cyber Crime Cell", hi: "साइबर क्राइम सेल", ta: "சைபர் கிரைம் பிரிவு" },
            contact: "1930"
        }
    },
    // --- SENIOR CITIZENS ACT ---
    {
        id: "senior-2007",
        title: { en: "Senior Citizens Welfare Act", hi: "वरिष्ठ नागरिक कल्याण अधिनियम", ta: "மூத்த குடிமக்கள் நலச் சட்டம்" },
        year: 2007,
        category: "Social Welfare",
        description: {
            en: "Ensures maintenance and welfare of parents and senior citizens.",
            hi: "माता-पिता और वरिष्ठ नागरिकों के भरण-पोषण और कल्याण को सुनिश्चित करता है।",
            ta: "பெற்றோர் மற்றும் மூத்த குடிமக்களின் பராமரிப்பு மற்றும் நலனை உறுதி செய்கிறது."
        },
        sections: [
            {
                id: "sc-maintenance",
                number: "4",
                text: { en: "Maintenance of Parents", hi: "माता-पिता का भरण-पोषण", ta: "பெற்றோர் பராமரிப்பு" },
                simplified: {
                    en: "Children/heirs are legally obligated to provide maintenance to senior citizens.",
                    hi: "बच्चों/वारिसों का कानूनी दायित्व है कि वे वरिष्ठ नागरिकों को भरण-पोषण प्रदान करें।",
                    ta: "மூத்த குடிமக்களுக்கு பராமரிப்பு வழங்குவது குழந்தைகள்/வாரிசுகளின் சட்டப்பூர்வ கடமையாகும்."
                },
                cases: {
                    en: ["Abandonment by children", "Property disputes affecting elderly"],
                    hi: ["बच्चों द्वारा परित्याग", "बुजुर्गों को प्रभावित करने वाले संपत्ति विवाद"],
                    ta: ["குழந்தைகளால் கைவிடப்படுதல்", "முதியவர்களை பாதிக்கும் சொத்து தகராறுகள்"]
                }
            }
        ],
        actionGuide: {
            en: ["File application to Maintenance Tribunal.", "SDO/District Magistrate can enforce the order."],
            hi: ["भरण-पोषण न्यायाधिकरण में आवेदन दायर करें।", "एसडीओ/जिला मजिस्ट्रेट आदेश लागू कर सकते हैं।"],
            ta: ["பராமரிப்பு தீர்ப்பாயத்தில் விண்ணப்பம் தாக்கல் செய்யவும்.", "SDO/மாவட்ட மாஜிஸ்திரேட் உத்தரவை அமல்படுத்தலாம்."]
        },
        authority: {
            name: { en: "Maintenance Tribunal", hi: "भरण-पोषण न्यायाधिकरण", ta: "பராமரிப்பு தீர்ப்பாயம்" },
            contact: "14567"
        }
    },
    // --- DOMESTIC VIOLENCE ACT 2005 ---
    {
        id: "dv-act-2005",
        title: { en: "Protection of Women from Domestic Violence Act", hi: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम", ta: "குடும்ப வன்முறையிலிருந்து பெண்களைப் பாதுகாக்கும் சட்டம்" },
        year: 2005,
        category: "Family Law",
        description: {
            en: "Provides civil remedies to protect women from domestic violence in households.",
            hi: "घरों में महिलाओं को घरेलू हिंसा से बचाने के लिए नागरिक उपचार प्रदान करता है।",
            ta: "வீடுகளில் பெண்களுக்கு எதிரான குடும்ப வன்முறையிலிருந்து பாதுகாக்க உரிமையியல் தீர்வுகளை வழங்குகிறது."
        },
        sections: [
            {
                id: "dv-sec-12",
                number: "12",
                text: { en: "Application to Magistrate", hi: "मजिस्ट्रेट को आवेदन", ta: "நீதிமன்றத்தில் விண்ணப்பித்தல்" },
                simplified: {
                    en: "Allows women to seek protection orders, residence orders, and monetary relief from court.",
                    hi: "महिलाओं को अदालत से सुरक्षा आदेश, निवास आदेश और मौद्रिक राहत मांगने की अनुमति देता है।",
                    ta: "பெண்கள் பாதுகாப்பு உத்தரவுகள், வசிப்பிட உத்தரவுகள் மற்றும் பண நிவாரணம் பெற அனுமதிக்கிறது."
                },
                cases: {
                    en: ["Physical abuse by husband", "Forced eviction from home", "Economic abuse"],
                    hi: ["पति द्वारा शारीरिक दुर्व्यवहार", "घर से जबरन बेदखली", "आर्थिक दुर्व्यवहार"],
                    ta: ["கணவனால் உடல் ரீதியான துன்புறுத்தல்", "வீட்டிலிருந்து வெளியேற்றப்படுதல்", "பொருளாதார வன்முறை"]
                }
            }
        ],
        actionGuide: {
            en: ["Contact Protection Officer.", "File DIR (Domestic Incident Report)."],
            hi: ["संरक्षण अधिकारी से संपर्क करें।", "DIR (घरेलू घटना रिपोर्ट) दर्ज करें।"],
            ta: ["பாதுகாப்பு அதிகாரியைத் தொடர்பு கொள்ளவும்.", "DIR (குடும்ப வன்முறை அறிக்கை) தாக்கல் செய்யவும்."]
        },
        authority: {
            name: { en: "Protection Officer", hi: "संरक्षण अधिकारी", ta: "பாதுகாப்பு அதிகாரி" },
            contact: "181"
        }
    },
    // --- HINDU SUCCESSION ACT 2005 (Property) ---
    {
        id: "hsa-2005",
        title: { en: "Hindu Succession Act (Amendment)", hi: "हिन्दू उत्तराधिकार अधिनियम", ta: "இந்து வாரிசுரிமைச் சட்டம்" },
        year: 2005,
        category: "Property Law",
        description: {
            en: "Grants daughters equal rights as sons to ancestral property.",
            hi: "बेटियों को पैतृक संपत्ति में बेटों के समान अधिकार प्रदान करता है।",
            ta: "பரம்பரை சொத்தில் மகன்களுக்கு இணையாக மகள்களுக்கும் சம உரிமை வழங்குகிறது."
        },
        sections: [
            {
                id: "hsa-sec-6",
                number: "6",
                text: { en: "Coparcenary Rights", hi: "सहदायिकी अधिकार", ta: "பங்குரிமை" },
                simplified: {
                    en: "Daughters are coparceners by birth and have equal liability and rights in family property.",
                    hi: "बेटियाँ जन्म से ही सहदायिक होती हैं और उन्हें पारिवारिक संपत्ति में समान दायित्व और अधिकार होते हैं।",
                    ta: "மகள்கள் பிறப்பால் பங்குதாரர்கள் மற்றும் குடும்பச் சொத்தில் சம கடமை மற்றும் உரிமைகளைக் கொண்டுள்ளனர்."
                },
                cases: {
                    en: ["Denial of property share", "Ancestral land dispute"],
                    hi: ["संपत्ति में हिस्सेदारी से इनकार", "पैतृक भूमि विवाद"],
                    ta: ["சொத்து பங்கு மறுப்பு", "பரம்பரை நில தகராறு"]
                }
            }
        ],
        actionGuide: {
            en: ["Obtain legal heir certificate.", "File partition suit in civil court."],
            hi: ["कानूनी वारिस प्रमाण पत्र प्राप्त करें।", "सिविल कोर्ट में विभाजन का मुकदमा दायर करें।"],
            ta: ["சட்டப்பூர்வ வாரிசு சான்றிதழ் பெறவும்.", "உரிமையியல் நீதிமன்றத்தில் பாகப்பிரிவினை வழக்கு தாக்கல் செய்யவும்."]
        },
        authority: {
            name: { en: "Civil Court", hi: "सिविल कोर्ट", ta: "உரிமையியல் நீதிமன்றம்" },
            contact: "N/A"
        }
    },
    // --- DOWRY PROHIBITION ACT 1961 ---
    {
        id: "dowry-act",
        title: { en: "Dowry Prohibition Act", hi: "दहेज निषेध अधिनियम", ta: "வரதட்சணை தடுப்புச் சட்டம்" },
        year: 1961,
        category: "Criminal",
        description: {
            en: "Prohibits giving or taking of dowry.",
            hi: "दहेज लेने या देने पर रोक लगाता है।",
            ta: "வரதட்சணை கொடுப்பதையோ அல்லது வாங்குவதையோ தடை செய்கிறது."
        },
        sections: [
            {
                id: "dp-sec-3",
                number: "3",
                text: { en: "Penalty for giving or taking dowry", hi: "दहेज लेने या देने के लिए दंड", ta: "வரதட்சணை கொடுப்பவர்/பெறுபவருக்கான தண்டனை" },
                simplified: {
                    en: "Punishable with imprisonment for at least 5 years and fine.",
                    hi: "कम से कम 5 साल की कैद और जुर्माने से दंडनीय।",
                    ta: "குறைந்தது 5 ஆண்டுகள் சிறைத்தண்டனை மற்றும் அபராதம் விதிக்கப்படும்."
                },
                cases: {
                    en: ["Harassment for dowry", "Demand for cash/car"],
                    hi: ["दहेज के लिए उत्पीड़न", "नकद/कार की मांग"],
                    ta: ["வரதட்சணை கொடுமை", "பணம்/வாகனம் கேட்டல்"]
                }
            }
        ],
        actionGuide: {
            en: ["File complaint with Dowry Prohibition Officer.", "Police Complaint."],
            hi: ["दहेज निषेध अधिकारी के पास शिकायत दर्ज करें।", "पुलिस शिकायत।"],
            ta: ["வரதட்சணை தடுப்பு அதிகாரியிடம் புகார் அளிக்கவும்.", "காவல் நிலையத்தில் புகார்."]
        },
        authority: {
            name: { en: "Dowry Prohibition Officer", hi: "दहेज निषेध अधिकारी", ta: "வரதட்சணை தடுப்பு அதிகாரி" },
            contact: "100"
        }
    }
];


