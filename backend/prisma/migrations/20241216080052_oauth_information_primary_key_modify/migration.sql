/*
  Warnings:

  - The primary key for the `oauthInformation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[memberId]` on the table `oauthInformation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `oauthInformation` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`memberId`, `oauthId`, `provider`);

-- CreateIndex
CREATE UNIQUE INDEX `oauthInformation_memberId_key` ON `oauthInformation`(`memberId`);
