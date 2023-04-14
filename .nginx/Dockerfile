FROM nginx:latest

ARG IMAGE_NAME_4000

COPY . ./

RUN sed -i "s/{IMAGE_NAME_4000}/$IMAGE_NAME_4000/" nginx.conf

RUN mv nginx.conf /etc/nginx/nginx.conf