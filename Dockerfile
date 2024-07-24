FROM node:18-slim

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "start:prod"]
