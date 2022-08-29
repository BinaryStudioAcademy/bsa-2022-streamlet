import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const users: Omit<User, 'createdAt' | 'updatedAt'>[] = [
  {
    'id': 'f9310e89-ea99-41e2-922b-892d2dcc796d',
    'email': 'bwint0@comsenz.com',
    'password': 'qt4reuXF',
    'isActivated': false,
  },
  {
    'id': 'aa1a1f26-6837-4551-ba06-4660b02adab1',
    'email': 'lcomiskey1@joomla.org',
    'password': 'ujpvWvG9',
    'isActivated': true,
  },
  {
    'id': 'de44b9bd-dbba-40a7-afdb-54186d07d6e8',
    'email': 'clanfere2@archive.org',
    'password': 'CT4yrQJIAS2',
    'isActivated': true,
  },
  {
    'id': '30aac627-f1d0-411a-b4b4-4ffd3914ba28',
    'email': 'opancast3@ameblo.jp',
    'password': 'TFm7zjLmMiHZ',
    'isActivated': false,
  },
  {
    'id': 'e95a16e9-cd9a-4dab-a828-d7a13032e027',
    'email': 'lsindle4@sitemeter.com',
    'password': '0xffgx23',
    'isActivated': false,
  },
  {
    'id': 'b576c260-02a8-482d-a2ab-9fd9cd463f78',
    'email': 'nberrigan5@nba.com',
    'password': 'HRpeuggsG',
    'isActivated': false,
  },
  {
    'id': '25b3bbc4-0c45-4562-81de-f17c8f7ea178',
    'email': 'gflemmich6@yellowbook.com',
    'password': 'xrK64WAo3',
    'isActivated': true,
  },
  {
    'id': '9bd570cd-b120-42b2-9ab3-5048bd401cdf',
    'email': 'jgeill7@cbc.ca',
    'password': 'XJKrLIgbC',
    'isActivated': false,
  },
  {
    'id': 'beae4588-36e7-41ea-8b09-3d4b3dc95d46',
    'email': 'vhulke8@purevolume.com',
    'password': 'OgfdVa3WZu',
    'isActivated': true,
  },
  {
    'id': '9b3c96d0-e20a-4890-875a-d84dc0d50108',
    'email': 'sdanigel9@sbwire.com',
    'password': 'gnQFfgBXD',
    'isActivated': false,
  },
  {
    'id': '058e566d-f5ad-42a8-8cb2-1c57f0c3fda3',
    'email': 'afursea@eventbrite.com',
    'password': 'JTiNEofg8H',
    'isActivated': true,
  },
  {
    'id': 'b91db931-0d02-4415-879a-3f8b2b9d7263',
    'email': 'tvanzonb@google.nl',
    'password': 'XyT9WiCFO',
    'isActivated': false,
  },
  {
    'id': '40a12860-c75d-4129-9375-6b02a08e5c45',
    'email': 'bnorwoodc@blinklist.com',
    'password': 'Rd1B6lggo',
    'isActivated': true,
  },
  {
    'id': 'cc941455-d943-42b4-b1fe-26fc9dff594c',
    'email': 'jackermand@linkedin.com',
    'password': 'UhzVgfdHO',
    'isActivated': false,
  },
  {
    'id': '80395840-8a9b-40b5-8fd7-cecb9edf3bcd',
    'email': 'gancelle@dropbox.com',
    'password': 'KHLVcjUH7vc',
    'isActivated': true,
  },
  {
    'id': 'a64f075a-63c8-4947-ba02-2c77ba63b712',
    'email': 'egoodbournf@yahoo.com',
    'password': 'E5AHuRSmjk',
    'isActivated': false,
  },
  {
    'id': '5e5c7d1c-1885-48bf-81e1-848a9c2b926a',
    'email': 'cburyg@deliciousdays.com',
    'password': 'I7NLa7gfg8o',
    'isActivated': false,
  },
  {
    'id': '4b6b2da4-603c-49a0-9262-c67c8a4e316f',
    'email': 'mbartkowiakh@storify.com',
    'password': 'tzfyGTa8zkN',
    'isActivated': true,
  },
  {
    'id': '883e86d6-6dbe-4928-a3fd-3b6882605c8c',
    'email': 'aesbyi@4shared.com',
    'password': 'wmHwblfgQt',
    'isActivated': true,
  },
  {
    'id': '62e7b782-b4c0-429f-8d89-1f6c4f486e69',
    'email': 'aharbordj@addthis.com',
    'password': 'TrWfl9LcJiA',
    'isActivated': false,
  },
].map((user) => ({
  ...user,
  username: faker.internet.userName(),
}));
