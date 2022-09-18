import { getFormatDurationString } from 'helpers/helpers';
import React, { FC } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CustomTooltip } from '../../custom-tooltip/custom-tooltip';

type Props = {
  viewsData: { secondsFromStart: number; subs: number; unsubs: number }[];
};

const ViewsChart: FC<Props> = ({ viewsData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={viewsData} margin={{ top: 10, left: 0, right: 30, bottom: 0 }}>
        <XAxis
          dataKey="secondsFromStart"
          axisLine={false}
          tickLine={false}
          tickFormatter={getFormatDurationString}
          tickMargin={20}
          tick={{ fill: 'white' }}
        />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'white' }} />
        <CartesianGrid vertical={false} strokeOpacity={0.5} />
        <Area type="monotone" dataKey="subs" name="Subscribers" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="unsubs" name="Guests" stackId="1" stroke="#00ff22" fill="#00ff22" />
        <Area
          type="monotone"
          dataKey={(data): number => data['subs'] + data['unsubs']}
          name="Total"
          fill="none"
          strokeWidth={5}
          stroke="#00ccff"
        />
        <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
        <Legend
          verticalAlign="bottom"
          iconType="rect"
          wrapperStyle={{
            paddingTop: '30px',
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export { ViewsChart };
