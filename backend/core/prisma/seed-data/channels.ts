import { Channel } from '@prisma/client';
import { users } from './users';

const channelsNoAuthors: Omit<Channel, 'createdAt' | 'updatedAt' | 'authorId'>[] = [
  {
    'id': '9c6a0001-d379-43e1-9c07-48ab3a5f35bd',
    'name': 'Binary Studio Academy',
    'description':
      'Hi! 👋 Welcome to my channel where you can find out about Binary Studio Academy and it`s participants. Thanks for being here!',
    'contactEmail': 'alsan@mailsac.com',
    'bannerImage': '',
    'avatar': 'https://academy.binary-studio.com/static/social-6d2cdde69e2f152e6e9cc7b75d42a1b5.png',
  },
  {
    'id': '916c02ea-ece7-4704-9b15-1376fb7f55f0',
    'name': 'Binary Trip',
    'description':
      'This year was amazing and I wouldn`t have wished for it to have gone any other way. I traveled to a bunch of countries I`ve only dreamed of visiting like Mongolia, Kenya, The Philippines, Norway, and many more. Thanks to everyone for sticking around all this time, and I hope you enjoy the videos!  ',
    'contactEmail': 'lufifth@mailsac.com',
    'bannerImage': '',
    'avatar': 'https://static.posters.cz/image/750/road-trip-i107313.jpg',
  },
  {
    'id': 'b541916b-d132-4739-a041-a9110b462c40',
    'name': 'Study with us!',
    'description': 'Hello! Subscribe to our channel and start learning programming with us',
    'contactEmail': 'jayno@mailsac.com',
    'bannerImage': '',
    'avatar': 'https://academy.binary-studio.com/static/0-fd1d056d18d5d06e972fa8f518dbd4fb.jpg',
  },
  {
    'id': 'a312816b-d122-4739-a041-a9110b462c40',
    'name': 'Projects and testimonials',
    'description':
      'Hello everyone who has come to our channel here you will find interviews with grateful product owners. Like and subscribe to the channel to support us!',
    'contactEmail': 'haylee@mailsac.com',
    'bannerImage': '',
    'avatar':
      'https://st2.depositphotos.com/2875617/6712/v/600/depositphotos_67127167-stock-illustration-customer-service-and-testimonials.jpg',
  },
  {
    'id': 'c162816b-d122-4739-a041-a9110b462c40',
    'name': 'CEO',
    'description': 'Find out who we are and what we are doing!',
    'contactEmail': 'azrahim@mailsac.com',
    'bannerImage': '',
    'avatar':
      'https://media-exp1.licdn.com/dms/image/C5603AQFaD_35lcWw1A/profile-displayphoto-shrink_800_800/0/1517725784660?e=2147483647&v=beta&t=nyMK5yDIa2LzX-mYO3t1i0xhhD2phkVZIfZRPrOIUUs',
  },
];

const userIndices = Array.from(Array(channelsNoAuthors.length).keys());

export const channels: Omit<Channel, 'createdAt' | 'updatedAt'>[] = channelsNoAuthors.map((channel, index) => ({
  ...channel,
  authorId: users[userIndices[index]].id,
}));
