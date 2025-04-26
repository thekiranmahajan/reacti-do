import express from "express";
import authRoutes from "./routes/auth.route.js";
import todoListRoute from "./routes/todoList.route.js";
import todoItemRoute from "./routes/todoItem.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/todoList", todoListRoute);
app.use("/api/todoItem", todoItemRoute);

app.get("/", (req, res) => {
  res.send("Server is Running 🟢");
});

app.listen(PORT, () => {
  console.log(`Server is up and Running at http://localhost:${PORT}`);
  connectDB();
});
