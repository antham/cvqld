FROM node:latest

ARG API_URL

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install -g browserify babelify uglify-js && \
    npm install

COPY . .

RUN sed -i "s#API_URL#${API_URL}#g" url.js && \
    browserify -v -t [ babelify --presets [ env react ] ] index.js|uglifyjs > bundle.js
