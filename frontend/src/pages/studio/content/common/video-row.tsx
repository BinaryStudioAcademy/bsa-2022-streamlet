import { getFormatDurationString } from 'helpers/helpers';
import React, { EventHandler, FC, SyntheticEvent, useState } from 'react';
import { VideoInfoDto, VideoPrivacy, VideoStatus } from 'shared/build';
import styles from './styles.module.scss';
import defaulVideoPoster from 'assets/img/default-video-poster-light.jpg';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'components/common/icon';
import { IconColor, IconName } from 'common/enums/enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { changePrivacy, deleteVideo, editInfo, pickVideo } from 'store/content-page/actions';
import { ReactComponent as Eye } from 'assets/img/eye.svg';
import { InfoFormValues, InfoModal } from './info-modal';
import { ConfirmationModal } from 'components/common/common';
import { PrivacyModal } from './privacy-modal';

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
  status,
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

  const [isNeedConfirmModal, setIsNeedConfirmModal] = useState(false);
  const deleteHandler = (): void => {
    setIsNeedConfirmModal(false);
    if (authorId) {
      dispatch(deleteVideo({ authorId, ids: [id] }));
    }
  };

  const [isNeedPrivacyModal, setIsNeedPrivacyModal] = useState(false);
  const confirmPrivacyChangesHandler = (visibility: VideoPrivacy): void => {
    if (authorId) {
      setIsNeedPrivacyModal(false);
      dispatch(changePrivacy({ authorId, videoIds: [id], visibility }));
    }
  };
  const cancelPrivacyChangesHandler = (): void => {
    setIsNeedPrivacyModal(false);
  };

  return (
    <tr className={styles[isActive ? 'wrapper-checked' : 'wrapper']}>
      <InfoModal
        isOpen={isNeedInfoModal}
        id={id}
        title={name}
        description={description}
        onOk={confirmInfoChangesHandler}
        onCancel={cancelInfoChangesHandler}
      />
      <ConfirmationModal
        contentContainerClassName={styles['modal']}
        confirmationText={'Are you sure? Changes cannot be reverted'}
        buttonContainerClassName={styles['confirm-modal-btn-container']}
        isOpen={isNeedConfirmModal}
        onCancel={(): void => setIsNeedConfirmModal(false)}
        onOk={deleteHandler}
      />
      <PrivacyModal
        isOpen={isNeedPrivacyModal}
        onOk={confirmPrivacyChangesHandler}
        onCancel={cancelPrivacyChangesHandler}
        currentPicked={currentPrivacy}
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

              <div className={styles['video-info-segment']} data-tip={description}>
                {status === VideoStatus.LIVE && (
                  <div className={styles['live-label']}>
                    <Icon name={IconName.ONLINE_STREAMING_2} />
                    <span>Live</span>
                  </div>
                )}
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
          <Icon onClick={(): void => setIsNeedConfirmModal(true)} name={IconName.DELETE} color={IconColor.GRAY} />
          <Eye onClick={(): void => setIsNeedPrivacyModal(true)} />
        </div>
      </th>
    </tr>
  );
};
