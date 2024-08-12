/*
  Warnings:

  - You are about to drop the column `safraId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `safraId` to the `BuyProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_safraId_fkey";

-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "BuyProduct" ADD COLUMN     "safraId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "safraId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_userId_key" ON "Product"("name", "userId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyProduct" ADD CONSTRAINT "BuyProduct_safraId_fkey" FOREIGN KEY ("safraId") REFERENCES "Safra"("id") ON DELETE CASCADE ON UPDATE CASCADE;
