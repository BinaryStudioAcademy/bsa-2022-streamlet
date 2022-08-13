FROM node:16.16.0-slim as backend-build

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./backend/core ./backend/core

RUN npm ci -w shared -w backend/core

RUN npm run build:backend
RUN rm -rf ./backend/core/src
RUN rm -rf ./shared/src

EXPOSE 5001
CMD npm start -w backend/core
