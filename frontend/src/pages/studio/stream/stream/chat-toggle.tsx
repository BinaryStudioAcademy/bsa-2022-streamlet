import { ToggleSwitch } from 'components/common/toggle-switch';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import { streamActions } from 'store/actions';
import styles from './styles.module.scss';

const ChatToggle: FC = () => {
  const streamIsChatEnabled = useAppSelector((state) => state.stream.stream?.isChatEnabled);
  const dispatch = useAppDispatch();
  const onStreamChatToggleChange = (isOn: boolean): void => {
    dispatch(
      streamActions.editStream({
        isChatEnabled: isOn,
      }),
    );
  };

  return (
    <div>
      <label className={styles['label']}>Stream chat:</label>
      <div className={styles['toggle-wrap']}>
        <ToggleSwitch defaultValue={streamIsChatEnabled ?? true} onToggle={onStreamChatToggleChange} />
        <span className={styles['label-right']}>{streamIsChatEnabled ? 'Enabled' : 'Disabled'}</span>
      </div>
    </div>
  );
};

export { ChatToggle };
