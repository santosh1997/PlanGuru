CREATE DATABASE pg_santosh
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;


------------------------------------------------------------------------------


DROP TABLE public."Users";

CREATE TABLE public."Users"
(
    "Id" uuid NOT NULL,
    "Name" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "Timezone" character varying(300) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_Users_Id" PRIMARY KEY ("Id"),
    CONSTRAINT "UK_Users_Email" UNIQUE ("Email")
)

TABLESPACE pg_default;

ALTER TABLE public."Users"
    OWNER to postgres;


------------------------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

------------------------------------------------------------------------------


INSERT INTO "Users" ("Id", "Name", "Email", "Timezone")
values ('5f7567a0-c7d0-44be-9ff7-b202f923b4eb', 'San', 'san@mailinator.com', 'Asia/Taipei');
INSERT INTO "Users" ("Id", "Name", "Email", "Timezone")
values (uuid_generate_v4(), 'San1', 'san1@mailinator.com', 'America/Toronto');


------------------------------------------------------------------------------


DROP TABLE public."Appointments";

CREATE TABLE public."Appointments"
(
    "Id" uuid NOT NULL,
    "AppointedUserId" uuid NOT NULL,
    "AppointmentTime" timestamp without time zone NOT NULL,
    "RequestorUserId" uuid,
    CONSTRAINT "PK_Appointments_Id" PRIMARY KEY ("Id"),
    CONSTRAINT "UK_Appointments_AppointedUserId_AppointmentTime" UNIQUE ("AppointedUserId", "AppointmentTime"),
    CONSTRAINT "FK_Appointments_AppointedUserId_Users_Id" FOREIGN KEY ("AppointedUserId")
        REFERENCES public."Users" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT "FK_Appointments_RequestorUserId_Users_Id" FOREIGN KEY ("RequestorUserId")
        REFERENCES public."Users" ("Id") MATCH SIMPLE
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE public."Appointments"
    OWNER to postgres;


------------------------------------------------------------------------------


