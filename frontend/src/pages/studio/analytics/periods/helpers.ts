import { StatsPeriod, StatsPeriodLabel, StatsPeriodValue } from 'common/enums/enums';

const matchStatsPeriodWithLabel: Record<StatsPeriod, StatsPeriodLabel> = {
  [StatsPeriod.LAST_7_DAYS]: StatsPeriodLabel.LAST_7_DAYS,
  [StatsPeriod.LAST_30_DAYS]: StatsPeriodLabel.LAST_30_DAYS,
  [StatsPeriod.LAST_90_DAYS]: StatsPeriodLabel.LAST_90_DAYS,
  [StatsPeriod.LAST_180_DAYS]: StatsPeriodLabel.LAST_180_DAYS,
  [StatsPeriod.LAST_365_DAYS]: StatsPeriodLabel.LAST_365_DAYS,
};

const matchStatsPeriodWithValue: Record<StatsPeriod, StatsPeriodValue> = {
  [StatsPeriod.LAST_7_DAYS]: StatsPeriodValue.LAST_7_DAYS,
  [StatsPeriod.LAST_30_DAYS]: StatsPeriodValue.LAST_30_DAYS,
  [StatsPeriod.LAST_90_DAYS]: StatsPeriodValue.LAST_90_DAYS,
  [StatsPeriod.LAST_180_DAYS]: StatsPeriodValue.LAST_180_DAYS,
  [StatsPeriod.LAST_365_DAYS]: StatsPeriodValue.LAST_365_DAYS,
};

export { matchStatsPeriodWithLabel, matchStatsPeriodWithValue };
