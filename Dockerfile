FROM node:18-slim

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Install Chromium
RUN apt-get update && \
    apt-get install -y chromium && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "start:prod"]
