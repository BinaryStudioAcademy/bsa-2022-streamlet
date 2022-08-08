import { FC } from 'common/types/types';
import { SidebarMode } from './sidebar-mode';
import { MenuMode, Channel } from './components/components';

import styles from './styles.module.scss';

const Sidebar: FC = () => {
  const sub = [
    {
      id: '1',
      name: 'test sssssssssssssssssssss',
      image: '',
    },
    {
      id: '2',
      name: 'test 2',
      image: '',
    },
    {
      id: '1',
      name: 'test sssssssssssssssssssss',
      image: '',
    },
    {
      id: '2',
      name: 'test 2',
      image: '',
    },
    {
      id: '1',
      name: 'test sssssssssssssssssssss',
      image: '',
    },
    {
      id: '2',
      name: 'test 2',
      image: '',
    },
    {
      id: '1',
      name: 'test sssssssssssssssssssss',
      image: '',
    },
    {
      id: '2',
      name: 'test 2',
      image: '',
    },
    {
      id: '1',
      name: 'test sssssssssssssssssssss',
      image: '',
    },
    {
      id: '2',
      name: 'test 2',
      image: '',
    },
    {
      id: '1',
      name: 'test sssssssssssssssssssss',
      image: '',
    },
    {
      id: '2',
      name: 'test 2',
      image: '',
    },
  ];

  return (
    <>
      <ul className={styles.modes}>
        {SidebarMode.map((el) => (
          <MenuMode data={el} />
        ))}
      </ul>
      <div className={styles.subscriptions}>Subscriptions</div>
      <ul className={styles.channel}>
        {sub.map((el) => (
          <Channel data={el} />
        ))}
      </ul>
    </>
  );
};

export { Sidebar };
