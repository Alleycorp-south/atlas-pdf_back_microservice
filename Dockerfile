# Imagen base
FROM node:latest

WORKDIR /usr

RUN ls

RUN npm install

RUN npm build

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]