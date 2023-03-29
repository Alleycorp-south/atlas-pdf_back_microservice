# Imagen base
FROM node:latest

WORKDIR /usr/src/app

RUN npm install

RUN npm build

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]