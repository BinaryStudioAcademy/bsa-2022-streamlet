import { PreferencesModal } from 'components/common/preferences-modal/preferences-modal';
import { useAppDispatch } from 'hooks/hooks';
import { ReactElement, useState } from 'react';
import { clearPreferences } from 'store/preferences/actions';

const PreferencesModalTest = (): ReactElement => {
  const [isNeedModal, setIsNeedModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    dispatch(clearPreferences());
    setIsNeedModal(!isNeedModal);
  };

  return (
    <div style={{ height: '10000000000px' }}>
      <button onClick={(): void => setIsNeedModal(true)}>show modal</button>
      <PreferencesModal
        isOpen={isNeedModal}
        onClose={handleClose}
        onSubmit={(): void => setIsNeedModal(!isNeedModal)}
      />
    </div>
  );
};
export { PreferencesModalTest };
