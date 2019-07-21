# /bin/bash
# RESTORE DB FROM DUMP

DATE="$(date '+%Y-%m-%d')";
cd db_backups;

if [ -d "backup_$DATE" ]; then
   mongorestore ./backup_$DATE --db ensembledb_backup
   echo "Backup restored for $DATE";
else
    echo "Couldn't restore backup. Reason: Today's backup not found.";
fi
