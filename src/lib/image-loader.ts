import { PHOTO_WIDTHS } from '@/config/images';

/** next/image loader for the pre-built photographs: pick the smallest built width that is large enough. */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const best = PHOTO_WIDTHS.find((w) => w >= width) ?? PHOTO_WIDTHS[PHOTO_WIDTHS.length - 1];
  return `${src}-${best}.webp`;
}

/** The URL next/image will request for a photograph on this screen; used to warm the cache. */
export function warmUrl(src: string): string {
  const needed = Math.ceil(window.innerWidth * (window.devicePixelRatio || 1));
  return imageLoader({ src, width: needed });
}
