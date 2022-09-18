import { getFormatDurationString } from 'helpers/helpers';
import React, { EventHandler, FC, SyntheticEvent, useState } from 'react';
import { VideoInfoDto, VideoPrivacy } from 'shared/build';
import styles from './styles.module.scss';
import defaulVideoPoster from 'assets/img/default-video-poster-light.jpg';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'components/common/icon';
import { IconColor, IconName } from 'common/enums/enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { changePrivacy, editInfo, pickVideo } from 'store/content-page/actions';
import { ReactComponent as Eye } from 'assets/img/eye.svg';
import { ReactComponent as EyeSlash } from 'assets/img/eye-slash.svg';
import { InfoFormValues, InfoModal } from './info-modal';

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
  const { authorId, currentPrivacy } = useAppSelector((store) => ({
    authorId: store.auth.user?.id,
    currentPrivacy: store.contentPage.data.filter((video) => video.id === id)[0].privacy,
  }));
  const imgFallbackHandler: EventHandler<SyntheticEvent<HTMLImageElement, Event>> = ({ currentTarget }): void => {
    currentTarget.onerror = null;
    currentTarget.src = defaulVideoPoster;
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectHandler = (): void => {
    navigate(`/video/${id}`);
  };

  const cheсkboxHandler = (): void => {
    dispatch(pickVideo({ id }));
  };

  const [isNeedInfoModal, setIsNeedInfoModal] = useState(false);
  const confirmInfoChangesHandler = (formValues: InfoFormValues): void => {
    if (authorId) {
      setIsNeedInfoModal(false);
      dispatch(editInfo({ videoId: id, authorId, ...formValues }));
    }
  };
  const cancelInfoChangesHandler = (): void => {
    setIsNeedInfoModal(false);
  };

  const changePrivacyHandler = (): void => {
    if (authorId) {
      const visibility = currentPrivacy === VideoPrivacy.PUBLIC ? VideoPrivacy.PRIVATE : VideoPrivacy.PUBLIC;
      dispatch(changePrivacy({ authorId, videoId: id, visibility }));
    }
  };

  return (
    <tr className={styles[isActive ? 'wrapper-checked' : 'wrapper']}>
      <InfoModal
        isOpen={isNeedInfoModal}
        id={id}
        name={name}
        description={description}
        onOk={confirmInfoChangesHandler}
        onCancel={cancelInfoChangesHandler}
      />
      <th>
        <input checked={isActive} onChange={cheсkboxHandler} className={styles['checkbox']} type="checkbox" />
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
        </div>
      </th>
      <th>
        <div className={styles['privacy-wrapper']}>
          <div className={styles['privacy-container']}>{privacy}</div>
        </div>
      </th>
      <th>{publishedAt}</th>
      <th>{viewsCount}</th>
      <th>{commentsCount}</th>
      <th>
        {likeCount} / {dislikeCount}
      </th>
      <th>
        <div className={styles['control-block']}>
          <Icon
            onClick={(): void => setIsNeedInfoModal(!isNeedInfoModal)}
            name={IconName.EDIT}
            color={IconColor.GRAY}
          />
          <Icon name={IconName.DELETE} color={IconColor.GRAY} />
          {currentPrivacy === VideoPrivacy.PUBLIC ? (
            <Eye onClick={changePrivacyHandler} />
          ) : (
            <EyeSlash onClick={changePrivacyHandler} />
          )}
        </div>
      </th>
    </tr>
  );
};
