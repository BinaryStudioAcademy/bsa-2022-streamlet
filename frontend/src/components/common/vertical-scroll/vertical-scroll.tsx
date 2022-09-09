import React, { ReactElement } from 'react';
import styles from './style.module.scss';
import { Button } from '../button/button';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

const Arrow = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}): ReactElement => {
  return (
    <div className={styles['arrow-container']}>
      <Button disabled={disabled} onClick={onClick} content={children} className={styles['arrow']} />
    </div>
  );
};

const LeftArrow = (): ReactElement => {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(!initComplete || (initComplete && isFirstItemVisible));
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={(): void => scrollPrev() as void}>
      {'<'}
    </Arrow>
  );
};

const RightArrow = (): ReactElement => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={(): void => scrollNext() as void}>
      {'>'}
    </Arrow>
  );
};

export { LeftArrow, RightArrow };
