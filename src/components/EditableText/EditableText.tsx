import React, { useEffect, useRef, useState } from 'react';
import './EditableText.scss';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
}

/**
 * A piece of text that turns into an <input> when the user double-clicks it,
 * and turns back into text (saving the change) when they press Enter or
 * click away. This is what powers renaming tabs, folders, and spaces.
 */
const EditableText: React.FC<EditableTextProps> = ({ value, onSave, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const commit = () => {
    setIsEditing(false);
    const trimmed = draft.trim();
    if (trimmed.length > 0 && trimmed !== value) {
      onSave(trimmed);
    } else {
      setDraft(value); // reset if empty or unchanged
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        className={`editable-text__input ${className ?? ''}`}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') {
            setDraft(value);
            setIsEditing(false);
          }
        }}
      />
    );
  }

  return (
    <span
      className={`editable-text ${className ?? ''}`}
      title="Double-click to rename"
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      {value}
    </span>
  );
};

export default EditableText;
