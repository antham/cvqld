FROM node:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

RUN npm install -g sass && \    
    sass main.sass > main.css
