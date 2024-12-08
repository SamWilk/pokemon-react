FROM node:18-alpine

WORKDIR /app/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000

CMD ["npm","start"]

# image name - Pokemon-React-UI
