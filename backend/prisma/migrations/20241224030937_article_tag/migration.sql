/*
  Warnings:

  - You are about to drop the `articlesTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `articlesTags` DROP FOREIGN KEY `articlesTags_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `articlesTags` DROP FOREIGN KEY `articlesTags_tagId_fkey`;

-- DropTable
DROP TABLE `articlesTags`;

-- CreateTable
CREATE TABLE `articleTags` (
    `articleId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`articleId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articleTags` ADD CONSTRAINT `articleTags_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `articles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articleTags` ADD CONSTRAINT `articleTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
