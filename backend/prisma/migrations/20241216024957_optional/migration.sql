-- AlterTable
ALTER TABLE `members` MODIFY `username` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profiles` MODIFY `nickname` VARCHAR(191) NULL,
    MODIFY `profileImageUrl` VARCHAR(191) NULL;
