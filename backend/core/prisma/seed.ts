import { Prisma, PrismaClient, ReactionStatus, SubscriptionStatus, DeviceCategory } from '@prisma/client';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { users, userProfiles, channels, videos } from './seed-data';
const prisma = new PrismaClient();

const SEED_START_DATE_CHANNEL = new Date(2022, 8, 1);
const SEED_START_DATE_VIDEO = new Date(2022, 9, 1); // should be later than SEED_START_DATE_CHANNEL

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
  await seedVideoStats();
  await seedChannelStats();
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
    data: channels.map((c) => ({
      ...c,
      createdAt: getRandomDate(SEED_START_DATE_CHANNEL, SEED_START_DATE_VIDEO),
    })),
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
    data: videos.map((v) => ({
      ...v,
      createdAt: getRandomDate(SEED_START_DATE_VIDEO, new Date()),
    })),
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
          createdAt: getRandomDate(new Date(channel.createdAt), new Date()),
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
      },
    });
  }

  const allTags = await prisma.tag.findMany();

  //connect to video
  for (const { id: videoId } of videos) {
    await prisma.tagToVideo.createMany({
      data: getRandomSample(allTags, videosPerTag).map(({ id: tagId }) => ({
        videoId,
        tagId,
      })),
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

  const banners = [
    {
      name: 'gaming',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010377/category-poster/Pakistani-Gamers-Want-a-Seat-at-the-Table-Culture-shutterstock_1949862841_qvzoxt.jpg',
    },
    {
      name: 'education',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010376/category-poster/54ek6O_3C8L0EJYI-oWFFUJpUmzPbhlmnUIQ72NgaHU_ltigdj.jpg',
    },
    {
      name: 'film&animation',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010376/category-poster/H7fa46ecdeb6547bd86b00c26b341401aW_dizuqw.jpg',
    },
    {
      name: 'music',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010377/category-poster/music-maker-edm-edition-musicians-about-music-maker-background-mobile-int_ruhzrm.jpg',
    },
    {
      name: 'pets&animal',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010376/category-poster/black-cats-animals-silhouette-black-background-1920x1080-animals-cats-hd-art-wallpaper-thumb_smeo8i.jpg',
    },
    {
      name: 'sports',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010376/category-poster/american-football-ball-wallpaper-preview_nm6isj.jpg',
    },
    {
      name: 'travel&events',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010377/category-poster/photo-1500835556837-99ac94a94552_jrxjxf.jpg',
    },
    {
      name: 'comedy',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010376/category-poster/istockphoto-1205240999-170667a_eregt7.jpg',
    },
    {
      name: 'people&blogs',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010377/category-poster/woman-enjoying-a-hot-tub-1296x728-header_hjdl1z.jpg',
    },
    {
      name: 'programming',
      url: 'https://res.cloudinary.com/ds5b5u8go/image/upload/v1663010377/category-poster/Thoughtful_young_programmer_coding_on_computer_in_the_evening_at_home_cdw6jr.jpg',
    },
  ];

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
  videosByCategory.set('comedy', []);

  const totalCategories = categories.length;
  for (let i = 0; i < totalCategories; i++) {
    await prisma.category.create({
      data: {
        name: categories[i],
        posterPath: banners.find((banner) => banner.name === categories[i])?.url || '',
      },
    });
  }

  const allCategories = await prisma.category.findMany();

  // connect to video
  for (const { id: categoryId, name } of allCategories) {
    await prisma.categoryToVideo.createMany({
      data: videosByCategory.get(name)?.map((videoId) => ({
        categoryId,
        videoId,
      })) as Array<{ categoryId: string; videoId: string }>,
    });
  }

  //connect to user
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
  // const users = await prisma.user.findMany();
  // const videos = await prisma.video.findMany();
  // const commentsTotal = 1000;
  // for (let i = 0; i < commentsTotal; i++) {
  //   await prisma.videoComment.create({
  //     data: {
  //       text: faker.lorem.paragraph(),
  //       authorId: users[Math.floor(Math.random() * users.length)].id,
  //       videoId: videos[Math.floor(Math.random() * videos.length)].id,
  //     },
  //   });
  // }
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

async function seedVideoStats(): Promise<void> {
  const users = await prisma.user.findMany({
    include: {
      subscriptions: true,
      reactions: true,
    },
  });
  const videos = await prisma.video.findMany();

  const languages = ['en', 'en', 'en', 'uk', 'uk', 'de', 'es', 'ja']; // duplicate langs for unequal distribution
  const devices = Object.values(DeviceCategory).filter((d) => d !== DeviceCategory.UNKNOWN);

  const viewCount: Record<string, number> = {};
  const updateViewCount = (videoId: string): void => {
    if (viewCount[videoId] === undefined) {
      viewCount[videoId] = 0;
    }
    viewCount[videoId] += 1;
  };

  for (const user of users) {
    const commentGroupBy = await prisma.videoComment.groupBy({
      where: {
        authorId: user.id,
      },
      by: ['videoId'],
      _count: {
        id: true,
      },
    });

    const chatMessageGroupBy = await prisma.chatMessage.groupBy({
      where: {
        authorId: user.id,
      },
      by: ['videoId'],
      _count: {
        id: true,
      },
    });

    const commentVideoIds = commentGroupBy.map((g) => g.videoId);
    const chatMessageVideoIds = chatMessageGroupBy.map((g) => g.videoId);

    const videoIdToChannelId = new Map(
      videos
        .filter((v) => commentVideoIds.includes(v.id) || chatMessageVideoIds.includes(v.id))
        .map((v) => [v.id, v.channelId]),
    );

    const videoIdToVideo = new Map(
      videos.filter((v) => commentVideoIds.includes(v.id) || chatMessageVideoIds.includes(v.id)).map((v) => [v.id, v]),
    );

    const reactionToVideos = <string[]>[];

    const language = getRandomSample(languages, 1)[0];

    await prisma.videoStats.createMany({
      data: [
        ...chatMessageGroupBy.map((c) => {
          const video = videoIdToVideo.get(c.videoId);
          const device = getRandomSample(devices, 1)[0];
          const reaction = user.reactions.find((r) => r.videoId === c.videoId);
          if (reaction) {
            reactionToVideos.push(reaction.videoId);
          }
          const wasSubscribed = Boolean(
            user.subscriptions.find((s) => s.channelId === videoIdToChannelId.get(c.videoId)),
          );
          const durationStamp = getRandomIntFromInterval(1, video?.duration ?? 1);
          const startDate = video?.publishedAt ? video?.publishedAt : video?.createdAt;

          updateViewCount(c.videoId);

          return {
            videoId: c.videoId,
            userId: user.id,
            watchTime: getRandomIntFromInterval(5, 100),
            device: DeviceCategory[device],
            language: language,
            isLive: true,
            durationStamp,
            view: true,
            reaction: reaction
              ? reaction.isLike
                ? ReactionStatus.LIKED
                : ReactionStatus.DISLIKED
              : ReactionStatus.NONE,
            wasSubscribed: wasSubscribed,
            chatsActivity: c._count.id,
            source: 'video',
            ...(startDate && {
              createdAt: getRandomDate(new Date(startDate), new Date()),
            }),
          } as Prisma.VideoStatsCreateManyInput;
        }),
        ...commentGroupBy.map((c) => {
          const video = videoIdToVideo.get(c.videoId);
          const device = getRandomSample(devices, 1)[0];
          let reaction = user.reactions.find((r) => r.videoId === c.videoId);
          if (reaction && !reactionToVideos.includes(reaction.videoId)) {
            reactionToVideos.push(reaction.videoId);
          } else {
            reaction = undefined;
          }
          const wasSubscribed = Boolean(
            user.subscriptions.find((s) => s.channelId === videoIdToChannelId.get(c.videoId)),
          );
          const durationStamp = getRandomIntFromInterval(1, video?.duration ?? 1);
          const startDate = video?.publishedAt ? video?.publishedAt : video?.createdAt;

          updateViewCount(c.videoId);

          return {
            videoId: c.videoId,
            userId: user.id,
            watchTime: getRandomIntFromInterval(5, 100),
            device: DeviceCategory[device],
            language: language,
            isLive: false,
            durationStamp,
            view: true,
            reaction: reaction
              ? reaction.isLike
                ? ReactionStatus.LIKED
                : ReactionStatus.DISLIKED
              : ReactionStatus.NONE,
            wasSubscribed: wasSubscribed,
            commentsActivity: c._count.id,
            source: 'video',
            ...(startDate && {
              createdAt: getRandomDate(new Date(startDate), new Date()),
            }),
          } as Prisma.VideoStatsCreateManyInput;
        }),
      ],
    });
  }

  for (const v of videos) {
    if (v.id in viewCount) {
      const viewsToStat = v.videoViews - viewCount[v.id];
      if (viewsToStat === 0) {
        continue;
      }
      if (viewsToStat > 0) {
        await prisma.videoStats.createMany({
          data: [
            ...new Array(viewsToStat).fill(null).map(() => {
              const language = getRandomSample(languages, 1)[0];
              const device = getRandomSample(devices, 1)[0];
              const durationStamp = getRandomIntFromInterval(1, v.duration);
              const startDate = v.publishedAt ? v.publishedAt : v.createdAt;

              return {
                videoId: v.id,
                watchTime: getRandomIntFromInterval(5, 100),
                device: DeviceCategory[device],
                language: language,
                isLive: false,
                durationStamp,
                view: true,
                source: 'video',
                createdAt: getRandomDate(new Date(startDate), new Date()),
              } as Prisma.VideoStatsCreateManyInput;
            }),
          ],
        });
      } else {
        await prisma.video.update({
          where: {
            id: v.id,
          },
          data: {
            videoViews: viewCount[v.id],
          },
        });
      }
    } else {
      await prisma.videoStats.createMany({
        data: [
          ...new Array(v.videoViews).fill(null).map(() => {
            const language = getRandomSample(languages, 1)[0];
            const device = getRandomSample(devices, 1)[0];
            const durationStamp = getRandomIntFromInterval(1, v.duration);
            const startDate = v.publishedAt ? v.publishedAt : v.createdAt;

            return {
              videoId: v.id,
              watchTime: getRandomIntFromInterval(5, 100),
              device: DeviceCategory[device],
              language: language,
              isLive: false,
              durationStamp,
              view: true,
              source: 'video',
              createdAt: getRandomDate(new Date(startDate), new Date()),
            } as Prisma.VideoStatsCreateManyInput;
          }),
        ],
      });
    }
  }
}

async function seedChannelStats(): Promise<void> {
  const users = await prisma.user.findMany({ include: { subscriptions: true } });
  for (const user of users) {
    await prisma.channelStats.createMany({
      data: [
        ...user.subscriptions.map(
          (s) =>
            ({
              channelId: s.channelId,
              userId: user.id,
              subscription: SubscriptionStatus.SUBSCRIBED,
              source: 'channel',
              createdAt: s.createdAt,
            } as Prisma.ChannelStatsCreateManyInput),
        ),
      ],
    });
  }
}

// not fully random, but ok for seeds
function getRandomSample<T>(arr: T[], sampleSize: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, sampleSize);
}
function getRandomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

seedSampleData().finally(async () => {
  await prisma.$disconnect();
});
