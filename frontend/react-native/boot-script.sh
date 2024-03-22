#!/bin/bash


#Updating NPM Modules based of package/-lock.json
npm install --prefix /opt/react-native-app/


#testing consistency between local directory and container
#bind mount
echo 'I have changed'
#Initiate Startup command for react native app through web
#127.0.0.1:19006
npm run web