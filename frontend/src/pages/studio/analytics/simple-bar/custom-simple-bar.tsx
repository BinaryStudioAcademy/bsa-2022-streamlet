import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FC, LineChartData, LineChartDataPeriod } from 'common/types/types';
import { CustomTooltip } from '../line-chart/tooltip/custom-tooltip';
import { useId } from 'hooks/hooks';
import { getDefaultPeriod, getEmptyPeriodsForChart, getFormattedDate } from '../chart-helpers';
import { StatsPeriodValue } from 'common/enums/enums';

const strokeColor = '#C4C4C4';
const lineColor = ['#06c149', '#246966', '#00a8c7'];

export type BarChartProps = {
  data: LineChartData;
  period: StatsPeriodValue;
  aspect?: number;
  valueNames?: Partial<Record<keyof Omit<LineChartDataPeriod, 'date'>, string>>;
};

const CustomSimpleBar: FC<BarChartProps> = ({ data, valueNames, period, aspect = 3 }) => {
  let { data: realData, format, dataLength } = data;

  if (dataLength === 0) {
    realData = getEmptyPeriodsForChart(period);
    format = getDefaultPeriod(period);
    dataLength = realData.length;
  }

  const values: string[] = dataLength > 0 ? Object.keys(realData[0]).filter((k) => k !== 'date') : [];

  const chartId = useId();

  const legendLabelFormatter = (value: string): JSX.Element => {
    return (
      <span style={{ textTransform: 'capitalize' }}>
        {valueNames ? valueNames[value as keyof Omit<LineChartDataPeriod, 'date'>] : value}
      </span>
    );
  };

  const handleDateFormatter = (date: string): string => {
    return getFormattedDate(date, format, period);
  };

  return (
    <ResponsiveContainer aspect={aspect} width="100%">
      <BarChart
        data={realData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid horizontal={false} vertical={false} stroke={strokeColor} opacity={0.5} />
        <XAxis
          dataKey="date"
          tick={{ fill: strokeColor }}
          axisLine={false}
          tickFormatter={handleDateFormatter}
          tickLine={false}
        />
        <YAxis tick={{ fill: strokeColor }} axisLine={false} tickLine={false} tickMargin={40} allowDecimals={false} />
        <Legend formatter={legendLabelFormatter} />
        <Tooltip
          cursor={false}
          isAnimationActive={false}
          content={<CustomTooltip active={false} payload={[]} valueNames={valueNames} />}
        />
        {values.map((v, i) => (
          <Bar key={`${chartId}${v}`} dataKey={v} fill={lineColor[i]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export { CustomSimpleBar };
