import { useState } from "react";
import { Check, PenSquare, Trash2, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import useTodoItemStore from "../store/useTodoItemStore";
import useTodoListStore from "../store/useTodoListStore";

const TodoItems = () => {
  const { todoItems, isItemsLoading, createItem, updateItem, deleteItem } =
    useTodoItemStore();
  const { selectedListId } = useTodoListStore();

  const [newItem, setNewItem] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editItemText, setEditItemText] = useState("");

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    createItem({ text: newItem, todoList: selectedListId });
    setNewItem("");
  };

  const handleUpdateItemText = (itemId) => {
    if (!editItemText.trim()) return;
    updateItem(itemId, { text: editItemText });
    setEditingItemId(null);
  };

  const handleToggleComplete = (item) => {
    if (!item) return;
    updateItem(item._id, { isCompleted: !item.isCompleted });
  };

  const startEditing = (item) => {
    setEditingItemId(item._id);
    setEditItemText(item.text);
  };

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-xl font-bold">
        {selectedListId ? "Todo Items" : "Select a list"}
      </h2>

      {selectedListId && (
        <>
          <form onSubmit={handleCreateItem} className="mb-4 flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="New todo item"
              className="input input-bordered input-sm flex-1"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              <Plus size={16} />
            </button>
          </form>

          <div className="flex-1 overflow-y-auto text-sm md:text-base">
            {isItemsLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="text-primary size-6 animate-spin" />
              </div>
            ) : todoItems.length === 0 ? (
              <div className="text-base-content/60 text-center">
                No items yet. Create one!
              </div>
            ) : (
              <AnimatePresence>
                <ul className="space-y-2">
                  {todoItems.map((item) => (
                    <motion.li
                      key={item._id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {editingItemId === item._id ? (
                        <div className="flex items-center gap-2 p-1">
                          <input
                            type="text"
                            value={editItemText}
                            onChange={(e) => setEditItemText(e.target.value)}
                            className="input input-bordered input-sm flex-1"
                            autoFocus
                          />
                          <button
                            onClick={() => handleUpdateItemText(item._id)}
                            className="btn btn-primary btn-sm"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="bg-base-100 flex items-center justify-between gap-2 rounded-md p-2 shadow-sm">
                          <div className="flex flex-1 items-center gap-2">
                            <button
                              onClick={() => handleToggleComplete(item)}
                              className={`flex size-5 items-center justify-center rounded-full border ${
                                item.isCompleted
                                  ? "bg-primary text-primary-content"
                                  : "border-base-content/30"
                              }`}
                            >
                              {item.isCompleted && <Check size={12} />}
                            </button>
                            <span
                              className={`flex-1 ${
                                item.isCompleted
                                  ? "text-base-content/50 line-through"
                                  : ""
                              }`}
                            >
                              {item.text}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => startEditing(item)}
                              className="btn btn-ghost btn-xs"
                            >
                              <PenSquare size={14} />
                            </button>
                            <button
                              onClick={() => deleteItem(item._id)}
                              className="btn btn-ghost btn-xs text-error"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </AnimatePresence>
            )}
          </div>
        </>
      )}

      {!selectedListId && (
        <div className="text-base-content/60 flex flex-1 items-center justify-center">
          Select a list to see items
        </div>
      )}
    </div>
  );
};

export default TodoItems;
