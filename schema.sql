DROP DATABASE IF EXISTS top_songs_db;
CREATE DATABASE top_songs_db;

USE top_songs_db;

CREATE TABLE top_songs (
    position INT NOT NULL PRIMARY KEY,
    artist VARCHAR,
    song VARCHAR,
    year INT,
    combined_total DECIMAL,
    usa_total DECIMAL,
    uk_total DECIMAL,
    eur_total DECIMAL,
    raw_row DECIMAL
);

CREATE TABLE top_albums (
    position INT NOT NULL PRIMARY KEY,
    artist VARCHAR,
    album VARCHAR,
    year INT,
    combined_total DECIMAL,
    usa_total DECIMAL,
    uk_total DECIMAL,
    eur_total DECIMAL,
    raw_row DECIMAL
);

SELECT * FROM top_songs;
SELECT * FROM top_albums;