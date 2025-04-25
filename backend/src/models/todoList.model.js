import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema(
  {
    todoListName: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TodoList = mongoose.model("TodoList", todoListSchema);

export default TodoList;
