import { DataSubscription } from 'common/types/types';

// {
//     'id': '9c6a0001-d379-43e1-9c07-48ab3a5f35bd',
//     'name': 'Alistair Sandoval',
//     'description':
//       'Hi! 👋 Welcome to my channel — Im a 24 year old, recent graduate working at a high growth startup! Follow along for insights into the tech industry, all things startup, and what to expect as a recent-grad remote software engineer. I also dabble in sketch-comedy and investing. Thanks for being here!',
//     'contactEmail': 'alistair-sa@ukr.net',
//     'bannerImage': 'http://dummyimage.com/1252x401.png/5fa2dd/ffffff',
//     'avatar': 'https://career.comarch.com/files-com/file_45/good_programmer_comarch.jpg',
//   },
//   {
//     'id': '916c02ea-ece7-4704-9b15-1376fb7f55f0',
//     'name': 'Binary Trip',
//     'description':
//       'This year was amazing and I wouldnt have wished for it to have gone any other way. I traveled to a bunch of countries Ive only dreamed of visiting like Mongolia, Kenya, The Philippines, Norway, and many more. Thanks to everyone for sticking around all this time, and I hope you enjoy the videos!',
//     'contactEmail': 'binary-trip@ukr.net',
//     'bannerImage': '',
//     'avatar': 'https://static.posters.cz/image/750/road-trip-i107313.jpg',
//   },
//   {
//     'id': 'b541916b-d132-4739-a041-a9110b462c40',
//     'name': 'Study with us!',
//     'description': 'Hello! Subscribe to our channel and start learning programming with us',
//     'contactEmail': '',
//     'bannerImage': '',
//     'avatar': 'https://www.mooc.org/hubfs/applications-of-computer-programming.jpg',
//   },
//   {
//     'id': 'a312816b-d122-4739-a041-a9110b462c40',
//     'name': 'Soft Music',
//     'description':
//       'Hello everyone who has come to my channel and listen to comfortable and pleasant music. Like and subscribe to the channel to support me!',
//     'contactEmail': 'my-music@ukr.net',
//     'bannerImage': '',
//     'avatar': 'https://img.freepik.com/free-vector/musical-melody-symbols-bright-blue-splotch_1308-70426.jpg',
//   },
//   {
//     'id': 'c162816b-d122-4739-a041-a9110b462c40',
//     'name': 'BSA',
//     'description': 'Find out who we are and what we are doing!',
//     'contactEmail': 'binary-sudio@ukr.net',
//     'bannerImage': '',
//     'avatar':
//       'https://s.dou.ua/CACHE/images/img/static/companies/dou-logo_cjGiCVW/253030c28d218b03478db06cbefafb44.png',
//   },

export const subscriptionList: DataSubscription = {
  list: [
    {
      id: '9c6a0001-d379-43e1-9c07-48ab3a5f35bd',
      channel: {
        id: '9c6a0001-d379-43e1-9c07-48ab3a5f35bd',
        name: 'Alistair Sandoval',
        avatar: 'https://career.comarch.com/files-com/file_45/good_programmer_comarch.jpg',
      },
    },
    {
      id: '916c02ea-ece7-4704-9b15-1376fb7f55f0',
      channel: {
        id: '916c02ea-ece7-4704-9b15-1376fb7f55f0',
        name: 'Binary Trip',
        avatar: 'https://static.posters.cz/image/750/road-trip-i107313.jpg',
      },
    },
    {
      id: 'b541916b-d132-4739-a041-a9110b462c40',
      channel: {
        id: 'b541916b-d132-4739-a041-a9110b462c40',
        name: 'Study with us!',
        avatar: 'https://www.mooc.org/hubfs/applications-of-computer-programming.jpg',
      },
    },
    {
      id: 'a312816b-d122-4739-a041-a9110b462c40',
      channel: {
        id: 'a312816b-d122-4739-a041-a9110b462c40',
        name: 'Soft Music',
        avatar: 'https://img.freepik.com/free-vector/musical-melody-symbols-bright-blue-splotch_1308-70426.jpg',
      },
    },
    {
      id: 'c162816b-d122-4739-a041-a9110b462c40',
      channel: {
        id: 'c162816b-d122-4739-a041-a9110b462c40',
        name: 'BSA',
        avatar:
          'https://s.dou.ua/CACHE/images/img/static/companies/dou-logo_cjGiCVW/253030c28d218b03478db06cbefafb44.png',
      },
    },
  ],
  total: 6,
};
