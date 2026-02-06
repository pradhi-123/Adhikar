export interface Section {
    id: string;
    number: string;
    text: Record<string, string>; // Localized: { en: '...', hi: '...', ta: '...' }
    simplified: Record<string, string>; // Localized
    cases: Record<string, string[]>; // Localized common use cases
}

export type LawCategory = 'Criminal' | 'Women & Child' | 'Education' | 'Labour' | 'Cyber' | 'Consumer' | 'Public Safety' | 'Fundamental Rights' | 'Government Transparency' | 'Consumer Rights' | 'Traffic & Transport' | 'Cyber Law' | 'Social Welfare' | 'Family Law' | 'Property Law';

export interface LawChapter {
    id: string;
    number: string;
    title: Record<string, string>; // Localized
    sections: Section[];
}

export interface Law {
    id: string;
    title: Record<string, string>; // Localized
    year: number;
    category: LawCategory;
    description: Record<string, string>; // Localized
    sections: Section[]; // Flattened or default list
    chapters?: LawChapter[]; // Structured Hierarchy
    actionGuide?: Record<string, string[]>; // Localized steps
    authority?: {
        name: Record<string, string>; // Localized
        contact: string;
        email?: string;
    };
}

export interface Scheme {
    id: string;
    title: Record<string, string>; // Localized
    category: 'General' | 'Women' | 'Farmers' | 'Education' | 'Health' | 'Finance' | 'Housing' | 'Senior Citizens';
    ministry: Record<string, string>; // Localized
    description: Record<string, string>; // Localized
    benefits: Record<string, string[]>; // Localized
    eligibility: {
        minAge?: number;
        maxAge?: number;
        gender?: 'Male' | 'Female' | 'Other' | 'All';
        incomeLimit?: number;
        occupation?: string[];
    };
    deadline?: string;
    portalLink: string;
    documentsResult: Record<string, string[]>; // Localized
}

export interface EmergencyContact {
    id: string;
    title: Record<string, string>; // Localized
    number: string;
    type: 'Police' | 'Medical' | 'Fire' | 'Helpline' | 'Legal';
    iconName?: string;
}

export interface SituationResult {
    situationId: string;
    relatedLaws: { lawId: string; priority: 'Primary' | 'Secondary' | 'Exception'; reason: string }[];
    relatedSchemes: string[]; // Scheme IDs
    explanation: string;
}

export interface UserProfile {
    name: string;
    aadhaarId: string; // Last 4 digits or masked
    mobile: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    state: string;
    district: string;
    pincode?: string;
    profession: 'Student' | 'School Student' | 'Working Professional' | 'Homemaker' | 'Unemployed' | 'Other';
}
