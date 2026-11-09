import { en, type Content } from './en';

const locales = { en } as const;
export type Locale = keyof typeof locales;

/** Single accessor for copy; add locales to `locales` to translate. */
export function t(locale: Locale = 'en'): Content {
  return locales[locale];
}

/** Replace {token} placeholders, e.g. fill('Thanks, {name}.', { name: 'Priya' }). */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}

export { photos, launchPhotoOrder } from './photos';
export type { Photo, PhotoId } from './photos';
export { caseStudies } from './work';
export type { CaseStudy } from './work';
