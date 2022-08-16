import styles from './styles.module.scss';
import { FC } from 'common/types/types';
import { useModal } from './hooks/use-modal/use-modal.hook';
import { ReactElement } from 'react';
import { Portal } from '../portal/portal';
import { IconColor, IconName } from '../../../common/enums/enums';
import { Icon } from '../icon';

type Props = {
  children: ReactElement;
  isOpen: boolean;
  onClose: { (): void };
};

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  const { handleDisableContentContainerClick, handleOutsideClick } = useModal({
    onClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={styles['modal-container']} onClick={handleOutsideClick}>
        <div className={styles['modal-content-container']} onClick={handleDisableContentContainerClick}>
          <Icon
            name={IconName.CLOSE}
            color={IconColor.GREEN}
            width={'20'}
            height={'20'}
            className={styles['close-icon']}
            onClick={onClose}
          />
          {children}
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
