CREATE DATABASE database_links;

USE database_links;

CREATE TABLE public.users(
    id SERIAL NOT NULL,
    userName VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullName VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE public.links(
    id SERIAL NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    descripcion TEXT,
    user_id INT,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id),
    PRIMARY KEY (id)
);