/*
  Warnings:

  - Made the column `posterPath` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "posterPath" SET NOT NULL;
