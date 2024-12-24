/*
  Warnings:

  - You are about to drop the `_ArticleToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ArticleToTag` DROP FOREIGN KEY `_ArticleToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ArticleToTag` DROP FOREIGN KEY `_ArticleToTag_B_fkey`;

-- DropTable
DROP TABLE `_ArticleToTag`;
