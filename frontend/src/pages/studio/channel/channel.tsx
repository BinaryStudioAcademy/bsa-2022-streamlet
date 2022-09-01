import { DataStatus, ErrorMessage, IconName } from 'common/enums/enums';
import { AvatarImgValue, FC } from 'common/types/types';
import { createToastNotification, ImageEditor, Loader, UploadImage } from 'components/common/common';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect, useState, useCallback } from 'react';
import { ChannelProfileUpdateMediaRequestDto, ChannelProfileUpdateRequestDto, DefaultRequestParam } from 'shared/build';
import {
  loadMyChannelInfo,
  unloadChannelInfo,
  updateChannelInfo,
  updateChannelAvatar,
  updateChannelBanner,
} from 'store/channel/actions';
import { ChannelSettingsForm } from './common/channel-settings-form';
import defaultChannelAvatar from '../../../assets/img/default-channel-avatar.jpg';
import defaulChannelBanner from '../../../assets/img/default-channel-banner.jpg';
import { store } from '../../../store/store';

import styles from './styles.module.scss';
import { ImageListType } from 'react-images-uploading';

const StudioChannel: FC = () => {
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);

  const [isNeedAvatarUpload, setIsAvatarNeedUpload] = useState(false);
  const [isNeedAvatarEditor, setIsNeedAvatarEditor] = useState(false);

  const [isNeedBannerUpload, setIsBannerNeedUpload] = useState(false);
  const [isNeedBannerEditor, setIsNeedBannerEditor] = useState(false);

  const [avatars, setAvatars] = useState([]);
  const [preparedAvatar, setPreparedAvatar] = useState<AvatarImgValue>({
    cropperOpen: false,
    img: null,
    zoom: 3,
    croppedImg: '',
    rotate: 0,
  });

  const [banners, setBanners] = useState([]);
  const [preparedBanner, setPreparedBanner] = useState<AvatarImgValue>({
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

  const onAvatarChange = (imageList: ImageListType): void => {
    setAvatars(imageList as never[]);
    setPreparedAvatar({
      cropperOpen: false,
      img: imageList[0],
      zoom: 3,
      croppedImg: avatar as string,
      rotate: 0,
    });
    setIsAvatarNeedUpload(false);
    setIsNeedAvatarEditor(!isNeedAvatarEditor);

    setAvatars([]);
  };

  const onBannerChange = (imageList: ImageListType): void => {
    setBanners(imageList as never[]);
    setPreparedBanner({
      cropperOpen: false,
      img: imageList[0],
      zoom: 3,
      croppedImg: avatar as string,
      rotate: 0,
    });
    setIsBannerNeedUpload(false);
    setIsNeedBannerEditor(!isNeedAvatarEditor);

    setBanners([]);
  };

  const onUploadAvatarClose = (): void => {
    setIsAvatarNeedUpload(!isNeedAvatarUpload);
    setAvatars([]);
  };

  const onUploadBannerClose = (): void => {
    setIsBannerNeedUpload(!isNeedBannerUpload);
    setBanners([]);
  };

  const handleAvatarSave = useCallback(
    async (payload: ChannelProfileUpdateMediaRequestDto & DefaultRequestParam) => {
      try {
        setIsLoadingAvatar(true);
        await dispatch(updateChannelAvatar(payload)).unwrap();
      } catch {
        setError(store.getState().auth.error || ErrorMessage.DEFAULT);
      } finally {
        setIsLoadingAvatar(false);
      }
      dispatch(updateChannelAvatar(payload));
    },
    [dispatch],
  );

  const handleBannerSave = useCallback(
    async (payload: ChannelProfileUpdateMediaRequestDto & DefaultRequestParam) => {
      try {
        await dispatch(updateChannelBanner(payload)).unwrap();
        setIsLoadingBanner(true);
      } catch {
        setError(store.getState().auth.error || ErrorMessage.DEFAULT);
      } finally {
        setIsLoadingBanner(false);
      }
      dispatch(updateChannelBanner(payload));
    },
    [dispatch],
  );

  const onAvatarSave = async (base64Str: string): Promise<void> => {
    setIsNeedAvatarEditor(!isNeedAvatarEditor);
    await handleAvatarSave({ base64Str, id });
  };

  const onBannerSave = async (base64Str: string): Promise<void> => {
    setIsNeedBannerEditor(!isNeedBannerEditor);
    await handleBannerSave({ base64Str, id });
  };

  const handleUpdateChannelInfoSubmit = useCallback(
    async (payload: ChannelProfileUpdateRequestDto & DefaultRequestParam) => {
      try {
        setFormLoading(true);
        await dispatch(updateChannelInfo(payload)).unwrap();
      } catch {
        setFormError(store.getState().auth.error || ErrorMessage.DEFAULT);
      } finally {
        createToastNotification({
          iconName: IconName.TV,
          type: 'success',
          title: 'Channel profile',
          message: 'Your channel info has been successfully updated',
          durationMs: 5000,
        });
        setFormLoading(false);
      }
    },
    [dispatch],
  );

  const onFormSubmit = async (submitValue: ChannelProfileUpdateRequestDto): Promise<void> => {
    await handleUpdateChannelInfoSubmit({ ...submitValue, id });
  };

  if (channelDataStatus === DataStatus.PENDING || !channelData) {
    return <Loader spinnerSize={'lg'} vCentered={true} hCentered={true} />;
  }

  const { name, description, avatar, bannerImage, id } = channelData;

  return (
    <div className={styles['preference-page-content-container']}>
      {isNeedAvatarUpload && <UploadImage images={avatars} onUpload={onAvatarChange} onClose={onUploadAvatarClose} />}
      {isNeedAvatarEditor && (
        <ImageEditor
          avatar={preparedAvatar}
          setAvatar={setPreparedAvatar}
          onClose={(): void => setIsNeedAvatarEditor(false)}
          handleSave={onAvatarSave}
        />
      )}

      {isNeedBannerUpload && <UploadImage images={banners} onUpload={onBannerChange} onClose={onUploadBannerClose} />}
      {isNeedBannerEditor && (
        <ImageEditor
          editorWidth={1252}
          editorHeight={401}
          avatar={preparedBanner}
          setAvatar={setPreparedBanner}
          onClose={(): void => setIsNeedBannerEditor(false)}
          handleSave={onBannerSave}
        />
      )}
      <div className={styles['channel-preferences-container']}>
        <div className={styles['channel-preferences-main-content-container']}>
          <div className={styles['image-setting-container']}>
            <h2 className={styles['channel-image-header']}>Channel avatar</h2>
            <div className={styles['channel-image-upload-container']}>
              <div className={styles['avatar-container']}>
                {isLoadingAvatar ? (
                  <Loader spinnerSize={'xs'} className={styles['channel-page-loader-container']} />
                ) : (
                  <img
                    className={styles['channel-image-preview']}
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
                    setIsAvatarNeedUpload(!isNeedAvatarUpload);
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
            <h2 className={styles['channel-image-header']}>Channel banner</h2>
            <div className={styles['channel-image-upload-container']}>
              <div className={styles['banner-container']}>
                {isLoadingBanner ? (
                  <Loader spinnerSize={'xs'} className={styles['channel-page-loader-container']} />
                ) : (
                  <img
                    className={styles['channel-banner-preview']}
                    width={'313'}
                    height={'100'}
                    src={bannerImage === '' ? defaulChannelBanner : bannerImage}
                    alt="channel avatar preview"
                  />
                )}
              </div>
              <div className={styles['image-upload-control-container']}>
                <button
                  type="button"
                  className={styles['image-upload-button']}
                  onClick={(): void => {
                    setIsBannerNeedUpload(!isNeedBannerUpload);
                  }}
                >
                  Upload channel banner
                </button>
                <span>
                  {error ? (
                    <span className={styles['error-message']}>{error}</span>
                  ) : (
                    'File format: JPG/PNG, max size: 10MB, Recommended resolution: 1252x401'
                  )}
                </span>
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
