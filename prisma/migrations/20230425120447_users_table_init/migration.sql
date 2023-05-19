-- AlterTable
ALTER TABLE `users` MODIFY `password` TEXT NOT NULL,
    MODIFY `token` TEXT NULL,
    MODIFY `address` TEXT NULL,
    MODIFY `image` TEXT NULL;
