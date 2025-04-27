import { useState } from "react";
import useTodoListStore from "../store/useTodoListStore";
import { motion } from "motion/react";
import { Loader2, PenSquare, Plus, Trash2 } from "lucide-react";

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
  const [editListName, setEditListName] = useState("");

  const handleCreateList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createList(newListName);
    setNewListName("");
  };
  const handleUpdateList = (listId) => {
    if (!editListName.trim()) return;
    updateList(listId, editListName);
    setEditingListId(null);
  };

  const startEditing = (list) => {
    setEditingListId(list?._id);
    setEditListName(list?.todoListName);
  };

  return (
    <motion.div className="flex w-full flex-col p-4">
      <h2 className="mb-4 text-xl font-bold underline">Todo Lists</h2>

      <form onSubmit={handleCreateList} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New list name"
          className="input input-sm input-accent flex-1"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          <Plus size={16} />
        </button>
      </form>
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
          <ul className="space-y-2">
            {lists?.map((list) => (
              <li key={list?._id}>
                {editingListId === list?._id ? (
                  <div className="flex items-center gap-2 p-1">
                    <input
                      type="text"
                      value={editListName}
                      onChange={(e) => setEditListName(e.target.value)}
                      className="input input-bordered input-sm flex-1"
                      autoFocus
                    />
                    <button
                      onClick={() => handleUpdateList(list?._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Save
                    </button>
                  </div>
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
                        onClick={() => deleteList(list?._id)}
                        className="btn btn-ghost btn-xs text-error"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default TodoLists;
