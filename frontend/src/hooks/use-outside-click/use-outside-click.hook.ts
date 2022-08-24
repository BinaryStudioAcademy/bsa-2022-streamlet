import { useEffect, useRef, useState, RefObject } from 'react';
import { lockScroll, unlockScroll } from 'store/layout/actions';
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

  const open = (): void => {
    setIsOpened(true);
    dispatch(lockScroll());
  };

  const close = (): void => {
    setIsOpened(false);
    dispatch(unlockScroll());
  };

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
      dispatch(unlockScroll());
    };
  }, [isOpened, dispatch]);

  return { ref, isOpened, open, close, toggle };
};

export { useOutsideClick };
