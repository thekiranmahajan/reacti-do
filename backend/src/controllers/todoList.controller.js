import TodoList from "../models/todoList.model.js";
import TodoItem from "../models/todoItem.model.js";

export const getTodoLists = async (req, res) => {
  try {
    const todoLists = await TodoList.find({ user: req.user._id });
    res.status(200).json(todoLists);
  } catch (error) {
    catchError(res, error, "getTodoLists controller");
  }
};

export const getTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    res.status(200).json(todoList);
  } catch (error) {
    catchError(res, error, "getTodoList controller");
  }
};
export const createTodoList = async (req, res) => {
  try {
    const { todoListName } = req.body;
    const user = req.user._id;

    if (!todoListName) {
      return res.status(400).json({ message: "Todo List name is required" });
    }

    const newTodoList = new TodoList({
      todoListName,
      user,
    });

    const savedTodoList = await newTodoList.save();
    res.status(200).json(savedTodoList);
  } catch (error) {
    catchError(res, error, "createTodoList controller");
  }
};
export const updateTodoList = async (req, res) => {
  try {
    const { todoListName } = req.body;
    const updatedTodoList = await TodoList.findByIdAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { todoListName } },
      { new: true }
    );

    if (!updateTodoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }
    res.status(200).json(updatedTodoList);
  } catch (error) {
    catchError(res, error, "updateTodoList controller");
  }
};
export const deleteTodoList = async (req, res) => {
  try {
    const deletedTodoList = await TodoList.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedTodoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }
    await TodoItem.deleteMany({ todoList: req.params.id });
    res.status(200).json({
      message: "Todo list and associated items are deleted successfully!",
    });
  } catch (error) {
    catchError(res, error, "deleteTodoList controller");
  }
};
