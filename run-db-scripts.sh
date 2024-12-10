#!/bin/bash

node_env=.Production
ServerInstance=$DB_HOST
dbName=$DB

# Parse arguments (if provided) for ServerInstance and Database name
while getopts "s:d:n:" opt; do
  case ${opt} in
    s )
      ServerInstance="$OPTARG"
      ;;
    d )
      dbName="$OPTARG"
      ;;
    n )
      node_env="$OPTARG"
      ;;
    \? )
      echo "Usage: cmd [-s server_instance] [-d database_name]"
      exit 1
      ;;
  esac
done

if [ -f .env$node_env ]; then
    export $(grep -v '^#' .env$node_env | xargs)  # This loads the environment variables
else
    echo ".env file not found!"
    exit 1
fi

# Print out what we're doing
echo "== Initiating system instance variables..."
echo "Server Instance: $ServerInstance"
echo "Database Name: $dbName"

sqlScriptFolder="$(pwd)/sql-script"

for sqlFile in "$sqlScriptFolder"/*.sql; do
  if [ -f "$sqlFile" ]; then
    echo "Executing SQL script: $sqlFile"
    
    PGPASSWORD=$DB_PASSWORD psql -h $ServerInstance -p $PORT -U $DB_USER -d $dbName -f "$sqlFile"

        if [ $? -eq 0 ]; then
      echo "Successfully executed $sqlFile"
    else
      echo "Error executing $sqlFile"
    fi
  else
    echo "No .sql files found in the folder."
  fi
done