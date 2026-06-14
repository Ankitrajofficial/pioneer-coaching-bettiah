import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FloatWhatsApp from '@/components/FloatWhatsApp';

export const metadata: Metadata = {
  title: {
    default: 'Pioneer Coaching — Class 11 & 12 Maths & Biology | Bettiah, Bihar',
    template: '%s',
  },
  description:
    'Pioneer Coaching, Bettiah — expert coaching for Class 11 & 12 Mathematics and Biology. Small batches, experienced faculty, regular tests and proven results.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Add the js class before paint so reveal-on-scroll content never flashes.
            Failsafe: if main.js (which runs the reveal observer) is slow or fails to
            load, force-show all .reveal content so the site is never stuck blank. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "window.addEventListener('load',function(){setTimeout(function(){" +
              "if(!window.__pioneerReveal){var e=document.querySelectorAll('.reveal');" +
              "for(var i=0;i<e.length;i++){e[i].classList.add('in');}}},1200);});",
          }}
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatWhatsApp />
        <Script src="/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
