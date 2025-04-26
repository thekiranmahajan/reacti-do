import express from "express";
import authRoutes from "./routes/auth.route.js";
import todoListRoute from "./routes/todoList.route.js";
import todoItemRoute from "./routes/todoItem.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "node:path";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

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
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}
/*********PRODUCTION CODE**********/

app.listen(PORT, () => {
  console.log(`Server is up and Running at http://localhost:${PORT}`);
  connectDB();
});
