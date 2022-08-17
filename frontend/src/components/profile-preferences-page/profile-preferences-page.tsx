import {
  FC,
  AvatarImgValue,
  UserUploadRequestDto,
  UpdateProfileValue,
  ProfileUpdateRequestDto,
} from 'common/types/types';
import style from './styles.module.scss';
import defaultAvatar from '../../assets/img/default-user-avatar.jpg';
import defaultUserBanner from '../../assets/img/profile-baner-default.jpg';
import { UploadImage } from '../common/upload-image/upload-image';
import React, { useCallback, useState } from 'react';
import { profileActions } from 'store/actions';
import { ImageListType } from 'react-images-uploading';
import { ImageEditor } from '../common/image-editor/image-editor';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { profileUpdateValidationSchema } from '../../validation-schemas/validation-schemas';
import { Input } from '../common/input/input';
import { store } from '../../store/store';
import { errorMessages } from '../../common/enums/messages';
import { Loader } from '../common/common';

const ProfilePreferencesPage: FC = () => {
  const [isNeedUpload, setIsNeedUpload] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>();
  const [isNeedImageEditor, setIsNeedImageEditor] = useState(false);
  const [images, setImages] = React.useState([]);
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
      croppedImg: '',
      rotate: 0,
    });
    setIsNeedUpload(false);
    setIsNeedImageEditor(!isNeedImageEditor);
  };
  const { control, errors, handleSubmit } = useAppForm<UpdateProfileValue>({
    defaultValues: { firstName: 'Ivan', lastName: 'Ivanov', username: 'something' },
    validationSchema: profileUpdateValidationSchema,
  });
  const onUploadImageClose = (): void => {
    setIsNeedUpload(!isNeedUpload);
  };

  const hadnleImageSave = useCallback(
    (payload: UserUploadRequestDto) => dispatch(profileActions.uploadAvatar(payload)),
    [dispatch],
  );

  const handleUpdateProfileDataSubmit = useCallback(
    async (payload: ProfileUpdateRequestDto) => {
      try {
        setIsLoading(true);
        await dispatch(profileActions.updateProfile(payload)).unwrap();
      } catch {
        setError(store.getState().auth.error || errorMessages.DEFAULT);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  const onImageSave = (base64Str: string): void => {
    hadnleImageSave({ base64Str });
  };
  const onSubmit = (submitValue: UpdateProfileValue): void => {
    const request: ProfileUpdateRequestDto = {
      ...submitValue,
      userId: '9ab801b0-837a-4dcf-80ec-77facd039972',
    };
    handleUpdateProfileDataSubmit(request);
  };

  return (
    <>
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
              <img
                className={style['profile-image-preview']}
                width={'96'}
                height={'96'}
                src={preparedAvatar.croppedImg === '' ? defaultAvatar : preparedAvatar.croppedImg}
                alt="profile picture preview"
              />
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
                <span>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
              </div>
            </div>
          </div>
          <div className={style['image-setting-container']}>
            <h2 className={style['profile-image-header']}>Profile Banner</h2>
            <div className={style['profile-image-upload-container']}>
              <img
                className={style['profile-banner-preview']}
                height={'96'}
                src={defaultUserBanner}
                alt="profile picture preview"
              />
              <div className={style['image-upload-control-container']}>
                <button type="button" className={style['image-upload-button']}>
                  Update
                </button>
                <span>File format: JPEG, PNG (recommended 1200x480, max 10MB)</span>
              </div>
            </div>
          </div>
          <h2 className={style['profile-settings-header']}>Profile settings</h2>
          <h3 className={style['profile-settings-sub-header']}>Change identifying details for your account</h3>
          <form className={style['profile-settings-block']} onSubmit={handleSubmit(onSubmit)}>
            <div className={style['profile-setting-change-block']}>
              <div className={style['profile-setting-input-block']}>
                <Input
                  control={control}
                  errors={errors}
                  name="username"
                  type="text"
                  inputClassName={style['input']}
                  label="username"
                  placeholder="enter new user name"
                />
                <p>Update your username</p>
              </div>
            </div>
            <div className={style['profile-setting-change-block']}>
              <div className={style['profile-setting-input-block']}>
                <Input
                  control={control}
                  errors={errors}
                  name="firstName"
                  type="text"
                  inputClassName={style['input']}
                  label="firstName"
                  placeholder="enter new first name"
                />
                <p>Update your first name</p>
              </div>
            </div>
            <div className={style['profile-setting-change-block']}>
              <div className={style['profile-setting-input-block']}>
                <Input
                  control={control}
                  errors={errors}
                  name="lastName"
                  type="text"
                  inputClassName={style['input']}
                  label="lastName"
                  placeholder="enter new last name"
                />
                <p>Update your last name</p>
              </div>
            </div>
            <div className={style['save-change-button-container']}>
              {error ? <span>error</span> : null}
              <button type="submit" className={style['save-change-button']}>
                {isLoading ? <Loader hCentered={true} vCentered={true} /> : 'Save change'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { ProfilePreferencesPage };
