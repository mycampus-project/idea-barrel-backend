FROM nginx
RUN mkdir /etc/nginx/ssl
RUN chmod 700 /etc/nginx/ssl
RUN openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -batch -keyout /etc/nginx/ssl/certificate.key -out /etc/nginx/ssl/certificate.crt
COPY nginx.conf /etc/nginx/nginx.conf