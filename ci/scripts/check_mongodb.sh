#!/bin/bash

echo "Checking if mongodb is running..."
if mongod --version > /dev/null
then
    echo "MongoDB Running!!!"
else
    echo "Stopped .. starting MongoDB"
        #sudo service mongodb start
        #sh ./install_mongodb.sh
fi
