'use client';

import { useEffect, useState } from 'react';

/** HH:MM in a time zone; empty until mounted so server and client markup match. */
export function useClock(timeZone: string, locale = 'en-GB'): string {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone, locale]);
  return time;
}
