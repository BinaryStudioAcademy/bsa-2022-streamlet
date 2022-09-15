import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { AxisDomain } from 'recharts/types/util/types';
import { CustomTooltip } from './tooltip/custom-tooltip';
import { FC } from 'common/types/types';
import { ChartData } from './types/types';
import { getMonthData } from './mock-helper/mock-helper';

const strokeColor = '#C4C4C4';
const lineColor = '#06C149';

export type ChartProps = {
  data: ChartData;
  days: number;
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

export const CustomLineChart: FC<ChartProps> = ({ data, days }) => {
  const dataLength = data.dataLength;
  const startDate = data.data[0].date;
  const endDate = data.data[data.data.length - 1].date;
  const ticks = getTicks(startDate, endDate, dataLength);
  const domain: AxisDomain = [(dataMin: Date): Date => dataMin, (): number => endDate.getTime()];
  const realData = days === 365 ? getMonthData(data.data) : data.data;

  const dateFormatter = (date: string): string => {
    switch (data.format) {
      case 'day':
        return dayjs(new Date(date)).format('ddd DD');

      default:
        return dayjs(new Date(date)).format('MMM');
    }
  };

  return (
    <>
      <ResponsiveContainer aspect={3}>
        <LineChart
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
            tickFormatter={dateFormatter}
            type="number"
            domain={domain}
            ticks={ticks}
            tickLine={false}
            textAnchor="middle"
          />
          <YAxis
            tick={{ fill: strokeColor }}
            axisLine={false}
            tickCount={7}
            tickLine={false}
            tickMargin={40}
            textAnchor="middle"
          />
          <Tooltip cursor={false} isAnimationActive={false} content={<CustomTooltip active={false} payload={[]} />} />
          <Line
            type="linear"
            dataKey="value"
            stroke={lineColor}
            strokeWidth="3"
            dot={{ fill: lineColor, stroke: lineColor, strokeWidth: 2, r: 5 }}
            activeDot={{ stroke: lineColor, strokeWidth: 5, r: 10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
