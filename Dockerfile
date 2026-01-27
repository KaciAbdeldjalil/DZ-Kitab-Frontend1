# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_API_BASE_URL=http://127.0.0.1:8000
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --from=build /app/dist ./dist

# Use port 4173
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--port", "4173", "--host", "0.0.0.0"]