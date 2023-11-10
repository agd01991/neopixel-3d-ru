CREATE TABLE "orders" (
    "id" bigserial PRIMARY KEY,
    "email" varchar NOT NULL,   
    "name" varchar NOT NULL,
    "tel" varchar NOT NULL,
    "printername" varchar NOT NULL,
    "description" varchar NOT NULL,
    "date" varchar NOT NULL,
    "status" varchar NOT NULL
);