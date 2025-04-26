import { catchError } from "../lib/utils.js";
import TodoItem from "../models/todoItem.model.js";
import TodoList from "../models/todoList.model.js";

export const getTodoItems = async (req, res) => {
  try {
    const { listId } = req.params;
    if (!listId) {
      return res.status(400).json({ message: "listId is required" });
    }
    const todoList = await TodoList.findOne({
      _id: listId,
      user: req.user._id,
    });

    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }
    const todoItems = await TodoItem.find({ todoList: listId });
    res.status(200).json(todoItems);
  } catch (error) {
    catchError(res, error, "getTodoItems controller");
  }
};
export const getTodoItem = async (req, res) => {
  try {
    const todoItem = await TodoItem.findById(req.params.id);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    const todoList = await TodoList.findOne({
      _id: todoItem.todoList,
      user: req.user._id,
    });
    if (!todoList) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.status(200).json(todoItem);
  } catch (error) {
    catchError(res, error, "getTodoItem controller");
  }
};
export const createTodoItem = async (req, res) => {
  try {
    const { text, todoList } = req.body;
    if (!text || !todoList) {
      return res
        .status(400)
        .json({ message: "Text and todoList are required" });
    }
    const list = await TodoList.findOne({
      _id: todoList,
      user: req.user._id,
    });
    if (!list) {
      return res.status(404).json({ message: "Todo list not found" });
    }
    const newTodoItem = new TodoItem({
      text,
      todoList,
    });
    const savedTodoItem = await newTodoItem.save();
    res.status(201).json(savedTodoItem);
  } catch (error) {
    catchError(res, error, "createTodoItem controller");
  }
};
export const updateTodoItem = async (req, res) => {
  try {
    const { text, isCompleted } = req.body;
    const todoItem = await TodoItem.findById(req.params.id);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    const todoList = await TodoList.findOne({
      _id: todoItem.todoList,
      user: req.user._id,
    });
    if (!todoList) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (typeof text !== "undefined") todoItem.text = text;
    if (typeof isCompleted !== "undefined") todoItem.isCompleted = isCompleted;
    const updatedItem = await todoItem.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    catchError(res, error, "updateTodoItem controller");
  }
};
export const deleteTodoItem = async (req, res) => {
  try {
    const todoItem = await TodoItem.findById(req.params.id);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo item not found" });
    }
    const todoList = await TodoList.findOne({
      _id: todoItem.todoList,
      user: req.user._id,
    });
    if (!todoList) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await TodoItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo item deleted successfully!" });
  } catch (error) {
    catchError(res, error, "deleteTodoItem controller");
  }
};
