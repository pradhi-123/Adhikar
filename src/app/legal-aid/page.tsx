'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, MapPin, Phone, Building2, Gavel, Users2, LocateFixed } from 'lucide-react';
import { legalAidCenters } from '@/lib/data/legal-aid';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function LegalAidPage() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [showNearestOnly, setShowNearestOnly] = useState(false);

    // Filter & Sort Logic
    const displayedCenters = useMemo(() => {
        let results = legalAidCenters.filter(center => {
            const matchesSearch = center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                center.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                center.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'ALL' || center.type === filterType;
            return matchesSearch && matchesType;
        });

        // "Near Me" Filter using Pincode (First 3 digits for broad match)
        if (showNearestOnly && user?.pincode) {
            results = results.filter(c => c.pincode && user.pincode && c.pincode.startsWith(user.pincode.substring(0, 3)));
        }

        // Auto-sort if user has location data (Exact Pincode > District > State)
        if (user) {
            const userPin = user.pincode || '';
            const userDistrict = user.district || '';
            const userState = user.state || '';

            results.sort((a, b) => {
                // Priority 1: Exact Pincode Match
                const aExactPin = a.pincode === userPin;
                const bExactPin = b.pincode === userPin;
                if (aExactPin && !bExactPin) return -1;
                if (!aExactPin && bExactPin) return 1;

                // Priority 2: Same District (first 3 digits of pincode or explicit district field)
                const aDistrictMatch = (a.pincode && userPin && a.pincode.startsWith(userPin.substring(0, 3))) || (a.district === userDistrict);
                const bDistrictMatch = (b.pincode && userPin && b.pincode.startsWith(userPin.substring(0, 3))) || (b.district === userDistrict);
                if (aDistrictMatch && !bDistrictMatch) return -1;
                if (!aDistrictMatch && bDistrictMatch) return 1;

                // Priority 3: Same State
                const aStateMatch = a.state === userState;
                const bStateMatch = b.state === userState;
                if (aStateMatch && !bStateMatch) return -1;
                if (!aStateMatch && bStateMatch) return 1;

                return 0; // Maintain original order for other cases
            });
        }

        return results;
    }, [searchTerm, filterType, showNearestOnly, user]);

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 p-6 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/" className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all border border-slate-100 dark:border-slate-700 group">
                    <ArrowLeft size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </Link>
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                        Legal Aid Directory
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Find free legal support near you.</p>
                </div>
            </div>

            {/* Global Search & Filters */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by City, State, or Center Name..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        {['ALL', 'NALSA', 'SLSA', 'DLSA', 'NGO'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap border ${filterType === type
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Proximity Toggle */}
                    {user?.pincode && (
                        <button
                            onClick={() => setShowNearestOnly(!showNearestOnly)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${showNearestOnly
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                                }`}
                        >
                            <LocateFixed size={16} />
                            Near My Pincode ({user.pincode})
                        </button>
                    )}
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {displayedCenters.map(center => (
                    <div key={center.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-2">
                                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest ${center.type === 'NALSA' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                        center.type === 'SLSA' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            center.type === 'DLSA' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                    }`}>
                                    {center.type}
                                </span>
                                {/* Nearest Badge */}
                                {user?.pincode && center.pincode && user.pincode && center.pincode.startsWith(user.pincode.substring(0, 3)) && (
                                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                        <MapPin size={10} /> Near You
                                    </span>
                                )}
                            </div>
                            <Building2 size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
                            {center.name}
                        </h3>

                        <div className="space-y-2 mb-4">
                            <p className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <MapPin size={16} className="shrink-0 mt-0.5 text-slate-400" />
                                {center.address}, {center.city}, {center.state}
                            </p>
                            <a href={`tel:${center.contact}`} className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors bg-slate-50 dark:bg-slate-800 p-2 rounded-lg w-fit">
                                <Phone size={16} className="text-blue-500" />
                                {center.contact}
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            {center.services.map((service, idx) => (
                                <span key={idx} className="text-xs font-semibold text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded flex items-center gap-1">
                                    <Gavel size={12} /> {service}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                {displayedCenters.length === 0 && (
                    <div className="col-span-full py-10 text-center text-slate-400">
                        <Users2 size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No legal aid centers found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
