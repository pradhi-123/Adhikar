import { EmergencyContact } from "@/types";

export const emergencyContacts: EmergencyContact[] = [
    {
        id: "100",
        title: { en: "Police", hi: "पुलिस", ta: "காவல்துறை" },
        number: "100",
        type: "Police"
    },
    {
        id: "101",
        title: { en: "Fire", hi: "दमकल", ta: "தீயணைப்பு" },
        number: "101",
        type: "Fire"
    },
    {
        id: "102",
        title: { en: "Ambulance", hi: "एम्बुलेंस", ta: "ஆம்புலன்ஸ்" },
        number: "102",
        type: "Medical"
    },
    {
        id: "1091",
        title: { en: "Women Helpline", hi: "महिला हेल्पलाइन", ta: "பெண்கள் உதவி எண்" },
        number: "1091",
        type: "Helpline"
    },
    {
        id: "1098",
        title: { en: "Child Helpline", hi: "चाइल्ड हेल्पलाइन", ta: "குழந்தைகள் உதவி எண்" },
        number: "1098",
        type: "Helpline"
    },
    {
        id: "1930",
        title: { en: "Cyber Crime", hi: "साइबर अपराध", ta: "சைபர் கிரைம்" },
        number: "1930",
        type: "Police"
    },
];
