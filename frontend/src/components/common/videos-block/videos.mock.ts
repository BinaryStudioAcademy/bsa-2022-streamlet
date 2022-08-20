// import { VideoProps } from '../video-card/video-card';
import { VideoCard as VideoCardProps } from 'common/types/types';
import { VideoBlockProps } from './videos-block';

const videoMock: Array<VideoCardProps> = [
  {
    id: '1',
    name: 'Video 1',
    duration: 123,
    channel: {
      id: '12',
      name: 'Name chanel1',
      avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    },
    preview:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    createdAt: '2022/08/20 08:00:00',
    videoViews: 20,
  },
  {
    id: '2',
    name: 'Video 2',
    duration: 13,
    channel: {
      id: '13',
      name: 'Name chanel2',
      avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    },
    preview:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    createdAt: '2022/07/19',
    videoViews: 25,
  },
  {
    id: '3',
    name: 'Video 3',
    duration: 123,
    channel: {
      id: '14',
      name: 'Name chanel3',
      avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    },
    preview:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    createdAt: '2022/08/19',
    videoViews: 140,
  },
  {
    id: '4',
    name: 'Video 4',
    duration: 123,
    channel: {
      id: '15',
      name: 'Name chanel4',
      avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    },
    preview:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    createdAt: '2022/08/18',
    videoViews: 78,
  },
  {
    id: '5',
    name: 'Video 5',
    duration: 118,
    channel: {
      id: '16',
      name: 'Name chanel6',
      avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    },
    preview:
      'https://phantom-marca.unidadeditorial.es/2c3f444b0bbecebecf0d86ab58af0564/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16494753061855.jpg',
    createdAt: '2022/08/15',
    videoViews: 64,
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
