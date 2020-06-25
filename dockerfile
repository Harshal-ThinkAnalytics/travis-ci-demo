FROM nginx:alpine

#!/bin/sh

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/


RUN rm -rf /usr/share/nginx/html/*


COPY build/ /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
