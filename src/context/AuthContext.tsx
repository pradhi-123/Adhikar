'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    user: UserProfile | null;
    isLoading: boolean;
    login: (profile: UserProfile) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('adhikar_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const publicPaths = ['/login', '/register'];
            const isKid = user && Number(user.age) < 17;

            // 1. Unauthenticated User attempting to access protected routes
            if (!user && !publicPaths.includes(pathname)) {
                router.push('/login');
                return;
            }

            // 2. Authenticated User on Public Pages (Login/Register) -> Redirect to respective dashboard
            if (user && publicPaths.includes(pathname)) {
                if (isKid) {
                    router.push('/kids');
                } else {
                    router.push('/');
                }
                return;
            }

            // 3. Strict Dashboard Segregation
            if (user) {
                if (isKid && !pathname.startsWith('/kids')) {
                    // Kid trying to access Main App -> Force Kids Mode
                    router.push('/kids');
                } else if (!isKid && pathname.startsWith('/kids')) {
                    // Adult trying to access Kids App -> Force Main App
                    router.push('/');
                }
            }
        }
    }, [user, isLoading, pathname, router]);

    const login = (profile: UserProfile) => {
        setUser(profile);
        localStorage.setItem('adhikar_user', JSON.stringify(profile));

        if (Number(profile.age) < 17) {
            router.push('/kids');
        } else {
            router.push('/');
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('adhikar_user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
