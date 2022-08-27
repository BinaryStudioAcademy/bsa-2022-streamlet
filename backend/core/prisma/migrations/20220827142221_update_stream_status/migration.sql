/*
  Warnings:

  - The `status` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StreamStatus" AS ENUM ('waiting', 'live', 'finished');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "isReadyToStream" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "status",
ADD COLUMN     "status" "StreamStatus" NOT NULL DEFAULT 'waiting';
UPDATE "Video" SET "status" = 'finished';

-- DropEnum
DROP TYPE "StreamingStatus";
