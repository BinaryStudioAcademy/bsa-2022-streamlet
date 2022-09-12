FROM nginx:1.22.0-alpine

COPY ./nginx/nginx.debug.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
