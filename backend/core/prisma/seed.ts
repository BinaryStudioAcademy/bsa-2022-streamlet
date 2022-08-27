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
  const videosPerTag = 20;
  const totalTags = 20;
  for (let i = 0; i < totalTags; i++) {
    await prisma.tag.create({
      data: {
        name: faker.random.word(),
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
  const videos = await prisma.video.findMany();
  const videosPerCategory = 20;
  const totalCategories = 20;
  for (let i = 0; i < totalCategories; i++) {
    await prisma.category.create({
      data: {
        name: 'Just talking',
        posterPath: 'https://static-cdn.jtvnw.net/ttv-boxart/509658-285x380.jpg',
        videos: {
          connect: getRandomSample(videos, videosPerCategory).map((video) => ({
            id: video.id,
          })),
        },
      },
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
