import { Modal } from '../modal/modal';
import { FC } from '../../../common/types/react/fc.type';
import style from './styles.module.scss';
import clsx from 'clsx';

type ConfirmationModalProps = {
  confirmationText: string;
  onOk: () => void;
  onCancel: () => void;
  isOpen: boolean;
  isNeedCloseButton?: boolean;
  contentContainerClassName?: string;
  buttonContainerClassName?: string;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  confirmationText,
  onOk,
  onCancel,
  isNeedCloseButton,
  isOpen,
  contentContainerClassName,
  buttonContainerClassName,
}) => {
  return (
    <Modal
      contentContainerClassName={contentContainerClassName}
      isNeedCloseButton={isNeedCloseButton || false}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <div className={style['content-container']}>
        <span className={style['confirmation-text']}>{confirmationText}</span>
        <div className={clsx(style['button-container'], buttonContainerClassName)}>
          <button type="button" onClick={onCancel} className={style['button']}>
            Cancel
          </button>
          <button type="button" onClick={onOk} className={style['button']}>
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { ConfirmationModal };
