import { Archivo, Fraunces, Geist, Geist_Mono } from 'next/font/google';

export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--nf-archivo',
  display: 'swap',
});
export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--nf-fraunces',
  display: 'swap',
});
export const geist = Geist({ subsets: ['latin'], variable: '--nf-geist', display: 'swap' });
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--nf-geist-mono',
  display: 'swap',
});

export const fontVariables = [archivo, fraunces, geist, geistMono].map((f) => f.variable).join(' ');
