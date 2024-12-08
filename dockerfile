FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:latest AS prod
COPY --from=build /app/dist /etc/nginx/html/
RUN  rm /etc/nginx/conf.d/default.conf
COPY ./nginx-docker/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]