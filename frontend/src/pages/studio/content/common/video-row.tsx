import { getFormatDurationString } from 'helpers/helpers';
import React, { EventHandler, FC, SyntheticEvent, useState } from 'react';
import { VideoInfoDto } from 'shared/build';
import styles from './styles.module.scss';
import defaulVideoPoster from 'assets/img/default-video-poster-light.jpg';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'components/common/icon';
import { IconColor, IconName, VideoMenuOptions } from 'common/enums/enums';
import { useOutsideClick } from 'hooks/hooks';
import { allMenuOptions } from '../config';

export const VideoRow: FC<VideoInfoDto> = ({
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
}) => {
  const imgFallbackHandler: EventHandler<SyntheticEvent<HTMLImageElement, Event>> = ({ currentTarget }): void => {
    currentTarget.onerror = null;
    currentTarget.src = defaulVideoPoster;
  };
  const navigate = useNavigate();
  const redirectHandler = (): void => {
    navigate(`/video/${id}`);
  };

  const [isChecked, setIsChecked] = useState(false);
  const chekboxHandler = (): void => {
    setIsChecked(!isChecked);
  };

  const { isOpened: isMenuOpen, open: openMenu, close: closeMenu, ref: menuRef } = useOutsideClick<HTMLDivElement>();
  const matchMenuOptionClickHandler: Record<VideoMenuOptions, () => void> = {
    [VideoMenuOptions.EDIT]: () => {
      closeMenu();
    },
    [VideoMenuOptions.DELETE]: () => {
      closeMenu();
    },
  };

  const menuOptions = allMenuOptions.map((option) => ({
    ...option,
    onClick: matchMenuOptionClickHandler[option.type],
  }));

  return (
    <tr className={styles[isChecked ? 'wrapper-checked' : 'wrapper']}>
      <th>
        <input onClick={chekboxHandler} className={styles['checkbox']} type="checkbox" />
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
      <th>{privacy}</th>
      <th>{publishedAt}</th>
      <th>{viewsCount}</th>
      <th>{commentsCount}</th>
      <th>
        {likeCount} / {dislikeCount}
      </th>
    </tr>
  );
};
