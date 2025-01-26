DO $$

BEGIN 
    IF NOT EXISTS (
        SELECT FROM
            pg_database
        WHERE
            datname = 'pokemon-react'
    ) THEN 
        PERFORM dblink_exec(
        "dbname=postgres",
        "CREATE DATABASE pokemon-react"
        );
    END IF;
END;
$$