import { useEffect, useRef, useState, RefObject } from 'react';

interface UseOutsideClickResult<RefType extends HTMLElement> {
  ref: RefObject<RefType>;
  isOpened: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useOutsideClick = <RefType extends HTMLElement = HTMLElement>(
  defaultIsOpened = false,
): UseOutsideClickResult<RefType> => {
  const ref = useRef<RefType>(null);
  const [isOpened, setIsOpened] = useState(defaultIsOpened);

  const open = (): void => setIsOpened(true);

  const close = (): void => setIsOpened(false);

  const toggle = (): void => setIsOpened(!isOpened);

  useEffect((): void | (() => void) => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;

    const handleClick = (e: MouseEvent): void => {
      if (!(e.target instanceof Node)) {
        return;
      }

      if (!element.contains(e.target)) {
        e.stopPropagation();
        setIsOpened(false);
      }
    };

    window.addEventListener('click', handleClick, true);

    return (): void => {
      window.removeEventListener('click', handleClick, true);
    };
  }, [isOpened]);

  return { ref, isOpened, open, close, toggle };
};

export { useOutsideClick };
