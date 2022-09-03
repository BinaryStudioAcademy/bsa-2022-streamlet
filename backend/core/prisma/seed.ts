import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { users, userProfiles, channels, videos } from './seed-data';
const prisma = new PrismaClient();

async function seedSampleData(): Promise<void> {
  if (!(await canSeed())) {
    return;
  }
  await seedUsers();
  await seedUserProfiles();
  await seedChannels();
  await seedStreamingKeys();
  await seedVideos();
  await seedSubscriptions();
  await seedTags();
  await seedCategories();
  await seedVideoComments();
  await seedChatMessages();
  await seedNotifications();
  await seedHistory();
  await seedReactions();
}

async function canSeed(): Promise<boolean> {
  return (await prisma.user.count()) === 0;
}

async function seedUsers(): Promise<void> {
  await prisma.user.createMany({
    data: await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12),
      })),
    ),
  });
}

async function seedUserProfiles(): Promise<void> {
  await prisma.userProfile.createMany({
    data: userProfiles.map((profile, index) => ({
      ...profile,
      userId: users[index].id,
    })),
  });
}

async function seedChannels(): Promise<void> {
  await prisma.channel.createMany({
    data: channels,
  });
}

async function seedStreamingKeys(): Promise<void> {
  const channels = await prisma.channel.findMany();
  channels.forEach(async (channel) => {
    await prisma.streamingKey.create({
      data: {
        channelId: channel.id,
      },
    });
  });
}

async function seedVideos(): Promise<void> {
  await prisma.video.createMany({
    data: videos,
  });
}

async function seedSubscriptions(): Promise<void> {
  const users = await prisma.user.findMany();
  const channels = await prisma.channel.findMany();

  const channelsPerUser = 2;
  for (const user of users) {
    const channelsSample = getRandomSample(channels, channelsPerUser);
    for (const channel of channelsSample) {
      await prisma.subscription.create({
        data: {
          userId: user.id,
          channelId: channel.id,
          notify: faker.datatype.boolean(),
        },
      });
    }
  }
}

async function seedTags(): Promise<void> {
  const videos = await prisma.video.findMany();
  const tags = Array.from(
    new Set(['fps', 'moba', 'indie', 'strategy', 'simulation', 'platformer', 'irl', 'physics', 'medicine']),
  );
  const totalTags = tags.length;
  const videosPerTag = 4;
  for (let i = 0; i < totalTags; i++) {
    await prisma.tag.create({
      data: {
        name: tags[i],
        videos: {
          connect: getRandomSample(videos, videosPerTag).map((video) => ({
            id: video.id,
          })),
        },
      },
    });
  }
}

async function seedCategories(): Promise<void> {
  const users = await prisma.user.findMany();

  const categories = Array.from(
    new Set([
      'gaming',
      'education',
      'music',
      'pets&animal',
      'sports',
      'travel&events',
      'comedy',
      'people&blogs',
      'film&animation',
      'programming',
    ]),
  );

  const preferencesPerUser = 4;

  const videosByCategory = new Map<string, string[]>();
  videosByCategory.set('gaming', ['e7b87m91-4ade-4209-9222-24dfe45b08s9']);
  videosByCategory.set('education', ['b3b82a26-4ade-4209-9222-24dfe36b08f5', 'e7b87a21-4ase-4209-0022-24dfe36b08f5']);
  videosByCategory.set('music', ['w7b87a26-4adw-4211-9222-24dfe36b08f5']);
  videosByCategory.set('pets&animal', ['f5c7b2e5-fd35-4092-80ac-a1cea1d7cacb']);
  videosByCategory.set('sports', ['e7b87a26-4ade-4209-9422-24dff36b08f5']);
  videosByCategory.set('travel&events', [
    '67105c20-233e-48de-a8b6-c9a10be83824',
    'e7b87a26-4ade-4209-9222-24dfe36b08f5',
  ]);
  videosByCategory.set('people&blogs', [
    '90862886-dab4-4777-9b1d-62a0f541559e',
    'rt787a26-4ade-4201-9222-24dfe36b08f5',
    'e7b87a26-4add-1229-9222-24dfe36b08f5',
    'e7b87a26-4ade-4209-9222-24dfe36b00c7',
  ]);
  videosByCategory.set('film&animation', [
    'sh787a26-4adv-4209-9173-24dfe36b08f5',
    'e7b87a26-4ade-4209-0122-24dfe36n08e5',
  ]);
  videosByCategory.set('programming', [
    '34165be6-6ac0-4537-a857-cc0646d2620e',
    '3400139d-e0fd-49ab-ac52-be4d72f9b10b',
    '76746c5b-e552-40ba-8d9a-247428386caf',
    'h4a87a26-4ade-4209-9222-24dfe36b08f5',
    'e7b87l09-4ade-4209-9111-12dfs34b08f5',
  ]);

  const totalCategories = categories.length;
  for (let i = 0; i < totalCategories; i++) {
    await prisma.category.create({
      data: {
        name: categories[i],
        posterPath: 'https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg',
        videos: {
          connect: videosByCategory.get(categories[i])?.map((videoId) => ({
            id: videoId,
          })),
        },
      },
    });
  }

  //connect to user
  const allCategories = await prisma.category.findMany();

  for (const { id: userId } of users) {
    await prisma.categoryToUser.createMany({
      data: getRandomSample(allCategories, preferencesPerUser).map(({ id: categoryId }) => ({
        userId,
        categoryId,
      })),
    });
  }
}

