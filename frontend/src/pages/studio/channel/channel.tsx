import { FC } from 'common/types/types';
import { useState } from 'react';
import { ChannelProfileUpdateRequestDto } from 'shared/build';
import { ChannelSettingsForm } from './common/channel-settings-form';

import styles from './styles.module.scss';

const StudioChannel: FC = () => {
  const [formError] = useState<string | undefined>();
  const [formLoading] = useState<boolean>(false);

  const onFormSubmit = async (submitValue: ChannelProfileUpdateRequestDto): Promise<void> => {
    /* eslint no-console: 0 */
    console.warn(submitValue);
  };
  return (
    <div className={styles['preference-page-content-container']}>
      <div className={styles['channel-preferences-container']}>
        <div className={styles['channel-preferences-main-content-container']}>
          <div className={styles['image-setting-container']}>
            <h2 className={styles['channel-image-header']}>channel avatar</h2>
            <div className={styles['channel-image-upload-container']}>
              <div className={styles['image-upload-control-container']}>
                <button type="button" className={styles['image-upload-button']}>
                  Upload channel avatar
                </button>
              </div>
            </div>
          </div>
          <div className={styles['image-setting-container']}>
            <h2 className={styles['channel-image-header']}>channel banner</h2>
            <div className={styles['channel-image-upload-container']}>
              <div className={styles['image-upload-control-container']}>
                <button type="button" className={styles['image-upload-button']}>
                  Upload channel banner
                </button>
              </div>
            </div>
          </div>
          <h2 className={styles['channel-settings-header']}>Channel preferences</h2>
          <h3 className={styles['channel-settings-sub-header']}>Change information about your channel</h3>
          <ChannelSettingsForm
            onSubmit={onFormSubmit}
            error={formError}
            isLoading={formLoading}
            defaultFormValue={{
              name: 'Channel name',
              description: 'Channel description',
            }}
          />
        </div>
      </div>
    </div>
  );
};
export { StudioChannel };
