import type { PhotoId } from './photos';

export interface CaseStudy {
  slug: string;
  title: string;
  /** Per-case display size so long titles never clip (design px at 1440 wide). */
  titleSize: { fontSize: number; lineHeight: number };
  summary: string;
  role: string;
  stack: string;
  problem: string;
  built: string;
  outcome: string;
  /** Optional until filled; the row is hidden while undefined. */
  year?: string;
  liveUrl?: string;
  cover: PhotoId;
  phone: PhotoId;
  gallery: PhotoId;
}

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'filozo',
    title: 'Filozo',
    titleSize: { fontSize: 280, lineHeight: 240 },
    summary: 'Next.js · TypeScript',
    role: 'Architecture and front-end development',
    stack: 'Next.js, React, TypeScript, Tailwind CSS',
    problem:
      'A financial services business needed one platform for GST filing, corporate registrations and Virtual CFO services, quick to use on any device.',
    built:
      'A high-performance, modular multi-page platform in React and Tailwind CSS, with responsive patterns that keep navigation and load times fast on desktop and mobile.',
    outcome:
      'Each release was refined with the stakeholders to match their business goals and compliance standards, and the structure is ready for future features.',
    cover: 'tower-up',
    phone: 'monitors',
    gallery: 'code-dark',
  },
  {
    slug: 'borderless',
    title: 'Borderless',
    titleSize: { fontSize: 228, lineHeight: 196 },
    summary: 'Borderless Creatives · Figma to code',
    role: 'Front-end development',
    stack: 'Next.js, React, TypeScript, Tailwind CSS',
    problem:
      'A senior Canadian UI/UX designer needed a portfolio site that matched complex Figma design systems pixel for pixel.',
    built:
      'A scalable component library so every interactive element mirrors the design intent, with a focus on front-end performance and accessibility.',
    outcome:
      'The whole cycle, from design translation to deployment, with detail-oriented implementation of complex layouts.',
    cover: 'facade',
    phone: 'code-laptop',
    gallery: 'tower-night',
  },
  {
    slug: 'kem',
    title: 'KEM',
    titleSize: { fontSize: 280, lineHeight: 240 },
    summary: 'KEM Collections · Klaviyo',
    role: 'Build and launch',
    stack: 'Klaviyo, HTML/CSS, JavaScript',
    problem:
      'A new apparel brand needed a pre-launch landing platform to build its audience before the full storefront.',
    built:
      'Klaviyo marketing workflows to capture interest, manage email subscriptions and automate launch announcements, with custom signup forms.',
    outcome:
      'A functional marketing foundation that passed smoothly to the internal team for full-scale development.',
    cover: 'circuit',
    phone: 'server-blue',
    gallery: 'ai-network',
  },
  {
    slug: 'fuze',
    title: 'Fuze',
    titleSize: { fontSize: 280, lineHeight: 240 },
    summary: 'React Native · Expo · 4 apps live',
    role: 'Mobile and web lead',
    stack: 'React Native, Expo, Node.js, Prisma',
    problem:
      'Fitness apps needed complex workout engines, calendar scheduling and AI-driven personalisation across several brands.',
    built:
      'Four live apps on the App Store and Play Store, a shared bug-report SDK, the release lifecycle, and the in-house websites with Mixpanel and Stripe.',
    outcome:
      'Smoother FPS from UI and JS thread work, faster loads, and release flows kept in sync between staging and live.',
    cover: 'code-dark',
    phone: 'code-blue',
    gallery: 'monitors',
  },
];
