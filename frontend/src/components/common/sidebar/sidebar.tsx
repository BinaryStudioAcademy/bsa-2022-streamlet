import { FC } from 'common/types/types';
import { SidebarContainer } from './sidebar-container';

export type SubscribeChanel = {
  id: string;
  chanelAvatar: string;
  title: string;
};

const Sidebar: FC = () => {
  const subscribesList: Array<SubscribeChanel> = [
    {
      id: '1',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
    {
      id: '2',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
    {
      id: '3',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
    {
      id: '4',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
    {
      id: '5',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
    {
      id: '6',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
    {
      id: '7',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
    {
      id: '8',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
    {
      id: '9',
      chanelAvatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
      title: 'Binary Studio Academy',
    },
  ];

  return (
    <>
      <SidebarContainer subscribesList={subscribesList} />
    </>
  );
};

export { Sidebar };
