'use client';

import type { ReactNode } from 'react';
import { ModeProvider } from '@/engine/mode';
import { TimelineProvider } from '@/engine/timeline';
import { Cursor } from '../cursor/cursor';

/** App-wide client providers: mode, timeline and the ball cursor (also present on the 404 page). */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ModeProvider>
      <TimelineProvider>
        {children}
        <Cursor />
      </TimelineProvider>
    </ModeProvider>
  );
}

export default Providers;
