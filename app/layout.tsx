import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Contractors Ignite — Pod Manager Onboarding',
  description: 'Interactive onboarding for new Marketing & Operations Managers at Contractors Ignite / RoofIgnite',
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
