import { describe, expect, it } from 'vitest';
import { NAME_MAX_LENGTH, sanitizeName } from '@/engine/greeting';

describe('sanitizeName', () => {
  it('keeps letters from any script, apostrophes, hyphens and spaces', () => {
    expect(sanitizeName("Mary-Jane O'Neil")).toBe("Mary-Jane O'Neil");
    expect(sanitizeName('محمد')).toBe('محمد');
    expect(sanitizeName('José')).toBe('José');
  });

  it('drops digits, markup and symbols', () => {
    expect(sanitizeName('A1<b>d')).toBe('Abd');
    expect(sanitizeName('{{x}}')).toBe('x');
  });

  it('caps the length', () => {
    expect(sanitizeName('a'.repeat(40))).toHaveLength(NAME_MAX_LENGTH);
  });
});
