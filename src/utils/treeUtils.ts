// ---------------------------------------------------------------------------
// Small, framework-agnostic helper functions for working with a tree of
// TabItems. Every function returns a brand-new array instead of mutating the
// old one — that's what makes React re-render correctly.
//
// If you're new to recursion: each function looks at the top-level list of
// nodes, and if it doesn't find what it's looking for, it asks each node's
// `children` array to keep searching. That's the whole trick.
// ---------------------------------------------------------------------------

import { TabItem } from '../types';

/** Generates a short, good-enough-for-a-demo unique id. */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** Finds a node by id anywhere in the tree and replaces it using `updater`. */
export function updateNodeInTree(
  nodes: TabItem[],
  id: string,
  updater: (node: TabItem) => TabItem
): TabItem[] {
  return nodes.map((node) => {
    if (node.id === id) return updater(node);
    if (node.children.length > 0) {
      return { ...node, children: updateNodeInTree(node.children, id, updater) };
    }
    return node;
  });
}

/** Removes a node (and, naturally, everything under it) from the tree. */
export function removeNodeFromTree(nodes: TabItem[], id: string): TabItem[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) =>
      node.children.length > 0
        ? { ...node, children: removeNodeFromTree(node.children, id) }
        : node
    );
}

/** Adds a new child node under the node with the given parentId. */
export function addChildToNode(
  nodes: TabItem[],
  parentId: string,
  child: TabItem
): TabItem[] {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return { ...node, isExpanded: true, children: [...node.children, child] };
    }
    if (node.children.length > 0) {
      return { ...node, children: addChildToNode(node.children, parentId, child) };
    }
    return node;
  });
}

/** Creates a fresh TabItem with sensible defaults. */
export function createTab(title: string, isFolder = false): TabItem {
  return {
    id: generateId(),
    title,
    url: isFolder ? undefined : 'https://example.com',
    isFolder,
    isExpanded: true,
    children: [],
  };
}
