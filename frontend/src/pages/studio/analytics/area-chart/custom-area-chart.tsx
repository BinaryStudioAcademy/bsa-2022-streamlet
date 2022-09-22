import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { AxisDomain } from 'recharts/types/util/types';
import { CustomTooltip } from '../line-chart/tooltip/custom-tooltip';
import { FC, LineChartData, LineChartDataPeriod } from 'common/types/types';
import { useId } from 'hooks/hooks';
import { getDefaultPeriod, getEmptyPeriodsForChart, getFormattedDate } from '../chart-helpers';
import { StatsPeriodValue } from 'common/enums/enums';

const strokeColor = '#C4C4C4';
const lineColor = ['#06c149', '#246966', '#00a8c7'];

export type ChartProps = {
  data: LineChartData;
  period: StatsPeriodValue;
  aspect?: number;
  valueNames?: Partial<Record<keyof Omit<LineChartDataPeriod, 'date'>, string>>;
};

const getTicks = (startDate: Date, endDate: Date, num: number): number[] => {
  const diffDays = dayjs(endDate).diff(startDate);

  const current = startDate,
    velocity = Math.round(diffDays / (num - 1));

  const ticks = [startDate.getTime()];

  for (let i = 1; i < num - 1; i++) {
    ticks.push(
      dayjs(current)
        .add(i * velocity, 'ms')
        .valueOf(),
    );
  }

  ticks.push(endDate.getTime());
  return ticks;
};

export const CustomAreaChart: FC<ChartProps> = ({ data, valueNames, period, aspect = 3 }) => {
  let { data: realData, format, dataLength } = data;

  if (dataLength === 0) {
    realData = getEmptyPeriodsForChart(period);
    format = getDefaultPeriod(period);
    dataLength = realData.length;
  }

  const startDate = new Date(realData[0].date);
  const endDate = new Date(realData[dataLength - 1].date);
  const ticks = getTicks(startDate, endDate, dataLength);
  const domain: AxisDomain = [(): number => startDate.getTime(), (): number => endDate.getTime()];
  const values: string[] = dataLength > 0 ? Object.keys(realData[0]).filter((k) => k !== 'date') : [];

  const chartId = useId();

  const handleDateFormatter = (date: string): string => {
    return getFormattedDate(date, format, period);
  };

  return (
    <>
      <ResponsiveContainer aspect={aspect}>
        <AreaChart
          data={realData}
          margin={{
            top: 20,
            right: 30,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal={false} vertical={true} stroke={strokeColor} opacity={0.5} />
          <XAxis
            dataKey="date"
            scale="time"
            tick={{ fill: strokeColor }}
            axisLine={false}
            tickFormatter={handleDateFormatter}
            type="number"
            domain={domain}
            ticks={ticks}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: strokeColor }}
            width={40}
            axisLine={false}
            tickCount={7}
            tickLine={false}
            tickMargin={40}
          />
          <Tooltip
            cursor={false}
            isAnimationActive={false}
            content={<CustomTooltip active={false} payload={[]} valueNames={valueNames} />}
          />
          {values.map((v, i) => (
            <Area
              key={`${chartId}${v}`}
              type="monotone"
              dataKey={v}
              stroke={lineColor[i]}
              fill={lineColor[i]}
              fillOpacity={0.3}
              strokeWidth="3"
              connectNulls
              dot={{ fill: lineColor[i], stroke: lineColor[i], strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: lineColor[i], strokeWidth: 5, r: 8 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
