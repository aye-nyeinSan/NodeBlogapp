# syntax=docker/dockerfile:1

FROM node:18-alpine
RUN echo 'We are running blog app node with docker image'

#name directory in the container 
RUN mkdir /home/app
WORKDIR /home/app

#copy working dir from current to dir in container
COPY ./app /home/app

#install dependencies
RUN npm install

#CMD where to start container
CMD [ "node","/home/app/app.js" ]
EXPOSE 3000
