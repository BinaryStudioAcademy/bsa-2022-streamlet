-- DropIndex
DROP INDEX "video_name_index";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "posterPath" DROP NOT NULL,
ALTER COLUMN "posterPath" DROP DEFAULT;
