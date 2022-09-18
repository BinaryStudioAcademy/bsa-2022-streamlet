-- CreateEnum
CREATE TYPE "StreamPermission" AS ENUM ('DISABLED', 'REQUESTED', 'ALLOWED', 'DECLINED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "streamPermission" "StreamPermission" NOT NULL DEFAULT 'DISABLED';
