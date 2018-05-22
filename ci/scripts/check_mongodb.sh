#!/bin/bash

echo "Checking if mongodb is running..."
if pgrep mongod > /dev/null
then
    echo "MongoDB Running!!!"
else
    echo "Stopped .. starting MongoDB"
        #sudo service mongodb start
        #sh ./install_mongodb.sh
fi
