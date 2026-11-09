import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/config/site';
import { t } from '@/content';
import '@/styles/globals.css';
import { Providers } from '@/components/providers/providers';
import { storageKeys } from '@/config/preferences';
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

export const viewport: Viewport = {
  themeColor: site.themeColor,
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: copy.meta.jobTitle,
  homeLocation: { '@type': 'Place', name: site.city },
  sameAs: [site.linkedin, site.github],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.locale} className={fontVariables}>
      <body>
        {/* Without JavaScript the launch overlay would stay up; hide it. */}
        <noscript>
          <style>{'[data-launch]{display:none!important}'}</style>
        </noscript>
        {/* Returning visitors skip the launch: hide its overlay before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('${storageKeys.launchSeen}')==='1')document.documentElement.dataset.launchSeen='1'}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
