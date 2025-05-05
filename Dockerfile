# Step 1: Build React app
FROM node:18 AS builder
WORKDIR /app
COPY frontend ./frontend
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN npm install --prefix frontend
RUN npm run build --prefix frontend

# Step 2: Prepare backend server
FROM node:18
WORKDIR /app

# Copy backend
COPY backend ./backend
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm install --prefix backend

# Copy frontend build output
COPY --from=builder /app/frontend/dist ./frontend/dist

# Expose port and start server
WORKDIR /app/backend
CMD ["node", "src/server.js"]
