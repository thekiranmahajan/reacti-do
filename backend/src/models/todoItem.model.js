import mongoose from "mongoose";

const todoItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    todoList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TodoList",
      required: true,
    },
  },
  { timestamps: true }
);

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;
