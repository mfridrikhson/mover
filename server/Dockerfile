FROM node:10.15.3

RUN mkdir -p /mover/server

COPY ./ /mover/server

WORKDIR /mover/server

RUN npm install -g pm2 && npm install
RUN npm rebuild

EXPOSE $PORT

CMD ["pm2", "start", "server.js", "--name", "Mover"]
