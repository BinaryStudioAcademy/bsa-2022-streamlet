import { createReducer } from '@reduxjs/toolkit';
import { DataStatus, StatsPeriodValue } from 'common/enums/enums';
import { LineChartData, PieChartData } from 'common/types/types';
import { getRejectedErrorData } from 'helpers/redux/get-rejected-error-data';
import {
  ChannelStatsLanguageChartDataResponse,
  ChannelStatsOverviewResponseDto,
  CreateVideoStatDto,
  DateTruncFormat,
  errorCodes,
} from 'shared/build';
import {
  addVideoStat,
  updateVideoStat,
  sendVideoStats,
  setStatsConfigPeriod,
  clearChannelStatsCharts,
  getChannelStatsChartData,
  updatePlayerTime,
  getChannelOverviewData,
  clearChannelOverviewData,
} from './actions';
import { setStateChartData, setStatePieChartData } from './helpers';

type State = {
  video: {
    data: Record<string, { stats: { statId: number; data: Omit<CreateVideoStatDto, 'userId'> }[] }>;
    temp: Record<string, { stats: { statId: number; data: Omit<CreateVideoStatDto, 'userId'> }[] }>;
    dataStatus: DataStatus;
    error: string | undefined;
    errorCode: string | undefined;
    playerTime: number;
  };
  channelStats: {
    chart: {
      views: LineChartData;
      subs: LineChartData;
      watchTime: LineChartData;
      device: PieChartData;
      language: ChannelStatsLanguageChartDataResponse;
      dataStatus: DataStatus;
      error: string | undefined;
    };
    liveChart: null;
    overview: {
      data: ChannelStatsOverviewResponseDto | null;
      dataStatus: DataStatus;
      error: string | undefined;
    };
  };
  statsConfig: {
    period: StatsPeriodValue;
  };
};

const initialLineChartData = {
  data: [],
  format: DateTruncFormat.DAY,
  dataLength: 0,
};

const initialState: State = {
  video: {
    data: {},
    temp: {},
    dataStatus: DataStatus.IDLE,
    error: undefined,
    errorCode: undefined,
    playerTime: 0,
  },
  channelStats: {
    chart: {
      views: initialLineChartData,
      subs: initialLineChartData,
      watchTime: initialLineChartData,
      device: [],
      language: {
        data: [],
      },
      dataStatus: DataStatus.IDLE,
      error: undefined,
    },
    liveChart: null,
    overview: {
      data: null,
      dataStatus: DataStatus.IDLE,
      error: undefined,
    },
  },
  statsConfig: {
    period: StatsPeriodValue.LAST_7_DAYS,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setStatsConfigPeriod, (state, { payload }) => {
    state.statsConfig.period = payload;
  });

  builder.addCase(clearChannelStatsCharts, (state) => {
    state.channelStats.chart = initialState.channelStats.chart;
    state.channelStats.overview = initialState.channelStats.overview;
  });

  builder.addCase(getChannelOverviewData.pending, (state) => {
    state.channelStats.overview = {
      ...initialState.channelStats.overview,
      dataStatus: DataStatus.PENDING,
    };
  });
  builder.addCase(getChannelOverviewData.rejected, (state, { error }) => {
    state.channelStats.overview.dataStatus = DataStatus.REJECTED;
    state.channelStats.overview.error = error.message;
  });
  builder.addCase(getChannelOverviewData.fulfilled, (state, { payload }) => {
    state.channelStats.overview.dataStatus = DataStatus.FULFILLED;
    state.channelStats.overview.data = payload;
  });

  builder.addCase(clearChannelOverviewData, (state) => {
    state.channelStats.overview = initialState.channelStats.overview;
  });

  builder.addCase(getChannelStatsChartData.pending, (state) => {
    state.channelStats.chart = {
      ...initialState.channelStats.chart,
      dataStatus: DataStatus.PENDING,
    };
  });
  builder.addCase(getChannelStatsChartData.rejected, (state, { error }) => {
    state.channelStats.chart.dataStatus = DataStatus.REJECTED;
    state.channelStats.chart.error = error.message;
  });
  builder.addCase(getChannelStatsChartData.fulfilled, (state, { payload }) => {
    state.channelStats.chart.dataStatus = DataStatus.FULFILLED;

    const { views, watchTime, subs, device, language } = payload;
    state.channelStats.chart.views = setStateChartData(views);
    state.channelStats.chart.watchTime = setStateChartData(watchTime);
    state.channelStats.chart.subs = setStateChartData(subs);
    state.channelStats.chart.device = setStatePieChartData(device);
    state.channelStats.chart.language = language;
  });

  builder.addCase(updatePlayerTime, (state, { payload }) => {
    state.video.playerTime = payload;
  });

  builder.addCase(addVideoStat, (state, { payload }) => {
    let temp = { ...state.video.temp };
    if (Object.keys(temp).length !== 0) {
      if (state.video.dataStatus !== DataStatus.PENDING) {
        state.video.data = { ...temp };
        temp = {};
      }
    }

    if (!(payload.data.videoId in temp)) {
      temp[payload.data.videoId] = { stats: [] };
    }
    temp[payload.data.videoId].stats.push({
      statId: payload.statId,
      data: {
        ...payload.data,
        createdAt: new Date().toISOString(),
      },
    });

    state.video.temp = { ...temp };
  });

  builder.addCase(updateVideoStat, (state, { payload }) => {
    if (payload.data.videoId in state.video.temp) {
      const stats = [...state.video.temp[payload.data.videoId].stats];
      const index = stats.findIndex((s) => s.statId === payload.statId);
      if (index >= 0) {
        stats[index] = {
          ...stats[index],
          data: {
            ...stats[index].data,
            ...payload.data,
            watchTime: (stats[index].data.watchTime ?? 0) + (payload.data.watchTime ?? 0),
            commentsActivity: (stats[index].data.commentsActivity ?? 0) + (payload.data.commentsActivity ?? 0),
            chatsActivity: (stats[index].data.chatsActivity ?? 0) + (payload.data.chatsActivity ?? 0),
          },
        };
      }
      state.video.temp[payload.data.videoId].stats = [...stats];
    }
  });

  builder.addCase(sendVideoStats.rejected, (state, { error, payload }) => {
    state.video.dataStatus = DataStatus.REJECTED;

    const { errorCode, message } = getRejectedErrorData(error, payload);
    state.video.error = message;
    state.video.errorCode = errorCode;

    if (errorCode === errorCodes.video.NO_VIDEOS) {
      state.video.data = initialState.video.data;
    }
  });
  builder.addCase(sendVideoStats.pending, (state) => {
    state.video.dataStatus = DataStatus.PENDING;
    state.video.error = initialState.video.error;
    state.video.errorCode = initialState.video.errorCode;
  });
  builder.addCase(sendVideoStats.fulfilled, (state) => {
    state.video.dataStatus = DataStatus.FULFILLED;
    state.video.data = initialState.video.data;
  });
});

export { reducer };
