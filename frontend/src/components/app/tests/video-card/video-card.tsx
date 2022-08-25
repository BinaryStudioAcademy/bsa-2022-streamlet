import { ReactElement, useState } from 'react';
import { VideoCard } from '../../../common/video-card/video-card';
import dayjs from 'dayjs';
const VideoCardTest = (): ReactElement => {
  const [viewerNum, setViewerNum] = useState(10000);
  const [videoHeader, setVideoHeader] = useState('test');
  const [posterImage, setPosterImage] = useState('https://i.ibb.co/P4ZCRVj/photo-boards-KZNTEn2r6tw-unsplash.png');
  const [duration, setDuration] = useState<string>('2:13');
  const [author, setAuthor] = useState<string>('someone');
  const [creationData, setCreationDate] = useState<Date>(new Date());
  return (
    <div>
      <label htmlFor="video-header" style={{ color: 'white', margin: '0 10px 0 10px' }}>
        {' '}
        Enter video header
      </label>
      <input
        type="text"
        onChange={(e): void => {
          setVideoHeader(e.target.value);
        }}
        value={videoHeader}
        name={'video-header'}
      ></input>
      <label htmlFor="poster" style={{ color: 'white', margin: '0 10px 0 10px' }}>
        {' '}
        optional Enter link to poster image
      </label>
      <input
        type="text"
        onChange={(e): void => {
          setPosterImage(e.target.value);
        }}
        value={posterImage}
        name={'poster'}
      ></input>

      <label htmlFor="duration" style={{ color: 'white', margin: '0 10px 0 10px' }}>
        {' '}
        Enter duration
      </label>
      <input
        type="text"
        onChange={(e): void => {
          setDuration(e.target.value);
        }}
        value={duration}
        name={'duration'}
      ></input>

      <label htmlFor="author" style={{ color: 'white', margin: '0 10px 0 10px' }}>
        {' '}
        Enter duration
      </label>
      <input
        type="text"
        onChange={(e): void => {
          setAuthor(e.target.value);
        }}
        value={author}
        name={'author'}
      ></input>

      <label htmlFor="date" style={{ color: 'white', margin: '0 10px 0 10px' }}>
        {' '}
        Enter creation date
      </label>
      <input
        type="date"
        onChange={(e): void => {
          setCreationDate(new Date(e.target.value));
        }}
        value={dayjs(creationData).format('YYYY-MM-DD')}
        name={'date'}
      ></input>

      <label htmlFor="viewerNum" style={{ color: 'white', margin: '0 10px 0 10px' }}>
        {' '}
        Enter viewer num
      </label>
      <input
        type="number"
        min={0}
        onChange={(e): void => {
          setViewerNum(+e.target.value);
        }}
        value={viewerNum}
        name={'viewerNum'}
      ></input>
      <div style={{ margin: '100px' }}>
        <VideoCard
          id={'test'}
          authorInfo={{
            author,
            channelId: 'test',
          }}
          isLive={false}
          poster={posterImage}
          creationDate={creationData}
          name={videoHeader}
          duration={duration}
          viewerNum={viewerNum}
        />
      </div>
    </div>
  );
};
export { VideoCardTest };
