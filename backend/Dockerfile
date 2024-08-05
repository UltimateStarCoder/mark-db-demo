FROM node:alpine
WORKDIR /app
#not important, just a name for the image dir to hold the backend server. This will be referenced in our docker-compose.yaml
COPY . /app
#copies everything in the current directory to the dir chosen above, so it can build the image
EXPOSE 8080
#i chose 8080 bc that is what I arbitrarily chose in index.js
RUN npm install -g nodemon
RUN npm install
# all the stuff to run the backend after the image is created
CMD npm run start
