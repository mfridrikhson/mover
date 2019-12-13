FROM node:10.17-alpine

ENV APP_ROOT /mover

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY ./client $APP_ROOT/client
COPY ./server $APP_ROOT/server

WORKDIR $APP_ROOT/client
RUN npm install
RUN npm run build

WORKDIR $APP_ROOT

COPY ./

WORKDIR $APP_ROOT/server
RUN npm install
RUN npm rebuild
RUN npm run migrate
RUN npm run seed

CMD ["pm2", "start", "server.js", "--name", "Mover"]
