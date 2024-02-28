CREATE DATABASE notesdb;
USE notesdb;

CREATE TABLE notes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT null,
    contents TEXT NOT null,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes ( title, contents )
VALUES
('My First Note', 'A note about something'),
('My Second Note', 'A note about something else');