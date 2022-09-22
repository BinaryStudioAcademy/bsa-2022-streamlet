import styles from '../../styles.module.scss';
import { getDateStringAtDdMmYyyyFormat } from '../../../../helpers/date/get-date-string-at-dd-mm-yyyy-format/get-date-string-at-dd-mm-yyyy-format';
import { VideoCard } from '../../../../components/search/components/video-card/video-card';
import { prettyDate } from '../../../../helpers/date/is-date-same-by-day-mounth-year/is-date-same-by-day-mounth-year';
import React, { ReactElement } from 'react';
import { HistoryResponseDto } from 'shared/build';
import { FC } from '../../../../common/types/react/fc.type';
import { NoVideosYet } from '../../../../components/common/no-videos-yet/no-videos-yet';

type props = {
  historyData: HistoryResponseDto;
  isLightTheme: boolean;
  containerClassName: string;
};

const HistoryList: FC<props> = ({ historyData, isLightTheme, containerClassName }): ReactElement => {
  const { list } = historyData;

  if (!list.length) {
    return (
      <div className={styles['no-video-in-list']}>
        <NoVideosYet />
      </div>
    );
  }

  const sortedVideosWithDateStamp = [];

  for (let i = 0; i < list.length; i++) {
    if (!i) {
      sortedVideosWithDateStamp.push(String(list[i].updatedAt), list[i]);
    }

    if (
      i &&
      getDateStringAtDdMmYyyyFormat(list[i].updatedAt) !== getDateStringAtDdMmYyyyFormat(list[i - 1].updatedAt)
    ) {
      sortedVideosWithDateStamp.push(String(list[i].updatedAt), list[i]);
    }

    if (
      i &&
      getDateStringAtDdMmYyyyFormat(list[i].updatedAt) === getDateStringAtDdMmYyyyFormat(list[i - 1].updatedAt)
    ) {
      sortedVideosWithDateStamp.push(list[i]);
    }
  }

  return (
    <div className={containerClassName}>
      {sortedVideosWithDateStamp.map((historyRecord) => {
        if (typeof historyRecord === 'string') {
          return (
            <p key={historyRecord} className={styles['date']}>
              {prettyDate(historyRecord)}
            </p>
          );
        }

        if (typeof historyRecord === 'object') {
          return <VideoCard key={historyRecord.id} video={historyRecord.video} isLightTheme={isLightTheme} />;
        }
      })}
    </div>
  );
};

export { HistoryList };
