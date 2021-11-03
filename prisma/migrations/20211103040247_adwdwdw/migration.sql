/*
  Warnings:

  - Made the column `restaurant_id` on table `ratings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "ratings" ALTER COLUMN "restaurant_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restauraunts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
