import clsx from 'clsx';
import * as Joi from 'joi';
import { EmojiClickData } from 'emoji-picker-react';
import { FocusEvent, KeyboardEvent } from 'react';
import { FC } from 'common/types/types';
import { useState, useEffect, useAppForm, useCallback } from 'hooks/hooks';
import { Button, Emoji, Textarea } from 'components/common/common';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';
import styles from './styles.module.scss';
import { getUserDisplayName } from 'helpers/user';

type Props = {
  avatar: string | undefined;
  initialValue?: string;
  namingInfo: {
    userName: string;
    firstName?: string;
    lastName?: string;
  };
  onSubmit: { (text: string): void };
  className?: string;
  isLightTheme: boolean;
  isFormForReply?: boolean;
  isFormEdit?: boolean;
  handlerCancelForReplyForm?: () => void;
  handlerCancelForEditForm?: () => void;
};
interface AddNewCommentFormValues {
  comment: string;
}

const extendedSchema = Joi.object<AddNewCommentFormValues, true>({
  comment: Joi.string().required(),
});

export const VideoPageCommentForm: FC<Props> = ({
  avatar,
  initialValue,
  onSubmit,
  className,
  namingInfo,
  isLightTheme,
  isFormForReply,
  isFormEdit,
  handlerCancelForReplyForm,
  handlerCancelForEditForm,
}) => {
  const [isNeedFormControlElement, setIsNeedFormControlElement] = useState(false);
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiClickData | null>(null);
  const [caretPosition, setCaretPosition] = useState<number[]>([0, 0]);

  const { control, errors, isValid, reset, handleSubmit, setValue, getValues } = useAppForm({
    defaultValues: { comment: '' },
    mode: 'onChange',
    validationSchema: extendedSchema,
  });

  const handleSetValue = useCallback(
    (
      t: string,
      options?: Partial<{
        shouldValidate: boolean;
        shouldDirty: boolean;
        shouldTouch: boolean;
      }>,
    ): void => {
      setValue('comment', t, { shouldValidate: true, ...options });
    },
    [setValue],
  );

  const handleSubmitEvent = ({ comment }: { comment: string }): void => {
    reset({ comment: '' });
    if (isValid) {
      onSubmit(comment);
    }
    setIsNeedFormControlElement(false);
  };
  const handleCancel = (): void => {
    reset({ comment: isFormEdit ? initialValue : '' });
    setIsNeedFormControlElement(false);
    if (handlerCancelForReplyForm) {
      handlerCancelForReplyForm();
    }
    if (handlerCancelForEditForm) {
      handlerCancelForEditForm();
    }
  };
  const handleInputFocus = (): void => {
    setIsNeedFormControlElement(true);
    setIsInputInFocus(true);
  };
  const handleInputBlur = (e: FocusEvent<HTMLTextAreaElement>): void => {
    setIsInputInFocus(false);

    const { selectionStart, selectionEnd } = e.target;
    const [caretStart, caretEnd] = caretPosition;
    if (Number(selectionStart) !== caretStart || Number(selectionEnd) !== caretEnd) {
      setCaretPosition([Number(selectionStart), Number(selectionEnd)]);
    }
  };

  const handleAddEmoji = useCallback(
    (selectedEmoji: EmojiClickData): void => {
      const emoji = String.fromCodePoint(...selectedEmoji.unified.split('-').map((u) => Number(`0x${u}`)));
      const deleteTextLength = caretPosition[1] - caretPosition[0];
      const input = getValues('comment').split('');
      input.splice(caretPosition[0], deleteTextLength, emoji);
      handleSetValue(`${input.join('')}`);

      setCaretPosition(new Array(2).fill(caretPosition[0] + 2));
      setSelectedEmoji(null);
    },
    [getValues, handleSetValue, caretPosition],
  );

  const onHandleKeydownCtrlEnter = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.ctrlKey && e.code === 'Enter') {
      handleSubmitEvent({ comment: getValues('comment') });
    }
  };

  useEffect(() => {
    if (selectedEmoji) {
      handleAddEmoji(selectedEmoji);
    }
  }, [selectedEmoji, handleAddEmoji]);

  useEffect(() => {
    if (initialValue) {
      handleSetValue(initialValue, { shouldValidate: false });
    }
  }, [initialValue, handleSetValue]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitEvent)}
      className={clsx(styles['add-comment-block'], className, { [styles['for-reply']]: isFormForReply })}
    >
      {!isFormEdit && (
        <UserAvatarOrInitials
          className={clsx(styles['add-comment-block-user-avatar'], { [styles['for-reply']]: isFormForReply })}
          avatar={avatar}
          userNamingInfo={namingInfo}
        />
      )}
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
          label={isFormEdit ? getUserDisplayName(namingInfo) : 'Add comment'}
          labelClassName={clsx({
            [styles['label-for-reply-form']]: isFormForReply,
            [styles['label-for-edit-form']]: isFormEdit,
          })}
          errorBlockClassName={styles['add-comment-input-error']}
          name={'comment'}
          placeholder={isFormForReply ? 'Enter reply' : isFormEdit ? 'Edit comment' : 'Enter new comment text'}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={onHandleKeydownCtrlEnter}
        />
        <div className={styles['add-comment-form-control']}>
          {(isNeedFormControlElement || isFormForReply || isFormEdit) && (
            <>
              <Emoji
                isLightTheme={isLightTheme}
                setSelectedEmoji={setSelectedEmoji}
                emojiBlockClassName={styles['emoji-block']}
              />
              <div className={styles['button-block']}>
                <Button
                  onClick={handleCancel}
                  type={'button'}
                  content={'Cancel'}
                  className={styles['add-comment-cancel-button']}
                />
                <Button
                  type={'submit'}
                  content={isFormForReply ? 'Reply' : isFormEdit ? 'Save' : 'Comment'}
                  className={clsx(
                    {
                      [styles['add-comment-submit-disabled']]: !isValid,
                    },
                    styles['add-comment-submit-active'],
                  )}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
};
