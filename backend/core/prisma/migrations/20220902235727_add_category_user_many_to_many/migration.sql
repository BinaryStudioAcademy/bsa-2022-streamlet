/*
  Warnings:

  - You are about to drop the `_CategoryToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToUser" DROP CONSTRAINT "_CategoryToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToUser" DROP CONSTRAINT "_CategoryToUser_B_fkey";

-- DropTable
DROP TABLE "_CategoryToUser";

-- CreateTable
CREATE TABLE "CategoryToUser" (
    "categoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CategoryToUser_pkey" PRIMARY KEY ("categoryId","userId")
);

-- AddForeignKey
ALTER TABLE "CategoryToUser" ADD CONSTRAINT "CategoryToUser_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToUser" ADD CONSTRAINT "CategoryToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
