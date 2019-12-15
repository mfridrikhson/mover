FROM node:10.15.3

RUN mkdir -p /mover/client

COPY ./ /mover/client

WORKDIR /mover/client

RUN npm install

CMD ["npm", "start"]
