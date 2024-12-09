FROM node:18-alpine

WORKDIR /app/server
ARG NODE_ENV=.local
ENV NODE_ENV=${NODE_ENV}
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]

# Image Name - Pokemon-React-Server
