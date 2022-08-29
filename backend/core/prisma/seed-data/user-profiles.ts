import { UserProfile } from '@prisma/client';

export const userProfiles: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'userId'>[] = [
  {
    'firstName': 'Yoko',
    'lastName': 'Robbel',
    'avatar': 'http://dummyimage.com/643x393.png/ff4444/ffffff',
  },
  {
    'firstName': 'Thorsten',
    'lastName': 'McTurlough',
    'avatar': 'http://dummyimage.com/986x300.png/ff4444/ffffff',
  },
  {
    'firstName': 'Waldon',
    'lastName': 'Aggett',
    'avatar': 'http://dummyimage.com/1326x187.png/cc0000/ffffff',
  },
  {
    'firstName': 'Kristy',
    'lastName': 'Burdge',
    'avatar': '',
  },
  {
    'firstName': 'Curr',
    'lastName': 'Goldhawk',
    'avatar': '',
  },
  {
    'firstName': 'Tiff',
    'lastName': 'Kach',
    'avatar': '',
  },
  {
    'firstName': 'Mose',
    'lastName': 'Flacknell',
    'avatar': 'http://dummyimage.com/991x370.png/5fa2dd/ffffff',
  },
  {
    'firstName': 'Chickie',
    'lastName': 'Sally',
    'avatar': '',
  },
  {
    'firstName': 'Korry',
    'lastName': 'Cockroft',
    'avatar': '',
  },
  {
    'firstName': 'Zandra',
    'lastName': 'Newborn',
    'avatar': '',
  },
  {
    'firstName': 'Babita',
    'lastName': 'Faragher',
    'avatar': '',
  },
  {
    'firstName': 'Daron',
    'lastName': 'Giggie',
    'avatar': 'http://dummyimage.com/333x281.png/cc0000/ffffff',
  },
  {
    'firstName': 'Grenville',
    'lastName': 'Reiners',
    'avatar': 'http://dummyimage.com/283x319.png/cc0000/ffffff',
  },
  {
    'firstName': 'Raphael',
    'lastName': 'Kays',
    'avatar': '',
  },
  {
    'firstName': 'Lila',
    'lastName': 'Chasemoore',
    'avatar': 'http://dummyimage.com/730x328.png/dddddd/000000',
  },
  {
    'firstName': 'Ram',
    'lastName': 'Kryzhov',
    'avatar': 'http://dummyimage.com/781x431.png/cc0000/ffffff',
  },
  {
    'firstName': 'Lefty',
    'lastName': 'Tomaselli',
    'avatar': 'http://dummyimage.com/357x129.png/5fa2dd/ffffff',
  },
  {
    'firstName': 'Jamill',
    'lastName': 'Bannister',
    'avatar': 'http://dummyimage.com/1872x381.png/cc0000/ffffff',
  },
  {
    'firstName': 'Malachi',
    'lastName': 'OQuin',
    'avatar': '',
  },
  {
    'firstName': 'Doralin',
    'lastName': 'Halversen',
    'avatar': '',
  },
];
