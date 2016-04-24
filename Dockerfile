FROM node:5

RUN mkdir -p /usr/src/coiphee-api
WORKDIR /usr/src/coiphee-api

COPY package.json /usr/src/coiphee-api/
RUN npm install

COPY . /usr/src/coiphee-api

EXPOSE 8080
CMD ["npm", "start"]
