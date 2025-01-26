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
sqlInsertScriptFile="$(pwd)/sql-script/check-run-scripts/insert-into-schema.sql"

result=`PGPASSWORD=$DB_PASSWORD psql -h $ServerInstance -p $PORT -U $DB_USER -d $dbName -Atc "SELECT ssr.name FROM sqlscriptrun ssr;"`

for sqlFile in "$sqlScriptFolder"/*.sql; do

  runScript=true
  filename=$(basename "$sqlFile")

  if echo "$result" | grep -w -q "$filename"; then
    echo "$filename already executed"
  else
      echo "Executing SQL script: $filename"

      PGPASSWORD=$DB_PASSWORD psql -h $ServerInstance -p $PORT -U $DB_USER -d $dbName -f "$sqlFile"
      PGPASSWORD=$DB_PASSWORD psql -h $ServerInstance -p $PORT -U $DB_USER -d $dbName -v name="'$filename'" -f "$sqlInsertScriptFile"

      if [ $? -eq 0 ]; then
        echo "Successfully executed $filename"
      else
        echo "Error executing $filename"
      fi
  fi
done