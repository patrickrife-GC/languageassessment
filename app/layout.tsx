import type { Metadata } from 'next';
import './globals.css';
import Analytics from './analytics';

export const metadata: Metadata = {
  title: 'Language Demographics Assessment | Convey911',
  description:
    'Understand your community\'s language diversity and emergency communication needs with Census-based demographic data.',
  keywords:
    '911, PSAP, emergency services, language access, demographics, language barriers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
