import mongoose from "mongoose";
import TodoList from "../models/todoList.model.js";
import TodoItem from "../models/todoItem.model.js";

const seedDataForExisting = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const userId = "680cd7a4f011ccd301f670b9";

    // Create todo lists
    const todoLists = await TodoList.insertMany([
      {
        todoListName: "Work Tasks",
        user: userId,
      },
      {
        todoListName: "Shopping List",
        user: userId,
      },
      {
        todoListName: "Personal Goals",
        user: userId,
      },
    ]);

    // Create todo items for each list
    const todoItems = [
      {
        text: "Complete project presentation",
        isCompleted: false,
        todoList: todoLists[0]._id,
      },
      {
        text: "Schedule team meeting",
        isCompleted: true,
        todoList: todoLists[0]._id,
      },
      {
        text: "Buy groceries",
        isCompleted: false,
        todoList: todoLists[1]._id,
      },
      {
        text: "Get new headphones",
        isCompleted: false,
        todoList: todoLists[1]._id,
      },
      {
        text: "Go to gym 3x this week",
        isCompleted: false,
        todoList: todoLists[2]._id,
      },
      {
        text: "Read 20 pages daily",
        isCompleted: true,
        todoList: todoLists[2]._id,
      },
    ];

    await TodoItem.insertMany(todoItems);

    console.log("✅ Dummy data seeded successfully");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding data:", error);
    await mongoose.disconnect();
  }
};

seedDataForExisting();
