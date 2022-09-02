import styles from './styles.module.scss';
import { useAppForm } from '../../../../hooks/use-app-form/use-app-form.hook';
import { FC } from '../../../../common/types/react/fc.type';
import { Button, Textarea } from '../../../../components/common/common';
import * as Joi from 'joi';
import clsx from 'clsx';
import { useState } from '../../../../hooks/hooks';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';

type Props = {
  avatar: string | undefined;
  namingInfo: {
    userName: string;
    firstName?: string;
    lastName?: string;
  };
  onSubmit: { (text: string): void };
  className?: string;
};
interface AddNewCommentFormValues {
  comment: string;
}

const extendedSchema = Joi.object<AddNewCommentFormValues, true>({
  comment: Joi.string().required(),
});

export const VideoPageCommentForm: FC<Props> = ({ avatar, onSubmit, className, namingInfo }) => {
  const [isNeedFormControlElement, setIsNeedFormControlElement] = useState(false);
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const { control, errors, isValid, reset, handleSubmit } = useAppForm({
    defaultValues: { comment: '' },
    mode: 'onChange',
    validationSchema: extendedSchema,
  });
  const handleSubmitEvent = ({ comment }: { comment: string }): void => {
    reset({ comment: '' });
    if (isValid) {
      onSubmit(comment);
    }
    setIsNeedFormControlElement(false);
  };
  const handleCancel = (): void => {
    reset({ comment: '' });
    setIsNeedFormControlElement(false);
  };
  const handleInputFocus = (): void => {
    setIsNeedFormControlElement(true);
    setIsInputInFocus(true);
  };
  const handleInputBlur = (): void => {
    setIsInputInFocus(false);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitEvent)} className={clsx(styles['add-comment-block'], className)}>
      <UserAvatarOrInitials
        className={styles['add-comment-block-user-avatar']}
        avatar={avatar}
        userNamingInfo={namingInfo}
      />
      <div className={styles['input-block']}>
        <Textarea
          control={control}
          wrapperClassName={styles['add-comment-input-wrapper']}
          inputClassName={clsx(
            {
              [styles['add-comment-input-in-focus']]: isInputInFocus,
            },
            styles['add-comment-input'],
          )}
          errors={errors}
          label={'Add comment'}
          name={'comment'}
          placeholder={'Enter new comment text'}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className={styles['add-comment-form-control']}>
          {isNeedFormControlElement && (
            <>
              <Button
                onClick={handleCancel}
                type={'button'}
                content={'Cancel'}
                className={styles['add-comment-cancel-button']}
              />
              <Button
                type={'submit'}
                content={'Submit'}
                className={clsx(
                  {
                    [styles['add-comment-submit-disabled']]: !isValid,
                  },
                  styles['add-comment-submit-active'],
                )}
              />
            </>
          )}
        </div>
      </div>
    </form>
  );
};
