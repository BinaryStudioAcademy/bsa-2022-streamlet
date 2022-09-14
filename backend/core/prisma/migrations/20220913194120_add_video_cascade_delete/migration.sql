-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_channelId_fkey";

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
