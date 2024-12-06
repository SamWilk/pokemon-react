CREATE TABLE
    IF NOT EXISTS SQLScriptRun (
        ID SERIAL PRIMARY KEY,
        Name TEXT UNIQUE,
        CreateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ModifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );