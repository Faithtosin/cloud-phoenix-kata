
FROM node:8.11.1


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
#ENV DB_CONNECTION_STRING=mongodb://admin:nGA5eN3TAiqGW2Hm@cluster0-shard-00-00.hushs.mongodb.net:27017,cluster0-shard-00-01.hushs.mongodb.net:27017,cluster0-shard-00-02.hushs.mongodb.net:27017/phoenixdb?ssl=true&replicaSet=atlas-kmif96-shard-0&authSource=admin&retryWrites=true&w=majority
#ENV PORT=8080
CMD [ "npm", "start" ]
