import clsx from 'clsx';
import { Button, Icon, Modal } from 'components/common/common';
import { StreamPosterUploadRequestDto, StreamUpdateRequestDto } from 'common/types/types';
import { FC, useCallback, useEffect, useState } from 'react';
import { StreamAppearanceForm } from './stream-settings-forms/stream-appearance-form/stream-appearance-form';
import { StreamBasicInfoForm } from './stream-settings-forms/stream-basic-info-form/stream-basic-info-form';
import styles from './styles.module.scss';
import { TabHeader } from './tabs/tab-header/tab-header';
import { Tab } from './tabs/tab.enum';
import { useAppDispatch, useAppForm, useAppSelector } from 'hooks/hooks';
import { categoryActions, streamActions } from 'store/actions';
import { StreamSettingsFormValues } from './stream-settings-forms/stream-basic-info-form/stream-settings-form-values';
import { IconColor, IconName } from 'common/enums/enums';
import { prettyDisplayCategoryName } from 'helpers/categories/pretty-display-category-name';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: StreamUpdateRequestDto) => void;
};

const StreamSettingsModal: FC<Props> = ({ onClose, isOpen, onSave }) => {
  const dispatch = useAppDispatch();
  const { stream, categories, temporaryPoster } = useAppSelector((state) => ({
    stream: state.stream.stream,
    categories: state.category.data,
    temporaryPoster: state.stream.temporaryPoster,
  }));

  const categoryOptions = categories.map((category) => ({ value: category.id, label: category.name }));

  const handlePosterUpload = useCallback(
    ({ base64Str }: Omit<StreamPosterUploadRequestDto, 'videoId'>): void => {
      dispatch(
        streamActions.uploadPoster({
          base64Str,
          videoId: stream?.id ?? '',
        }),
      );
    },
    [dispatch, stream?.id],
  );

  const onSubmit = (submitValue: StreamSettingsFormValues): void => {
    const { name, description, scheduledStreamDate, privacy, tags, categories } = submitValue;

    onSave({
      name,
      description,
      scheduledStreamDate,
      privacy,
      videoId: stream?.id ?? '',
      tags: tags?.map((tag) => tag.label) ?? [],
      categories: categories?.map((category) => category.label) ?? [],
      poster: temporaryPoster ?? stream?.poster ?? '',
    });
    onClose();
  };

  const defaultValues = useCallback(
    () => ({
      name: stream?.name,
      tags: stream?.tags.map((tag) => ({ value: tag.id, label: tag.name })),
      categories: stream?.categories.map((category) => ({
        value: category.id,
        label: prettyDisplayCategoryName(category.name),
      })),
      description: stream?.description,
      scheduledStreamDate: stream?.scheduledStreamDate ? new Date(stream?.scheduledStreamDate) : new Date(),
      privacy: stream?.privacy,
      poster: temporaryPoster ?? stream?.poster,
    }),
    [stream, temporaryPoster],
  );

  const { control, errors, reset, handleSubmit } = useAppForm<StreamSettingsFormValues>({
    defaultValues: defaultValues(),
  });

  const handleClose = (): void => {
    dispatch(streamActions.resetTemporaryPoster());
    onClose();
  };

  useEffect(() => {
    dispatch(categoryActions.getCategories());
    reset(defaultValues());
  }, [dispatch, defaultValues, reset]);

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.GeneralInfo);
  const [isParentModalInvisible, setIsParentModalInvisible] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeButtonColor={IconColor.WHITE}
      isNeedCloseButton={false}
      portalClassName={clsx(isParentModalInvisible && styles['invisible'])}
      contentContainerClassName={clsx(styles['modal-container'], isParentModalInvisible && styles['invisible'])}
    >
      <div className={styles['header']}>
        <h1 className={styles['heading']}>Stream settings</h1>
        <Icon
          name={IconName.CLOSE}
          width={'20'}
          height={'20'}
          className={styles['close-icon']}
          onClick={handleClose}
          color="var(--always-white-color)"
        />
      </div>
      <div className={styles['content']}>
        <TabHeader currentTab={currentTab} setTab={setCurrentTab} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles['form-container']}>
          <div className={styles['form']}>
            {currentTab === Tab.GeneralInfo && (
              <StreamBasicInfoForm categoryOptions={categoryOptions} control={control} errors={errors} />
            )}
            {currentTab === Tab.Appearance && (
              <StreamAppearanceForm
                setParentModalInvisible={setIsParentModalInvisible}
                currentPreviewPicture={temporaryPoster ?? stream?.poster ?? ''}
                handleImageUpload={handlePosterUpload}
              />
            )}
          </div>
          <div className={styles['footer']}>
            <Button content="Save" type="submit" className={styles['control-btn']} />
            <Button content="Cancel" type="button" className={styles['control-btn']} onClick={handleClose} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export { StreamSettingsModal };
