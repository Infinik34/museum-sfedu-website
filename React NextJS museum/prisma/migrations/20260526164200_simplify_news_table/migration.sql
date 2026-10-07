/*
  Warnings:

  - You are about to drop the column `author` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `is_published` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `news` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `news_is_published_published_at_idx` ON `news`;

-- AlterTable
ALTER TABLE `news` DROP COLUMN `author`,
    DROP COLUMN `created_at`,
    DROP COLUMN `is_published`,
    DROP COLUMN `published_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isPublished` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `publishedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `news_isPublished_publishedAt_idx` ON `news`(`isPublished`, `publishedAt`);
