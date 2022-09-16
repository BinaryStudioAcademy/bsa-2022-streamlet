import { ChatChart } from 'pages/studio/common/live-stream-analytics/chat-chart/chat-chart';
import React, { FC } from 'react';

const Chat: FC = () => {
  return (
    <ChatChart
      chatData={[
        {
          secondsFromStart: 0,
          messagesSinceLastEntry: 0,
        },
        {
          secondsFromStart: 60,
          messagesSinceLastEntry: 10,
        },
        {
          secondsFromStart: 120,
          messagesSinceLastEntry: 12,
        },
        {
          secondsFromStart: 180,
          messagesSinceLastEntry: 36,
        },
        {
          secondsFromStart: 240,
          messagesSinceLastEntry: 208,
        },
        {
          secondsFromStart: 300,
          messagesSinceLastEntry: 207,
        },
        {
          secondsFromStart: 360,
          messagesSinceLastEntry: 34,
        },
      ]}
    />
  );
};

export { Chat };
