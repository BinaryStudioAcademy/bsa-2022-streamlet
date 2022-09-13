import styles from './style.module.scss';
import { Button } from '../button/button';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useEffect, useState } from '../../../hooks/hooks';
import { ReactElement, ReactNode, useContext } from 'react';
import clsx from 'clsx';
import { Icon } from '../common';
import { IconColor, IconName } from '../../../common/enums/enums';
import { FC } from '../../../common/types/react/fc.type';

type PropsLeftRightArrow = {
  isFollowingOrBrowse?: boolean;
};

const Arrow = ({
  children,
  disabled,
  onClick,
  isRight,
  isFollowingOrBrowse = false,
}: {
  children: ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
  isRight: boolean;
  isFollowingOrBrowse?: boolean;
}): ReactElement => {
  if (isRight) {
    return (
      <div className={styles['arrow-container']}>
        {!disabled && (
          <div
            className={clsx(styles['blur-container'], {
              [styles['blur-container-following-browse']]: isFollowingOrBrowse && isRight,
            })}
          />
        )}
        <Button disabled={disabled} onClick={onClick} content={children} className={styles['arrow']} />
      </div>
    );
  }

  return (
    <div className={styles['arrow-container']}>
      {!disabled && (
        <div
          className={clsx(styles['blur-container'], [styles['blur-container-left']], {
            [styles['blur-container-following-browse-left']]: isFollowingOrBrowse,
          })}
        />
      )}
      <Button disabled={disabled} onClick={onClick} content={children} className={styles['arrow']} />
    </div>
  );
};

const LeftArrow: FC<PropsLeftRightArrow> = ({ isFollowingOrBrowse = false }): ReactElement => {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow
      disabled={disabled}
      onClick={(): void => scrollPrev() as void}
      isRight={false}
      isFollowingOrBrowse={isFollowingOrBrowse}
    >
      <Icon name={IconName.HORIZONTAL_SCROLL_LEFT_ARROW} color={IconColor.GRAY} width={'16'} height={'16'} />
    </Arrow>
  );
};

const RightArrow: FC<PropsLeftRightArrow> = ({ isFollowingOrBrowse = false }): ReactElement => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow
      disabled={disabled}
      onClick={(): void => scrollNext() as void}
      isRight={true}
      isFollowingOrBrowse={isFollowingOrBrowse}
    >
      <Icon name={IconName.HORIZONTAL_SCROLL_RIGHT_ARROW} color={IconColor.GRAY} width={'16'} height={'16'} />
    </Arrow>
  );
};

export { LeftArrow, RightArrow };
