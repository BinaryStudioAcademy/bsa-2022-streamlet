FROM node:16.16.0-alpine as video-transcoding-server-build

WORKDIR /app

RUN apk update
RUN apk add
RUN apk add ffmpeg

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./backend/video-transcoding-server ./backend/video-transcoding-server

RUN npm pkg set scripts.postinstall="npm run build:shared"
RUN npm ci -w shared -w backend/video-transcoding-server

RUN npm run build:vts
RUN rm -rf ./backend/video-transcoding-server/src
RUN rm -rf ./shared/src

CMD npm start -w backend/video-transcoding-server
