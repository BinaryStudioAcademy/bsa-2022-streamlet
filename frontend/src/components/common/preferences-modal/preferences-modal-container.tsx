import { DataStatus } from 'common/enums/enums';
import { ConfirmationModal } from 'components/common/common';
import { PreferencesModal } from 'components/common/preferences-modal/preferences-modal';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { UserBindCategoriesDto } from 'shared/build';
import { bindPreferences, chooseAllPreferences } from 'store/preferences/actions';

const PreferencesModalContainer = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { choosedPreferences } = useAppSelector((state) => ({
    choosedPreferences: state.preference,
  }));

  const [isNeedModal, setIsNeedModal] = useState(false);
  const [isNeedConfirmModal, setIsNeedConfirmModal] = useState(false);

  useEffect(() => {
    if (choosedPreferences.dataStatus === DataStatus.FULFILLED) {
      setIsNeedModal(!choosedPreferences.data.length);
    }
  }, [choosedPreferences]);

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
    setIsNeedModal(false);
    if (pickedCategories) {
      dispatch(bindPreferences(pickedCategories));
    }
  };

  const handleConfirm = (): void => {
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
