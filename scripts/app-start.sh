#!/bin/bash
cd /home/ubuntu/mover/server/
pm2 delete all
npm install
npm rebuild
npm run migrate
npm run seed
pm2 start server.js --name Mover
