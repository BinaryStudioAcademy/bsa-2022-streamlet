import {
  FC,
  ProfileUpdateRequestDto,
  ProfileUpdateResponseDto,
  UpdateProfileValue,
  UserBaseResponseDto,
} from 'common/types/types';
import style from '../styles.module.scss';
import React, { useCallback, useState } from 'react';
import { profileActions } from 'store/actions';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { profileUpdateValidationSchema } from '../../../validation-schemas/validation-schemas';
import { Input } from '../../common/input/input';
import { store } from '../../../store/store';
import { errorMessages } from '../../../common/enums/messages';
import { Loader } from '../../common/common';

type Props = {
  user: UserBaseResponseDto;
  profile: ProfileUpdateResponseDto;
};

const ProfilePreferencesPageForm: FC<Props> = ({ user, profile }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { id: userId } = user;
  const { firstName, lastName, username } = profile;
  const [error, setError] = useState<string>();

  const { control, errors, handleSubmit } = useAppForm<UpdateProfileValue>({
    defaultValues: { firstName, lastName, username },
    validationSchema: profileUpdateValidationSchema,
  });

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

  const onSubmit = async (submitValue: UpdateProfileValue): Promise<void> => {
    const request: ProfileUpdateRequestDto = {
      ...submitValue,
      userId,
    };
    await handleUpdateProfileDataSubmit(request);
  };

  return (
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
        {error ? <span className={style['error-message']}>{error}</span> : null}
        <button type="submit" className={style['save-change-button']}>
          {isLoading ? <Loader hCentered={true} vCentered={true} /> : 'Save change'}
        </button>
      </div>
    </form>
  );
};

export { ProfilePreferencesPageForm };
