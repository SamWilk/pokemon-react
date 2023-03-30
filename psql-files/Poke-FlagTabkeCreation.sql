CREATE TABLE
    pokemonflag (
        pokemonflagID UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        pokemonID int not null,
        userID UUID not null,
        createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );