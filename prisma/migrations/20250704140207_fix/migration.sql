/*
  Warnings:

  - You are about to drop the column `subtitleee` on the `posts` table. All the data in the column will be lost.
  - Added the required column `subtitle` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` DROP COLUMN `subtitleee`,
    ADD COLUMN `subtitle` VARCHAR(191) NOT NULL;
