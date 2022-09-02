import clsx from 'clsx';
import { Button, Modal } from 'components/common/common';
import { StreamUpdateRequestDto } from 'common/types/types';
import { FC, useCallback, useEffect, useState } from 'react';
import { StreamAppearanceForm } from './stream-edit-forms/stream-appearance-form/stream-appearance-form';
import { StreamBasicInfoForm } from './stream-edit-forms/stream-basic-info-form/stream-basic-info-form';
import styles from './styles.module.scss';
import { TabHeader } from './tabs/tab-header/tab-header';
import { Tab } from './tabs/tab.enum';
import { useAppDispatch, useAppForm, useAppSelector } from 'hooks/hooks';
import { categoryActions, streamActions } from 'store/actions';
import { StreamSettingsFormValues } from './stream-edit-forms/stream-basic-info-form/stream-settings-form-values';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const StreamEditModal: FC<Props> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch();
  const { stream, categories } = useAppSelector((state) => ({
    stream: state.stream.stream,
    categories: state.category.data,
  }));

  const categoryOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  const handleFormSave = useCallback(
    (payload: StreamUpdateRequestDto) => {
      dispatch(streamActions.editStream(payload));
    },
    [dispatch],
  );

  const onSubmit = (submitValue: StreamSettingsFormValues): void => {
    const { name, description, scheduledStreamDate, privacy, tags, categories } = submitValue;
    handleFormSave({
      name,
      description,
      scheduledStreamDate,
      privacy,
      videoId: stream?.id ?? '',
      tags: tags?.map((tag) => ({ name: tag.label })) ?? [],
      categories: categories?.map((category) => ({ name: category.label })) ?? [],
    });
  };

  const defaultValues = useCallback(
    () => ({
      name: stream?.name,
      tags: stream?.tags.map((tag) => ({ value: tag.id, label: tag.name })),
      categories: stream?.categories.map((category) => ({ value: category.id, label: category.name })),
      description: stream?.description,
      scheduledStreamDate: stream?.scheduledStreamDate ? new Date(stream?.scheduledStreamDate) : new Date(),
      privacy: stream?.privacy,
    }),
    [stream],
  );

  // const handleUploadPoster = useCallback(
  //   (payload: StreamPosterUploadRequestDto) => {
  //     dispatch(streamActions.uploadPoster(payload));
  //   },
  //   [dispatch],
  // );

  const { control, errors, reset, handleSubmit } = useAppForm<StreamSettingsFormValues>({
    defaultValues: defaultValues(),
  });

  useEffect(() => {
    dispatch(categoryActions.getCategories());
    reset(defaultValues());
  }, [dispatch, defaultValues, reset]);

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.GeneralInfo);
  const [isParentModalInvisible, setIsParentModalInvisible] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentContainerClassName={clsx(styles['modal-container'], isParentModalInvisible && styles['invisible'])}
    >
      <div className={styles['header']}>
        <h1 className={styles['heading']}>Stream settings</h1>
      </div>
      <TabHeader currentTab={currentTab} setTab={setCurrentTab} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        {currentTab === Tab.GeneralInfo && (
          <StreamBasicInfoForm categoryOptions={categoryOptions} control={control} errors={errors} />
        )}
        {currentTab === Tab.Appearance && <StreamAppearanceForm setParentModalInvisible={setIsParentModalInvisible} />}
        <div className={styles['footer']}>
          <Button content="Save" type="submit" className={styles['control-btn']} />
          <Button content="Cancel" type="button" className={styles['control-btn']} onClick={onClose} />
        </div>
      </form>
    </Modal>
  );
};

export { StreamEditModal };
