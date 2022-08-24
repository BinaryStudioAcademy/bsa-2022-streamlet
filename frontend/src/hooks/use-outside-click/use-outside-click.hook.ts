import { useEffect, useRef, useState, RefObject } from 'react';
import { useAppDispatch } from '../hooks';

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
  const dispatch = useAppDispatch();
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
        e.preventDefault();
        e.stopPropagation();
        setIsOpened(false);
      }
    };

    const disableScroll = (e: Event): void => {
      if (!(e.target instanceof Node)) {
        return;
      }
      if (!element.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('wheel', disableScroll, { passive: false });
    window.addEventListener('touchmove', disableScroll, { passive: false });

    window.addEventListener('click', handleClick, true);

    return (): void => {
      window.removeEventListener('click', handleClick, true);
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('touchmove', disableScroll);
    };
  }, [isOpened, dispatch]);

  return { ref, isOpened, open, close, toggle };
};

export { useOutsideClick };
