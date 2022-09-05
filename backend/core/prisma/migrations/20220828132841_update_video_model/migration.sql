/*
  Warnings:

  - The `status` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StreamStatus" AS ENUM ('WAITING', 'LIVE', 'FINISHED');

-- CreateEnum
CREATE TYPE "Privacy" AS ENUM ('PUBLIC', 'UNLISTED', 'PRIVATE');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "isReadyToStream" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "privacy" "Privacy" NOT NULL DEFAULT 'UNLISTED',
ALTER COLUMN "name" SET DEFAULT 'My new stream',
ALTER COLUMN "videoPath" SET DEFAULT '',
DROP COLUMN "status",
ADD COLUMN     "status" "StreamStatus" NOT NULL DEFAULT 'WAITING',
ALTER COLUMN "publishedAt" DROP NOT NULL,
ALTER COLUMN "publishedAt" DROP DEFAULT;

UPDATE "Video" SET "status" = 'FINISHED';

-- DropEnum
DROP TYPE "StreamingStatus";
