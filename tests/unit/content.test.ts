import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PHOTO_WIDTHS } from '@/config/images';
import { caseStudies, fill, launchPhotoOrder, photos, t } from '@/content';

describe('content', () => {
  it('has a file on disk for every photo', () => {
    for (const photo of Object.values(photos)) {
      for (const width of PHOTO_WIDTHS) {
        const file = join(process.cwd(), 'public', `${photo.src}-${width}.webp`);
        expect(existsSync(file), file).toBe(true);
      }
    }
  });

  it('launch order covers every photo exactly once', () => {
    expect([...launchPhotoOrder].sort()).toEqual(Object.keys(photos).sort());
  });

  it('case studies reference real photos and have unique slugs', () => {
    const slugs = new Set(caseStudies.map((c) => c.slug));
    expect(slugs.size).toBe(caseStudies.length);
    for (const c of caseStudies)
      for (const id of [c.cover, c.phone, c.gallery]) expect(photos[id]).toBeDefined();
  });

  it('launch words include AI', () => {
    expect(t().launch.words).toContain('AI');
  });

  it('fills placeholders', () => {
    expect(fill(t().contact.thanksNamed, { name: 'Priya' })).toBe('Thanks, Priya.');
  });
});
