# /bin/bash
# CREATE DB DUMP WITH A GIVEN DATE

DATE="$(date '+%Y-%m-%d')";
cd db_backups;

if [ ! -d "backup_$DATE" ]; then
   mkdir "backup_$DATE";
   mongodump --out ./backup_$DATE --db ensembledb
   echo "Backup created for $DATE";
else
    echo "Backup already exists for today";
fi
