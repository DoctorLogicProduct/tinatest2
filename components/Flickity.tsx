import React, { ReactNode, useId } from 'react';
import type FlickityJs from 'flickity';

export type FlickityProps = {
  children: ReactNode
  flickityRef: (flickity: FlickityJs) => void
  options: FlickityJs.Options
}

export function Flickity({ children, flickityRef: flickityRefProp, options }: FlickityProps) {
  const id = useId();

  return (
    <div
      id={id}
      ref={el => {
        if (el) {
          setup(el);
        }
      }}
    >
      {children}
    </div>
  );

  async function setup(el: HTMLElement) {
    const FlickityJs = (await import('flickity')).default;
    const flickity = new FlickityJs(el, options);

    flickityRefProp(flickity);
  }
}
