FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:latest AS prod
COPY --from=build /app/dist /etc/nginx/html/
RUN  rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 4000

# image name - Pokemon-React-UI
