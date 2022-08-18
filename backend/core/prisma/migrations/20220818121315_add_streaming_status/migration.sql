/*
  Warnings:

  - You are about to drop the column `isLive` on the `Video` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StreamingStatus" AS ENUM ('pending', 'ready', 'live', 'finished');

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "isLive",
ADD COLUMN     "status" "StreamingStatus" NOT NULL DEFAULT 'pending';
