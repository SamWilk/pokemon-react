FROM node:18-alpine

# Set the working directory to /app/server
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm","start"]

# Image Name - Pokemon-React-Server
