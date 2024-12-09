FROM node:18-alpine AS build
WORKDIR /app
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest AS prod
COPY --from=build /app/dist /etc/nginx/html/
RUN  rm /etc/nginx/conf.d/default.conf
COPY ./nginx-docker/default.local.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]