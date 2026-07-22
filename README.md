# Tab Manager (frontend UI only)

A tree-based tab manager UI. Instead of a flat row of tabs, tabs live in a
tree: any tab can have child tabs nested under it, and you can group tabs
into folders. This is **UI only** — there's no real browser tab data behind
it, just sample data in `src/data/mockData.ts`.

## Running it

```bash
npm install
npm run dev
```

## How it's organized

```
src/
  types.ts                     Shared TypeScript types (TabItem, Space)
  utils/treeUtils.ts           Pure helper functions for editing the tree
  data/mockData.ts             Sample starter data

  components/
    FaviconLetter/             Colored circle showing a site's first letter
    FolderLogo/                Stacked preview of a folder's child tabs
    EditableText/               Double-click-to-rename text field
    TabNode/                   One row in the tree (renders its own children)
    TabTree/                   Kicks off the top-level list of TabNodes
    Sidebar/                    List of "Spaces", renameable

  App.tsx                      Holds all state, wires components together
  App.scss / index.scss        Layout + global styles (dark theme)
```

## Concepts

- **Space** — a whole workspace of tabs (e.g. "Work", "Personal"). Shown in
  the left sidebar. Double-click a space name to rename it, or click
  "New space" to add one.
- **Tab** — a page. Can have child tabs nested under it (e.g. a doc page
  under the site it belongs to).
- **Folder** — a tab with `isFolder: true`. Used purely to group other tabs
  and doesn't have a url of its own. Instead of a plain folder icon, its
  "logo" is a small overlapping stack of its first few children's letter
  badges (`components/FolderLogo`), so you can tell what's inside at a
  glance — falls back to a plain folder icon when the folder is empty.
- Double-click any tab, folder, or space name to rename it inline.
- Hover a row to reveal the "add child" (+) and "close" (x) buttons.
- Click the chevron to expand/collapse a branch.

## Where the tree logic lives

All the "editing a tree of nested objects" logic (rename, delete, add child,
toggle expand) is centralized in `src/utils/treeUtils.ts` as small, pure,
recursive functions — `App.tsx` just calls them and stores the result in
state. That keeps the components themselves simple and focused on
rendering.
