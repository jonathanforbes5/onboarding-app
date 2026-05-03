import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Roof Ignite — Pod Manager Onboarding',
  description: 'Interactive onboarding for new Pod Managers at Roof Ignite',
  icons: {
    icon: '/icon-mark.png',
    shortcut: '/icon-mark.png',
    apple: '/icon-mark.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
