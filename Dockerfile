
# ---------- Step 1: Build frontend ----------
    FROM node:22 as builder
    WORKDIR /app
    
    # Copy frontend source and install deps
    COPY frontend/package*.json frontend/
    RUN npm install --prefix frontend
    
    COPY frontend ./frontend
    RUN npm run build --prefix frontend
    
    # ---------- Step 2: Build backend ----------
    FROM node:22
    WORKDIR /app
    
    # Copy backend source and install deps
    COPY backend/package*.json backend/
    RUN npm install --prefix backend
    
    # Copy backend source code
    COPY backend ./backend
    
    # Copy built frontend into backend/dist
    COPY --from=builder /app/frontend/dist ./frontend/dist
    
    # Set working dir to backend
    WORKDIR /app/backend
    
    # Expose port (Cloud Run uses 8080)
    EXPOSE 5000
    
    # Start the server
    CMD ["node", "src/server.js"]
    