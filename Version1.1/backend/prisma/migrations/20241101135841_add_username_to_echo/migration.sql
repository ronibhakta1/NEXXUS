/*
  Warnings:

  - Added the required column `username` to the `echo` table without a default value. This is not possible if the table is not empty.

*/
-- This is your generated migration file
-- Add a default value for the username column
--ALTER TABLE "echo" ADD COLUMN "username" TEXT DEFAULT 'unknown';

-- If you want to make it optional initially
-- ALTER TABLE "echo" ADD COLUMN "username" TEXT;

-- AlterTable

ALTER TABLE "echo" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "image" TEXT DEFAULT '',
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" TEXT NOT NULL;
