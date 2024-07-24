FROM node:14-slim

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Install Chromium
RUN apt-get update && apt-get install -y chromium

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "start:prod"]