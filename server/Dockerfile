FROM node:10.17-alpine

RUN mkdir -p /mover/server
WORKDIR /mover/server

RUN npm install -g pm2 && npm install

CMD ["pm2", "start", "server.js", "--name", "Mover"]
