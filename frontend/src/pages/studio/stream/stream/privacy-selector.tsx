import { STREAM_PRIVACY_OPTIONS } from 'common/constants/stream/stream';
import { StreamPrivacy } from 'common/enums/enums';
import { SelectOptions } from 'common/types/types';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { customSelectStyles } from 'pages/studio/common/stream-settings-modal/stream-settings-forms/custom-select-styles';
import React, { FC } from 'react';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';
import { streamActions } from 'store/actions';
import styles from './styles.module.scss';

const PrivacySelector: FC = () => {
  const dispatch = useAppDispatch();
  const streamPrivacy = useAppSelector((state) => state.stream.stream?.privacy);
  const onStreamPrivacyChange = (newValue: MultiValue<SelectOptions>): void => {
    dispatch(
      streamActions.editStream({
        privacy: (newValue as unknown as SingleValue<SelectOptions>)?.value as StreamPrivacy,
      }),
    );
  };

  return (
    <div className={styles['text-field-container']}>
      <label className={styles['label']}>Stream privacy:</label>
      <ReactSelect
        options={STREAM_PRIVACY_OPTIONS}
        defaultValue={
          {
            value: streamPrivacy ?? '',
            label: STREAM_PRIVACY_OPTIONS.find((opt) => opt.value === streamPrivacy)?.label ?? '',
          } ?? STREAM_PRIVACY_OPTIONS[1]
        }
        onChange={onStreamPrivacyChange}
        styles={customSelectStyles}
      />
    </div>
  );
};

export { PrivacySelector };
