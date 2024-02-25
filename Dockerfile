# Use an official Node.js runtime as a parent image
FROM node:21.6.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3095

# Command to run your application
CMD ["npm", "run", "start:dev"]
