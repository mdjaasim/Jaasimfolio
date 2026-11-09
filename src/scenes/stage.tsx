'use client';

import { Frame } from '@/components/frame/frame';
import { Phone } from '@/components/phone/phone';
import { useMode } from '@/engine/mode';
import { useU } from '@/engine/timeline';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Craft } from './craft/craft';
import { Hello } from './hello/hello';
import { Hero } from './hero/hero';
import { Lab } from './lab/lab';
import { Numbers } from './numbers/numbers';
import { Panels } from './panels/panels';
import { Path } from './path/path';
import { Work } from './work/work';
import { brandAt, craftBeat, phoneState } from './phone-track';

/** The pinned stage: every scene is a function of the eased scroll position u. */
export function Stage() {
  const { mode, isMobile } = useMode();
  const scrolled = useU();
  // Free-scroll layouts arrive in a later wave; until then the stage holds the opening scene.
  const u = mode === 'guided' ? scrolled : 0;
  const phone = phoneState(u, isMobile);

  return (
    <>
      <Hello u={u} />
      <Hero u={u} />
      <Panels u={u} />
      <Craft u={u} />
      <Numbers u={u} />
      <Work u={u} />
      <Lab u={u} />
      <Path u={u} />
      <About u={u} />
      <Contact u={u} />
      {phone.visible && (
        <Frame style={{ zIndex: 3, pointerEvents: 'none' }}>
          <Phone
            screen={craftBeat(u)}
            brand={brandAt(u)}
            u={u}
            style={{
              transform: `translateY(calc(var(--design-h) * var(--s) * ${phone.yRatio.toFixed(4)})) rotate(${phone.rotationDeg.toFixed(2)}deg)`,
            }}
          />
        </Frame>
      )}
    </>
  );
}

export default Stage;
