import type { Metadata } from 'next';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/components/Toast';
import { VisitorTracker } from '@/components/VisitorTracker';

export const metadata: Metadata = {
  title: 'Ryan Osama | Senior Full-Stack Software Engineer',
  description: 'Official portfolio and systems showcase of Ryan Osama - Architecting enterprise cloud platforms, database solutions, and high-performance applications.',
  keywords: ['Software Engineer', 'Full-Stack Developer', 'Next.js', 'PostgreSQL', 'Ryan Osama', 'ريان أسامة'],
  authors: [{ name: 'Ryan Osama' }],
  openGraph: {
    title: 'Ryan Osama | Senior Full-Stack Software Engineer',
    description: 'Official portfolio and systems showcase of Ryan Osama - Architecting enterprise cloud platforms, database solutions, and high-performance applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          <ToastProvider>
            <VisitorTracker />
            {children}
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
