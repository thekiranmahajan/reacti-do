import express from "express";
import protectRoute from "../middleware/protectRoute.middleware.js";
import {
  createTodoList,
  deleteTodoList,
  getTodoList,
  getTodoLists,
  updateTodoList,
} from "../controllers/todoList.controller.js";

const router = express.Router();

router.get("/", protectRoute, getTodoLists);
router.get("/:id", protectRoute, getTodoList);
router.post("/create", protectRoute, createTodoList);
router.patch("/update/:id", protectRoute, updateTodoList);
router.delete("/delete/:id", protectRoute, deleteTodoList);

export default router;
