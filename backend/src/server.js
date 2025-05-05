import express from "express";
import authRoutes from "./routes/auth.route.js";
import todoListRoute from "./routes/todoList.route.js";
import todoItemRoute from "./routes/todoItem.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/todolist", todoListRoute);
app.use("/api/todoitem", todoItemRoute);

/*********PRODUCTION CODE**********/
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(__dirname, "..", "..", "frontend", "dist");
  app.use(express.static(frontendDistPath));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}
/*********PRODUCTION CODE**********/

app.listen(PORT, () => {
  console.log(`Server is up and Running at http://localhost:${PORT}`);
  connectDB();
});
