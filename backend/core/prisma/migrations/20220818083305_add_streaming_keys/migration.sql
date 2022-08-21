-- CreateTable
CREATE TABLE "StreamingKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "StreamingKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StreamingKey_key_channelId_key" ON "StreamingKey"("key", "channelId");

-- AddForeignKey
ALTER TABLE "StreamingKey" ADD CONSTRAINT "StreamingKey_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
