import {
  FC,
  AvatarImgValue,
  UserUploadRequestDto,
  UserBaseResponseDto,
  UpdateProfileValue,
  ProfileUpdateRequestDto,
} from 'common/types/types';
import style from './styles.module.scss';
import defaultAvatar from '../../assets/img/default/user-avatar-default.jpg';
import { UploadImage, ImageEditor, Loader } from '../../components/common/common';
import React, { useCallback, useState } from 'react';
import { profileActions } from 'store/actions';
import { ImageListType } from 'react-images-uploading';
import { useAppDispatch, useAppSelector, useEffect, useNavigate } from 'hooks/hooks';
import { AppRoutes, ErrorMessage } from '../../common/enums/enums';
import { store } from '../../store/store';
import { ProfilePreferencesPageForm } from './common/profile-preferences-page-form';

const ProfilePreferencesPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isNeedUpload, setIsNeedUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [isNeedImageEditor, setIsNeedImageEditor] = useState(false);
  const [images, setImages] = useState([]);
  const [preparedAvatar, setPreparedAvatar] = useState<AvatarImgValue>({
    cropperOpen: false,
    img: null,
    zoom: 3,
    croppedImg: '',
    rotate: 0,
  });

  const user: UserBaseResponseDto | null = useAppSelector((state) => {
    return state.auth.user;
  });

  const profile = useAppSelector((state) => {
    return state.profile.profileData;
  });

  useEffect(() => {
    if (!user) {
      navigate(`${AppRoutes.SIGN_IN}`, { replace: true });
      return;
    }
    dispatch(profileActions.getProfileByUserId({ userId: user.id }));
  }, [user, dispatch, navigate]);

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
        setError(store.getState().auth.error || ErrorMessage.DEFAULT);
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

  const handleUpdateProfileDataSubmit = useCallback(
    async (payload: ProfileUpdateRequestDto) => {
      try {
        setFormLoading(true);
        await dispatch(profileActions.updateProfile(payload)).unwrap();
      } catch {
        setFormError(store.getState().auth.error || ErrorMessage.DEFAULT);
      } finally {
        setFormLoading(false);
      }
    },
    [dispatch],
  );

  const onFormSubmit = async (submitValue: UpdateProfileValue): Promise<void> => {
    const request: ProfileUpdateRequestDto = {
      ...submitValue,
      userId: user?.id as string,
    };
    await handleUpdateProfileDataSubmit(request);
  };

  if (!profile) {
    return <Loader spinnerSize={'lg'} vCentered={true} hCentered={true} />;
  }

  const { firstName, lastName, username } = profile;

  return (
    <div className={style['preference-page-content-container']}>
      {isNeedUpload && <UploadImage images={images} onUpload={onChange} onClose={onUploadImageClose} />}
      {isNeedImageEditor && (
        <ImageEditor
          avatar={preparedAvatar}
          setAvatar={setPreparedAvatar}
          onClose={(): void => setIsNeedImageEditor(false)}
          handleSave={onImageSave}
        />
      )}
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
                    'File format: JPEG/PNG, max size: 10MB'
                  )}
                </span>
              </div>
            </div>
          </div>
          <h2 className={style['profile-settings-header']}>Profile settings</h2>
          <h3 className={style['profile-settings-sub-header']}>Change your personal information</h3>
          <ProfilePreferencesPageForm
            onSubmit={onFormSubmit}
            error={formError}
            isLoading={formLoading}
            defaultFormValue={{ firstName, lastName, username }}
          />
        </div>
      </div>
    </div>
  );
};

export { ProfilePreferencesPage };
