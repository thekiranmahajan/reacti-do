import { useState } from "react";
import { Check, PenSquare, Trash2, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import useTodoItemStore from "../store/useTodoItemStore";
import useTodoListStore from "../store/useTodoListStore";
import CreatorInput from "./CreatorInput";
import toast from "react-hot-toast";
import EditableInput from "./EditableInput";

const TodoItems = () => {
  const { todoItems, isItemsLoading, createItem, updateItem, deleteItem } =
    useTodoItemStore();
  const { selectedListId } = useTodoListStore();

  const [newItem, setNewItem] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    if (!selectedListId) return;
    createItem({ text: newItem, todoList: selectedListId });
    setNewItem("");
  };

  const handleUpdateItemText = (itemId, newText, originalText) => {
    if (!newText.trim()) return;
    if (newText.trim() === originalText) {
      toast.error("No changes detected.");
      setEditingItemId(null);
      return;
    }
    updateItem(itemId, { text: newText });
    setEditingItemId(null);
  };

  const handleToggleComplete = (item) => {
    if (!item) return;
    updateItem(item._id, { isCompleted: !item.isCompleted });
  };

  const startEditing = (item) => {
    setEditingItemId(item._id);
  };

  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-xl font-bold">
        {selectedListId ? "Todo Items" : "Select a list"}
      </h2>

      {selectedListId && (
        <>
          <CreatorInput
            handleCreate={handleCreateItem}
            newName={newItem}
            setNewName={setNewItem}
            placeholder="New todo item"
          />

          <div className="max-h-[78vh] flex-1 overflow-y-auto text-sm md:text-base">
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
                        <EditableInput
                          initialValue={item.text}
                          onSave={(value, originalValue) =>
                            handleUpdateItemText(item._id, value, originalValue)
                          }
                          onCancel={() => setEditingItemId(null)}
                          autoFocus
                        />
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
