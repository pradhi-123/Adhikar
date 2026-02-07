'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, ShieldCheck, User, MapPin, Briefcase, Smartphone, CheckCircle, Sparkles, Fingerprint, Grip } from 'lucide-react';
import { INDIAN_STATES, PROFESSIONS } from '@/lib/data/locations';
import { useAuth } from '@/context/AuthContext';
import CustomAlert from '@/components/ui/CustomAlert';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [step, setStep] = useState(1);

    // Alert State
    const [alertConfig, setAlertConfig] = useState<{ isOpen: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
        isOpen: false, title: '', message: '', type: 'info'
    });

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        aadhaarId: '',
        mobile: '',
        age: '',
        gender: 'Male',
        state: '',
        district: '',
        pincode: '',
        profession: ''
    });

    // Dynamic Validation State
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Derived State
    const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
    const [availableProfessions, setAvailableProfessions] = useState<string[]>(PROFESSIONS);

    useEffect(() => {
        if (formData.state) {
            setAvailableDistricts(INDIAN_STATES[formData.state] || []);
            setFormData(prev => ({ ...prev, district: '' }));
        }
    }, [formData.state]);

    useEffect(() => {
        const ageNum = parseInt(formData.age);
        if (!isNaN(ageNum)) {
            if (ageNum < 18) {
                setAvailableProfessions(["Student"]);
                setFormData(prev => ({ ...prev, profession: 'Student' }));
            } else {
                setAvailableProfessions(PROFESSIONS);
            }
        }
    }, [formData.age]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const showAlert = (title: string, message: string, type: 'success' | 'error' | 'info') => {
        setAlertConfig({ isOpen: true, title, message, type });
    };

    const closeAlert = () => {
        setAlertConfig(prev => ({ ...prev, isOpen: false }));
    };

    // Validation Helpers
    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const isValid = (field: string) => {
        if (!touched[field]) return null;
        switch (field) {
            case 'aadhaarId': return formData.aadhaarId.length === 12 && /^\d+$/.test(formData.aadhaarId);
            case 'mobile': return formData.mobile.length === 10 && /^\d+$/.test(formData.mobile);
            case 'name': return formData.name.trim().length > 2;
            case 'age': return !isNaN(parseInt(formData.age)) && parseInt(formData.age) > 0;
            case 'pincode': return formData.pincode.length === 6 && /^\d+$/.test(formData.pincode);
            default: return true;
        }
    };

    const renderValidationIcon = (field: string) => {
        const valid = isValid(field);
        if (valid === null) return null;
        return valid ?
            <CheckCircle size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in zoom-in" /> :
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>;
    };

    const validateStep = () => {
        if (step === 1) {
            if (formData.aadhaarId.length !== 12 || !/^\d+$/.test(formData.aadhaarId)) {
                showAlert("Invalid Aadhaar", "Please enter a valid 12-digit Aadhaar number.", "error");
                return false;
            }
            return true;
        }
        if (step === 2) {
            if (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
                showAlert("Invalid Mobile", "Please enter a valid 10-digit mobile number.", "error");
                return false;
            }
            return true;
        }
        if (step === 3) {
            const ageNum = parseInt(formData.age);
            const isPincodeValid = formData.pincode.length === 6 && /^\d+$/.test(formData.pincode);

            if (formData.name.trim().length === 0) { showAlert("Missing Name", "Please enter your full name.", "error"); return false; }
            if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 120) { showAlert("Invalid Age", "Please enter a valid age.", "error"); return false; }
            if (formData.state === '') { showAlert("Missing State", "Please select your state.", "error"); return false; }
            if (formData.district === '') { showAlert("Missing District", "Please select your district.", "error"); return false; }
            if (!isPincodeValid) { showAlert("Invalid Pincode", "Please enter a 6-digit pincode.", "error"); return false; }
            if (formData.profession === '') { showAlert("Missing Profession", "Please select your profession.", "error"); return false; }

            return true;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            // Check for Kids App Redirect (Under 17)
            if (step === 3) {
                const ageNum = parseInt(formData.age);
                if (ageNum < 17) {
                    showAlert("Junior Citizen Detected! 🧒", "Redirecting you to Adhikar Kids Mode...", "success");
                    setTimeout(() => {
                        router.push('/kids');
                    }, 2000);
                    return; // Stop progression to next step
                }
            }
            setStep(prev => prev + 1);
        }
    };


    const handleRegister = () => {
        try {
            console.log("Starting Registration...");
            // Robust Save Logic
            const rawData = localStorage.getItem('adhikar_users');
            const storedUsers = rawData ? JSON.parse(rawData) : [];

            // IMPORTANT: Trimming to ensure consistent matching with Login Page
            const cleanMobile = formData.mobile.trim();

            const newUser = {
                ...formData,
                mobile: cleanMobile,
                aadhaarId: formData.aadhaarId,
                role: "Citizen",
                registeredAt: new Date().toISOString()
            };

            // Remove old entry if exists (simulate update)
            const filteredUsers = storedUsers.filter((u: any) => u.mobile !== cleanMobile);
            filteredUsers.push(newUser);

            // SAVE TO DISK
            const payload = JSON.stringify(filteredUsers);
            localStorage.setItem('adhikar_users', payload);
            console.log("Saving user:", newUser);

            // VERIFY SAVE
            const verifyData = localStorage.getItem('adhikar_users');
            if (!verifyData || !verifyData.includes(newUser.mobile)) {
                throw new Error("Verification failed: User not found in storage after write.");
            }

            console.log("User Registered & Verified Successfully:", cleanMobile);

            showAlert("Registration Successful", "Welcome to Adhikar! Redirecting to dashboard...", "success");

            setTimeout(() => {
                login(newUser as any);
                router.push('/');
            }, 1000);
        } catch (error) {
            console.error("Registration Error", error);
            showAlert("System Error", `Could not save user data: ${error}`, "error");
        }
    };

    const renderStepIndicator = () => (
        <div className="flex justify-between items-center relative mb-12 px-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
            <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 -z-10 rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>

            {[1, 2, 3, 4].map((i) => {
                const isActive = step >= i;
                const isCurrent = step === i;
                return (
                    <div key={i} className={`flex flex-col items-center gap-2 transition-all duration-300 ${isCurrent ? 'scale-110' : 'scale-100'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-md ${isActive ? 'bg-white border-blue-600 text-blue-600 shadow-blue-200' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                            {i === 1 && <Fingerprint size={20} />}
                            {i === 2 && <Smartphone size={20} />}
                            {i === 3 && <User size={20} />}
                            {i === 4 && <CheckCircle size={20} />}
                        </div>
                        <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isActive ? 'text-blue-800' : 'text-slate-400'}`}>
                            {i === 1 && 'Identity'}
                            {i === 2 && 'Mobile'}
                            {i === 3 && 'Details'}
                            {i === 4 && 'Done'}
                        </span>
                    </div>
                )
            })}
        </div>
    );

    return (
        <div className="min-h-screen flex font-sans overflow-hidden bg-slate-50">
            {/* Custom Alert */}
            <CustomAlert
                isOpen={alertConfig.isOpen}
                onClose={closeAlert}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
            />

            <style jsx>{`
                .royal-gradient {
                    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #172554 100%);
                }
                .gold-text {
                    background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                .floating-card {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                /* NEON BORDER STYLES FROM LOGIN PAGE */
                .holo-gradient-border {
                    position: relative;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 2.5rem;
                    z-index: 1;
                }
                .holo-gradient-border::before {
                    content: "";
                    position: absolute;
                    inset: -3px;
                    border-radius: 2.7rem; /* Slightly larger than parent */
                    background: linear-gradient(45deg, #ff00cc, #3333ff, #00ccff, #ff00cc);
                    background-size: 400%;
                    z-index: -1;
                    animation: section-animation 10s linear infinite;
                }
                @keyframes section-animation {
                    0% {background-position: 0 0;}
                    50% {background-position: 400% 0;}
                    100% {background-position: 0 0;}
                }
                .input-premium {
                    background: #f8fafc;
                    border: 2px solid #e2e8f0;
                    color: #0f172a;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .input-premium:focus {
                    background: #ffffff;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
                    transform: translateY(-2px);
                    outline: none;
                }
                .dot-pattern {
                    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
                    background-size: 24px 24px;
                }
            `}</style>

            {/* LEFT SIDE: Royal Blue Premium Info Panel */}
            <div className="hidden lg:flex lg:w-5/12 relative royal-gradient overflow-hidden flex-col justify-between p-12 text-white">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-overlay"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.1 }}></div>

                {/* Floating Elements */}
                <div className="absolute top-40 right-12 floating-card delay-700">
                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl max-w-[200px]">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-500/20 rounded-lg"><CheckCircle size={20} className="text-green-400" /></div>
                            <span className="font-bold text-sm">Instant Verify</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full w-4/5 bg-green-400 rounded-full"></div></div>
                    </div>
                </div>

                {/* Logo Area */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/30">
                            <ShieldCheck size={24} />
                        </div>
                        <span className="text-2xl font-black tracking-tight">Adhikar<span className="text-blue-400">.</span></span>
                    </div>
                </div>

                {/* Central Text */}
                <div className="relative z-10">
                    <h1 className="text-5xl font-black mb-6 leading-tight">
                        Join the <br />
                        <span className="gold-text">Digital Revolution</span>
                    </h1>
                    <p className="text-blue-200 text-lg leading-relaxed max-w-sm">
                        One ID for all government services. Secure, fast, and accessible for every citizen.
                    </p>
                </div>

                {/* Footer Stats */}
                <div className="relative z-10 flex gap-8">
                    <div>
                        <p className="text-3xl font-bold text-white">1.2B+</p>
                        <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Citizens</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">100%</p>
                        <p className="text-xs text-blue-300 uppercase tracking-wider font-semibold">Secure</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Content Area */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 relative bg-slate-50 overflow-y-auto">
                {/* Right Side Background Decoration */}
                <div className="absolute inset-0 dot-pattern opacity-30 -z-10"></div>
                <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>

                <div className="w-full max-w-xl my-auto">
                    <div className="mb-8 text-center lg:text-left">
                        <Link href="/login" className="lg:hidden inline-block mb-4 text-blue-600 font-bold flex items-center gap-2 justify-center"><ChevronLeft size={16} /> Back to Login</Link>
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                                <p className="text-slate-500 mt-1">Step {step} of 4</p>
                            </div>
                            <div className="hidden sm:block text-right">
                                <p className="text-sm text-slate-400 font-semibold">Already a member?</p>
                                <Link href="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                            </div>
                        </div>
                    </div>

                    {/* Simple Progress Bar for right side */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-10">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out"
                            style={{ width: `${(step / 4) * 100}%` }}
                        ></div>
                    </div>

                    {/* Step Visuals (Icons) */}
                    <div className="flex justify-between mb-10 px-2 lg:px-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`flex flex-col items-center gap-2 transition-all duration-500 ${step === i ? 'opacity-100 scale-110' : step > i ? 'opacity-50' : 'opacity-30'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === i ? 'border-blue-600 text-blue-600 bg-blue-50' : step > i ? 'border-green-500 text-green-500 bg-green-50' : 'border-slate-300 text-slate-300'}`}>
                                    {step > i ? <CheckCircle size={20} /> : (
                                        <>
                                            {i === 1 && <Fingerprint size={20} />}
                                            {i === 2 && <Smartphone size={20} />}
                                            {i === 3 && <User size={20} />}
                                            {i === 4 && <ShieldCheck size={20} />}
                                        </>
                                    )}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider">{i === 1 ? 'Identity' : i === 2 ? 'Mobile' : i === 3 ? 'Details' : 'Confirm'}</span>
                            </div>
                        ))}
                    </div>

                    {/* Render Step Content with NEON BORDER */}
                    <div className="holo-gradient-border p-[3px]">
                        <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 min-h-[400px] flex flex-col justify-between relative overflow-hidden h-full">
                            {/* Decorative background blob inside form */}
                            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-blue-50 rounded-full filter blur-2xl z-0 pointer-events-none"></div>

                            <div className="relative z-10 text-left">
                                {step === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800">Aadhaar Identification</h3>
                                            <p className="text-slate-500 text-sm">Govt. trusted verification source.</p>
                                        </div>
                                        <div className="relative group">
                                            <label className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block ml-1">Aadhaar Number</label>
                                            <input
                                                name="aadhaarId"
                                                type="text"
                                                placeholder="XXXX XXXX XXXX"
                                                className={`input-premium w-full px-6 py-4 rounded-xl text-center text-2xl font-mono tracking-widest placeholder:text-slate-300 font-bold ${isValid('aadhaarId') === false ? 'border-red-300 bg-red-50' : ''}`}
                                                value={formData.aadhaarId}
                                                onChange={handleInputChange}
                                                onBlur={() => handleBlur('aadhaarId')}
                                                maxLength={12}
                                                autoFocus
                                            />
                                            {renderValidationIcon('aadhaarId')}
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800">Primary Contact</h3>
                                            <p className="text-slate-500 text-sm">Link your mobile for OTP services.</p>
                                        </div>
                                        <div className="relative group">
                                            <label className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block ml-1">Mobile Number</label>
                                            <div className="relative">
                                                <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-100 rounded-l-xl flex items-center justify-center text-slate-500 font-bold border-r border-slate-200">
                                                    +91
                                                </div>
                                                <input
                                                    name="mobile"
                                                    type="tel"
                                                    placeholder="98765 43210"
                                                    className={`input-premium w-full pl-20 pr-12 py-4 rounded-xl text-xl font-bold ${isValid('mobile') === false ? 'border-red-300 bg-red-50' : ''}`}
                                                    value={formData.mobile}
                                                    onChange={handleInputChange}
                                                    onBlur={() => handleBlur('mobile')}
                                                    maxLength={10}
                                                    autoFocus
                                                />
                                                {renderValidationIcon('mobile')}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="relative">
                                            <label className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block ml-1">Full Name</label>
                                            <input
                                                name="name" type="text" placeholder="e.g. Rahul Kumar"
                                                className="input-premium w-full px-5 py-3 rounded-xl font-semibold"
                                                value={formData.name} onChange={handleInputChange} onBlur={() => handleBlur('name')}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ml-1">Age</label>
                                                <input name="age" type="number" placeholder="25" className="input-premium w-full px-5 py-3 rounded-xl font-semibold" value={formData.age} onChange={handleInputChange} />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ml-1">Gender</label>
                                                <select name="gender" className="input-premium w-full px-5 py-3 rounded-xl font-semibold" value={formData.gender} onChange={handleInputChange}>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ml-1">State</label>
                                                <select name="state" className="input-premium w-full px-5 py-3 rounded-xl text-sm font-semibold" value={formData.state} onChange={handleInputChange}>
                                                    <option value="">Select</option>
                                                    {Object.keys(INDIAN_STATES).map(state => <option key={state} value={state}>{state}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ml-1">District</label>
                                                <select name="district" className="input-premium w-full px-5 py-3 rounded-xl text-sm font-semibold" value={formData.district} onChange={handleInputChange} disabled={!formData.state}>
                                                    <option value="">Select</option>
                                                    {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ml-1">Pincode</label>
                                                <input name="pincode" type="text" placeholder="110001" maxLength={6} className="input-premium w-full px-5 py-3 rounded-xl font-semibold" value={formData.pincode} onChange={handleInputChange} />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block ml-1">Profession</label>
                                                <select name="profession" className="input-premium w-full px-5 py-3 rounded-xl text-sm font-semibold" value={formData.profession} onChange={handleInputChange}>
                                                    <option value="">Select</option>
                                                    {availableProfessions.map(p => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles size={80} className="text-blue-600" /></div>
                                            <h3 className="font-bold text-blue-900 mb-4 text-lg">Review Profile</h3>

                                            <div className="space-y-3">
                                                <div className="flex justify-between border-b border-blue-100 pb-2">
                                                    <span className="text-slate-500 text-sm">Name</span>
                                                    <span className="font-bold text-slate-900">{formData.name}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-blue-100 pb-2">
                                                    <span className="text-slate-500 text-sm">Mobile</span>
                                                    <span className="font-bold text-slate-900">+91 {formData.mobile}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-blue-100 pb-2">
                                                    <span className="text-slate-500 text-sm">Location</span>
                                                    <span className="font-bold text-slate-900">{formData.district}, {formData.state}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-slate-500 text-sm">Role</span>
                                                    <span className="font-bold text-slate-900">{formData.profession}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-3">
                                            <input type="checkbox" className="mt-1 w-5 h-5 accent-blue-600 rounded bg-white" defaultChecked />
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">By creating an ID, I agree to the <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Privacy Policy</span> of Adhikar.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between items-center mt-8 pt-0">
                                {step > 1 ? (
                                    <button onClick={() => setStep(prev => prev - 1)} className="text-slate-400 hover:text-slate-600 flex items-center gap-2 transition-colors font-bold text-sm">
                                        <ChevronLeft size={16} /> Previous
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                <button
                                    onClick={step === 4 ? handleRegister : handleNext}
                                    className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-slate-900/10 hover:shadow-blue-600/30 hover:-translate-y-1 transition-all flex items-center gap-2 group text-base"
                                >
                                    {step === 4 ? 'Confirm & Create ID' : 'Continue'}
                                    {step < 4 && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
