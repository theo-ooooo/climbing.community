/*
  Warnings:

  - The primary key for the `oauthInformation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `oauthInformation` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`oauthId`, `provider`);
