# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first (for caching dependencies)
COPY package*.json ./

# Install dependencies (bao gồm cả dev)
RUN npm install
RUN npm install --save dotenv-extended 

# Copy source code
COPY . .

# Expose app port
EXPOSE 3000

# Run app (dev mode với nodemon)
CMD ["npm", "run", "dev"]
