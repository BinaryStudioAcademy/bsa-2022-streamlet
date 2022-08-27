import { Channel } from '@prisma/client';
import { users } from './users';

const channelsNoAuthors: Omit<Channel, 'createdAt' | 'updatedAt' | 'authorId'>[] = [
  {
    'id': '9c6a0001-d379-43e1-9c07-48ab3a5f35bd',
    'name': 'Alistair Sandoval',
    'description':
      'Hi! 👋 Welcome to my channel — Im a 24 year old, recent graduate working at a high growth startup! Follow along for insights into the tech industry, all things startup, and what to expect as a recent-grad remote software engineer. I also dabble in sketch-comedy and investing. Thanks for being here!',
    'contactEmail': 'alistair-sa@ukr.net',
    'bannerImage': 'http://dummyimage.com/1252x401.png/5fa2dd/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': '916c02ea-ece7-4704-9b15-1376fb7f55f0',
    'name': 'Binary Trip',
    'description':
      'This year was amazing and I wouldnt have wished for it to have gone any other way. I traveled to a bunch of countries Ive only dreamed of visiting like Mongolia, Kenya, The Philippines, Norway, and many more. Thanks to everyone for sticking around all this time, and I hope you enjoy the videos!',
    'contactEmail': 'binary-trip@ukr.net',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'b541916b-d132-4739-a041-a9110b462c40',
    'name': 'Study with us!',
    'description': 'Hello! Subscribe to our channel and start learning programming with us',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'a312816b-d122-4739-a041-a9110b462c40',
    'name': 'Soft Music',
    'description':
      'Hello everyone who has come to my channel and listen to comfortable and pleasant music. Like and subscribe to the channel to support me!',
    'contactEmail': 'my-music@ukr.net',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'c162816b-d122-4739-a041-a9110b462c40',
    'name': 'BSA',
    'description': 'Find out who we are and what we are doing!',
    'contactEmail': 'binary-sudio@ukr.net',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
];

const userIndices = Array.from(channelsNoAuthors, () => Math.floor(Math.random() * users.length));

export const channels: Omit<Channel, 'createdAt' | 'updatedAt'>[] = channelsNoAuthors.map((channel, index) => ({
  ...channel,
  authorId: users[userIndices[index]].id,
}));
