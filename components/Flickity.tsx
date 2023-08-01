import React, { ReactNode, useId, useRef } from 'react';
import type FlickityJs from 'flickity';

export type FlickityProps = {
  children: ReactNode
  flickityRef: (flickity: FlickityJs) => void
  options: FlickityJs.Options
}

export function Flickity({ children, flickityRef: flickityRefProp, options }: FlickityProps) {
  const id = useId();

  const elRef = useRef<HTMLElement>();
  const flickityRef = useRef<FlickityJs>();

  if (!flickityRef.current && elRef.current) {
    setup();
  }

  return (
    <div
      id={id}
      ref={el => elRef.current = el}
    >
      {children}
    </div>
  );

  async function setup() {
    const FlickityJs = (await import('flickity')).default;
    const flickity = new FlickityJs(elRef.current, options);

    flickityRef.current = flickity;
    flickityRefProp(flickity);
  }
}
