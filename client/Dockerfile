FROM node:alpine
WORKDIR /app
#not important, just a name for the image dir to hold the backend server
COPY . /app
#copies everything in the current directory to the dir chosen above, so it can build the image
EXPOSE 3000
#i chose 3000 bc that is reacts default, which is what we are using for the client
RUN npm install
# all the stuff to run the backend after the image is created
CMD npm run start