import ContentLoader from 'react-content-loader';
import React, { ReactElement } from 'react';

const HistoryLoader = (): ReactElement => (
  <ContentLoader
    speed={2}
    width={1028}
    height={124}
    viewBox="0 0 1028 124"
    backgroundColor="#514d4d"
    foregroundColor="#46b96c"
  >
    <rect x="231" y="8" rx="3" ry="3" width="380" height="6" />
    <rect x="255" y="50" rx="3" ry="3" width="178" height="6" />
    <circle cx="240" cy="52" r="13" />
    <rect x="-1" y="1" rx="0" ry="0" width="225" height="149" />
    <rect x="231" y="19" rx="0" ry="0" width="114" height="14" />
  </ContentLoader>
);

const generateHistorySkeletons = (): ReactElement[] => {
  return new Array(10).fill('skeleton').map((value, index) => <HistoryLoader key={`${value}-${index}`} />);
};

export { generateHistorySkeletons };
