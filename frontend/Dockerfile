FROM node:18-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Start the development server with hot reloading
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"] 