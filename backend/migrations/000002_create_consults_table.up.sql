CREATE TABLE "consults" (
    "id" bigserial PRIMARY KEY,
    "email" varchar NOT NULL,   
    "name" varchar NOT NULL,
    "tel" varchar NOT NULL,
    "date" varchar NOT NULL,
    "status" varchar NOT NULL
);