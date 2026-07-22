import React from 'react';
import { ChevronRight, ChevronDown, Plus, X } from 'lucide-react';
import { TabItem } from '../../types';
import FaviconLetter from '../FaviconLetter/FaviconLetter';
import FolderLogo from '../FolderLogo/FolderLogo';
import EditableText from '../EditableText/EditableText';
import './TabNode.scss';

interface TabNodeProps {
  tab: TabItem;
  depth: number;
  onToggleExpand: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Renders one tab/folder row, then renders its own children underneath
 * itself (indented) by calling itself again — this recursion is what turns
 * a flat list into a tree.
 */
const TabNode: React.FC<TabNodeProps> = ({
  tab,
  depth,
  onToggleExpand,
  onRename,
  onAddChild,
  onDelete,
}) => {
  const hasChildren = tab.children.length > 0;

  return (
    <div className="tab-node">
      <div
        className="tab-node__row"
        style={{ paddingLeft: depth * 20 }}
      >
        {/* Expand / collapse arrow, only shown if there are children */}
        <button
          className="tab-node__chevron"
          onClick={() => hasChildren && onToggleExpand(tab.id)}
          aria-label={tab.isExpanded ? 'Collapse' : 'Expand'}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            tab.isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : null}
        </button>

        {/* Icon: a stack of the folder's children for folders, letter logo for real tabs */}
        {tab.isFolder ? (
          <FolderLogo childTitles={tab.children.map((c) => c.title)} />
        ) : (
          <FaviconLetter title={tab.title} />
        )}

        <EditableText
          className="tab-node__title"
          value={tab.title}
          onSave={(newTitle) => onRename(tab.id, newTitle)}
        />

        {!tab.isFolder && tab.url && (
          <span className="tab-node__url">{tab.url}</span>
        )}

        {/* Hover actions */}
        <div className="tab-node__actions">
          <button
            className="tab-node__action-btn"
            title="Add child tab"
            onClick={() => onAddChild(tab.id)}
          >
            <Plus size={14} />
          </button>
          <button
            className="tab-node__action-btn tab-node__action-btn--danger"
            title="Close"
            onClick={() => onDelete(tab.id)}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Children, indented, with a vertical guide line */}
      {hasChildren && tab.isExpanded && (
        <div className="tab-node__children">
          {tab.children.map((child) => (
            <TabNode
              key={child.id}
              tab={child}
              depth={depth + 1}
              onToggleExpand={onToggleExpand}
              onRename={onRename}
              onAddChild={onAddChild}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TabNode;
