-- CreateTable
CREATE TABLE `oauthInformation` (
    `memberId` INTEGER NOT NULL,
    `oauthId` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`memberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `oauthInformation` ADD CONSTRAINT `oauthInformation_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
