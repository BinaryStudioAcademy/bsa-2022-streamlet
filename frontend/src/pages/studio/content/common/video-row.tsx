import { getFormatDurationString } from 'helpers/helpers';
import React, { EventHandler, FC, SyntheticEvent } from 'react';
import { VideoInfoDto, VideoPrivacy } from 'shared/build';
import styles from './styles.module.scss';
import defaulVideoPoster from 'assets/img/default-video-poster-light.jpg';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'components/common/icon';
import { IconColor, IconName, VideoMenuOptions } from 'common/enums/enums';
import { useAppDispatch, useOutsideClick } from 'hooks/hooks';
import { allMenuOptions, allPrivacyMenuOptions } from '../config';
import { changePrivacy, pickVideo } from 'store/content-page/actions';

export const VideoRow: FC<VideoInfoDto & { isActive: boolean }> = ({
  id,
  name,
  description,
  poster,
  privacy,
  publishedAt,
  viewsCount,
  commentsCount,
  likeCount,
  dislikeCount,
  duration,
  isActive,
}) => {
  const imgFallbackHandler: EventHandler<SyntheticEvent<HTMLImageElement, Event>> = ({ currentTarget }): void => {
    currentTarget.onerror = null;
    currentTarget.src = defaulVideoPoster;
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectHandler = (): void => {
    navigate(`/video/${id}`);
  };

  const chekboxHandler = (): void => {
    dispatch(pickVideo({ id }));
  };

  const { isOpened: isMenuOpen, open: openMenu, close: closeMenu, ref: menuRef } = useOutsideClick<HTMLDivElement>();
  const matchMenuOptionClickHandler: Record<VideoMenuOptions, () => void> = {
    [VideoMenuOptions.EDIT]: () => {
      closeMenu();
    },
    [VideoMenuOptions.DELETE]: () => {
      closeMenu();
    },
    [VideoMenuOptions.DOWNLOAD]: () => {
      closeMenu();
    },
  };

  const menuOptions = allMenuOptions.map((option) => ({
    ...option,
    onClick: matchMenuOptionClickHandler[option.type],
  }));

  const {
    isOpened: isPrivacyMenuOpen,
    open: openPrivacyMenu,
    close: closePrivacyMenu,
    ref: privacyMenuRef,
  } = useOutsideClick<HTMLDivElement>();
  const matchPrivacyMenuOptionsClickHandler: Record<VideoPrivacy, () => void> = {
    [VideoPrivacy.PUBLIC]: () => {
      dispatch(changePrivacy({ id, privacy: VideoPrivacy.PUBLIC }));
      closePrivacyMenu();
    },
    [VideoPrivacy.PRIVATE]: () => {
      dispatch(changePrivacy({ id, privacy: VideoPrivacy.PRIVATE }));
      closePrivacyMenu();
    },
    [VideoPrivacy.UNLISTED]: () => {
      dispatch(changePrivacy({ id, privacy: VideoPrivacy.UNLISTED }));
      closePrivacyMenu();
    },
  };

  const privacyMenuOptions = allPrivacyMenuOptions.map((option) => ({
    ...option,
    onClick: matchPrivacyMenuOptionsClickHandler[option.type],
  }));

  return (
    <tr className={styles[isActive ? 'wrapper-checked' : 'wrapper']}>
      <th>
        <input checked={isActive} onChange={chekboxHandler} className={styles['checkbox']} type="checkbox" />
      </th>
      <th>
        <div className={styles['video-container']}>
          <div className={styles['video-container-wrapper']}>
            <div onClick={redirectHandler} className={styles['video-preview-container']}>
              <img src={poster} onError={imgFallbackHandler} className={styles['video-preview-poster']} />
              <div className={styles['video-labels']}>
                {duration !== null && (
                  <label className={styles['video-duration-label']}>{getFormatDurationString(duration)}</label>
                )}
              </div>
            </div>
            <div className={styles['video-info']}>
              <div className={styles['video-info-segment']} data-tip={name}>
                {name}
              </div>
              <div className={styles['video-info-segment']} data-tip={description}>
                {description}
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div ref={menuRef} className={styles['video-menu-body']}>
              <ul className={styles['video-menu-list']}>
                {menuOptions.map((option) => {
                  return (
                    <li key={option.type}>
                      <div className={styles['video-menu-item']} onClick={option.onClick}>
                        <Icon name={option.icon} color={IconColor.GRAY} />
                        <span>{option.text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div onClick={openMenu} className={styles['video-info-menu']} data-tip={description}>
            <Icon name={IconName.DOTS_MENU} color={IconColor.WHITE} />
          </div>
        </div>
      </th>
      <th>
        <div className={styles['privacy-wrapper']}>
          <div className={styles['privacy-container']}>{privacy}</div>
          <div onClick={openPrivacyMenu} className={styles['privacy-menu']}>
            <Icon name={IconName.ARROW_DOWN} color={IconColor.WHITE} />
          </div>
        </div>
        {isPrivacyMenuOpen && (
          <div ref={privacyMenuRef} className={styles['privacy-menu-body']}>
            <ul className={styles['privacy-menu-list']}>
              {privacyMenuOptions.map((option) => {
                return (
                  <li key={option.type}>
                    <div className={styles['privacy-menu-item']} onClick={option.onClick}>
                      <span>{option.text}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </th>
      <th>{publishedAt}</th>
      <th>{viewsCount}</th>
      <th>{commentsCount}</th>
      <th>
        {likeCount} / {dislikeCount}
      </th>
    </tr>
  );
};
