FROM tiangolo/nginx-rtmp

WORKDIR /app

COPY ./nginx/nginx.rtmp.conf /etc/nginx/nginx.conf
