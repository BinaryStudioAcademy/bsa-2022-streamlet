import { Video } from '@prisma/client';
import { channels } from '.';

const videosNoChannels: Omit<Video, 'updatedAt' | 'createdAt' | 'channelId'>[] = [
  {
    'id': '90862886-dab4-4777-9b1d-62a0f541559e',
    'name': 'application',
    'description':
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 2790,
    'videoViews': 5580,
  },
  {
    'id': '34165be6-6ac0-4537-a857-cc0646d2620e',
    'name': 'multi-state',
    'description':
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 98577,
    'videoViews': 197154,
  },
  {
    'id': '3400139d-e0fd-49ab-ac52-be4d72f9b10b',
    'name': 'Synergistic',
    'description':
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 47476,
    'videoViews': 94952,
  },
  {
    'id': '76746c5b-e552-40ba-8d9a-247428386caf',
    'name': 'Decentralized',
    'description':
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 78980,
    'videoViews': 157960,
  },
  {
    'id': '67105c20-233e-48de-a8b6-c9a10be83824',
    'name': 'flexibility',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 6849,
    'videoViews': 13698,
  },
  {
    'id': 'f5c7b2e5-fd35-4092-80ac-a1cea1d7cacb',
    'name': 'circuit',
    'description':
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 86107,
    'videoViews': 172214,
  },
  {
    'id': 'e7b87a26-4ade-4209-9222-24dfe36b08f5',
    'name': 'logistical',
    'description':
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 68910,
    'videoViews': 137820,
  },
  {
    'id': '9588fee1-becb-4ad3-984d-aab8886109dc',
    'name': 'fault-tolerant',
    'description':
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 83592,
    'videoViews': 167184,
  },
  {
    'id': '18a44cb2-5f24-42db-a964-bcd611063227',
    'name': 'bi-directional',
    'description':
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 57016,
    'videoViews': 114032,
  },
  {
    'id': 'f8cecab4-26de-4ec5-81ed-29ec7074b633',
    'name': 'function',
    'description': 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 58127,
    'videoViews': 116254,
  },
  {
    'id': '930136f9-206f-48ab-bb88-979db8cf20f7',
    'name': 'upward-trending',
    'description':
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 16241,
    'videoViews': 32482,
  },
  {
    'id': '82a4041e-e82a-437f-b220-e91827e02f03',
    'name': 'Persistent',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 46736,
    'videoViews': 93472,
  },
  {
    'id': 'b65596f0-e98c-4787-900b-a440c555ff39',
    'name': 'frame',
    'description':
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 16165,
    'videoViews': 32330,
  },
  {
    'id': '265eabaa-6fcf-4c42-8919-10e000e3df4e',
    'name': 'extranet',
    'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 45399,
    'videoViews': 90798,
  },
  {
    'id': 'abfad2a1-0277-490b-ab0a-140a0de5296c',
    'name': 'Triple-buffered',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 90525,
    'videoViews': 181050,
  },
  {
    'id': '095dcffa-6503-4b75-8f10-51eddaf90189',
    'name': 'paradigm',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 33827,
    'videoViews': 67654,
  },
  {
    'id': '2f929063-1853-42a8-a4cc-aed8946679a5',
    'name': 'neutral',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 15351,
    'videoViews': 30702,
  },
  {
    'id': '0bd1ace9-9373-4738-a4df-f0de2884dbf4',
    'name': 'Optional',
    'description':
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 89837,
    'videoViews': 179674,
  },
  {
    'id': '6231023a-4f44-416c-ab03-17b776a92161',
    'name': 'multi-tasking',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 93333,
    'videoViews': 186666,
  },
  {
    'id': '565ea145-5d2d-45d6-bf42-44d6ebd26138',
    'name': '24/7',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 55181,
    'videoViews': 110362,
  },
  {
    'id': '3b940a86-b10b-4857-96bf-25b4d2d44663',
    'name': 'Multi-layered',
    'description':
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 75702,
    'videoViews': 151404,
  },
  {
    'id': '108b302e-b6a5-4623-9955-d9d9af451c92',
    'name': 'eco-centric',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 55576,
    'videoViews': 111152,
  },
  {
    'id': '94364b6e-c60f-4b7d-ac72-e13f0d436ae0',
    'name': 'knowledge user',
    'description':
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 7829,
    'videoViews': 15658,
  },
  {
    'id': '1ca10189-8dd6-4469-82f6-5d663bba3ed1',
    'name': 'responsive',
    'description':
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 68388,
    'videoViews': 136776,
  },
  {
    'id': '39c24b5f-626b-4e7f-9d3c-deb68914b21b',
    'name': 'Customer-focused',
    'description':
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 55038,
    'videoViews': 110076,
  },
  {
    'id': '77f44853-82f1-4fac-a590-560a455b3762',
    'name': 'internet solution',
    'description':
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 20165,
    'videoViews': 40330,
  },
  {
    'id': '3d08b2e1-c96e-4b1e-ae4b-45dce6539bf2',
    'name': 'task-force',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 17266,
    'videoViews': 34532,
  },
  {
    'id': '2dd4b16f-9db4-4c2e-a9d5-cb32dc33a4ca',
    'name': 'multimedia',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 50613,
    'videoViews': 101226,
  },
  {
    'id': 'f882a2f3-47ca-4872-b949-c2b15f35073e',
    'name': 'open system',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 92539,
    'videoViews': 185078,
  },
  {
    'id': '944cb416-ecd9-409c-9309-3ff0e667f14b',
    'name': 'impactful',
    'description':
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 73511,
    'videoViews': 147022,
  },
  {
    'id': 'c7a498c8-8ac3-46e4-b655-cc4282474960',
    'name': 'archive',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 53179,
    'videoViews': 106358,
  },
  {
    'id': 'b2151242-4f85-4935-a7c6-46cd485ff7c9',
    'name': 'interface',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 49697,
    'videoViews': 99394,
  },
  {
    'id': 'f2b6fc62-f3c8-4ba6-8ffd-17ce83f4128d',
    'name': 'context-sensitive',
    'description':
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 32703,
    'videoViews': 65406,
  },
  {
    'id': '849f1e96-87fc-40e1-a90a-ed19164bcc4c',
    'name': 'toolset',
    'description':
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 80020,
    'videoViews': 160040,
  },
  {
    'id': '88e200e4-22fa-4170-b4eb-c6ed7857f76b',
    'name': 'contextually-based',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 46751,
    'videoViews': 93502,
  },
  {
    'id': 'c02aed40-4ee3-4820-96e6-e0a09179cbdc',
    'name': 'matrices',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 31705,
    'videoViews': 63410,
  },
  {
    'id': 'f081a4aa-b871-4e79-a365-d7c5eea90356',
    'name': 'discrete',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 31657,
    'videoViews': 63314,
  },
  {
    'id': 'd14ee1e1-5e4c-4d5e-9558-7de8db93345d',
    'name': 'Re-contextualized',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 13514,
    'videoViews': 27028,
  },
  {
    'id': 'fd25e3be-5963-4b59-999f-23d03b975e27',
    'name': 'upward-trending',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 41260,
    'videoViews': 82520,
  },
  {
    'id': '153c5f20-a3e4-4f19-a8ea-4e2d7bb198b1',
    'name': 'Graphical User Interface',
    'description':
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 69224,
    'videoViews': 138448,
  },
  {
    'id': '5cc5ed9c-e74b-46af-b97a-43eaa9984a14',
    'name': 'Monitored',
    'description':
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 19473,
    'videoViews': 38946,
  },
  {
    'id': 'c2cd5f07-a48c-4c0f-841c-5f139e6fcf14',
    'name': 'application',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 49895,
    'videoViews': 99790,
  },
  {
    'id': '82f7cad2-72b2-4c19-a4bc-6424204e0f39',
    'name': 'Intuitive',
    'description':
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 71654,
    'videoViews': 143308,
  },
  {
    'id': '80236e97-97f6-4972-a5d2-c636d46e571c',
    'name': 'mission-critical',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 16585,
    'videoViews': 33170,
  },
  {
    'id': '46765726-8553-4e55-8daf-7c1175969d4d',
    'name': 'Persistent',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 62127,
    'videoViews': 124254,
  },
  {
    'id': 'c6ea903a-52c8-4b59-9ef1-4969ef1f8f19',
    'name': 'Front-line',
    'description':
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 1546,
    'videoViews': 3092,
  },
  {
    'id': 'aeef436c-8010-4f4b-a425-e659fa4f0384',
    'name': 'value-added',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 46040,
    'videoViews': 92080,
  },
  {
    'id': 'ce3478a4-24a2-4af8-adf8-b389eb941cf5',
    'name': 'empowering',
    'description':
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 49188,
    'videoViews': 98376,
  },
  {
    'id': '9a18e122-2a61-4f8b-8593-14bffc139397',
    'name': 'client-server',
    'description':
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 34769,
    'videoViews': 69538,
  },
  {
    'id': '78cc2a95-ad15-4cf3-b458-a4b357c7b32b',
    'name': 'Team-oriented',
    'description':
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 68755,
    'videoViews': 137510,
  },
  {
    'id': '5cd0e3bb-55e0-4cae-bb45-f4be3571d3f9',
    'name': 'non-volatile',
    'description':
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 76005,
    'videoViews': 152010,
  },
  {
    'id': 'd9da58da-3a7e-4e18-9464-7c5ca2930537',
    'name': 'groupware',
    'description': 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 59255,
    'videoViews': 118510,
  },
  {
    'id': '169ed14a-237d-4152-8d43-71a9ee8af8dd',
    'name': 'intermediate',
    'description':
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 24090,
    'videoViews': 48180,
  },
  {
    'id': '91048891-7a3f-4664-9dac-25dd6941543b',
    'name': 'user-facing',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 30652,
    'videoViews': 61304,
  },
  {
    'id': '91b7e324-0a75-4d54-b4a2-8e7c900f3761',
    'name': 'De-engineered',
    'description':
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 93418,
    'videoViews': 186836,
  },
  {
    'id': '8644b0c2-64d9-4c72-a11c-258e1a2acdf8',
    'name': 'asymmetric',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 12190,
    'videoViews': 24380,
  },
  {
    'id': '04ca1a9f-1425-48fc-8c15-f2ee0f8eb2f7',
    'name': 'hub',
    'description':
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 64756,
    'videoViews': 129512,
  },
  {
    'id': 'f8804626-de28-4a0a-94cc-72ab476e6e3b',
    'name': 'Future-proofed',
    'description':
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 17584,
    'videoViews': 35168,
  },
  {
    'id': 'f6337f31-e231-444c-8aca-b2de2a7a5349',
    'name': 'didactic',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 57968,
    'videoViews': 115936,
  },
  {
    'id': 'd1e3f1a0-31a0-4b01-b396-87e45c9e5570',
    'name': 'even-keeled',
    'description':
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 65344,
    'videoViews': 130688,
  },
  {
    'id': '2ea23fb5-d333-4d6b-a3e8-9d2029797561',
    'name': 'software',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 77132,
    'videoViews': 154264,
  },
  {
    'id': 'b6c271e1-5f20-4967-b38e-d5c2706e156f',
    'name': 'analyzer',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 72242,
    'videoViews': 144484,
  },
  {
    'id': '16b8e29b-3f2f-4a86-b8d5-be90c6f4572e',
    'name': 'Cross-platform',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 78072,
    'videoViews': 156144,
  },
  {
    'id': 'e5b88012-a195-486b-873e-566913a340f1',
    'name': 'transitional',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 5825,
    'videoViews': 11650,
  },
  {
    'id': '5ef693b9-a4e6-416f-bb71-fe1cff9ff64b',
    'name': 'Cross-group',
    'description':
      'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 16936,
    'videoViews': 33872,
  },
  {
    'id': '262395a9-bc79-4577-97d9-56ae746c6f5b',
    'name': 'fault-tolerant',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 46392,
    'videoViews': 92784,
  },
  {
    'id': '4292f701-4470-4998-8585-9e67d5daa20f',
    'name': 'incremental',
    'description':
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 84436,
    'videoViews': 168872,
  },
  {
    'id': '2969b425-01c2-4ae9-bbb4-478a549f7eb3',
    'name': 'Public-key',
    'description':
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 89755,
    'videoViews': 179510,
  },
  {
    'id': 'b172f54b-df77-4a48-be3c-fe109bac5e2d',
    'name': 'Automated',
    'description':
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 59987,
    'videoViews': 119974,
  },
  {
    'id': '2818b8bc-b7ea-4575-bdd1-310971495c1a',
    'name': 'website',
    'description':
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 13195,
    'videoViews': 26390,
  },
  {
    'id': '0a1f3626-f288-42d6-96ed-14904bfc9164',
    'name': 'collaboration',
    'description': 'Fusce consequat. Nulla nisl. Nunc nisl.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 65313,
    'videoViews': 130626,
  },
  {
    'id': '97d85ad8-3f3b-4a15-8209-2b0198f5d123',
    'name': 'service-desk',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 86358,
    'videoViews': 172716,
  },
  {
    'id': '101dc599-c3dd-426c-8178-6ed693d156d2',
    'name': 'exuding',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 6467,
    'videoViews': 12934,
  },
  {
    'id': 'e25eb283-ace4-44df-83c6-52da76f44370',
    'name': 'Centralized',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 30103,
    'videoViews': 60206,
  },
  {
    'id': '739592ac-507c-40c0-83a4-5af68d339766',
    'name': 'parallelism',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 57490,
    'videoViews': 114980,
  },
  {
    'id': 'adb65a9b-7b74-4fe0-9af9-f001abb54a8e',
    'name': 'intermediate',
    'description':
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 20372,
    'videoViews': 40744,
  },
  {
    'id': 'c8b0facf-3d81-44b2-b261-cf70089d19ae',
    'name': 'actuating',
    'description':
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 30175,
    'videoViews': 60350,
  },
  {
    'id': '7a19e977-5ce5-409e-b82c-efde6922b014',
    'name': 'Proactive',
    'description':
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 96532,
    'videoViews': 193064,
  },
  {
    'id': '5ef5c466-2774-4199-81cd-65d954ecfe57',
    'name': 'Horizontal',
    'description':
      'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 58497,
    'videoViews': 116994,
  },
  {
    'id': 'ddfa2bdf-b3c1-4f7c-b729-1a7ea4bd661f',
    'name': 'emulation',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 9125,
    'videoViews': 18250,
  },
  {
    'id': 'bf78c4da-ae6c-4255-a1f5-d3073784cdfa',
    'name': 'Sharable',
    'description':
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 58396,
    'videoViews': 116792,
  },
  {
    'id': 'e347d5ea-701f-4f78-b05d-854076cb5397',
    'name': 'Customizable',
    'description':
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 6788,
    'videoViews': 13576,
  },
  {
    'id': 'cba407ce-ba61-4764-b844-d325d2328a0a',
    'name': 'system engine',
    'description':
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 20202,
    'videoViews': 40404,
  },
  {
    'id': '75bc740d-899c-4859-8cef-7e720746fb3e',
    'name': 'motivating',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 76708,
    'videoViews': 153416,
  },
  {
    'id': '72748da5-e363-4887-9d73-90e9b776177d',
    'name': 'Distributed',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 66792,
    'videoViews': 133584,
  },
  {
    'id': 'beec9fd1-743f-4cf2-a795-c0c14e10adfe',
    'name': 'Optimized',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 44021,
    'videoViews': 88042,
  },
  {
    'id': '1c669b01-41af-4056-a68e-6d2ddfe3e13e',
    'name': 'next generation',
    'description':
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 83967,
    'videoViews': 167934,
  },
  {
    'id': 'eadfc5d7-9620-4f22-a6a8-6c0f5a25888a',
    'name': 'attitude',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 3258,
    'videoViews': 6516,
  },
  {
    'id': '2dc5ab1d-3814-46eb-9830-d682f3888b0d',
    'name': 'tangible',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 88127,
    'videoViews': 176254,
  },
  {
    'id': '797fa249-889d-4e1c-8c66-c00db4d23201',
    'name': 'demand-driven',
    'description':
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 31345,
    'videoViews': 62690,
  },
  {
    'id': '5c45128e-99d5-447d-a270-a1813eb9f672',
    'name': 'Centralized',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 43333,
    'videoViews': 86666,
  },
  {
    'id': '202ebf57-b4d0-4ba7-af08-373abe060585',
    'name': 'Virtual',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 4543,
    'videoViews': 9086,
  },
  {
    'id': '82dfcd73-4f2a-46e5-85a4-fcffdb90a5d7',
    'name': 'algorithm',
    'description':
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 2653,
    'videoViews': 5306,
  },
  {
    'id': '6297e075-5cf8-4eee-9664-82ab50349aeb',
    'name': 'web-enabled',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 45832,
    'videoViews': 91664,
  },
  {
    'id': '6f2399d2-5bd0-4d86-863b-0d779c8a7269',
    'name': 'solution-oriented',
    'description':
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 10545,
    'videoViews': 21090,
  },
  {
    'id': 'e63c192f-c09f-4b9c-9e37-296957e4b018',
    'name': '24 hour',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 73800,
    'videoViews': 147600,
  },
  {
    'id': '42e28767-219d-43b6-b55e-8ce97101dbb0',
    'name': 'productivity',
    'description': '',
    'isLive': true,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 24830,
    'videoViews': 49660,
  },
  {
    'id': '7c6a002e-9c69-4170-a29e-411c648da84f',
    'name': 'Exclusive',
    'description': '',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 92743,
    'videoViews': 185486,
  },
  {
    'id': 'c50d2472-4799-47db-8260-2578948dae63',
    'name': 'Focused',
    'description':
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 10593,
    'videoViews': 21186,
  },
  {
    'id': '1f411f0c-3d32-4d45-b38d-c0505bfece67',
    'name': 'application',
    'description': 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    'isLive': false,
    'videoPath': 'http://techslides.com/demos/sample-videos/small.mp4',
    'liveViews': 44713,
    'videoViews': 89426,
  },
];

const channelIndices = Array.from(videosNoChannels, () => Math.floor(Math.random() * channels.length));

export const videos: Omit<Video, 'updatedAt' | 'createdAt'>[] = videosNoChannels.map((video, index) => ({
  ...video,
  channelId: channels[channelIndices[index]].id,
}));
