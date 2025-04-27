import { Plus } from "lucide-react";
import React from "react";

const CreatorInput = ({ handleCreate, newName, setNewName, placeholder }) => {
  return (
    <form onSubmit={handleCreate} className="mb-4 flex gap-2">
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder={placeholder}
        className="input input-sm input-accent flex-1"
      />
      <button type="submit" className="btn btn-primary btn-sm">
        <Plus size={16} />
      </button>
    </form>
  );
};

export default CreatorInput;
