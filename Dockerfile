FROM node:7.4

# # initctl fix
# # RUN dpkg-divert --local --rename --add /sbin/initctl
# # RUN ln -s /bin/true /sbin/initctl
# RUN dpkg-divert --local --rename --add /etc/init.d/mongod
# RUN ln -s /bin/true /etc/init.d/mongod

# # Install MongoDB
# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
# RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list

# # Update apt-get sources AND install MongoDB
# RUN apt-get update && apt-get install -y mongodb-org

# # Create the MongoDB data directory
# RUN mkdir -p /data/db

RUN mkdir -p /usr/src/coiphee-api
RUN mkdir -p /usr/src/coiphee-api/log
WORKDIR /usr/src/coiphee-api

COPY package.json /usr/src/coiphee-api/
RUN npm install

COPY . /usr/src/coiphee-api

EXPOSE 4265
CMD ["npm", "start"]
