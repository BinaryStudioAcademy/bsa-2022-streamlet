FROM node:16.16.0-alpine as frontend-build
ARG REACT_APP_API_ORIGIN_URL
ENV REACT_APP_API_ORIGIN_URL=$REACT_APP_API_ORIGIN_URL
ARG REACT_APP_PUSH_HOST
ENV REACT_APP_PUSH_HOST=$REACT_APP_PUSH_HOST
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
RUN npm ci -w shared -w frontend

COPY ./frontend ./frontend/

RUN npm run build:frontend

FROM nginx:1.22.0-alpine

COPY ./nginx/nginx.prod.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=frontend-build /app/frontend/build/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]