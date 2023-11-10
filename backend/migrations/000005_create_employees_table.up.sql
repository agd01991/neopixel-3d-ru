CREATE TABLE "employees" (
    "id" bigserial PRIMARY KEY,
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
    "role" varchar NOT NULL
);