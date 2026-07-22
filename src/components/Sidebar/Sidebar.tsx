import React from 'react';
import { Plus, Layers } from 'lucide-react';
import { Space } from '../../types';
import EditableText from '../EditableText/EditableText';
import './Sidebar.scss';

interface SidebarProps {
  spaces: Space[];
  activeSpaceId: string;
  onSelectSpace: (id: string) => void;
  onRenameSpace: (id: string, newName: string) => void;
  onAddSpace: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  spaces,
  activeSpaceId,
  onSelectSpace,
  onRenameSpace,
  onAddSpace,
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <Layers size={16} />
        <span>Spaces</span>
      </div>

      <div className="sidebar__list">
        {spaces.map((space) => (
          <div
            key={space.id}
            className={`sidebar__item ${
              space.id === activeSpaceId ? 'sidebar__item--active' : ''
            }`}
            onClick={() => onSelectSpace(space.id)}
          >
            <span className="sidebar__dot" />
            <EditableText
              className="sidebar__item-name"
              value={space.name}
              onSave={(newName) => onRenameSpace(space.id, newName)}
            />
          </div>
        ))}
      </div>

      <button className="sidebar__add-btn" onClick={onAddSpace}>
        <Plus size={14} />
        New space
      </button>
    </aside>
  );
};

export default Sidebar;
