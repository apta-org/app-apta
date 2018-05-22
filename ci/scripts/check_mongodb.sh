#!/bin/bash

echo "Checking if mongodb is running..."
if mongod --version > /dev/null
then
    echo "MongoDB is installed!!!"
else
    echo "MongoDB is not present... starting installation"
        sh ./install_mongodb.sh
fi
