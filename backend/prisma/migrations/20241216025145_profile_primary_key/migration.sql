-- AlterTable
ALTER TABLE `profiles` ADD PRIMARY KEY (`memberId`);

-- DropIndex
DROP INDEX `profiles_memberId_key` ON `profiles`;
