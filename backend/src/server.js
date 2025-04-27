import express from "express";
import authRoutes from "./routes/auth.route.js";
import todoListRoute from "./routes/todoList.route.js";
import todoItemRoute from "./routes/todoItem.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "node:path";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const frontendDistPath = path.join(__dirname, "..", "frontend", "dist");

console.log(frontendDistPath);
const indexFilePath = path.join(frontendDistPath, "index.html");

console.log(indexFilePath);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/todolist", todoListRoute);
app.use("/api/todoitem", todoItemRoute);

/*********PRODUCTION CODE**********/
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(__dirname, "..", "frontend", "dist");
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}
/*********PRODUCTION CODE**********/

app.listen(PORT, () => {
  console.log(`Server is up and Running at http://localhost:${PORT}`);
  connectDB();
});
