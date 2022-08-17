import { FC, AvatarImgValue, UserUploadRequestDto, UserBaseResponseDto } from 'common/types/types';
import style from './styles.module.scss';
import defaultAvatar from '../../assets/img/default-user-avatar.jpg';
import defaultUserBanner from '../../assets/img/profile-baner-default.jpg';
import { UploadImage } from '../common/upload-image/upload-image';
import React, { useCallback, useState } from 'react';
import { profileActions } from 'store/actions';
import { ImageListType } from 'react-images-uploading';
import { ImageEditor } from '../common/image-editor/image-editor';
import { useAppDispatch, useAppSelector, useEffect, useNavigate } from 'hooks/hooks';
import { AppRoute } from '../../common/enums/app/app-route.enum';
import { errorMessages } from '../../common/enums/enums';
import { Loader } from '../common/common';
import { store } from '../../store/store';
import { ProfilePreferencesPageForm } from './common/profile-preferences-page-form';

const ProfilePreferencesPage: FC = () => {
  const navigate = useNavigate();
  const [isNeedUpload, setIsNeedUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const user: UserBaseResponseDto | null = useAppSelector((state) => {
    return state.auth.user;
  });
  const profile = useAppSelector((state) => {
    return state.profile.profileData;
  });
  useEffect(() => {
    if (!user) {
      navigate(`${AppRoute.SIGN_IN}`, { replace: true });
    } else {
      dispatch(profileActions.getProfileByUserId({ userId: user.id }));
    }
  }, [user]);
  const [isNeedImageEditor, setIsNeedImageEditor] = useState(false);
  const [images, setImages] = useState([]);
  const [preparedAvatar, setPreparedAvatar] = useState<AvatarImgValue>({
    cropperOpen: false,
    img: null,
    zoom: 3,
    croppedImg: '',
    rotate: 0,
  });
  const onChange = (imageList: ImageListType): void => {
    setImages(imageList as never[]);
    setPreparedAvatar({
      cropperOpen: false,
      img: imageList[0],
      zoom: 3,
      croppedImg: profile?.avatar as string,
      rotate: 0,
    });
    setIsNeedUpload(false);
    setIsNeedImageEditor(!isNeedImageEditor);
    images.pop();
  };

  const onUploadImageClose = (): void => {
    setIsNeedUpload(!isNeedUpload);
  };

  const handleImageSave = useCallback(
    async (payload: UserUploadRequestDto) => {
      try {
        setIsLoading(true);
        await dispatch(profileActions.uploadAvatar(payload)).unwrap();
      } catch {
        setError(store.getState().auth.error || errorMessages.DEFAULT);
      } finally {
        setIsLoading(false);
      }
      dispatch(profileActions.uploadAvatar(payload));
    },
    [dispatch],
  );

  const onImageSave = async (base64Str: string): Promise<void> => {
    setIsNeedImageEditor(!isNeedImageEditor);
    await handleImageSave({ base64Str, userId: user?.id as string });
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <div className={style['preference-page-content-container']}>
      {isNeedUpload ? <UploadImage images={images} onUpload={onChange} onClose={onUploadImageClose} /> : null}
      {isNeedImageEditor ? (
        <ImageEditor
          avatar={preparedAvatar}
          setAvatar={setPreparedAvatar}
          onClose={(): void => setIsNeedImageEditor(false)}
          handleSave={onImageSave}
        />
      ) : null}
      <div className={style['profile-preferences-container']}>
        <div className={style['profile-preferences-main-content-container']}>
          <div className={style['image-setting-container']}>
            <h2 className={style['profile-image-header']}>Profile image</h2>
            <div className={style['profile-image-upload-container']}>
              <div className={style['avatar-container']}>
                {isLoading ? (
                  <Loader spinnerSize={'xs'} vCentered={true} hCentered={true} />
                ) : (
                  <img
                    className={style['profile-image-preview']}
                    width={'96'}
                    height={'96'}
                    src={profile.avatar === '' ? defaultAvatar : profile.avatar}
                    alt="profile picture preview"
                  />
                )}
              </div>
              <div className={style['image-upload-control-container']}>
                <button
                  type="button"
                  className={style['image-upload-button']}
                  onClick={(): void => {
                    setIsNeedUpload(!isNeedUpload);
                  }}
                >
                  Upload profile image
                </button>
                <span>
                  {error ? (
                    <span className={style['error-message']}>{error}</span>
                  ) : (
                    'Must be JPEG, PNG and cannot exceed 10MB.'
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={style['image-setting-container']}>
            <h2 className={style['profile-image-header']}>Channel Banner</h2>
            <div className={style['profile-image-upload-container']}>
              <div className={style['channel-avatar-container']}>
                <img
                  className={style['profile-banner-preview']}
                  height={'96'}
                  src={defaultUserBanner}
                  alt="profile picture preview"
                />
              </div>
              <div className={style['image-upload-control-container']}>
                <button type="button" className={style['image-upload-button']}>
                  Update
                </button>
                <span>File format: JPEG, PNG (recommended 1200x480, max 10MB) </span>
              </div>
            </div>
          </div>
          <h2 className={style['profile-settings-header']}>Profile settings</h2>
          <h3 className={style['profile-settings-sub-header']}>Change identifying details for your account</h3>
          <ProfilePreferencesPageForm profile={profile} user={user} />
        </div>
      </div>
    </div>
  );
};

export { ProfilePreferencesPage };
