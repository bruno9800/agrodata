/*
  Warnings:

  - You are about to drop the column `plan` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "birthdate" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "plan";
