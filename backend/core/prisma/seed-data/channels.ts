import { Channel } from '@prisma/client';
import { users } from './users';

const channelsNoAuthors: Omit<Channel, 'createdAt' | 'updatedAt' | 'authorId'>[] = [
  {
    'id': '9c6a0001-d379-43e1-9c07-48ab3a5f35bd',
    'name': 'Monkey, black spider',
    'description':
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. nulla suscipit ligula in lacus.',
    'contactEmail': 'dlias0@flavors.me',
    'bannerImage': 'http://dummyimage.com/1252x401.png/5fa2dd/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': '916c02ea-ece7-4704-9b15-1376fb7f55f0',
    'name': 'Shrike, southern white-crowned',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'b541916b-d132-4739-a041-a9110b462c40',
    'name': 'Duck, comb',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
];

const userIndices = Array.from(channelsNoAuthors, () => Math.floor(Math.random() * users.length));

export const channels: Omit<Channel, 'createdAt' | 'updatedAt'>[] = channelsNoAuthors.map((channel, index) => ({
  ...channel,
  authorId: users[userIndices[index]].id,
}));
