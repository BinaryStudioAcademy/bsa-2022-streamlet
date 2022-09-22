import {
  AvatarImgValue,
  FC,
  ProfileUpdateRequestDto,
  UpdateProfileValue,
  UserBaseResponseDto,
  UserUploadRequestDto,
} from 'common/types/types';
import style from './styles.module.scss';
import { UploadImage, ImageEditor, Loader, createToastNotification } from '../../components/common/common';
import React, { useCallback, useState } from 'react';
import { profileActions } from 'store/actions';
import { ImageListType } from 'react-images-uploading';
import { useAppDispatch, useAppSelector, useEffect, useNavigate } from 'hooks/hooks';
import { AppRoutes, DataStatus, ErrorMessage, IconName } from '../../common/enums/enums';
import { store } from '../../store/store';
import { ProfilePreferencesPageForm } from './common/profile-preferences-page-form';
import { UserAvatarOrInitials } from '../../components/common/user-avatar-or-initials/user-avatar-or-initials';
import { PreferencesModalContainer } from '../../components/common/preferences-modal/preferences-modal-container';

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
  const [isOpenPreferencesModal, setIsOpenPreferencesModal] = useState(false);

  const user: UserBaseResponseDto | null = useAppSelector((state) => {
    return state.auth.user;
  });

  const profile = useAppSelector((state) => {
    return state.profile.profileData;
  });

  const { error: responseError } = useAppSelector((state) => {
    return state.profile;
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
    setImages([]);
  };

  const onUploadImageClose = (): void => {
    setIsNeedUpload(!isNeedUpload);
    setImages([]);
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
    (payload: ProfileUpdateRequestDto) => {
      setFormLoading(true);
      dispatch(profileActions.updateProfile(payload))
        .unwrap()
        .then(() =>
          createToastNotification({
            iconName: IconName.PROFILE,
            type: 'success',
            title: 'Profile',
            message: 'Your profile has been successfully updated',
            durationMs: 5000,
          }),
        )
        .catch(() => {
          setFormError(store.getState().auth.error || ErrorMessage.DEFAULT);
          createToastNotification({
            iconName: IconName.PROFILE,
            type: 'danger',
            title: 'Profile',
            message: 'Something went wrong',
            durationMs: 5000,
          });
        })
        .finally(() => {
          setFormLoading(false);
        });
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

  if (DataStatus.REJECTED && responseError !== formError) {
    setFormError(responseError);
    setIsLoading(false);
  }

  if (!profile) {
    return <Loader spinnerSize={'lg'} vCentered={true} hCentered={true} />;
  }

  const { firstName, lastName, username } = profile;

  return (
    <div className={style['preference-page-content-container']}>
      <PreferencesModalContainer
        isOpenModal={isOpenPreferencesModal}
        manualOpenModal={true}
        closeManualModal={(val): void => setIsOpenPreferencesModal(val)}
      />
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
                  <Loader spinnerSize={'xs'} className={style['profile-page-loader-container']} />
                ) : (
                  <UserAvatarOrInitials
                    className={style['profile-image-preview']}
                    avatar={profile.avatar}
                    userNamingInfo={{
                      firstName: profile.firstName,
                      lastName: profile.lastName,
                      userName: profile.username ?? '',
                    }}
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
                    'File format: JPG/PNG, max size: 10MB'
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={style['profile-header-wrapper']}>
            <div className={style['profile-text-wrapper']}>
              <h2 className={style['profile-settings-header']}>Profile settings</h2>
              <h3 className={style['profile-settings-sub-header']}>Change your personal information</h3>
            </div>
            <button
              className={style['button-change-preferences']}
              onClick={(): void => setIsOpenPreferencesModal(true)}
            >
              Change preferences
            </button>
          </div>
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
