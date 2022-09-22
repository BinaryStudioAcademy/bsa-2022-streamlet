import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';
import { FC, PieChartData } from 'common/types/types';
import { useId, useState, useCallback } from 'hooks/hooks';

const strokeColor = '#C4C4C4';
const COLORS = ['#06c149', '#246966', '#00a8c7', '#6a726d'];

export type PieChartProps = {
  data: PieChartData;
  hidePercents?: boolean;
};

const CustomPieChart: FC<PieChartProps> = ({ data, hidePercents = false }) => {
  const chartId = useId();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderActiveShape = (props: any): JSX.Element => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

    return (
      <g>
        <text x={cx} y={cy - (hidePercents ? 0 : 12)} dy={8} textAnchor="middle" fill={strokeColor}>
          {`${payload.name}`}
        </text>
        {!hidePercents && (
          <text x={cx} y={cy + 12} dy={8} textAnchor="middle" fill={strokeColor}>
            {`${(percent * 100).toFixed(2)}%`}
          </text>
        )}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: unknown, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`${chartId}cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export { CustomPieChart };
