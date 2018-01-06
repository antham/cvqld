FROM alpine:3.6

WORKDIR /app

RUN apk add --no-cache --update sassc nodejs nodejs-npm git && \
    npm install -g bower@1.8.2

COPY . .

RUN bower --allow-root --verbose --force install
RUN sassc -I bower_components -t compressed main.sass > main.css
