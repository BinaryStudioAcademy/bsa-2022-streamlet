import clsx from 'clsx';
import * as Joi from 'joi';
import { EmojiClickData } from 'emoji-picker-react';
import { FC } from 'common/types/types';
import { useState, useEffect, useAppForm, useCallback } from 'hooks/hooks';
import { Button, Emoji, Textarea } from 'components/common/common';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';
import styles from './styles.module.scss';
import { FocusEvent } from 'react';

type Props = {
  avatar: string | undefined;
  namingInfo: {
    userName: string;
    firstName?: string;
    lastName?: string;
  };
  onSubmit: { (text: string): void };
  className?: string;
  isLightTheme: boolean;
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
  namingInfo,
  isLightTheme,
  isFormForReply,
  handlerCancelForReplyForm,
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
      setValue('comment', `${input.join('')}`, { shouldValidate: true });

      setCaretPosition(new Array(2).fill(caretPosition[0] + 2));
      setSelectedEmoji(null);
    },
    [getValues, setValue, caretPosition],
  );

  useEffect(() => {
    if (selectedEmoji) {
      handleAddEmoji(selectedEmoji);
    }
  }, [selectedEmoji, handleAddEmoji]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitEvent)}
      className={clsx(styles['add-comment-block'], className, { [styles['for-reply']]: isFormForReply })}
    >
      <UserAvatarOrInitials
        className={clsx(styles['add-comment-block-user-avatar'], { [styles['for-reply']]: isFormForReply })}
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
                  content={isFormForReply ? 'Reply' : 'Comment'}
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
