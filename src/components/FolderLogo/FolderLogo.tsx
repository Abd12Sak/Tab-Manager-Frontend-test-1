import React from 'react';
import { Folder } from 'lucide-react';
import './FolderLogo.scss';

interface FolderLogoProps {
  /** Titles of the tabs directly inside this folder, used to build the preview. */
  childTitles: string[];
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 55%)`;
}

/**
 * A folder's "logo" isn't a generic folder glyph — it's a small stack of the
 * first few child tabs' letter badges, overlapping like a deck of cards, so
 * you can tell what's inside a folder at a glance. Falls back to a plain
 * folder icon when the folder is empty.
 */
const FolderLogo: React.FC<FolderLogoProps> = ({ childTitles }) => {
  if (childTitles.length === 0) {
    return <Folder size={16} className="folder-logo__empty-icon" />;
  }

  const preview = childTitles.slice(0, 3);
  const overflowCount = childTitles.length - preview.length;

  return (
    <div className="folder-logo">
      {preview.map((title, i) => (
        <div
          key={i}
          className="folder-logo__chip"
          style={{
            backgroundColor: stringToColor(title),
            zIndex: preview.length - i,
          }}
        >
          {title.trim().charAt(0).toUpperCase() || '?'}
        </div>
      ))}
      {overflowCount > 0 && <div className="folder-logo__overflow">+{overflowCount}</div>}
    </div>
  );
};

export default FolderLogo;
