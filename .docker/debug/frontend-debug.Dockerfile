FROM node:16.16.0-alpine as frontend-build
ARG REACT_APP_API_ORIGIN_URL
ENV REACT_APP_API_ORIGIN_URL=$REACT_APP_API_ORIGIN_URL
ARG REACT_APP_SERVER_HOST
ENV REACT_APP_SERVER_HOST=$REACT_APP_SERVER_HOST
ARG REACT_APP_PUSH_PORT
ENV REACT_APP_PUSH_PORT=$REACT_APP_PUSH_PORT
ARG REACT_APP_VIDEO_FALLBACK_BASE_URL
ENV REACT_APP_VIDEO_FALLBACK_BASE_URL=$REACT_APP_VIDEO_FALLBACK_BASE_URL

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.yml ./
COPY ./shared ./shared/
COPY ./frontend/package.json ./frontend/

RUN npm pkg set scripts.postinstall="npm run build:shared"
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm ci -w shared -w frontend
RUN mkdir -p ./frontend/node_modules/.cache && chmod -R 777 ./frontend/node_modules/.cache

EXPOSE 3000

CMD npm run start:frontend;
