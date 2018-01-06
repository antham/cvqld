FROM node:8.8.1

WORKDIR /app

RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.2.1 && \
    yarn global add browserify babelify uglify-js

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

RUN browserify -v -t [ babelify --presets [ es2015 react ] ] index.js|uglifyjs > bundle.js
