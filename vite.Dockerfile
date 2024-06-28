FROM httpd:2.4
COPY . /app

WORKDIR /app

RUN apt-get update && \
    apt-get install -y nodejs npm && \
    apt-get clean

EXPOSE 80

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
