import styles from '../video-page.module.scss';
import { Input } from '../../../components/common/input/input-component';
import { useAppForm } from '../../../hooks/use-app-form/use-app-form.hook';
import { FC } from '../../../common/types/react/fc.type';
import { useState } from '../../../hooks/hooks';
import { Button } from '../../../components/common/common';
import * as Joi from 'joi';
import clsx from 'clsx';

type Props = {
  avatar: string;
  onSubmit: { (): void };
};
interface AddNewCommentFormValues {
  comment: string;
}

const extendedSchema = Joi.object<AddNewCommentFormValues, true>({
  comment: Joi.string().required(),
});

export const VideoPageCommentForm: FC<Props> = ({ avatar, onSubmit }) => {
  const { control, errors, isValid } = useAppForm({
    defaultValues: { comment: '' },
    mode: 'onChange',
    validationSchema: extendedSchema,
  });
  const [isNeedControl, setIsNeedControl] = useState<boolean>(false);
  const handleInputFocus = (): void => {
    setIsNeedControl(true);
  };
  const handleSubmit = (): void => {
    if (isValid) {
      onSubmit();
    }
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
      />
      {isNeedControl && (
        <div className={styles['add-comment-form-control']}>
          <Button
            onClick={handleSubmit}
            type={'submit'}
            content={'Submit'}
            className={clsx({
              [styles['add-comment-submit-active']]: isValid,
              [styles['add-comment-submit-npt-active']]: !isValid,
            })}
          />
        </div>
      )}
    </div>
  );
};
