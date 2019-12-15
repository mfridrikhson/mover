FROM node:10.15.3

ENV APP_ROOT /mover

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY ./server $APP_ROOT/server
COPY ./client $APP_ROOT/client

WORKDIR $APP_ROOT/client
RUN npm install
RUN npm run build

WORKDIR $APP_ROOT/server
RUN npm install
RUN npm rebuild

EXPOSE $PORT

CMD ["pm2", "start", "server.js", "--name", "Mover"]
