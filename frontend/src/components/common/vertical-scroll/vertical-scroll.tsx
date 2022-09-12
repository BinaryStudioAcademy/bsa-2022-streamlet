import styles from './style.module.scss';
import { Button } from '../button/button';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useEffect, useState } from '../../../hooks/hooks';
import { ReactElement, ReactNode, useContext } from 'react';
import clsx from 'clsx';

const Arrow = ({
  children,
  disabled,
  onClick,
  isRight,
}: {
  children: ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
  isRight: boolean;
}): ReactElement => {
  if (isRight) {
    return (
      <div className={styles['arrow-container']}>
        {!disabled && <div className={styles['blur-container']} />}
        <Button disabled={disabled} onClick={onClick} content={children} className={styles['arrow']} />
      </div>
    );
  }

  return (
    <div className={styles['arrow-container']}>
      {!disabled && <div className={clsx(styles['blur-container'], styles['blur-container-left'])} />}
      <Button disabled={disabled} onClick={onClick} content={children} className={styles['arrow']} />
    </div>
  );
};

const LeftArrow = (): ReactElement => {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={(): void => scrollPrev() as void} isRight={false}>
      {'<'}
    </Arrow>
  );
};

const RightArrow = (): ReactElement => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={(): void => scrollNext() as void} isRight={true}>
      {'>'}
    </Arrow>
  );
};

export { LeftArrow, RightArrow };
