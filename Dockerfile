# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_API_BASE_URL=http://127.0.0.1:8000
RUN npm run build

# Stage 2: Production - Serve static files
FROM node:20-alpine
WORKDIR /app

# Copy only package.json to install serve
COPY package*.json ./

# Install serve as a regular dependency (not global)
RUN npm install serve

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Expose port (Railway will assign its own port)
EXPOSE 3000

# Start the server using npx to avoid global install issues
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]