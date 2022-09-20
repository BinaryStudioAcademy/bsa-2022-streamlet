-- CreateTable
CREATE TABLE "ChannelStats" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "userId" TEXT,
    "subscription" "SubscriptionStatus" NOT NULL DEFAULT 'NONE',
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChannelStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChannelStats" ADD CONSTRAINT "ChannelStats_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelStats" ADD CONSTRAINT "ChannelStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