async function seedVideoComments(): Promise<void> {
  const users = await prisma.user.findMany();
  const videos = await prisma.video.findMany();
  const commentsTotal = 1000;
  for (let i = 0; i < commentsTotal; i++) {
    await prisma.videoComment.create({
      data: {
        text: faker.lorem.paragraph(),
        authorId: users[Math.floor(Math.random() * users.length)].id,
        videoId: videos[Math.floor(Math.random() * videos.length)].id,
      },
    });
  }
}

async function seedChatMessages(): Promise<void> {
  const users = await prisma.user.findMany();
  const videos = await prisma.video.findMany();
  const messagesTotal = 1000;
  for (let i = 0; i < messagesTotal; i++) {
    await prisma.chatMessage.create({
      data: {
        text: faker.lorem.paragraph(),
        authorId: users[Math.floor(Math.random() * users.length)].id,
        videoId: videos[Math.floor(Math.random() * videos.length)].id,
      },
    });
  }
}

async function seedNotifications(): Promise<void> {
  const users = await prisma.user.findMany();
  const videos = await prisma.video.findMany();

  const videosPerUser = 3;
  for (const user of users) {
    const videosSample = getRandomSample(videos, videosPerUser);
    for (const video of videosSample) {
      await prisma.notification.create({
        data: {
          text: 'Check out this cool video from my channel!',
          userId: user.id,
          videoId: video.id,
          viewed: faker.datatype.boolean(),
        },
      });
    }
  }
}

async function seedHistory(): Promise<void> {
  const users = await prisma.user.findMany();
  const videos = await prisma.video.findMany();

  const videosPerUser = 2;
  for (const user of users) {
    const videosSample = getRandomSample(videos, videosPerUser);
    for (const video of videosSample) {
      await prisma.history.create({
        data: {
          userId: user.id,
          videoId: video.id,
        },
      });
    }
  }
}

async function seedReactions(): Promise<void> {
  const users = await prisma.user.findMany();
  const videos = await prisma.video.findMany();

  const usersCount = Math.floor(users.length / 2);
  const videosPerUser = 2;
  const usersSample = getRandomSample(users, usersCount);
  for (const user of usersSample) {
    const videosSample = getRandomSample(videos, videosPerUser);
    for (const video of videosSample) {
      await prisma.reaction.create({
        data: {
          isLike: faker.datatype.boolean(),
          userId: user.id,
          videoId: video.id,
        },
      });
    }
  }
}

// not fully random, but ok for seeds
function getRandomSample<T>(arr: T[], sampleSize: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, sampleSize);
}

seedSampleData().finally(async () => {
  await prisma.$disconnect();
});
