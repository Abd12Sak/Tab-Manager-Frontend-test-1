import React, { useState } from 'react';
import { FolderPlus, Plus } from 'lucide-react';
import Sidebar from './components/Sidebar/Sidebar';
import TabTree from './components/TabTree/TabTree';
import EditableText from './components/EditableText/EditableText';
import { Space } from './types';
import { initialSpaces } from './data/mockData';
import {
  addChildToNode,
  createTab,
  generateId,
  removeNodeFromTree,
  updateNodeInTree,
} from './utils/treeUtils';
import './App.scss';

function App() {
  const [spaces, setSpaces] = useState<Space[]>(initialSpaces);
  const [activeSpaceId, setActiveSpaceId] = useState(initialSpaces[0].id);

  const activeSpace = spaces.find((s) => s.id === activeSpaceId) ?? spaces[0];

  /** Runs `updater` on the active space's tab tree, leaving other spaces untouched. */
  const updateActiveSpaceTabs = (updater: (tabs: Space['tabs']) => Space['tabs']) => {
    setSpaces((prev) =>
      prev.map((space) =>
        space.id === activeSpaceId ? { ...space, tabs: updater(space.tabs) } : space
      )
    );
  };

  const handleToggleExpand = (id: string) => {
    updateActiveSpaceTabs((tabs) =>
      updateNodeInTree(tabs, id, (node) => ({ ...node, isExpanded: !node.isExpanded }))
    );
  };

  const handleRename = (id: string, newTitle: string) => {
    updateActiveSpaceTabs((tabs) =>
      updateNodeInTree(tabs, id, (node) => ({ ...node, title: newTitle }))
    );
  };

  const handleDelete = (id: string) => {
    updateActiveSpaceTabs((tabs) => removeNodeFromTree(tabs, id));
  };

  const handleAddChild = (parentId: string) => {
    updateActiveSpaceTabs((tabs) =>
      addChildToNode(tabs, parentId, createTab('New Tab'))
    );
  };

  const handleAddRootTab = (isFolder: boolean) => {
    updateActiveSpaceTabs((tabs) => [
      ...tabs,
      createTab(isFolder ? 'New Folder' : 'New Tab', isFolder),
    ]);
  };

  const handleSelectSpace = (id: string) => setActiveSpaceId(id);

  const handleRenameSpace = (id: string, newName: string) => {
    setSpaces((prev) =>
      prev.map((space) => (space.id === id ? { ...space, name: newName } : space))
    );
  };

  const handleAddSpace = () => {
    const newSpace: Space = { id: generateId(), name: 'New Space', tabs: [] };
    setSpaces((prev) => [...prev, newSpace]);
    setActiveSpaceId(newSpace.id);
  };

  return (
    <div className="app">
      <Sidebar
        spaces={spaces}
        activeSpaceId={activeSpaceId}
        onSelectSpace={handleSelectSpace}
        onRenameSpace={handleRenameSpace}
        onAddSpace={handleAddSpace}
      />

      <main className="app__main">
        <header className="app__header">
          <EditableText
            className="app__space-name"
            value={activeSpace.name}
            onSave={(newName) => handleRenameSpace(activeSpace.id, newName)}
          />

          <div className="app__header-actions">
            <button className="app__header-btn" onClick={() => handleAddRootTab(true)}>
              <FolderPlus size={15} />
              New folder
            </button>
            <button
              className="app__header-btn app__header-btn--primary"
              onClick={() => handleAddRootTab(false)}
            >
              <Plus size={15} />
              New tab
            </button>
          </div>
        </header>

        <div className="app__tree-scroll">
          <TabTree
            tabs={activeSpace.tabs}
            onToggleExpand={handleToggleExpand}
            onRename={handleRename}
            onAddChild={handleAddChild}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
