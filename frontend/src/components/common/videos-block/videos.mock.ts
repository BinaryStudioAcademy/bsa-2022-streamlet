import { VideoProps } from '../video-card/video-card';
import { VideoBlockProps } from './videos-block';

const videoMock: Array<VideoProps> = [
  {
    id: '1',
    chanelId: '12',
    poster:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    author: 'Vasya',
    duration: '123',
    name: 'Video 1',
    viewerNum: 123,
    creationDate: new Date(),
  },
  {
    id: '2',
    chanelId: '12',
    poster:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    author: 'Vasya',
    duration: '123',
    name: 'Video 1',
    viewerNum: 123,
    creationDate: new Date(),
  },
  {
    id: '3',
    chanelId: '12',
    poster:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    author: 'Vasya',
    duration: '123',
    name: 'Video 1',
    viewerNum: 123,
    creationDate: new Date(),
  },
  {
    id: '4',
    chanelId: '12',
    poster:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    author: 'Vasya',
    duration: '123',
    name: 'Video 1',
    viewerNum: 123,
    creationDate: new Date(),
  },
  {
    id: '5',
    chanelId: '12',
    poster:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    author: 'Vasya',
    duration: '123',
    name: 'Video 1',
    viewerNum: 123,
    creationDate: new Date(),
  },
];

const videoBlock: VideoBlockProps = {
  videos: videoMock,
};

const videoBlock2: VideoBlockProps = {
  titleBlock: 'recommended for you',
  videos: videoMock,
};

const blocksVideo: Array<VideoBlockProps> = [videoBlock, videoBlock2];

export { videoMock, blocksVideo };
