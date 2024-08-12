/*
  Warnings:

  - You are about to drop the column `best_price_id` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "best_price_id",
ADD COLUMN     "bestPriceId" INTEGER;
