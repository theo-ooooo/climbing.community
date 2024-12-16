-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_memberId_fkey`;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
