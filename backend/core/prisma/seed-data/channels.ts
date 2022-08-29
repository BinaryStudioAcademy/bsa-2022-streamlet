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
  {
    'id': 'b75095de-98f0-4c0c-b96f-0579a65104f0',
    'name': 'Civet (unidentified)',
    'description':
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    'contactEmail': 'mkohen3@wufoo.com',
    'bannerImage': 'http://dummyimage.com/225x480.png/cc0000/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'eac36124-5bcf-45bc-9ed3-9850b6dbbecc',
    'name': 'Northern elephant seal',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': '7996ebb1-cf64-41e9-9b80-db3275663609',
    'name': 'Racer snake',
    'description':
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    'contactEmail': 'kwrathmell5@bbb.org',
    'bannerImage': 'http://dummyimage.com/1462x270.png/dddddd/000000',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'ac7a2f94-6d04-4be9-9688-d28581295500',
    'name': 'Squirrel, malabar',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'dc8bdc3a-9222-4289-9e3a-41af537065f7',
    'name': 'Seal, northern fur',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'e8af7316-f1ac-4f04-bd4f-767b8f19196a',
    'name': 'Dove, rock',
    'description': 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    'contactEmail': 'bbaiss8@samsung.com',
    'bannerImage': 'http://dummyimage.com/1392x482.png/5fa2dd/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'd6231ea4-125e-43b7-9ae4-b25e004e6711',
    'name': 'Nubian bee-eater',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': '570a1c8e-3711-40a2-9689-692c342acd33',
    'name': 'Duck, blue',
    'description': 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    'contactEmail': 'nemera@networkadvertising.org',
    'bannerImage': 'http://dummyimage.com/574x498.png/dddddd/000000',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': '2fc740bc-ef19-40ce-916c-fa672a069d47',
    'name': 'Dove, emerald-spotted wood',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'e603eec6-f1c8-4a3c-9084-a4210c74d6d8',
    'name': 'Barasingha deer',
    'description':
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    'contactEmail': 'ddorantc@weebly.com',
    'bannerImage': 'http://dummyimage.com/1527x366.png/ff4444/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': '15d4a8ea-e027-4b4d-86bc-13996bd41d76',
    'name': 'Shrike, common boubou',
    'description':
      'Phasellus sit amet erat. nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    'contactEmail': 'mroadknightd@adobe.com',
    'bannerImage': 'http://dummyimage.com/538x270.png/ff4444/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'c1d8134f-e58f-423d-b8c0-26eaa60508ae',
    'name': 'Common rhea',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'ffddd95e-46d8-48dd-8296-1865cab8a5c4',
    'name': 'Cat, civet',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'f8da9f84-60e4-44a3-88fd-46cee857bc92',
    'name': 'Grey mouse lemur',
    'description':
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    'contactEmail': 'lgreedierg@blogtalkradio.com',
    'bannerImage': 'http://dummyimage.com/252x442.png/ff4444/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'a2936f72-5e2b-401b-9d2b-cfdb7dbc58a4',
    'name': 'Hanuman langur',
    'description':
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    'contactEmail': 'kpedgrifth@nba.com',
    'bannerImage': 'http://dummyimage.com/1389x145.png/5fa2dd/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': '68bcfc71-0b38-4a27-bd6a-9c4d12eee53d',
    'name': 'Cat, native',
    'description':
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    'contactEmail': 'arocksi@europa.eu',
    'bannerImage': 'http://dummyimage.com/963x466.png/cc0000/ffffff',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
  {
    'id': 'a229f174-eed9-4d4e-8b5e-313258becd8b',
    'name': 'Langur, common',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
    'avatar': 'http://dummyimage.com/252x401.png/5fa2dd/ffffff',
  },
];

const userIndices = Array.from(Array(channelsNoAuthors.length).keys());

export const channels: Omit<Channel, 'createdAt' | 'updatedAt'>[] = channelsNoAuthors.map((channel, index) => ({
  ...channel,
  authorId: users[userIndices[index]].id,
}));
