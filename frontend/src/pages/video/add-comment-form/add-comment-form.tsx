import styles from '../video-page.module.scss';
import { Input } from '../../../components/common/input/input-component';
import { useAppForm } from '../../../hooks/use-app-form/use-app-form.hook';
import { FC } from '../../../common/types/react/fc.type';
import { Button } from '../../../components/common/common';
import defaultAvatar from 'assets/img/default-user-avatar.jpg';
import * as Joi from 'joi';
import clsx from 'clsx';
import { useState } from '../../../hooks/hooks';

type Props = {
  avatar: string | undefined;
  onSubmit: { (): void };
};
interface AddNewCommentFormValues {
  comment: string;
}

const extendedSchema = Joi.object<AddNewCommentFormValues, true>({
  comment: Joi.string().required(),
});

export const VideoPageCommentForm: FC<Props> = ({ avatar = defaultAvatar, onSubmit }) => {
  const [isNeedFormControlElenent, setIsNeedFormControlElement] = useState(false);
  const { control, errors, isValid } = useAppForm({
    defaultValues: { comment: '' },
    mode: 'onChange',
    validationSchema: extendedSchema,
  });
  const handleSubmit = (): void => {
    if (isValid) {
      onSubmit();
    }
  };
  const handleCancel = (): void => {
    setIsNeedFormControlElement(false);
  };
  const handleInputFocus = (): void => {
    setIsNeedFormControlElement(true);
  };
  const handleInputBlur = (): void => {
    setIsNeedFormControlElement(false);
  };
  return (
    <div className={styles['add-comment-block']}>
      <div className={styles['add-comment-block-user-avatar']}>
        <img alt={'you avatar'} src={avatar} />
      </div>
      <Input
        control={control}
        wrapperClassName={styles['add-comment-input-wrapper']}
        inputClassName={styles['add-comment-input']}
        errors={errors}
        label={'Add comment'}
        name={'comment'}
        placeholder={'Enter new comment text'}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <div className={styles['add-comment-form-control']}>
        {isNeedFormControlElenent && (
          <>
            <Button
              onClick={handleCancel}
              type={'button'}
              content={'Cancel'}
              className={styles['.add-comment-cancel-button']}
            />
            <Button
              onClick={handleSubmit}
              type={'submit'}
              content={'Submit'}
              className={clsx({
                [styles['add-comment-submit-active']]: isValid,
                [styles['add-comment-submit-npt-active']]: !isValid,
              })}
            />
          </>
        )}
      </div>
    </div>
  );
};
