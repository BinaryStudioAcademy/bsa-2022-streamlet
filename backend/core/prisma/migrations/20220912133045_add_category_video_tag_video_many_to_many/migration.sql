/*
  Warnings:

  - You are about to drop the `_CategoryToVideo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToVideo" DROP CONSTRAINT "_CategoryToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToVideo" DROP CONSTRAINT "_CategoryToVideo_B_fkey";

-- DropForeignKey
ALTER TABLE "_TagToVideo" DROP CONSTRAINT "_TagToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToVideo" DROP CONSTRAINT "_TagToVideo_B_fkey";

-- DropTable
DROP TABLE "_CategoryToVideo";

-- DropTable
DROP TABLE "_TagToVideo";

-- CreateTable
CREATE TABLE "TagToVideo" (
    "tagId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,

    CONSTRAINT "TagToVideo_pkey" PRIMARY KEY ("tagId","videoId")
);

-- CreateTable
CREATE TABLE "CategoryToVideo" (
    "categoryId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,

    CONSTRAINT "CategoryToVideo_pkey" PRIMARY KEY ("categoryId","videoId")
);

-- AddForeignKey
ALTER TABLE "TagToVideo" ADD CONSTRAINT "TagToVideo_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagToVideo" ADD CONSTRAINT "TagToVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToVideo" ADD CONSTRAINT "CategoryToVideo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToVideo" ADD CONSTRAINT "CategoryToVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
