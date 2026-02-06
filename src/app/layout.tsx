'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Separate component to safely use useAuth hook inside context
function AppContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/login' && pathname !== '/register') {
      router.push('/login');
    }
  }, [user, isLoading, pathname, router]);

  const showNav = user && pathname !== '/login' && pathname !== '/register';

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50 text-blue-600">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      {showNav && (
        <>
          <Sidebar />
          <BottomNav />
        </>
      )}
      <div className={`main-content ${!showNav ? 'w-full !m-0 !p-0' : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <AppContent>{children}</AppContent>
              <ThemeToggle />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
