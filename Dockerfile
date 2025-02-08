FROM node:20.18-alpine

WORKDIR /app

# Install dependencies
COPY package.*json ./
RUN npm install

# Copy source code
COPY . .
RUN npm run build

# Expose port
EXPOSE 8080

# Start the app
CMD ["npm", "run" ,"start"]
