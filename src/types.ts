// ---------------------------------------------------------------------------
// Shared TypeScript types for the Tab Manager UI.
// Keeping these in one file makes it easy for every component to agree on
// what a "Tab" or a "Space" looks like.
// ---------------------------------------------------------------------------

/**
 * A single tab (or a "folder" that groups other tabs) in the tree.
 * Tabs can have children, which is what lets us build a parent/child tree
 * instead of the usual flat row of tabs.
 */
export interface TabItem {
  id: string;
  title: string;
  /** The page url. Folders don't really navigate anywhere, so this is optional. */
  url?: string;
  /** True if this node is just a "folder" used to group other tabs. */
  isFolder?: boolean;
  /** Whether the children of this node are currently visible. */
  isExpanded: boolean;
  /** Child tabs nested underneath this one. */
  children: TabItem[];
}

/**
 * A "Space" is a named collection of tabs — think of it like a whole
 * workspace/profile (e.g. "Work", "Personal", "Trip Planning").
 */
export interface Space {
  id: string;
  name: string;
  tabs: TabItem[];
}
