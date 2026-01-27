# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set your API URL - consider making this a build-time argument
ENV VITE_API_BASE_URL=http://127.0.0.1:8000
RUN npm run build

# Stage 2: Serve with Node.js (better for Railway)
FROM node:20-alpine
WORKDIR /app
# Install serve globally
RUN npm install -g serve
# Copy built files from build stage
COPY --from=build /app/dist ./dist
# Expose port 3000 (Railway default)
EXPOSE 3000
# Serve the static files
CMD ["serve", "-s", "dist", "-l", "3000"]