CREATE EXTENSION pg_trgm;
CREATE EXTENSION btree_gin;

CREATE INDEX video_name_index
  ON "Video" USING GIN (name gin_trgm_ops);