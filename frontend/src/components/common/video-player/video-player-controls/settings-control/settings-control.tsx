import React, { FC, ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ControlButton } from '../control-button/control-button';
import { ReactComponent as SettingsIcon } from 'assets/img/settings-filled.svg';
import { ReactComponent as SpeedIcon } from 'assets/img/speedometer.svg';
import { ReactComponent as QualityIcon } from 'assets/img/settings-tune.svg';
import styles from './styles.module.scss';
import headerStyles from './header-styles.module.scss';
import { GenericSettingsModal } from './generic-settings-modal/generic-settings-modal';
import { ModalItem } from './modal-item/modal-item';
import { SpeedSelector } from './speed-selector/speed-selector';
import { QualitySelector } from './quality-selector/quality-selector';
import Hls from 'hls.js';
import clsx from 'clsx';
import { Portal } from 'components/common/portal/portal';
import { useWindowDimensions } from 'hooks/hooks';

type Props = {
  videoWrapper: HTMLElement;
  videoContainer: HTMLVideoElement;
  className?: string;
  hlsClient: Hls | null;
};

enum Modal {
  MAIN,
  SPEED,
  QUALITY,
}

const SETTINGS_NORMAL_AFTER_PX = 768;

const SettingsControl: FC<Props> = ({ className, videoWrapper, videoContainer, hlsClient }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<Modal>(Modal.MAIN);
  const [speed, setSpeed] = useState(videoContainer.playbackRate);
  const [quality, setQuality] = useState('Auto');
  const { width } = useWindowDimensions();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const getModalComponent = useMemo((): ReactNode => {
    switch (currentModal) {
      case Modal.MAIN: {
        return (
          <GenericSettingsModal className={styles['settings-modal']} innerRef={modalRef}>
            <ModalItem isHeader contentContainerClassName={headerStyles['header']} isHoverable={false}>
              <span className={headerStyles['header-text']}>Settings</span>
            </ModalItem>
            <ModalItem onClick={(): void => setCurrentModal(Modal.SPEED)} icon={<SpeedIcon height={20} />}>
              <div className={styles['modal-option-text-wrapper']}>
                <div>Speed </div>
                <div className={styles['option-metric']}>{speed}x</div>
              </div>
            </ModalItem>
            <ModalItem onClick={(): void => setCurrentModal(Modal.QUALITY)} icon={<QualityIcon height={17} />}>
              <div className={styles['modal-option-text-wrapper']}>
                <div>Quality </div>
                <div className={styles['option-metric']}>{quality}</div>
              </div>
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
            videoContainer={videoContainer}
            setLevelName={setQuality}
          />
        );
      }
      case Modal.SPEED: {
        return (
          <SpeedSelector
            className={styles['settings-modal']}
            goBack={(): void => setCurrentModal(Modal.MAIN)}
            videoContainer={videoContainer}
            setCurrentSpeed={setSpeed}
          />
        );
      }
    }
  }, [currentModal, hlsClient, speed, quality, videoContainer]);

  useLayoutEffect(() => {
    videoWrapper.setAttribute('data-keep-open-modal', isOpen.toString());
    setCurrentModal(Modal.MAIN);
  }, [isOpen, videoWrapper]);

  const settingsButtonRef = useRef<HTMLAnchorElement | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>): void => {
    const swappedBetweenModalChildren =
      modalRef.current !== null && (modalRef.current.contains(e.relatedTarget) || modalRef.current === e.relatedTarget);
    if (
      !swappedBetweenModalChildren &&
      !e.currentTarget.contains(e.relatedTarget) &&
      e.relatedTarget !== settingsButtonRef.current
    ) {
      // Not triggered when swapping focus between children
      // also, not trigerred when clicked the settings icon (it has its own handler)
      setIsOpen(false);
    }
  };

  return (
    <div className={styles['settings-wrapper']} onBlur={handleBlur}>
      {isOpen &&
        (width >= SETTINGS_NORMAL_AFTER_PX ? (
          <div className={styles['settings-modal-wrp']}>{getModalComponent}</div>
        ) : (
          <Portal className={styles['settings-modal-portal-wrp']}>{getModalComponent}</Portal>
        ))}
      <ControlButton
        ref={settingsButtonRef}
        className={clsx(styles['settings-btn'], className)}
        onClick={(): void => {
          setIsOpen((prev) => !prev);
        }}
      >
        <SettingsIcon height="70%" />
      </ControlButton>
    </div>
  );
};

export { SettingsControl };
