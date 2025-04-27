import { useRef, useEffect, useState } from "react";

const EditableInput = ({
  initialValue = "",
  onSave,
  onCancel,
  autoFocus = false,
}) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        onCancel?.();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onCancel]);

  const handleSave = () => {
    onSave(value, initialValue);
  };

  return (
    <div className="flex items-center gap-2 p-1" ref={inputRef}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input input-bordered input-sm flex-1"
        autoFocus={autoFocus}
      />
      <button
        onClick={handleSave}
        className="btn btn-primary btn-sm"
        type="button"
      >
        Save
      </button>
    </div>
  );
};

export default EditableInput;
