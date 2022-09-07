-- CreateIndex
CREATE INDEX "Channel_textSearch_idx" ON "Channel" USING GIN (
  (setweight(to_tsvector('english', name), 'C') || setweight(to_tsvector('english', coalesce(description, '')), 'D'))
);
