import { useState } from "react";
import useTodoListStore from "../store/useTodoListStore";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, PenSquare, Trash2 } from "lucide-react";
import CreatorInput from "./CreatorInput";
import EditableInput from "./EditableInput";
import toast from "react-hot-toast";

const TodoLists = () => {
  const {
    lists,
    selectedListId,
    setSelectedListId,
    isListsLoading,
    createList,
    updateList,
    deleteList,
  } = useTodoListStore();
  const [newListName, setNewListName] = useState("");
  const [editingListId, setEditingListId] = useState(null);

  const handleCreateList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createList(newListName);
    setNewListName("");
  };
  const handleUpdateList = (listId, newName, originalName) => {
    if (!newName.trim()) return;
    if (newName.trim() === originalName) {
      toast.error("No changes detected.");
      setEditingListId(null);
      return;
    }
    updateList({ listId: listId, todoListName: newName });
    setEditingListId(null);
  };

  const startEditing = (list) => {
    setEditingListId(list?._id);
  };

  return (
    <motion.div className="flex w-full flex-col p-4">
      <h2 className="mb-4 text-xl font-bold underline">Todo Lists</h2>

      <CreatorInput
        handleCreate={handleCreateList}
        newName={newListName}
        setNewName={setNewListName}
        placeholder="New list name"
      />

      <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
        {isListsLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="text-primary size-6 animate-spin" />
          </div>
        ) : lists?.length === 0 ? (
          <div className="text-base-content/60 text-center">
            No lists yet. Create one!
          </div>
        ) : (
          <AnimatePresence>
            <ul className="space-y-2">
              {lists?.map((list) => (
                <motion.li
                  key={list?._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {editingListId === list?._id ? (
                    <EditableInput
                      initialValue={list.todoListName}
                      onSave={(value, originalValue) =>
                        handleUpdateList(list._id, value, originalValue)
                      }
                      onCancel={() => setEditingListId(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      className={`hover:bg-base-300 in-checked: flex justify-between rounded-sm p-2 ${selectedListId === list._id ? "bg-base-300" : ""}`}
                    >
                      <button
                        onClick={() => setSelectedListId(list?._id)}
                        className="flex-1 cursor-pointer text-left text-sm sm:text-base"
                      >
                        {list.todoListName}
                      </button>
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEditing(list)}
                          className="btn btn-ghost btn-xs"
                        >
                          <PenSquare size={14} />
                        </button>
                        <button
                          onClick={() => deleteList(list._id)}
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
    </motion.div>
  );
};

export default TodoLists;
