# ---------- Step 1: Build frontend ----------
    FROM node:22.15.0-alpine3.20 as builder
    WORKDIR /app
    
    # Install frontend dependencies and build
    COPY frontend/package*.json frontend/
    RUN npm install --prefix frontend
    
    COPY frontend ./frontend
    RUN npm run build --prefix frontend
    
    # ---------- Step 2: Setup backend ----------
    FROM node:22.15.0-alpine3.20
    WORKDIR /app
    
    # Install backend dependencies
    COPY backend/package*.json backend/
    RUN npm install --prefix backend
    
    # Copy backend source
    COPY backend ./backend
    
    # Copy frontend build output into backend
    COPY --from=builder /app/frontend/dist ./frontend/dist
    
    # Set working directory to backend
    WORKDIR /app/backend
    
    # Expose port (Cloud Run expects 8080)
    EXPOSE 8080
    
    # Start backend server
    CMD ["node", "src/server.js"]
    