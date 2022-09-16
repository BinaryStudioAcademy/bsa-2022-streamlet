import { STREAMING_SERVER_URL } from 'common/constants/constants';
import { ENV, IconName } from 'common/enums/enums';
import { Button, createToastNotification, Input, PasswordInput } from 'components/common/common';
import { useAppDispatch, useAppForm, useAppSelector } from 'hooks/hooks';
import { StreamInfoFormValues } from 'pages/studio/stream/common/stream-info-form-values';
import React, { FC, useCallback, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { shallowEqual } from 'react-redux';
import { streamActions } from 'store/actions';
import { ChatToggle } from '../../chat-toggle';
import { PrivacySelector } from '../../privacy-selector';
import styles from '../../styles.module.scss';
import settingsStyles from './styles.module.scss';

const LiveSettings: FC = () => {
  const dispatch = useAppDispatch();

  const { channel, streamingKey } = useAppSelector(
    (state) => ({
      channel: state.stream.channel,
      streamingKey: state.stream.streamingKey,
      errorCode: state.stream.status.errorCode,
    }),
    shallowEqual,
  );

  const streamId = useAppSelector((state) => state.stream.stream?.id);

  const handleStreamingKeyReset = useCallback(() => {
    dispatch(streamActions.resetStreamingKey({ channelId: channel?.id ?? '' }));
  }, [dispatch, channel?.id]);

  const handleCopy = (): void => {
    createToastNotification({
      type: 'success',
      message: 'Copied!',
      iconName: IconName.INFO,
      title: '',
    });
  };

  const defaultInfoFormValues = useCallback(
    () => ({
      streamingKey: streamingKey ?? '',
      streamingServerUrl: STREAMING_SERVER_URL,
      streamUrl: `${ENV.VIDEO_FALLBACK_BASE_URL}/video/${streamId}`,
    }),
    [streamId, streamingKey],
  );

  const {
    control: infoFormControl,
    errors: infoFormErrors,
    getValues: infoFormValues,
    reset: infoFormReset,
  } = useAppForm<StreamInfoFormValues>({
    defaultValues: defaultInfoFormValues(),
  });

  useEffect(() => {
    infoFormReset(defaultInfoFormValues());
  }, [infoFormReset, defaultInfoFormValues]);

  return (
    <div className={settingsStyles['live-settings-container']}>
      <form className={styles['form-container']}>
        <div className={styles['field-container']}>
          <PasswordInput
            inputClassName={styles['input']}
            changeVisibilityBtnClassName={styles['input-eye']}
            labelClassName={styles['label']}
            wrapperClassName={styles['form-input']}
            placeholder="Streaming key"
            control={infoFormControl}
            name="streamingKey"
            errors={infoFormErrors}
            label="Streaming key"
            readOnly
          />
          <Button content={'Reset'} className={styles['button']} onClick={handleStreamingKeyReset} />
          <CopyToClipboard onCopy={handleCopy} text={infoFormValues('streamingKey')}>
            <Button content={'Copy'} className={styles['button']} />
          </CopyToClipboard>
        </div>
        <div className={styles['field-container']}>
          <Input
            inputClassName={styles['input']}
            labelClassName={styles['label']}
            wrapperClassName={styles['form-input']}
            placeholder="Streaming server URL"
            control={infoFormControl}
            name="streamingServerUrl"
            errors={infoFormErrors}
            label="Streaming server URL"
            readOnly
          />
          <CopyToClipboard onCopy={handleCopy} text={infoFormValues('streamingServerUrl')}>
            <Button content={'Copy'} className={styles['button']} />
          </CopyToClipboard>
        </div>
        <div className={styles['field-container']}>
          <Input
            inputClassName={styles['input']}
            labelClassName={styles['label']}
            wrapperClassName={styles['form-input']}
            placeholder="Stream URL"
            control={infoFormControl}
            name="streamUrl"
            errors={infoFormErrors}
            label="Stream URL"
            readOnly
          />
          <CopyToClipboard onCopy={handleCopy} text={infoFormValues('streamUrl')}>
            <Button content={'Copy'} className={styles['button']} />
          </CopyToClipboard>
        </div>
      </form>
      <div className={settingsStyles['selectors']}>
        <PrivacySelector />
        <ChatToggle />
      </div>
    </div>
  );
};

export { LiveSettings };
