FROM node:10.15.3

RUN mkdir -p /mover/server

COPY ./ /mover/server

WORKDIR /mover/server

RUN npm install

EXPOSE $PORT

CMD ["npm", "start"]
