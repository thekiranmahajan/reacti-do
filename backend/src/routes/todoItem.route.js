import express from "express";
import {
  createTodoItem,
  deleteTodoItem,
  getTodoItem,
  getTodoItems,
  updateTodoItem,
} from "../controllers/todoItem.controller.js";
import protectRoute from "../middleware/protectRoute.middleware.js";

const router = express.Router();

router.get("/list/:listId", protectRoute, getTodoItems);
router.get("/:id", protectRoute, getTodoItem);
router.post("/create", protectRoute, createTodoItem);
router.patch("/update/:id", protectRoute, updateTodoItem);
router.delete("/delete/:id", protectRoute, deleteTodoItem);

export default router;
