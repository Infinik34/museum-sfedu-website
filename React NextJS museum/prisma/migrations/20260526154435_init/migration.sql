-- CreateTable
CREATE TABLE `staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
    `department` VARCHAR(100) NULL,
    `photo` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `excerpt` TEXT NULL,
    `content` LONGTEXT NOT NULL,
    `image` VARCHAR(255) NULL,
    `author` VARCHAR(255) NULL,
    `published_at` DATETIME(3) NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `news_slug_key`(`slug`),
    INDEX `news_is_published_published_at_idx`(`is_published`, `published_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exhibits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `full_description` LONGTEXT NULL,
    `category` VARCHAR(100) NULL,
    `year` INTEGER NULL,
    `location` VARCHAR(100) NULL,
    `image` VARCHAR(255) NULL,
    `images` JSON NULL,
    `is_displayed` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `exhibits_slug_key`(`slug`),
    INDEX `exhibits_category_idx`(`category`),
    INDEX `exhibits_is_displayed_idx`(`is_displayed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
