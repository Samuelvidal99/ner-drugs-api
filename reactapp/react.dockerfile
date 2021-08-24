FROM node:14-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install

RUN npm install sweetalert2@11.1.3

COPY . .

EXPOSE 3000

CMD [ "npm" , "start"]

