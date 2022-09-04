-- AlterTable
ALTER TABLE "VideoComment" ADD COLUMN     "parentId" TEXT;
ALTER TABLE "VideoComment" ADD CONSTRAINT "VideoComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "VideoComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
