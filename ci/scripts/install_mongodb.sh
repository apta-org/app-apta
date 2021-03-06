#!/bin/bash
set -e

echo "Installing mongodb repo"
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.4 main" > /etc/apt/sources.list.d/mongodb-org-3.4.list


echo "Installing binaries"
apt-get update
apt-get install -y --force-yes mongodb-org
service mongod stop


echo "Setting up default settings"
rm -rf /var/lib/mongodb/*
cat > /etc/mongod.conf <<'EOF'
storage:
  dbPath: /var/lib/mongodb
  directoryPerDB: true
  journal:
    enabled: true
  engine: "wiredTiger"

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 0.0.0.0
  maxIncomingConnections: 100

replication:
  oplogSizeMB: 128
  replSetName: "rs1"

#security:
#  authorization: enabled

EOF

apt-get install sudo

# sudo service mongod start
nohup mongod --dbpath /var/lib/mongodb/ &
sleep 5

#mongo admin <<'EOF'
#use admin
#rs.initiate()
#exit
#EOF

#sleep 5

#echo "Adding admin user"
#mongo admin <<'EOF'
#use admin
#rs.initiate()
#var user = {
#  "user" : "admin",
#  "pwd" : "admin",
#  roles : [
#      {
#          "role" : "userAdminAnyDatabase",
#          "db" : "admin"
#      }
#  ]
#}
#db.createUser(user);
exit
EOF

echo "Mongodb installation is completed"
