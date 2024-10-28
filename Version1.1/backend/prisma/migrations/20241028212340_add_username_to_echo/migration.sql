/*
  Warnings:

  - You are about to drop the column `handle` on the `echo` table. All the data in the column will be lost.
  - Added the required column `username` to the `echo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "echo" DROP COLUMN "handle",
ADD COLUMN "username" TEXT DEFAULT 'default_username';

-- Update the existing rows with the correct values
UPDATE "echo" SET "username" = (SELECT "username" FROM "User" WHERE "User"."id" = "echo"."authorId");

-- Make the column required and remove the default value
ALTER TABLE "echo" ALTER COLUMN "username" SET NOT NULL;
ALTER TABLE "echo" ALTER COLUMN "username" DROP DEFAULT;