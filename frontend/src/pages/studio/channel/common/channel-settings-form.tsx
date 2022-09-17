import { useAppForm } from 'hooks/hooks';
import { FC } from 'react';
import styles from './styles.module.scss';
import { ChannelProfileUpdateRequestDto, channelUpdateValidationSchema } from 'shared/build';
import { Input, Loader, Textarea } from 'components/common/common';

type Props = {
  onSubmit: { (submitValue: ChannelProfileUpdateRequestDto): Promise<void> };
  isLoading: boolean;
  defaultFormValue: ChannelProfileUpdateRequestDto;
  error: string | undefined;
};

export const ChannelSettingsForm: FC<Props> = ({ onSubmit, isLoading, defaultFormValue, error }) => {
  const { errors, control, handleSubmit } = useAppForm<ChannelProfileUpdateRequestDto>({
    defaultValues: defaultFormValue,
    validationSchema: channelUpdateValidationSchema,
    mode: 'onChange',
  });
  return (
    <form className={styles['channel-settings-block']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['channel-setting-change-block']}>
        <div className={styles['channel-setting-input-block']}>
          <Input
            control={control}
            errors={errors}
            name="name"
            type="text"
            inputErrorClassName={styles['input-error']}
            inputClassName={styles['input']}
            label="Channel name"
            placeholder="Enter new channel name..."
          />
        </div>
      </div>
      <div className={styles['channel-setting-change-block']}>
        <div className={styles['channel-setting-input-block']}>
          <Textarea
            control={control}
            errors={errors}
            name="description"
            type="text"
            inputErrorClassName={styles['input-error']}
            inputClassName={styles['text-area']}
            label="Description"
            placeholder="Enter new channel description..."
          />
        </div>
      </div>
      <div className={styles['save-change-button-container']}>
        {error && <span className={styles['error-message']}>{error}</span>}
        <button type="submit" className={styles['save-change-button']}>
          {isLoading ? <Loader hCentered={true} vCentered={true} spinnerSize="16px" color="white" /> : 'Save changes'}
        </button>
      </div>
    </form>
  );
};
