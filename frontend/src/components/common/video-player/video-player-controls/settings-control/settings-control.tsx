import React, { FC, ReactElement, useLayoutEffect, useMemo, useState } from 'react';
import { ControlButton } from '../control-button/control-button';
import { ReactComponent as SettingsIcon } from 'assets/img/settings-filled.svg';
import { ReactComponent as SpeedIcon } from 'assets/img/speedometer.svg';
import { ReactComponent as QualityIcon } from 'assets/img/magnifying-glass.svg';
import styles from './styles.module.scss';
import { GenericSettingsModal } from './generic-settings-modal/generic-settings-modal';
import { ModalItem } from './modal-item/modal-item';
import { SpeedSelector } from './speed-selector/speed-selector';
import { QualitySelector } from './quality-selector/quality-selector';
import Hls from 'hls.js';

type Props = {
  videoWrapper: HTMLElement;
  videoContainer: HTMLVideoElement;
  className?: string;
  hlsClient: Hls;
};

enum Modal {
  MAIN,
  SPEED,
  QUALITY,
}

const SettingsControl: FC<Props> = ({ className, videoWrapper, videoContainer, hlsClient }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<Modal>(Modal.MAIN);

  const getModalComponent = useMemo((): ReactElement => {
    switch (currentModal) {
      case Modal.MAIN: {
        return (
          <GenericSettingsModal className={styles['settings-modal']}>
            <ModalItem onClick={(): void => setCurrentModal(Modal.SPEED)} icon={<SpeedIcon width={20} />}>
              Speed
            </ModalItem>
            <ModalItem onClick={(): void => setCurrentModal(Modal.QUALITY)} icon={<QualityIcon width={20} />}>
              Quality
            </ModalItem>
          </GenericSettingsModal>
        );
      }
      case Modal.QUALITY: {
        return (
          <QualitySelector
            className={styles['settings-modal']}
            goBack={(): void => setCurrentModal(Modal.MAIN)}
            hlsClient={hlsClient}
          />
        );
      }
      case Modal.SPEED: {
        return (
          <SpeedSelector
            className={styles['settings-modal']}
            goBack={(): void => setCurrentModal(Modal.MAIN)}
            videoContainer={videoContainer}
          />
        );
      }
    }
  }, [currentModal]);

  useLayoutEffect(() => {
    videoWrapper.setAttribute('data-keep-open-modal', isOpen.toString());
    setCurrentModal(Modal.MAIN);
  }, [isOpen]);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>): void => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // Not triggered when swapping focus between children
      setIsOpen(false);
    }
  };

  return (
    <div className={styles['settings-wrapper']} onBlur={handleBlur}>
      {isOpen && getModalComponent}
      <ControlButton className={className} onClick={(): void => setIsOpen((prev) => !prev)}>
        <SettingsIcon height={20} />
      </ControlButton>
    </div>
  );
};

export { SettingsControl };
