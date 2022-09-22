import React, { useEffect } from 'react';

export const useOutsideClickHandler = (
  refs: React.MutableRefObject<HTMLElement | null>[],
  outsideClickHandler: (e: MouseEvent) => void,
): void => {
  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (refs.every((ref) => ref.current && e.target instanceof Node && !ref.current.contains(e.target))) {
        outsideClickHandler(e);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handler);
    };
  }, [refs, outsideClickHandler]);
};
