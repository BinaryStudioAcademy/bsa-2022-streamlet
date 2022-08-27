/*
  Warnings:

  - The `status` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StreamStatus" AS ENUM ('waiting', 'live', 'finished');

-- CreateEnum
CREATE TYPE "Privacy" AS ENUM ('public', 'unlisted', 'private');

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "posterPath" DROP NOT NULL,
ALTER COLUMN "posterPath" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "isReadyToStream" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "privacy" "Privacy" NOT NULL DEFAULT 'unlisted',
ALTER COLUMN "name" SET DEFAULT '',
DROP COLUMN "status",
ADD COLUMN     "status" "StreamStatus" NOT NULL DEFAULT 'waiting';

UPDATE "Video" SET "status" = 'finished';

-- DropEnum
DROP TYPE "StreamingStatus";
