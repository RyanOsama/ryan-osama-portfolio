import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ريان أسامة | مهندس برمجيات ومطور أنظمة سحابية',
  description: 'الموقع الرسمي ومعرض الأعمال للمطور ريان أسامة - استعراض المشاريع، الأنظمة المؤسسية، والحلول البرمجية المتكاملة.',
  keywords: ['مهندس برمجيات', 'مطور ويب', 'Next.js', 'PostgreSQL', 'ريان أسامة', 'Full-Stack Developer'],
  authors: [{ name: 'ريان أسامة' }],
  openGraph: {
    title: 'ريان أسامة | مهندس برمجيات ومطور أنظمة سحابية',
    description: 'الموقع الرسمي ومعرض الأعمال للمطور ريان أسامة - استعراض المشاريع، الأنظمة المؤسسية، والحلول البرمجية المتكاملة.',
    type: 'website',
    locale: 'ar_AR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
