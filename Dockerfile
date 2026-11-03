# Stage 1: Build React application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source code
COPY . .

# Create production build
RUN npm run build

# Stage 2: Serve application using Nginx
FROM nginx:alpine

# Copy production files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose web server port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
