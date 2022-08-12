FROM node:16.16.0-slim as socket-build

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./backend/push ./backend/push

RUN npm i -w shared -w backend/push

RUN npm run build:socket
RUN rm -rf ./backend/push/src
RUN rm -rf ./shared/src

EXPOSE 5002
CMD npm start -w backend/push
