-- DropIndex
DROP INDEX "video_name_index";

-- CreateIndex
CREATE INDEX "Video_textSearch_idx" ON "Video" USING GIN (
  (setweight(to_tsvector('english', name), 'A') || setweight(to_tsvector('english', coalesce(description, '')), 'B'))
);
