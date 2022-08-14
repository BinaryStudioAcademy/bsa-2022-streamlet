import { IconColor, IconName } from 'common/enums/components';
import { FC } from 'common/types/types';
import { Button, Icon } from 'components/common/common';
import { useState } from 'react';
import { Notification } from './components/components';

import styles from './styles.module.scss';

const NotificationDropdown: FC = () => {
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState<boolean>(false);

  const notifications = [
    {
      'id': '281f1c2f-a54e-435b-a55f-ff868f5a6a5e',
      'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
      'channelId': '39ad2e71-b4bc-4c79-bc7e-8e68ceb92b7c',
      'username': 'boutibridge0',
      'videoName': 'lofi hip hop radio - beats to sleep/chill to',
      'createdAt': new Date('2022-08-10T19:51:32Z'),
      'isViewed': true,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/ff4444/ffffff',
    },
    {
      'id': '281f1c2f-a546-435b-a55f-ff868f5a6a5e',
      'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
      'channelId': '39ad2e71-b4bc-4c79-bc7e-8e68ceb92b7c',
      'username': 'abambrick1',
      'videoName': '[Valheim] Trying not to die',
      'createdAt': new Date('2022-08-11T22:32:52Z'),
      'isViewed': false,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
    },
    {
      'id': '281f1c2f-a54e-445b-a55f-ff868f5a6a5e',
      'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
      'channelId': '39ad2e71-b4bc-4c79-bc7e-8e68ceb92b7c',
      'username': 'clillyman2',
      'videoName': 'Streaming Portal 2 speedrunning until I beat my record',
      'createdAt': new Date('2022-08-10T06:54:40Z'),
      'isViewed': true,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
    },
    {
      'id': '221f1c2f-a54e-435b-a55f-ff868f5a6a5e',
      'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
      'channelId': '39ad2e71-b4bc-4c79-bc7e-8e68ceb92b7c',
      'username': 'scovely3',
      'videoName': 'lofi hip hop radio - beats to sleep/chill to',
      'createdAt': new Date('2022-08-10T11:10:54Z'),
      'isViewed': false,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
    },
    {
      'id': '281f1c2f-a54e-435b-a55f-ff868faa6a5e',
      'videoId': '25391635-8dd2-4298-9943-c79e741ab79b',
      'channelId': '39ad2e71-b4bc-4c79-bc7e-8e68ceb92b7c',
      'username': 'brolfini4',
      'videoName': 'Streaming Portal 2 speedrunning until I beat my record',
      'createdAt': new Date('2022-08-10T11:17:05Z'),
      'isViewed': true,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/dddddd/000000',
    },
    {
      'id': '281f1c2f-a54e-435b-355f-ff868f5a6a5e',
      'videoId': '25391635-8dd2-4298-99a3-c79e741ab79b',
      'channelId': '39ad2e71-b4bc-4c79-bc7e-8e68ceb92b7c',
      'username': 'astollwerck5',
      'videoName': 'Streaming Portal 2 speedrunning until I beat my record',
      'createdAt': new Date('2022-08-11T12:36:10Z'),
      'isViewed': false,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/5fa2dd/ffffff',
    },
    {
      'id': '281f1c2f-a54e-435b-a55f-ff868f5c6a5e',
      'videoId': '25391635-8dd2-42b8-9943-c79e741ab79b',
      'channelId': '39ad2e71-b4bc-4c79-bc7e-8e68ceb92b7c',
      'username': 'wdaveridge6',
      'videoName': 'lofi hip hop radio - beats to sleep/chill to',
      'createdAt': new Date('2022-08-10T17:32:31Z'),
      'isViewed': false,
      'channelAvatar': 'https://randomuser.me/api/portraits/men/93.jpg',
      'videoPreview': 'http://dummyimage.com/1920x1080.png/ff4444/ffffff',
    },
  ];

  const handleNotificationDropdownTrigger = (): void => {
    setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
  };

  const handleMarkAsRead = (): void => {
    notifications.map((notification) => {
      notification.isViewed = false;
    });
    // eslint-disable-next-line no-console
    console.log('all read');
  };

  const handleLoadMoreNotifications = (): void => {
    // eslint-disable-next-line no-console
    console.log('load more');
  };

  const handleNotificationRead = (id: string): void => {
    notifications.map((notification) => {
      if (notification.id === id) {
        notification.isViewed = false;
      }
    });
    // eslint-disable-next-line no-console
    console.log(`${id} has been read`);
  };

  const haveNotifications = Boolean(notifications.length);
  const haveUnreadNotifications = notifications.some((notification) => !notification.isViewed);

  return (
    <div className={styles['wrapper']}>
      <Button
        className={styles['bell']}
        label={
          <>
            <Icon color={IconColor.GRAY} name={IconName.ALARM} size="25" />
            {haveUnreadNotifications && <div className={styles['unread-mark']}></div>}
          </>
        }
        onClick={handleNotificationDropdownTrigger}
      />

      <div className={`${styles['dropdown']} ${isNotificationsDropdownOpen ? styles['open'] : ''}`}>
        <div className={styles['header']}>
          <p className={styles['title']}>Notifications</p>
          <Button
            className={styles['mark-as-read']}
            label={<Icon color={IconColor.WHITE} name={IconName.MARK_AS_READ} size="25" />}
            onClick={handleMarkAsRead}
          />
        </div>
        <div className={styles['dropdown-body']}>
          <div className={styles['notification-list']}>
            {haveNotifications ? (
              notifications.map((notification) => {
                return (
                  <Notification notification={notification} onRead={handleNotificationRead} key={notification.id} />
                );
              })
            ) : (
              <p className="notification-dropdown__placeholder">no notifs</p>
            )}
            {notifications.length > 3 && (
              <Button className={styles['load-more']} label="Load more" onClick={handleLoadMoreNotifications} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { NotificationDropdown };
