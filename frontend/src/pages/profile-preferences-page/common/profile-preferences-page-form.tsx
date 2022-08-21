import { FC, UpdateProfileValue } from 'common/types/types';
import style from '../styles.module.scss';
import React from 'react';
import { useAppForm } from 'hooks/hooks';
import { profileUpdateValidationSchema } from '../../../validation-schemas/validation-schemas';
import { Input, Loader } from '../../../components/common/common';

type Props = {
  onSubmit: { (submitValue: UpdateProfileValue): Promise<void> };
  isLoading: boolean;
  defaultFormValue: { firstName: string; lastName: string; username: string };
  error: string | undefined;
};

const ProfilePreferencesPageForm: FC<Props> = ({ onSubmit, defaultFormValue, error, isLoading }) => {
  const { control, errors, handleSubmit } = useAppForm<UpdateProfileValue>({
    defaultValues: defaultFormValue,
    validationSchema: profileUpdateValidationSchema,
  });

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
