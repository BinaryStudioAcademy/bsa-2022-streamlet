import { getFormatDurationString } from 'helpers/helpers';
import React, { FC } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CustomTooltip } from '../../custom-tooltip/custom-tooltip';

type Props = {
  chatData: { secondsFromStart: number; messagesSinceLastEntry: number }[];
};

const ChatChart: FC<Props> = ({ chatData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chatData} margin={{ top: 10, left: 0, right: 30, bottom: 0 }}>
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
        <Area
          type="linear"
          dataKey="messagesSinceLastEntry"
          name="Messages since last time point"
          stackId="1"
          stroke="#00ff22"
          fill="#00ff22"
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

export { ChatChart };
