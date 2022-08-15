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
  },
  {
    'id': '916c02ea-ece7-4704-9b15-1376fb7f55f0',
    'name': 'Shrike, southern white-crowned',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'b541916b-d132-4739-a041-a9110b462c40',
    'name': 'Duck, comb',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'b75095de-98f0-4c0c-b96f-0579a65104f0',
    'name': 'Civet (unidentified)',
    'description':
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    'contactEmail': 'mkohen3@wufoo.com',
    'bannerImage': 'http://dummyimage.com/225x480.png/cc0000/ffffff',
  },
  {
    'id': 'eac36124-5bcf-45bc-9ed3-9850b6dbbecc',
    'name': 'Northern elephant seal',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '7996ebb1-cf64-41e9-9b80-db3275663609',
    'name': 'Racer snake',
    'description':
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    'contactEmail': 'kwrathmell5@bbb.org',
    'bannerImage': 'http://dummyimage.com/1462x270.png/dddddd/000000',
  },
  {
    'id': 'ac7a2f94-6d04-4be9-9688-d28581295500',
    'name': 'Squirrel, malabar',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'dc8bdc3a-9222-4289-9e3a-41af537065f7',
    'name': 'Seal, northern fur',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'e8af7316-f1ac-4f04-bd4f-767b8f19196a',
    'name': 'Dove, rock',
    'description': 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    'contactEmail': 'bbaiss8@samsung.com',
    'bannerImage': 'http://dummyimage.com/1392x482.png/5fa2dd/ffffff',
  },
  {
    'id': 'd6231ea4-125e-43b7-9ae4-b25e004e6711',
    'name': 'Nubian bee-eater',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '570a1c8e-3711-40a2-9689-692c342acd33',
    'name': 'Duck, blue',
    'description': 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    'contactEmail': 'nemera@networkadvertising.org',
    'bannerImage': 'http://dummyimage.com/574x498.png/dddddd/000000',
  },
  {
    'id': '2fc740bc-ef19-40ce-916c-fa672a069d47',
    'name': 'Dove, emerald-spotted wood',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'e603eec6-f1c8-4a3c-9084-a4210c74d6d8',
    'name': 'Barasingha deer',
    'description':
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    'contactEmail': 'ddorantc@weebly.com',
    'bannerImage': 'http://dummyimage.com/1527x366.png/ff4444/ffffff',
  },
  {
    'id': '15d4a8ea-e027-4b4d-86bc-13996bd41d76',
    'name': 'Shrike, common boubou',
    'description':
      'Phasellus sit amet erat. nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    'contactEmail': 'mroadknightd@adobe.com',
    'bannerImage': 'http://dummyimage.com/538x270.png/ff4444/ffffff',
  },
  {
    'id': 'c1d8134f-e58f-423d-b8c0-26eaa60508ae',
    'name': 'Common rhea',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'ffddd95e-46d8-48dd-8296-1865cab8a5c4',
    'name': 'Cat, civet',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'f8da9f84-60e4-44a3-88fd-46cee857bc92',
    'name': 'Grey mouse lemur',
    'description':
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    'contactEmail': 'lgreedierg@blogtalkradio.com',
    'bannerImage': 'http://dummyimage.com/252x442.png/ff4444/ffffff',
  },
  {
    'id': 'a2936f72-5e2b-401b-9d2b-cfdb7dbc58a4',
    'name': 'Hanuman langur',
    'description':
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    'contactEmail': 'kpedgrifth@nba.com',
    'bannerImage': 'http://dummyimage.com/1389x145.png/5fa2dd/ffffff',
  },
  {
    'id': '68bcfc71-0b38-4a27-bd6a-9c4d12eee53d',
    'name': 'Cat, native',
    'description':
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    'contactEmail': 'arocksi@europa.eu',
    'bannerImage': 'http://dummyimage.com/963x466.png/cc0000/ffffff',
  },
  {
    'id': 'a229f174-eed9-4d4e-8b5e-313258becd8b',
    'name': 'Langur, common',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '8cacc3b3-c3b0-4977-94f0-897b80bed7ec',
    'name': 'Dassie',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'bb0b29a5-f31a-4b75-966f-4a10f2223b13',
    'name': 'Racer snake',
    'description':
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    'contactEmail': 'abugbirdl@wikimedia.org',
    'bannerImage': 'http://dummyimage.com/1904x267.png/ff4444/ffffff',
  },
  {
    'id': '4d3abd05-f42b-4c0b-abb0-97e41b606ff7',
    'name': 'Cat, jungle',
    'description':
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    'contactEmail': 'aofieldm@people.com.cn',
    'bannerImage': 'http://dummyimage.com/1359x165.png/dddddd/000000',
  },
  {
    'id': '206b5064-3002-42e6-aea7-f8acdbfa1378',
    'name': 'Kangaroo, brush-tailed rat',
    'description':
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    'contactEmail': 'earn@elpais.com',
    'bannerImage': 'http://dummyimage.com/1570x223.png/ff4444/ffffff',
  },
  {
    'id': '6ee17237-ba09-4536-9912-b9917e187280',
    'name': 'Bahama pintail',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'a86c6e69-f48f-4e40-8c24-479b84f65aec',
    'name': 'Crane, sandhill',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'a195f11c-afa0-45e3-9baa-d03ca3d9725f',
    'name': 'Field flicker',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '02558483-2b24-4bd5-88ee-57ef0ec5908e',
    'name': 'Desert tortoise',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '134fd43c-7362-44c7-9e05-75a0bdda4889',
    'name': 'Jackal, silver-backed',
    'description':
      'nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    'contactEmail': 'glibbies@deliciousdays.com',
    'bannerImage': 'http://dummyimage.com/772x222.png/ff4444/ffffff',
  },
  {
    'id': 'f0418c97-d3ec-4d38-9d0f-63328bcec62b',
    'name': 'Agouti',
    'description':
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    'contactEmail': 'blazenburyt@princeton.edu',
    'bannerImage': 'http://dummyimage.com/1121x384.png/dddddd/000000',
  },
  {
    'id': '7c804fd2-44df-47a5-8322-f9e8787eb3e0',
    'name': 'Albatross, galapagos',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '9c32cc33-4f98-4fd6-a58a-db0d3fc15f80',
    'name': 'Bleu, red-cheeked cordon',
    'description': 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    'contactEmail': 'zvannozziiv@technorati.com',
    'bannerImage': 'http://dummyimage.com/257x118.png/cc0000/ffffff',
  },
  {
    'id': 'f4df3118-3ece-4307-8017-51e50f84f5b3',
    'name': 'Striated heron',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'd8607496-6722-4a01-b8f2-97adb8bb074d',
    'name': 'American bison',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '9e731a9e-e5f2-4c75-8b81-975d74ff1a88',
    'name': 'Bat, madagascar fruit',
    'description':
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nnullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    'contactEmail': 'mgormleyy@acquirethisname.com',
    'bannerImage': 'http://dummyimage.com/212x354.png/cc0000/ffffff',
  },
  {
    'id': '6790ba02-41a7-4d0e-975b-3dcea6711bea',
    'name': 'Blue and yellow macaw',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '9023399d-a364-41e9-8ab9-fc373a138f4f',
    'name': 'Fox, north american red',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '23d96e36-3fbe-4060-a591-fe260860b022',
    'name': 'Madagascar fruit bat',
    'description':
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. nulla tellus.',
    'contactEmail': 'avassman11@so-net.ne.jp',
    'bannerImage': 'http://dummyimage.com/1423x373.png/cc0000/ffffff',
  },
  {
    'id': 'f5b7b0b2-1893-4a12-9d41-81d86c1a467e',
    'name': 'Rhesus monkey',
    'description':
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    'contactEmail': 'obullman12@nbcnews.com',
    'bannerImage': 'http://dummyimage.com/1603x142.png/dddddd/000000',
  },
  {
    'id': '60befbcb-a350-4570-b804-065d2b3750d2',
    'name': 'Dove, galapagos',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'f6f05b3f-fd48-4bb0-abe4-5f3149fd3229',
    'name': 'Stork, painted',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '50d7ad5b-1260-470e-bfca-b4c1132f1bcc',
    'name': 'Crake, african black',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '4a8cc917-d648-440d-be02-d6eb0b950c95',
    'name': 'Anaconda (unidentified)',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'd685ffa1-d944-4f7f-8cfd-21566c4abc12',
    'name': 'Coqui partridge',
    'description':
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    'contactEmail': 'tyorston17@comcast.net',
    'bannerImage': 'http://dummyimage.com/1803x424.png/ff4444/ffffff',
  },
  {
    'id': 'f4329bd2-be13-4e92-9b9a-e0a0ff9a043b',
    'name': 'Oribi',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'acca9b0c-7036-416e-8a68-8777c49ca07a',
    'name': 'Cockatoo, sulfur-crested',
    'description':
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    'contactEmail': 'kryde19@shinystat.com',
    'bannerImage': 'http://dummyimage.com/1292x477.png/ff4444/ffffff',
  },
  {
    'id': 'dc5cb78a-8725-4470-93fc-a900f1abd9a2',
    'name': 'Jungle cat',
    'description': 'Fusce consequat. nulla nisl. Nunc nisl.',
    'contactEmail': 'xmclarnon1a@icq.com',
    'bannerImage': 'http://dummyimage.com/427x258.png/5fa2dd/ffffff',
  },
  {
    'id': '8c56075a-7638-4efb-a694-60abc54eb615',
    'name': 'Wallaby, red-necked',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '9bb22cf4-7893-4f12-ab24-903590960518',
    'name': 'Crow, pied',
    'description':
      'Fusce consequat. nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    'contactEmail': 'ahobben1c@discovery.com',
    'bannerImage': 'http://dummyimage.com/1751x206.png/ff4444/ffffff',
  },
  {
    'id': 'fc469dfa-2d76-4404-bf08-12e5793ec48d',
    'name': 'Dove, galapagos',
    'description':
      'nulla ut erat id mauris vulputate elementum. nullam varius. nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    'contactEmail': 'lshepheard1d@addthis.com',
    'bannerImage': 'http://dummyimage.com/1456x101.png/ff4444/ffffff',
  },
  {
    'id': 'e3a8cfcb-842f-40ba-aa37-c5419b3ef89d',
    'name': 'Goanna lizard',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'dabb1637-f552-4d53-a1ac-cd55f10cc153',
    'name': 'Cheetah',
    'description':
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    'contactEmail': 'emayor1f@sina.com.cn',
    'bannerImage': 'http://dummyimage.com/948x171.png/dddddd/000000',
  },
  {
    'id': 'e4d2125d-c8e0-4582-8671-e735c4f65f6c',
    'name': 'Spotted deer',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '7a36ff49-a3c8-45eb-895e-f90b20694690',
    'name': 'Crane, blue',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '9c87e3a2-cde3-48ce-9e56-ca502339be9e',
    'name': 'Common wallaroo',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '1396080f-61b8-4fd9-bb3a-198d91be44dc',
    'name': 'Cockatoo, slender-billed',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'c4b93ef6-11c4-4e6c-a439-890263d84197',
    'name': 'Dik, kirks dik',
    'description':
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    'contactEmail': 'fmusslewhite1k@networksolutions.com',
    'bannerImage': 'http://dummyimage.com/758x228.png/cc0000/ffffff',
  },
  {
    'id': '1ed03b6b-551e-4633-a74b-c8d65073819e',
    'name': 'Starling, greater blue-eared',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'db1e4625-d9d5-4756-aaf5-8e7da1ee2edb',
    'name': 'Two-toed sloth',
    'description':
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. nulla suscipit ligula in lacus.',
    'contactEmail': 'mgourlay1m@nifty.com',
    'bannerImage': 'http://dummyimage.com/1861x428.png/5fa2dd/ffffff',
  },
  {
    'id': 'a856de2a-7aad-439a-b993-de74d835f71c',
    'name': 'Golden-mantled ground squirrel',
    'description':
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    'contactEmail': 'swindrass1n@gnu.org',
    'bannerImage': 'http://dummyimage.com/1689x224.png/5fa2dd/ffffff',
  },
  {
    'id': 'ce830a0f-feed-4f4f-ae71-a3ec038ccfa8',
    'name': 'Pallass fish eagle',
    'description':
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    'contactEmail': 'kconroy1o@biglobe.ne.jp',
    'bannerImage': 'http://dummyimage.com/662x179.png/5fa2dd/ffffff',
  },
  {
    'id': 'cda509d5-21dd-4048-905f-ad66f4dde1d9',
    'name': 'Owl, madagascar hawk',
    'description': 'Maecenas ut massa quis augue luctus tincidunt. nulla mollis molestie lorem. Quisque ut erat.',
    'contactEmail': 'ghayselden1p@de.vu',
    'bannerImage': 'http://dummyimage.com/1223x456.png/ff4444/ffffff',
  },
  {
    'id': '0ae65f77-4058-4af3-a7ee-690ed73a8f50',
    'name': 'Elegant crested tinamou',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'f0fe9ce3-d529-4168-8978-f00b418f2753',
    'name': 'Bengal vulture',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '2a660925-3cda-44c4-965d-0a0d06307c3c',
    'name': 'Galapagos hawk',
    'description':
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    'contactEmail': 'jmcaughtry1s@columbia.edu',
    'bannerImage': 'http://dummyimage.com/1709x274.png/5fa2dd/ffffff',
  },
  {
    'id': 'e45ec639-75c8-4c33-9d23-3a14ee61180e',
    'name': 'Common shelduck',
    'description':
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    'contactEmail': 'sleathes1t@google.co.jp',
    'bannerImage': 'http://dummyimage.com/766x334.png/cc0000/ffffff',
  },
  {
    'id': '0dbc2d89-e3c2-4e88-84e5-fac39301160e',
    'name': 'Chilean flamingo',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '5eac6cd3-8d7b-4538-8039-434c38d08103',
    'name': 'Quail, gambels',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'd1818ceb-1ae9-461c-96cb-04cf2caa1e13',
    'name': 'Paca',
    'description':
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    'contactEmail': 'gsaltwell1w@edublogs.org',
    'bannerImage': 'http://dummyimage.com/1909x237.png/dddddd/000000',
  },
  {
    'id': '743b4763-2121-4f17-962c-3a6b2eae1aa1',
    'name': 'Armadillo, nine-banded',
    'description':
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    'contactEmail': 'bdole1x@php.net',
    'bannerImage': 'http://dummyimage.com/1492x447.png/5fa2dd/ffffff',
  },
  {
    'id': '9429c891-40bc-498b-a2f0-3381bb4d69c3',
    'name': 'Arctic hare',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'af2d67a2-05e5-44f3-8830-026687416315',
    'name': 'Bustard, kori',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'c17bad4f-e9a7-49cf-8315-e1da2be8bd5a',
    'name': 'Indian giant squirrel',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '5bb50fd2-a826-4ea0-8bd5-a625d8eb21ff',
    'name': 'Anaconda (unidentified)',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'ae0528dc-03bc-4b3c-9591-e7bde28c26c6',
    'name': 'Deer, spotted',
    'description':
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    'contactEmail': 'gitzkowicz22@mtv.com',
    'bannerImage': 'http://dummyimage.com/901x206.png/cc0000/ffffff',
  },
  {
    'id': '2742bf98-615b-4561-a37e-1574aa095805',
    'name': 'Penguin, magellanic',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '58aff555-68d0-4576-9c4e-ff0b3367d81f',
    'name': 'Galah',
    'description':
      'nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    'contactEmail': 'tbraun24@cisco.com',
    'bannerImage': 'http://dummyimage.com/1757x123.png/dddddd/000000',
  },
  {
    'id': '0963b93d-4031-4a6a-ae64-be000888b776',
    'name': 'Buffalo, wild water',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '46c6e8c3-6b3e-4ce8-bb78-2342c417c41b',
    'name': 'Fox, silver-backed',
    'description':
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    'contactEmail': 'nbodemeaid26@symantec.com',
    'bannerImage': 'http://dummyimage.com/1893x475.png/ff4444/ffffff',
  },
  {
    'id': '99467e68-9e5f-473d-87d0-e2811b4c49eb',
    'name': 'Azaras zorro',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '2a4166a0-4aa0-4ecc-8f6a-e8019adc74ca',
    'name': 'Bird, red-billed tropic',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '319d8051-10af-4f0a-88d6-7817fe188c21',
    'name': 'Lechwe, kafue flats',
    'description':
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    'contactEmail': 'swellbank29@yale.edu',
    'bannerImage': 'http://dummyimage.com/267x139.png/ff4444/ffffff',
  },
  {
    'id': '79bce906-29d8-47a1-bd48-f66db12343d6',
    'name': 'Prehensile-tailed porcupine',
    'description':
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    'contactEmail': 'ygreeson2a@zimbio.com',
    'bannerImage': 'http://dummyimage.com/1393x205.png/cc0000/ffffff',
  },
  {
    'id': 'd559ed6c-d9d4-454f-9432-9db6b8ece133',
    'name': 'Racer, blue',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'f57cf2e7-1edc-4613-92f2-d9f43afce005',
    'name': 'Bustard, kori',
    'description':
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    'contactEmail': 'ryerson2c@huffingtonpost.com',
    'bannerImage': 'http://dummyimage.com/961x275.png/ff4444/ffffff',
  },
  {
    'id': 'ae6f49cd-148d-449e-a14b-d04d957355a2',
    'name': 'Waved albatross',
    'description':
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. nulla justo.',
    'contactEmail': 'ibarbrook2d@ifeng.com',
    'bannerImage': 'http://dummyimage.com/649x403.png/cc0000/ffffff',
  },
  {
    'id': 'd683062e-e923-48c7-9ca0-57167d5704b8',
    'name': 'Fisher',
    'description':
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    'contactEmail': 'ahallatt2e@freewebs.com',
    'bannerImage': 'http://dummyimage.com/778x472.png/ff4444/ffffff',
  },
  {
    'id': '65ba2200-f084-44f0-9587-1771a900c468',
    'name': 'Tapir, brazilian',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '9513c43d-ea69-4a46-a4f4-e53e441cf05a',
    'name': 'Ring-necked pheasant',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '078ee484-abe7-49cd-9d36-da9d39e31447',
    'name': 'Brown hyena',
    'description': 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    'contactEmail': 'asnowman2h@last.fm',
    'bannerImage': 'http://dummyimage.com/859x340.png/cc0000/ffffff',
  },
  {
    'id': '2bde4064-8d3e-4c6b-9f6c-0b3557f36243',
    'name': 'Tapir, brazilian',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'df5b89a3-eda8-4b00-bbf8-d7347e43b6dd',
    'name': 'White-headed vulture',
    'description':
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    'contactEmail': 'pheakins2j@merriam-webster.com',
    'bannerImage': 'http://dummyimage.com/322x249.png/dddddd/000000',
  },
  {
    'id': 'fada71cf-2397-4b6a-a60e-2f43fbd828c0',
    'name': 'Pelican, brown',
    'description':
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    'contactEmail': 'dhogben2k@walmart.com',
    'bannerImage': 'http://dummyimage.com/1644x246.png/cc0000/ffffff',
  },
  {
    'id': 'd0dc9e4f-3abf-43a0-b0b8-972bad99a6c8',
    'name': 'Red hartebeest',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'e7c08e01-5bac-42c0-9a4b-9dfd589e2072',
    'name': 'Lion, california sea',
    'description':
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. nullam molestie nibh in lectus.',
    'contactEmail': 'wanthill2m@miitbeian.gov.cn',
    'bannerImage': 'http://dummyimage.com/1426x452.png/5fa2dd/ffffff',
  },
  {
    'id': 'f7e634af-3d56-4c28-9c37-f384b69da53a',
    'name': 'Badger, european',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'ab306c08-d022-40cb-95ad-c9f6c1005953',
    'name': 'Wombat, common',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': '8b2b98bb-be46-4864-81f4-416abdcc92bb',
    'name': 'Snake, racer',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
  {
    'id': 'bdb92797-8a1d-47e7-a230-9a82347261b9',
    'name': 'Crab-eating fox',
    'description':
      'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    'contactEmail': 'aderycot2q@unicef.org',
    'bannerImage': 'http://dummyimage.com/1508x130.png/5fa2dd/ffffff',
  },
  {
    'id': '82b90704-8df5-48ae-bd95-60853e668c24',
    'name': 'Common goldeneye',
    'description': '',
    'contactEmail': '',
    'bannerImage': '',
  },
];

const userIndices = Array.from(channelsNoAuthors, () => Math.floor(Math.random() * users.length));

export const channels: Omit<Channel, 'createdAt' | 'updatedAt'>[] = channelsNoAuthors.map((channel, index) => ({
  ...channel,
  authorId: users[userIndices[index]].id,
}));
