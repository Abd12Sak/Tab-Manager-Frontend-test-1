import React from 'react';
import { TabItem } from '../../types';
import TabNode from '../TabNode/TabNode';
import './TabTree.scss';

interface TabTreeProps {
  tabs: TabItem[];
  onToggleExpand: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Renders the root level of the tree. Each TabNode is responsible for
 * rendering its own children, so this component just kicks things off.
 */
const TabTree: React.FC<TabTreeProps> = ({
  tabs,
  onToggleExpand,
  onRename,
  onAddChild,
  onDelete,
}) => {
  if (tabs.length === 0) {
    return <div className="tab-tree__empty">No tabs in this space yet.</div>;
  }

  return (
    <div className="tab-tree">
      {tabs.map((tab) => (
        <TabNode
          key={tab.id}
          tab={tab}
          depth={0}
          onToggleExpand={onToggleExpand}
          onRename={onRename}
          onAddChild={onAddChild}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TabTree;
