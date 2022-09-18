import clsx from 'clsx';
import { DataStatus, IconColor, IconName } from 'common/enums/enums';
import { Icon, Tooltip } from 'components/common/common';
import { useAppDispatch, useAppSelector, useWindowDimensions } from 'hooks/hooks';
import React, { FC, useEffect, useState } from 'react';
import { changePrivacy, getMyVideos, pickAllVideo, unloadVideos } from 'store/content-page/actions';
import { VideoRow } from './common/video-row';
import { ReactComponent as Eye } from 'assets/img/eye.svg';
import styles from './styles.module.scss';
import { PrivacyModal } from './common/privacy-modal';
import { VideoPrivacy } from 'shared/build';

export const StudioContent: FC = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { videos, isLoading, isNeedExtendedMenu, pickedVideos, authorId } = useAppSelector((store) => ({
    authorId: store.auth.user?.id,
    videos: store.contentPage.data,
    isLoading: Boolean(store.contentPage.dataStatus !== DataStatus.FULFILLED),
    isNeedExtendedMenu: Boolean(store.contentPage.data.filter((video) => video.isActive).length),
    pickedVideos: store.contentPage.data.filter((video) => video.isActive).map((video) => video.id),
  }));
  const pickedCount = pickedVideos.length;

  useEffect(() => {
    dispatch(getMyVideos());
    return () => {
      dispatch(unloadVideos());
    };
  }, [dispatch]);
  const [isChecked, setIsChecked] = useState(false);
  const checkAllHanler = (): void => {
    setIsChecked(!isChecked);
    dispatch(pickAllVideo({ isPick: !isChecked }));
  };
  useEffect(() => {
    if (!isLoading) {
      setIsChecked(pickedCount === videos.length);
    }
  }, [pickedCount, isLoading, videos]);

  const [isNeedPrivacyModal, setIsNeedPrivacyModal] = useState(false);
  const confirmPrivacyChangesHandler = (visibility: VideoPrivacy): void => {
    if (authorId) {
      setIsNeedPrivacyModal(false);
      dispatch(changePrivacy({ authorId, videoIds: pickedVideos, visibility }));
    }
    setIsNeedPrivacyModal(false);
  };
  const cancelPrivacyChangesHandler = (): void => {
    setIsNeedPrivacyModal(false);
  };

  return (
    <div className={styles['studio']}>
      <Tooltip isLightTheme={false} />
      <PrivacyModal
        isOpen={isNeedPrivacyModal}
        currentPicked={VideoPrivacy.PUBLIC}
        onOk={confirmPrivacyChangesHandler}
        onCancel={cancelPrivacyChangesHandler}
      />
      <h1 className={styles['header']}>Channel content</h1>
      <div className={styles['body']}>
        <table className={styles['table']}>
          <tr>
            <th>
              <input checked={isChecked} onChange={checkAllHanler} type="checkbox" className={styles['checkbox']} />
            </th>
            <th>
              <div className={styles['extended-menu']}>
                <div className={styles['extended-menu-segment']}>Video</div>
                <div className={clsx(styles['extented-menu-segment'], { [styles.displaynone]: !isNeedExtendedMenu })}>
                  <Eye onClick={(): void => setIsNeedPrivacyModal(true)} />
                </div>
                <div className={clsx(styles['extented-menu-segment'], { [styles.displaynone]: !isNeedExtendedMenu })}>
                  <Icon name={IconName.DELETE} color={IconColor.GRAY} />
                </div>
              </div>
            </th>
            <th data-tip={width >= 1300 ? '' : 'Visibility'}>Visibility</th>
            <th data-tip={width >= 1300 ? '' : 'Date'}>Date</th>
            <th data-tip={width >= 1300 ? '' : 'Views'}>Views</th>
            <th data-tip={width >= 1300 ? '' : 'Comments'}>Comments</th>
            <th data-tip={width >= 1300 ? '' : 'Likes / Dislikes'}>{width >= 1300 ? 'Likes / Dislikes' : 'L/D'}</th>
            <th></th>
          </tr>
          {videos.map((video) => (
            <VideoRow {...video} key={video.id} />
          ))}
        </table>
      </div>
    </div>
  );
};
