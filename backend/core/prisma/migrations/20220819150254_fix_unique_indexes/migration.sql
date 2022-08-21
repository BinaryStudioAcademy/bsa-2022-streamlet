/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `StreamingKey` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[channelId]` on the table `StreamingKey` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StreamingKey_key_channelId_key";

-- CreateIndex
CREATE UNIQUE INDEX "StreamingKey_key_key" ON "StreamingKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "StreamingKey_channelId_key" ON "StreamingKey"("channelId");
