FROM node:18-slim

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Install dependencies for Chromium (if needed)
RUN apt-get update && \
    apt-get install -y wget gnupg --no-install-recommends && \
    wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
