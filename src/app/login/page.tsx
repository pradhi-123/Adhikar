'use client';

import Link from 'next/link';
import { UserPlus, ArrowRight, ShieldCheck, Smartphone, Check, ChevronRight, Zap, Globe, Activity } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import CustomAlert from '@/components/ui/CustomAlert';

export default function LoginPage() {
    const { t } = useLanguage();
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);

    // Alert State
    const [alertConfig, setAlertConfig] = useState<{ isOpen: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
        isOpen: false, title: '', message: '', type: 'info'
    });

    // Phone Notification State (Simulated SMS)
    const [smsNotification, setSmsNotification] = useState<{ show: boolean, code: string }>({ show: false, code: '' });

    const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const { login } = useAuth();

    // Mock Database Initialization
    useEffect(() => {
        const storedUsers = localStorage.getItem('adhikar_users');
        if (!storedUsers) {
            const demoUser = [{
                mobile: '9876543210',
                name: 'Rahul Sharma',
                aadhaarId: 'XXXX-XXXX-1234'
            }];
            localStorage.setItem('adhikar_users', JSON.stringify(demoUser));
        }
    }, []);

    const showAlert = (title: string, message: string, type: 'success' | 'error' | 'info') => {
        setAlertConfig({ isOpen: true, title, message, type });
    };

    const closeAlert = () => {
        setAlertConfig(prev => ({ ...prev, isOpen: false }));
    };

    const handleGetOtp = () => {
        const cleanMobile = mobile.trim();
        if (cleanMobile.length !== 10) {
            showAlert("Invalid Number", "Please enter a valid 10-digit mobile number.", "error");
            return;
        }

        const rawData = localStorage.getItem('adhikar_users');
        const storedUsers = JSON.parse(rawData || '[]');
        const userExists = storedUsers.some((u: any) => u.mobile === cleanMobile);

        // Allow demo numbers to bypass registration check
        if (!userExists && cleanMobile !== '5555555555') {
            showAlert("Not Registered", `Mobile number ${cleanMobile} is not found. Please Register first.`, "error");
            return;
        }

        const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(randomOtp);
        setShowOtp(true);

        showAlert("OTP Sent", `Verification code sent to +91 ${cleanMobile}`, "success");

        setTimeout(() => {
            setSmsNotification({ show: true, code: randomOtp });
            setTimeout(() => {
                setSmsNotification({ show: false, code: '' });
            }, 5000);
        }, 1500);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const handleLogin = () => {
        const enteredOtp = otp.join('');
        // Allow ANY OTP for demo purposes or check exact match
        if (enteredOtp === generatedOtp || enteredOtp === '1234') {
            const cleanMobile = mobile.trim();
            const storedUsers = JSON.parse(localStorage.getItem('adhikar_users') || '[]');

            let user = storedUsers.find((u: any) => u.mobile === cleanMobile);

            // Special Case for Kids Demo
            if (cleanMobile === '5555555555') {
                user = {
                    name: "Demo Kid",
                    mobile: cleanMobile,
                    role: "Citizen",
                    age: "12", // Under 17 triggers Kids Mode
                    gender: "Male",
                    state: "Delhi",
                    district: "New Delhi"
                };
            }

            // Fallback for Adult Demo if not registered
            if (!user) {
                user = {
                    name: "Citizen",
                    mobile: cleanMobile,
                    role: "User",
                    age: "25" // Default Adult
                };
            }

            login(user); // AuthContext handles redirection based on age
        } else {
            showAlert("Verification Failed", "The OTP you entered is incorrect. Please try again.", "error");
            setOtp(['', '', '', '']);
            otpRefs[0].current?.focus();
        }
    };

    return (
        <div className="min-h-screen flex font-sans overflow-hidden bg-slate-50">
            <CustomAlert
                isOpen={alertConfig.isOpen}
                onClose={closeAlert}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
            />

            {/* SIMULATED PHONE NOTIFICATION */}
            <div className={`fixed top-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-4 bg-gray-900/95 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-4 border border-gray-700 max-w-sm w-full transition-all duration-500 transform ${smsNotification.show ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}>
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                    <Smartphone size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Messages • now</p>
                    <p className="font-medium text-sm text-gray-200">Adhikar Verification Code: <span className="font-bold text-white text-lg tracking-widest ml-1">{smsNotification.code}</span></p>
                </div>
            </div>

            <style jsx>{`
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
                @keyframes float-delay { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delay { animation: float-delay 7s ease-in-out infinite; animation-delay: 1s; }
                .holo-card { background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); border-top: 1px solid rgba(255,255,255,0.5); border-left: 1px solid rgba(255,255,255,0.5); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); }
                .holo-gradient-border { position: relative; background: rgba(255, 255, 255, 0.9); border-radius: 2rem; z-index: 1; }
                .holo-gradient-border::before { content: ""; position: absolute; inset: -3px; border-radius: 2.2rem; background: linear-gradient(45deg, #ff00cc, #3333ff, #00ccff, #ff00cc); background-size: 400%; z-index: -1; animation: section-animation 10s linear infinite; }
                @keyframes section-animation { 0% {background-position: 0 0;} 50% {background-position: 400% 0;} 100% {background-position: 0 0;} }
                .dot-pattern { background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 24px 24px; }
            `}</style>

            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }}></div>

                <div className="absolute bottom-40 left-20 animate-float-delay z-0">
                    <div className="holo-card p-6 rounded-3xl min-w-[200px] transform hover:scale-105 transition-transform">
                        <div className="flex items-center gap-4 text-white">
                            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg"><Activity size={24} className="text-white" /></div>
                            <div>
                                <p className="font-bold text-lg">Live Stats</p>
                                <p className="text-sm text-blue-100 opacity-80">Connected</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center p-16">
                    <div className="mb-8 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl w-fit animate-float shadow-2xl shadow-blue-500/20">
                        <ShieldCheck size={64} className="text-white drop-shadow-[0_0_25px_rgba(96,165,250,0.6)]" />
                    </div>

                    <h1 className="text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                        {t('auth.hero_title_1')}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">{t('auth.hero_title_2')}</span>
                    </h1>

                    <div className="flex gap-6 mt-6">
                        <div className="px-8 py-4 rounded-full flex items-center gap-3 text-white border-2 border-transparent bg-white/5 font-bold">
                            <Check size={20} className="text-cyan-400" /> {t('auth.secure')}
                        </div>
                        <div className="px-8 py-4 rounded-full flex items-center gap-3 text-white border-2 border-transparent bg-white/5 font-bold">
                            <Zap size={20} className="text-purple-400" /> {t('auth.fast')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
                {/* Mobile Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] mix-blend-multiply lg:hidden animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-[80px] mix-blend-multiply lg:hidden animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="absolute inset-0 dot-pattern opacity-30 -z-10 dark:opacity-10"></div>

                <div className="w-full max-w-[500px] relative z-10 holo-gradient-border p-[3px]">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-10 sm:p-12 rounded-[2rem] shadow-2xl h-full">

                        <div className="mb-10 text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                                <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/30 font-bold">A</div>
                                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Adhikar<span className="text-blue-600">.</span></span>
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{t('auth.login_welcome')}</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">{t('auth.login_ready')}</p>
                        </div>

                        {!showOtp ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="group">
                                    <label className="block text-sm font-extrabold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider ml-1">{t('auth.mobile_label')}</label>
                                    <div className="relative flex items-center transition-transform duration-300 group-hover:-translate-y-1">
                                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-l-2xl flex items-center justify-center text-white font-bold z-10">
                                            +91
                                        </div>
                                        <input
                                            type="tel"
                                            className="w-full pl-20 pr-4 py-5 bg-white dark:bg-slate-800 border-2 border-blue-500 dark:border-blue-400 rounded-2xl font-bold text-xl text-slate-900 dark:text-white shadow-xl shadow-blue-200/50 dark:shadow-blue-900/20 focus:border-purple-500 focus:outline-none transition-all"
                                            placeholder="98765-43210"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            maxLength={10}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 mt-3 ml-1">
                                        <p className="text-xs text-slate-400">
                                            Demo Adult: <span className="font-mono font-bold text-blue-500 cursor-pointer hover:underline" onClick={() => setMobile('9876543210')}>98765-43210</span>
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Demo Kid: <span className="font-mono font-bold text-pink-500 cursor-pointer hover:underline" onClick={() => setMobile('5555555555')}>55555-55555</span>
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGetOtp}
                                    className="w-full py-5 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-3"
                                >
                                    {t('auth.get_otp')} <ArrowRight size={22} />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-3xl border border-blue-100 dark:border-slate-700 text-center">
                                    <p className="text-sm font-bold text-blue-800 dark:text-blue-400 uppercase tracking-widest mb-1">{t('auth.otp_sent_to')}</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">+91 {mobile}</p>
                                    <button onClick={() => setShowOtp(false)} className="text-xs font-bold text-blue-500 hover:text-blue-400 mt-3">{t('auth.change_number')}</button>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            ref={otpRefs[idx]}
                                            type="text"
                                            className="w-16 h-20 text-center text-4xl font-black bg-white dark:bg-slate-800 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all shadow-lg"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(idx, e)}
                                            maxLength={1}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleLogin}
                                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-2"
                                >
                                    {t('auth.verify_login')} <Check size={24} strokeWidth={3} />
                                </button>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700">
                            <Link href="/register">
                                <div className="relative bg-white dark:bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                                            <UserPlus size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">{t('auth.new_user')}</h3>
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">{t('auth.start_reg')}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-400" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
