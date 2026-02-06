'use client';

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

type AlertType = 'success' | 'error' | 'info';

interface CustomAlertProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: AlertType;
}

export default function CustomAlert({ isOpen, onClose, title, message, type = 'info' }: CustomAlertProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timer = setTimeout(() => setVisible(false), 300); // Wait for exit animation
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={48} className="text-green-500" />;
            case 'error': return <AlertCircle size={48} className="text-red-500" />;
            default: return <Info size={48} className="text-blue-500" />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success': return 'bg-green-50 border-green-100 text-green-900';
            case 'error': return 'bg-red-50 border-red-100 text-red-900';
            default: return 'bg-blue-50 border-blue-100 text-blue-900';
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'bg-slate-900/60 backdrop-blur-sm opacity-100' : 'bg-transparent opacity-0 pointer-events-none'}`}>
            <div
                className={`bg-white w-full max-w-sm rounded-[2rem] shadow-2xl transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-10 opacity-0'}`}
            >
                <div className="p-6 text-center relative overflow-hidden">
                    {/* Decorative Background Blob */}
                    <div className={`absolute top-0 left-0 w-full h-24 opacity-20 ${getColors().split(' ')[0]}`}></div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-slate-100/50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white p-4 rounded-full shadow-lg mb-4 mt-2">
                            {getIcon()}
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 mb-2">{title}</h3>
                        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                            {message}
                        </p>

                        <button
                            onClick={onClose}
                            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all ${type === 'error' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/30'}`}
                        >
                            {type === 'error' ? 'Try Again' : 'Okay, Got it'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
