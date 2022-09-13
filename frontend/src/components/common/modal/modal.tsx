import styles from './styles.module.scss';
import { FC } from 'common/types/types';
import { useModal } from './hooks/use-modal/use-modal.hook';
import { ReactNode } from 'react';
import { Portal } from '../portal/portal';
import { IconColor, IconName } from '../../../common/enums/enums';
import { Icon } from '../icon';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  addShadowOverlay?: boolean;
  contentContainerClassName?: string;
  closeButtonColor?: IconColor;
  onClose: { (): void };
  isNeedCloseButton?: boolean;
  isNeedHiddenOverflow?: boolean;
};

const Modal: FC<Props> = ({
  isOpen,
  isNeedHiddenOverflow = false,
  onClose,
  children,
  addShadowOverlay = false,
  contentContainerClassName,
  isNeedCloseButton = true,
  closeButtonColor = IconColor.GREEN,
}) => {
  const { handleDisableContentContainerClick, handleOutsideClick } = useModal({
    onClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={clsx(styles['modal-container'], addShadowOverlay && styles['shadow-overlay'])}
        onClick={handleOutsideClick}
      >
        <div
          className={clsx(styles['modal-content-container'], contentContainerClassName)}
          style={{ overflow: isNeedHiddenOverflow ? 'hidden' : 'auto' }}
          onClick={handleDisableContentContainerClick}
        >
          {isNeedCloseButton && (
            <Icon
              name={IconName.CLOSE}
              color={closeButtonColor}
              width={'20'}
              height={'20'}
              className={styles['close-icon']}
              onClick={onClose}
            />
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
