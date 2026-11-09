import type { CSSProperties, ReactNode } from 'react';

/** The centred design frame (1440x900 desktop, 390x844 mobile) that scenes are laid out in. */
export function Frame({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`frame ${className ?? ''}`} style={style}>
      {children}
    </div>
  );
}

export default Frame;
