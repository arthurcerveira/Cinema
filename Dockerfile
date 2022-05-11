# Download image
FROM mysql:8.0

ENV MYSQL_DATABASE cinema_dev
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD cinema
ENV MYSQL_ROOT_PASSWORD cinema

COPY ./app/models/DDL.sql /docker-entrypoint-initdb.d/DDL.sql

CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]