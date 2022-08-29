import { Comment } from 'shared/src/common/types/comment';

export const comments: Comment[] = [
  {
    id: '1',
    userName: 'vasya',
    firstName: 'Vasya',
    lastName: 'Pupkin',
    dateAdded: new Date('2022/08/17'),
    text: 'We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues.',
  },
  {
    id: '2',
    userName: 'petya',
    firstName: 'Petya',
    dateAdded: new Date('2022/08/18 12:00'),
    text: 'We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news.',
  },
  {
    id: '3',
    avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    userName: 'misha',
    lastName: 'Absuvi',
    dateAdded: new Date('2022/08/18 13:00'),
    text: 'We are facing a serious business dilemma, and ad blockers eating into what’s left of it while slashing ad revenues.',
  },
  {
    id: '4',
    avatar: 'https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg',
    userName: 'dima',
    dateAdded: new Date(),
    text: 'We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues.',
  },
  {
    id: '5',
    userName: 'anonim',
    dateAdded: new Date('2022/08/18 09:00'),
    text: 'We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues.',
  },
];
