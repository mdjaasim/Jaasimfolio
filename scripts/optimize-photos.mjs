// Builds the web-ready photographs in public/photos from the 1600x1000 originals in design/photos.
// Usage: npm run photos
import { mkdir, readdir, rm } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SOURCE = 'design/photos';
const OUT = 'public/photos';
const WIDTHS = [640, 1080, 1600];
const QUALITY = 72;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const file of await readdir(SOURCE)) {
  if (!file.endsWith('.jpg')) continue;
  const { name } = parse(file);
  for (const width of WIDTHS) {
    await sharp(join(SOURCE, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(join(OUT, `${name}-${width}.webp`));
  }
  console.log('optimised', name);
}
