-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "restaurant_id" UUID;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restauraunts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
