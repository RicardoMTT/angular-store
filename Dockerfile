### STAGE 1: Build ###
FROM node:16-alpine AS build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

### STAGE 2: Run ###

FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-step /app/dist/store-angular /usr/share/nginx/html
 