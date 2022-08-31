import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { AvatarImgValue, FC } from 'common/types/types';
import { ImageEditor, Loader, UploadImage } from 'components/common/common';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect, useState, useCallback } from 'react';
import { ChannelProfileUpdateMediaRequestDto, ChannelProfileUpdateRequestDto, DefaultRequestParam } from 'shared/build';
import { loadMyChannelInfo, unloadChannelInfo, updateChannelInfo } from 'store/channel/actions';
import { ChannelSettingsForm } from './common/channel-settings-form';
import defaultChannelAvatar from '../../../assets/img/default-channel-avatar.jpg';

import styles from './styles.module.scss';
import { ImageListType } from 'react-images-uploading';

const StudioChannel: FC = () => {
  const dispatch = useAppDispatch();
  const [formError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isNeedUpload, setIsNeedUpload] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [formLoading] = useState<boolean>(false);
  const [isNeedImageEditor, setIsNeedImageEditor] = useState(false);
  const [images, setImages] = useState([]);
  const [preparedAvatar, setPreparedAvatar] = useState<AvatarImgValue>({
    cropperOpen: false,
    img: null,
    zoom: 3,
    croppedImg: '',
    rotate: 0,
  });
  const { data: channelData, status: channelDataStatus } = useAppSelector((state) => ({
    data: state.channel.channelSettings.data,
    status: state.channel.channelSettings.dataStatus,
  }));

  useEffect(() => {
    dispatch(loadMyChannelInfo());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(unloadChannelInfo());
    };
  }, [dispatch]);

  const onChange = (imageList: ImageListType): void => {
    setImages(imageList as never[]);
    setPreparedAvatar({
      cropperOpen: false,
      img: imageList[0],
      zoom: 3,
      croppedImg: avatar as string,
      rotate: 0,
    });
    setIsNeedUpload(false);
    setIsNeedImageEditor(!isNeedImageEditor);
    setImages([]);
  };

  const onUploadImageClose = (): void => {
    setIsNeedUpload(!isNeedUpload);
    setImages([]);
  };

  const handleImageSave = useCallback(async (payload: ChannelProfileUpdateMediaRequestDto & DefaultRequestParam) => {
    try {
      setIsLoading(true);
      /* eslint no-console: 0 */
      console.log(payload);
    } catch {
      setError(ErrorMessage.DEFAULT);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onImageSave = async (base64Str: string): Promise<void> => {
    setIsNeedImageEditor(!isNeedImageEditor);
    await handleImageSave({ base64Str, id });
  };

  const onFormSubmit = async (submitValue: ChannelProfileUpdateRequestDto): Promise<void> => {
    dispatch(
      updateChannelInfo({
        id,
        ...submitValue,
      }),
    );
  };

  if (channelDataStatus === DataStatus.PENDING || !channelData) {
    return <Loader spinnerSize={'lg'} vCentered={true} hCentered={true} />;
  }

  const { name, description, avatar, id } = channelData;

  return (
    <div className={styles['preference-page-content-container']}>
      {isNeedUpload && <UploadImage images={images} onUpload={onChange} onClose={onUploadImageClose} />}
      {isNeedImageEditor && (
        <ImageEditor
          avatar={preparedAvatar}
          setAvatar={setPreparedAvatar}
          onClose={(): void => setIsNeedImageEditor(false)}
          handleSave={onImageSave}
        />
      )}
      <div className={styles['channel-preferences-container']}>
        <div className={styles['channel-preferences-main-content-container']}>
          <div className={styles['image-setting-container']}>
            <h2 className={styles['channel-image-header']}>channel avatar</h2>
            <div className={styles['channel-image-upload-container']}>
              <div className={styles['avatar-container']}>
                {isLoading ? (
                  <Loader spinnerSize={'xs'} className={styles['channel-page-loader-container']} />
                ) : (
                  <img
                    className={styles['profile-image-preview']}
                    width={'96'}
                    height={'96'}
                    src={avatar === '' ? defaultChannelAvatar : avatar}
                    alt="channel avatar preview"
                  />
                )}
              </div>
              <div className={styles['image-upload-control-container']}>
                <button
                  type="button"
                  className={styles['image-upload-button']}
                  onClick={(): void => {
                    setIsNeedUpload(!isNeedUpload);
                  }}
                >
                  Upload channel avatar
                </button>
                <span>
                  {error ? (
                    <span className={styles['error-message']}>{error}</span>
                  ) : (
                    'File format: JPG/PNG, max size: 10MB'
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={styles['image-setting-container']}>
            <h2 className={styles['channel-image-header']}>channel banner</h2>
            <div className={styles['channel-image-upload-container']}>
              <div className={styles['image-upload-control-container']}>
                <button type="button" className={styles['image-upload-button']}>
                  Upload channel banner
                </button>
              </div>
            </div>
          </div>
          <h2 className={styles['channel-settings-header']}>Channel preferences</h2>
          <h3 className={styles['channel-settings-sub-header']}>Change information about your channel</h3>
          <ChannelSettingsForm
            onSubmit={onFormSubmit}
            error={formError}
            isLoading={formLoading}
            defaultFormValue={{ name, description }}
          />
        </div>
      </div>
    </div>
  );
};
export { StudioChannel };
