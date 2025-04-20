/*
  Warnings:

  - You are about to drop the column `hasAirconditioner` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `hasBarbeque` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "hasAirconditioner",
DROP COLUMN "hasBarbeque",
ADD COLUMN     "hasAirConditioner" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasBarBeQue" BOOLEAN NOT NULL DEFAULT false;
