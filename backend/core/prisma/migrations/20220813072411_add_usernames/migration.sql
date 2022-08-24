/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/

CREATE SEQUENCE "username_generator" MINVALUE 0 INCREMENT 1 START 0;

ALTER TABLE "User" ADD "username" TEXT;

UPDATE "User" SET "username" = CONCAT('username', nextval('username_generator')) WHERE "username" IS NULL;

ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
