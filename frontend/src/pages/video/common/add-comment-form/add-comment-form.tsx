import styles from './styles.module.scss';
import { useAppForm } from '../../../../hooks/use-app-form/use-app-form.hook';
import { FC } from '../../../../common/types/react/fc.type';
import { Button, Textarea } from '../../../../components/common/common';
import defaultAvatar from 'assets/img/default-user-avatar.jpg';
import * as Joi from 'joi';
import clsx from 'clsx';
import { useState } from '../../../../hooks/hooks';

type Props = {
  avatar: string | undefined;
  onSubmit: { (text: string): void };
  className?: string;
  isFormForReply?: boolean;
  handlerCancelForReplyForm: () => void;
};
interface AddNewCommentFormValues {
  comment: string;
}

const extendedSchema = Joi.object<AddNewCommentFormValues, true>({
  comment: Joi.string().required(),
});

export const VideoPageCommentForm: FC<Props> = ({
  avatar,
  onSubmit,
  className,
  isFormForReply,
  handlerCancelForReplyForm,
}) => {
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
    handlerCancelForReplyForm();
  };
  const handleInputFocus = (): void => {
    setIsNeedFormControlElement(true);
    setIsInputInFocus(true);
  };
  const handleInputBlur = (): void => {
    setIsInputInFocus(false);
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitEvent)}
      className={clsx(styles['add-comment-block'], className, { [styles['for-reply']]: isFormForReply })}
    >
      <img
        alt={'you'}
        src={avatar || defaultAvatar}
        className={clsx(styles['add-comment-block-user-avatar'], { [styles['for-reply']]: isFormForReply })}
      />
      <div className={styles['input-block']}>
        <Textarea
          control={control}
          wrapperClassName={styles['add-comment-input-wrapper']}
          inputClassName={clsx(
            {
              [styles['add-comment-input-in-focus']]: isInputInFocus,
              [styles['for-reply']]: isFormForReply,
            },
            styles['add-comment-input'],
          )}
          errors={errors}
          label={'Add comment'}
          labelClassName={clsx({ [styles['label-for-reply-form']]: isFormForReply })}
          name={'comment'}
          placeholder={isFormForReply ? 'Enter reply' : 'Enter new comment text'}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className={styles['add-comment-form-control']}>
          {(isNeedFormControlElement || isFormForReply) && (
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
