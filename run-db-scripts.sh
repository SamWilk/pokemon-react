#!/bin/bash

if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)  # This loads the environment variables
else
    echo ".env file not found!"
    exit 1
fi

# Default SQL Server instance and database name
ServerInstance=$DB_HOST
dbName=$DB

# Parse arguments (if provided) for ServerInstance and Database name
while getopts "s:d:" opt; do
  case ${opt} in
    s )
      ServerInstance="$OPTARG"
      ;;
    d )
      dbName="$OPTARG"
      ;;
    \? )
      echo "Usage: cmd [-s server_instance] [-d database_name]"
      exit 1
      ;;
  esac
done

# If no database name is provided, default to the folder name where the script is located
if [ -z "$dbName" ]; then
  dbName=$(basename "$PWD")
fi

# If no server instance is provided, default to '.'
if [ -z "$ServerInstance" ]; then
  ServerInstance="."
fi

# Print out what we're doing
echo "== Initiating system instance variables..."
echo "Server Instance: $ServerInstance"
echo "Database Name: $dbName"

# You may need to set up sqlcmd or similar tools here
# Example: Running a SQL file using sqlcmd (adjust as per actual tool and usage)

# Here we assume sqlcmd is available and run a sample SQL script file
# Modify this path to point to the actual SQL script you want to run
sqlScriptFolder="$(pwd)/sql-script"

for sqlFile in "$sqlScriptFolder"/*.sql; do
  if [ -f "$sqlFile" ]; then
    echo "Executing SQL script: $sqlFile"
    
    # Run the SQL script (adjust for your SQL execution tool)
    # sqlcmd -S "$ServerInstance" -d "$dbName" -i "$sqlFile"  # Modify this line for your SQL tool
    PGPASSWORD=$DB_PASSWORD psql -h $ServerInstance -p $PORT -U $DB_USER -d $dbName -f "$sqlFile"

    
    # Check if sqlcmd succeeded
    if [ $? -eq 0 ]; then
      echo "Successfully executed $sqlFile"
    else
      echo "Error executing $sqlFile"
    fi
  else
    echo "No .sql files found in the folder."
  fi
done

# Finish message
echo "Finished"
read -p "Press Enter to exit..."


