FROM node:16.16.0-slim as backend-build

RUN apt-get update
RUN apt-get install -y openssl
RUN apt-get install -y ca-certificates wget

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./backend/core ./backend/core

RUN npm config set fetch-retry-mintimeout 120000
RUN npm config set fetch-retry-maxtimeout 240000

RUN npm ci -w shared -w backend/core

RUN rm -rf ./shared/src

EXPOSE 5001
CMD npm run migrate -w backend/core; npm run seed:soft -w backend/core; npm run start:dev -w backend;
