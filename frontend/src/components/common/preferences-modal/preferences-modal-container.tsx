import { DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { ConfirmationModal } from 'components/common/common';
import { PreferencesModal } from 'components/common/preferences-modal/preferences-modal';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useCallback, useEffect, useState } from 'react';
import { UserBindCategoriesDto } from 'shared/build';
import { bindPreferences, chooseAllPreferences } from 'store/preferences/actions';

interface Props {
  isOpenModal?: boolean;
  manualOpenModal?: boolean;
  closeManualModal?: (value: boolean) => void;
}

const PreferencesModalContainer: FC<Props> = ({ isOpenModal, manualOpenModal, closeManualModal }) => {
  const dispatch = useAppDispatch();

  const { choosedPreferences } = useAppSelector((state) => ({
    choosedPreferences: state.preference,
  }));

  const [isNeedModal, setIsNeedModal] = useState(false);
  const [isNeedConfirmModal, setIsNeedConfirmModal] = useState(false);

  if (manualOpenModal) {
    useEffect(() => {
      setIsNeedModal(Boolean(isOpenModal));
    }, [isOpenModal]);
  }

  if (!manualOpenModal) {
    const isHavePreferences = Boolean(choosedPreferences.data.length);
    useEffect(() => {
      if (choosedPreferences.dataStatus === DataStatus.FULFILLED) {
        setIsNeedModal(!isHavePreferences);
      }
    }, [choosedPreferences, isHavePreferences]);
  }

  const [pickedCategories, setPickedCategories] = useState<Omit<UserBindCategoriesDto, 'id'>>({
    categories: choosedPreferences.data,
  });
  const wrapperSetPickedCategories = useCallback(
    (categories: Omit<UserBindCategoriesDto, 'id'>) => {
      setPickedCategories(categories);
    },
    [setPickedCategories],
  );

  const handleClose = (): void => {
    setIsNeedConfirmModal(true);
  };

  const handleSubmit = (): void => {
    if (manualOpenModal && closeManualModal) {
      closeManualModal(false);
    }

    setIsNeedModal(false);
    if (pickedCategories) {
      dispatch(bindPreferences(pickedCategories));
    }
  };

  const handleConfirm = (): void => {
    if (manualOpenModal && closeManualModal) {
      closeManualModal(false);
    }

    dispatch(chooseAllPreferences());
    setIsNeedConfirmModal(false);
    setIsNeedModal(!isNeedModal);
  };

  const handleCancelConfirm = (): void => {
    setIsNeedConfirmModal(false);
    setIsNeedModal(true);
  };

  return (
    <>
      <PreferencesModal
        isOpen={isNeedModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        setPickedCategories={wrapperSetPickedCategories}
        pickedCategories={pickedCategories}
      />
      <ConfirmationModal
        isOpen={isNeedConfirmModal}
        onOk={handleConfirm}
        onCancel={handleCancelConfirm}
        confirmationText={'Are you sure?'}
      />
    </>
  );
};
export { PreferencesModalContainer };
