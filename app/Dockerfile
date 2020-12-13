FROM node:8.11.1

ARG PORT_ARG
#=8080

ARG DB_STRING_ARG
#=mongodb://admin:nGA5eN3TAiqGW2Hm@cluster0-shard-00-00.hushs.mongodb.net:27017,cluster0-shard-00-01.hushs.mongodb.net:27017,cluster0-shard-00-02.hushs.mongodb.net:27017/phoenixdb?ssl=true&replicaSet=atlas-kmif96-shard-0&authSource=admin&retryWrites=true&w=majority

RUN echo ${PORT_ARG}
RUN echo ${DB_STRING}
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

#RUN npm audit fix
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
ENV DB_CONNECTION_STRING=$DB_STRING_ARG
ENV PORT=$PORT_ARG
#8080
CMD [ "npm", "start" ]
