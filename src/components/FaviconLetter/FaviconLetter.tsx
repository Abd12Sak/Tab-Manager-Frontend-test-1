import React from 'react';
import './FaviconLetter.scss';

interface FaviconLetterProps {
  title: string;
}

/**
 * Turns a site/tab title into a small colored "logo": the first letter of
 * the title on a background color generated from the title itself, so the
 * same site always gets the same color.
 */
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 50%)`;
}

const FaviconLetter: React.FC<FaviconLetterProps> = ({ title }) => {
  const letter = title.trim().charAt(0).toUpperCase() || '?';
  const background = stringToColor(title || 'tab');

  return (
    <div className="favicon-letter" style={{ backgroundColor: background }}>
      {letter}
    </div>
  );
};

export default FaviconLetter;
