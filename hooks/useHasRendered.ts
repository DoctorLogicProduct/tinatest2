import { useRef, useEffect } from 'react';

export function useHasRendered() {
  const hasRenderedRef = useRef(false);

  useEffect(() => {
    hasRenderedRef.current = true;
  });

  return hasRenderedRef.current;
}
