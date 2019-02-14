FROM node:8.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org/ && npm install

COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]
