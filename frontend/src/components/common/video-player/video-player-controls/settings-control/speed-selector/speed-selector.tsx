import React, { FC, useEffect, useState } from 'react';
import { GenericSettingsModal } from '../generic-settings-modal/generic-settings-modal';
import { ModalItem } from '../modal-item/modal-item';
import { ReactComponent as BackArrow } from 'assets/img/back-arrow.svg';
import styles from '../header-styles.module.scss';

type Props = {
  className?: string;
  videoContainer: HTMLVideoElement;
  goBack: () => void;
  setCurrentSpeed: (speed: number) => void;
};

const SpeedSelector: FC<Props> = ({ className, goBack, videoContainer, setCurrentSpeed: setSpeedText }) => {
  const predefinedSpeeds: number[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
  const [currentSpeed, setCurrentSpeed] = useState(videoContainer.playbackRate);
  useEffect(() => {
    const handleRateChange = (): void => {
      setCurrentSpeed(videoContainer.playbackRate);
    };
    videoContainer.addEventListener('ratechange', handleRateChange);
    return () => {
      videoContainer.removeEventListener('ratechange', handleRateChange);
    };
  }, [videoContainer]);

  useEffect(() => {
    setSpeedText(currentSpeed);
  }, [currentSpeed, setSpeedText]);

  return (
    <GenericSettingsModal className={className}>
      <ModalItem isHeader onClick={goBack} contentContainerClassName={styles['header']}>
        <BackArrow height={15} />
        <span className={styles['header-text']}> Select playback speed</span>
      </ModalItem>
      {!predefinedSpeeds.includes(currentSpeed) && <ModalItem isSelected>Other: {currentSpeed}</ModalItem>}
      {predefinedSpeeds.map((speed) => (
        <ModalItem
          key={speed}
          isSelected={currentSpeed === speed}
          isSelectable
          onClick={(): void => {
            videoContainer.playbackRate = speed;
          }}
        >
          {speed}
        </ModalItem>
      ))}
    </GenericSettingsModal>
  );
};

export { SpeedSelector };
