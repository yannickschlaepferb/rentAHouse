CREATE DATABASE rentahouse IF NOT EXISTS;
USE rentahouse;

CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (username)
);

INSERT INTO users (username, password)
VALUES 
('bob', '1234'),
('john', '1122');