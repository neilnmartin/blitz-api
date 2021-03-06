CREATE TABLE "users" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "user_name" varchar UNIQUE NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar,
  "token" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "series" (
  "id" int PRIMARY KEY,
  "title" varchar,
  "country_code" int,
  "created_at" timestamp,
  "artist_id" int
);

CREATE TABLE "genres" (
  "id" int PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "series_genres" (
  "id" int PRIMARY KEY,
  "series_id" int,
  "genre_id" int
);

CREATE TABLE "issue" (
  "id" int PRIMARY KEY,
  "title" varchar,
  "artist_id" int,
  "series_id" int
);

CREATE TABLE "artwork" (
  "id" int PRIMARY KEY,
  "artist_id" int NOT NULL,
  "series_id" int NOT NULL,
  "title" varchar,
  "created_at" timestamp
);

CREATE TABLE "page" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "issue_id" int NOT NULL,
  "page_number" int,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "series" ADD FOREIGN KEY ("artist_id") REFERENCES "users" ("id");

ALTER TABLE "series_genres" ADD FOREIGN KEY ("series_id") REFERENCES "series" ("id");

ALTER TABLE "series_genres" ADD FOREIGN KEY ("genre_id") REFERENCES "genres" ("id");

ALTER TABLE "issue" ADD FOREIGN KEY ("artist_id") REFERENCES "users" ("id");

ALTER TABLE "issue" ADD FOREIGN KEY ("series_id") REFERENCES "series" ("id");

ALTER TABLE "artwork" ADD FOREIGN KEY ("artist_id") REFERENCES "users" ("id");

ALTER TABLE "artwork" ADD FOREIGN KEY ("series_id") REFERENCES "users" ("id");

ALTER TABLE "page" ADD FOREIGN KEY ("issue_id") REFERENCES "issue" ("id");
