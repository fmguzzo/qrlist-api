FROM node:16.14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

#COPY package*.json ./
COPY . .

RUN npm install

#COPY . .

EXPOSE 3000

#Production
#CMD ["npm", "start"]

#Development
CMD ["npm", "run", "dev"]
