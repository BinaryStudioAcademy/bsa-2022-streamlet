import { FC, UpdateProfileValue } from 'common/types/types';
import style from '../styles.module.scss';
import React from 'react';
import { useAppForm, useEffect } from 'hooks/hooks';
import { profileUpdateValidationSchema } from '../../../validation-schemas/validation-schemas';
import { Input, Loader } from '../../../components/common/common';

type Props = {
  onSubmit: { (submitValue: UpdateProfileValue): Promise<void> };
  isLoading: boolean;
  defaultFormValue: { firstName: string; lastName: string; username: string };
  error: string | undefined;
};

const ProfilePreferencesPageForm: FC<Props> = ({ onSubmit, defaultFormValue, error, isLoading }) => {
  const { control, errors, handleSubmit, setValue } = useAppForm<UpdateProfileValue>({
    defaultValues: defaultFormValue,
    validationSchema: profileUpdateValidationSchema,
    mode: 'onChange',
  });

  useEffect(() => {
    if (error) {
      const { username } = defaultFormValue;
      setValue('username', username);
    }
  }, [error, setValue, defaultFormValue]);

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
            inputErrorClassName={style['input-error']}
            label="Username"
            placeholder="Enter new username..."
          />
        </div>
      </div>
      <div className={style['profile-setting-change-block']}>
        <div className={style['profile-setting-input-block']}>
          <Input
            control={control}
            errors={errors}
            name="firstName"
            inputErrorClassName={style['input-error']}
            type="text"
            inputClassName={style['input']}
            label="First name"
            placeholder="Enter new first name..."
          />
        </div>
      </div>
      <div className={style['profile-setting-change-block']}>
        <div className={style['profile-setting-input-block']}>
          <Input
            control={control}
            errors={errors}
            name="lastName"
            type="text"
            inputErrorClassName={style['input-error']}
            inputClassName={style['input']}
            label="Last name"
            placeholder="Enter new last name..."
          />
        </div>
      </div>
      <div className={style['save-change-button-container']}>
        {error && <span className={style['error-message']}>{error}</span>}
        <button type="submit" className={style['save-change-button']}>
          {isLoading ? <Loader hCentered={true} vCentered={true} spinnerSize="16px" color="white" /> : 'Save changes'}
        </button>
      </div>
    </form>
  );
};

export { ProfilePreferencesPageForm };
