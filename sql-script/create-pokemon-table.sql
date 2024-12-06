CREATE TABLE
    IF NOT EXISTS pokemon (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sprite TEXT NOT NULL,
    types VARCHAR(255)[] NOT NULL,
    generation INTEGER NOT NULL
);