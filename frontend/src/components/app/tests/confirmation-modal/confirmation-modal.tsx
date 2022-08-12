import { ReactElement, useState } from 'react';
import { ConfirmationModal } from '../../../common/confirmation-modal/confirmation-modal';

const ConfirmationModalTest = (): ReactElement => {
  const [isNeedModal, setIsNeedModal] = useState(false);
  const [modalText, setModalText] = useState('');
  return (
    <div style={{ height: '10000000000px' }}>
      <label htmlFor="config-modal-text" style={{ color: 'black' }}>
        {' '}
        Enter modal text
      </label>
      <input
        type="text"
        onChange={(e): void => {
          setModalText(e.target.value);
        }}
      ></input>
      <button
        onClick={(): void => {
          setIsNeedModal(true);
        }}
      >
        show modal
      </button>
      <ConfirmationModal
        isOpen={isNeedModal}
        confirmationText={modalText}
        onCancel={(): void => setIsNeedModal(!isNeedModal)}
        onOk={(): void => setIsNeedModal(!isNeedModal)}
      />
    </div>
  );
};
export { ConfirmationModalTest };
