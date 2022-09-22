-- CreateEnum
CREATE TYPE "DeviceCategory" AS ENUM ('MOBILE', 'TABLET', 'DESKTOP', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ReactionStatus" AS ENUM ('NONE', 'LIKED', 'DISLIKED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('NONE', 'SUBSCRIBED', 'UNSUBSCRIBED');

-- CreateTable
CREATE TABLE "VideoStats" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT,
    "watchTime" INTEGER NOT NULL,
    "device" "DeviceCategory" NOT NULL DEFAULT 'UNKNOWN',
    "language" TEXT NOT NULL,
    "isLive" BOOLEAN NOT NULL,
    "durationStamp" INTEGER NOT NULL,
    "view" BOOLEAN NOT NULL DEFAULT false,
    "reaction" "ReactionStatus" NOT NULL DEFAULT 'NONE',
    "subscription" "SubscriptionStatus" NOT NULL DEFAULT 'NONE',
    "wasSubscribed" BOOLEAN NOT NULL DEFAULT false,
    "commentsActivity" INTEGER NOT NULL DEFAULT 0,
    "chatsActivity" INTEGER NOT NULL DEFAULT 0,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoStats" ADD CONSTRAINT "VideoStats_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoStats" ADD CONSTRAINT "VideoStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
