#!/bin/bash

echo "Checking if mongodb is present..."
if mongod --version > /dev/null
then
    echo "MongoDB is installed!!!"
else
    echo "MongoDB is not present... starting installation"
        sh ci/scripts/install_mongodb.sh
fi
