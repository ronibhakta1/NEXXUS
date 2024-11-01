/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `echo` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `echo` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `echo` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `echo` table. All the data in the column will be lost.
  - You are about to drop the column `retweets` on the `echo` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `echo` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `echo` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `echo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "echo" DROP COLUMN "avatar",
DROP COLUMN "comments",
DROP COLUMN "image",
DROP COLUMN "likes",
DROP COLUMN "retweets",
DROP COLUMN "time",
DROP COLUMN "username",
DROP COLUMN "verified";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "echoId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "echoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Share" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "echoId" INTEGER NOT NULL,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reshare" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "echoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reshare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "echoContentFlagdata" (
    "id" SERIAL NOT NULL,
    "echoId" INTEGER NOT NULL,
    "sentiment" TEXT NOT NULL,
    "extraData" JSONB,

    CONSTRAINT "echoContentFlagdata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "echoContentFlagdata_echoId_key" ON "echoContentFlagdata"("echoId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_echoId_fkey" FOREIGN KEY ("echoId") REFERENCES "echo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_echoId_fkey" FOREIGN KEY ("echoId") REFERENCES "echo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_echoId_fkey" FOREIGN KEY ("echoId") REFERENCES "echo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reshare" ADD CONSTRAINT "Reshare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reshare" ADD CONSTRAINT "Reshare_echoId_fkey" FOREIGN KEY ("echoId") REFERENCES "echo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "echoContentFlagdata" ADD CONSTRAINT "echoContentFlagdata_echoId_fkey" FOREIGN KEY ("echoId") REFERENCES "echo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
