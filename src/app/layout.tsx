import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/config/site';
import { t } from '@/content';
import '@/styles/globals.css';
import { Providers } from '@/components/providers/providers';
import { fontVariables } from './fonts';

const copy = t();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    type: 'website',
    url: site.url,
  },
};

export const viewport: Viewport = { themeColor: '#f1eee8', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.locale} className={fontVariables}>
      <body>
        <a className="skip-link" href="#main">
          {copy.a11y.skip}
        </a>
        <Providers>
          <main id="main" aria-label={copy.a11y.mainLabel}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
