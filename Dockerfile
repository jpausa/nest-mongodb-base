FROM node:16.14-alpine3.14

WORKDIR /opt/src

EXPOSE 3000

COPY package*.json ./

ADD . /opt/src

RUN npm install

RUN npm run build

CMD npm run start:prod