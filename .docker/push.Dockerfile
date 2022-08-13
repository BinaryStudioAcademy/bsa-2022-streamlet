FROM node:16.16.0-alpine as push-build

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./backend/push ./backend/push

RUN npm pkg set scripts.postinstall="npm run build:shared"
RUN npm ci -w shared -w backend/push

RUN npm run build:push
RUN rm -rf ./backend/push/src
RUN rm -rf ./shared/src

EXPOSE 5002
CMD npm start -w backend/push
