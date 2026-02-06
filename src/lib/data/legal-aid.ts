export interface LegalAidCenter {
    id: string;
    name: string;
    address: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    contact: string;
    email?: string;
    type: 'NALSA' | 'SLSA' | 'DLSA' | 'NGO'; // National, State, District, NGO
    services: string[];
}

// Authentic Data sourced on 2026-02-06
export const legalAidCenters: LegalAidCenter[] = [
    {
        id: 'nalsa-delhi',
        name: 'National Legal Services Authority (NALSA)',
        address: 'Jaipur House, India Gate',
        city: 'New Delhi',
        district: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        contact: '15100', // Verified National Helpline
        email: 'nalsa-dla@nic.in',
        type: 'NALSA',
        services: ['Free Legal Aid', 'Lok Adalat', 'Legal Literacy', '24x7 Helpline']
    },
    {
        id: 'dslsa-central',
        name: 'Delhi State Legal Services Authority (Central)',
        address: '3rd Floor, Rouse Avenue District Court Complex, Pandit Deen Dayal Upadhyaya Marg',
        city: 'New Delhi',
        district: 'Central Delhi',
        state: 'Delhi',
        pincode: '110002',
        contact: '1516', // Verified DSLSA Helpline
        email: 'dslsa-phc@nic.in',
        type: 'SLSA',
        services: ['Victim Compensation', 'Mediation', 'Legal Aid Counsel']
    },
    {
        id: 'mdlsa-mumbai',
        name: 'Mumbai District Legal Services Authority',
        address: 'Mazgaon Court, 13th Floor, Sardar Balwantsingh Dhody Marg, Mazgaon',
        city: 'Mumbai',
        district: 'Mumbai City',
        state: 'Maharashtra',
        pincode: '400010',
        contact: '8591903601', // Verified Mobile
        email: 'mumbai-dlsa.mh@bhc.gov.in',
        type: 'DLSA',
        services: ['Free Legal Representation', 'Women\'s Rights', 'Pre-litigation Counseling']
    },
    {
        id: 'mdlsa-bandra',
        name: 'Mumbai DLSA (Suburban)',
        address: 'High Peak Apartment, Old Bandra Court Building, S.V. Road, Bandra (W)',
        city: 'Mumbai',
        district: 'Mumbai Suburban',
        state: 'Maharashtra',
        pincode: '400050',
        contact: '022-26402175', // Verified Landline
        email: 'dlsamumbai@yahoo.in',
        type: 'DLSA',
        services: ['Family Dispute Resolution', 'Legal Aid for Poor']
    },
    {
        id: 'tnslsa-chennai',
        name: 'Tamil Nadu State Legal Services Authority',
        address: 'North Fort Road, High Court Campus',
        city: 'Chennai',
        district: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600104',
        contact: '1800-425-2441', // Verified Toll Free
        email: 'tnslsa@gmail.com',
        type: 'SLSA',
        services: ['Legal Advice', 'Lok Adalat Organization', 'Prisoner Support']
    },
    {
        id: 'dlsa-bangalore',
        name: 'Bengaluru Urban District Legal Services Authority',
        address: 'City Civil Court Complex, Kempegowda Road',
        city: 'Bengaluru',
        district: 'Bengaluru Urban',
        state: 'Karnataka',
        pincode: '560009',
        contact: '080-22213459',
        type: 'DLSA',
        services: ['Mediation', 'Legal Assistance', 'Public Utility Services']
    },
    // Verified NGOs
    {
        id: 'ngo-majlis-mumbai',
        name: 'Majlis Legal Centre',
        address: '4A/2, Golden Valley, Kalina Kurla Road, Santacruz East',
        city: 'Mumbai',
        district: 'Mumbai Suburban',
        state: 'Maharashtra',
        pincode: '400098',
        contact: '9820633222',
        email: 'majlislaw@gmail.com',
        type: 'NGO',
        services: ['Women\'s Rights', 'Domestic Violence Support', 'Legal Awareness']
    },
    {
        id: 'ngo-hrln-delhi',
        name: 'Human Rights Law Network (HRLN)',
        address: '576, Masjid Road, Jungpura',
        city: 'New Delhi',
        district: 'South East Delhi',
        state: 'Delhi',
        pincode: '110014',
        contact: '011-24374501',
        email: 'contact@hrln.org',
        type: 'NGO',
        services: ['Public Interest Litigation', 'Human Rights Advocacy', 'Free Legal Aid']
    },
    {
        id: 'ngo-alf-bangalore',
        name: 'Alternative Law Forum',
        address: '122/4, Infantry Road, Next to Balaji Art Gallery',
        city: 'Bengaluru',
        district: 'Bengaluru Urban',
        state: 'Karnataka',
        pincode: '560001',
        contact: '080-22865757',
        email: 'contact@altlawforum.org',
        type: 'NGO',
        services: ['Legal Research', 'Labor Rights', 'Intellectual Property']
    }
];
