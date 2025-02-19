FROM node:22-alpine
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json package.json
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 5173