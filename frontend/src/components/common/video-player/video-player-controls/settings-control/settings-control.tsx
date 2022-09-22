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
import { useOutsideClickHandler } from 'hooks/use-outside-click/use-outside-click-handler.hook';

type Props = {
  videoWrapper: HTMLElement;
  videoContainer: HTMLVideoElement;
  className?: string;
  isFullscreen: boolean;
  hlsClient: Hls | null;
};

enum Modal {
  MAIN,
  SPEED,
  QUALITY,
}

const SETTINGS_NORMAL_AFTER_PX = 768;

const SettingsControl: FC<Props> = ({ className, videoWrapper, videoContainer, hlsClient, isFullscreen }) => {
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
          <GenericSettingsModal className={styles['settings-modal']}>
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

  const handleOutsideClick = (): void => {
    setIsOpen(false);
  };

  useOutsideClickHandler([modalRef, settingsButtonRef], handleOutsideClick);

  // currently, there are 3 ways to display the modal
  // 1. just relative to the settings button, desktop version
  // 2. on narrow screens, the modal has to be positioned absolutely, relative to the screen,
  // currently somewhere in the middle. Using position: fixed, while leaving the modal component
  // at the same place in markup  as in 1. won't work, because the settings container creates its own stacking context (read docs)
  // and even if you set z-index of modal to 9999, it may be below video cards. the only option is to use portal, which
  // is guaranteed to be above all content
  // 3. even with these 2 ways, when we make video player fullscreen in narrow screens, the portal is a separate div from
  // the fullscreen element. so in this case, we may bring it back relative to settings button, like in step 1.
  return (
    <div className={styles['settings-wrapper']}>
      {isOpen &&
        (width >= SETTINGS_NORMAL_AFTER_PX ? (
          <div className={styles['settings-modal-wrp']} ref={modalRef}>
            {getModalComponent}
          </div>
        ) : isFullscreen ? (
          <div className={styles['settings-modal-fs-wrp']}>
            <div ref={modalRef}>{getModalComponent}</div>
          </div>
        ) : (
          <Portal className={styles['settings-modal-portal-wrp']}>
            <div ref={modalRef}>{getModalComponent}</div>
          </Portal>
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
