import styles from '../../styles.module.scss';
import { getDateStringAtDdMmYyyyFormat } from '../../../../helpers/date/get-date-string-at-dd-mm-yyyy-format/get-date-string-at-dd-mm-yyyy-format';
import { VideoCard } from '../../../../components/search/components/video-card/video-card';
import { isDateSameByDayMonthYear } from '../../../../helpers/date/is-date-same-by-day-mounth-year/is-date-same-by-day-mounth-year';
import React, { ReactElement } from 'react';
import { HistoryResponseDto } from 'shared/build';
import { FC } from '../../../../common/types/react/fc.type';

type props = {
  historyData: HistoryResponseDto;
  isLightTheme: boolean;
  containerClassName: string;
};

const HistoryList: FC<props> = ({ historyData, isLightTheme, containerClassName }): ReactElement => {
  return (
    <div className={containerClassName}>
      {historyData.list.map((historyRecord, index) => {
        if (!index) {
          return (
            <div key={historyRecord.id}>
              <p className={styles['date']}>{getDateStringAtDdMmYyyyFormat(historyRecord.updatedAt)}</p>
              <VideoCard key={historyRecord.id} video={historyRecord.video} isLightTheme={isLightTheme} />
            </div>
          );
        }
        const prevHistoryRecordUpdatedAt = historyData.list[index - 1].updatedAt;
        const currentHistoryUpdatedAt = historyRecord.updatedAt;
        const isPrevAndCurrentHistoryUpdatedAtSame = isDateSameByDayMonthYear(
          prevHistoryRecordUpdatedAt,
          currentHistoryUpdatedAt,
        );

        return isPrevAndCurrentHistoryUpdatedAtSame ? (
          <VideoCard key={historyRecord.id} video={historyRecord.video} isLightTheme={isLightTheme} />
        ) : (
          <div key={historyRecord.id}>
            <p className={styles['date']}>{getDateStringAtDdMmYyyyFormat(prevHistoryRecordUpdatedAt)}</p>
            <VideoCard key={historyRecord.id} video={historyRecord.video} isLightTheme={isLightTheme} />
          </div>
        );
      })}
    </div>
  );
};

export { HistoryList };
