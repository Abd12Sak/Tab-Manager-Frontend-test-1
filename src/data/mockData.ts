// ---------------------------------------------------------------------------
// Sample data. In the real app this would come from the browser's tabs API
// instead — this file exists purely so the UI has something to render.
// ---------------------------------------------------------------------------

import { Space } from '../types';

export const initialSpaces: Space[] = [
  {
    id: 'space-work',
    name: 'Work',
    tabs: [
      {
        id: 't1',
        title: 'Gmail',
        url: 'https://mail.google.com',
        isExpanded: true,
        children: [],
      },
      {
        id: 't2',
        title: 'Research',
        isFolder: true,
        isExpanded: true,
        children: [
          {
            id: 't3',
            title: 'React Docs',
            url: 'https://react.dev',
            isExpanded: true,
            children: [
              {
                id: 't4',
                title: 'useEffect reference',
                url: 'https://react.dev/reference/react/useEffect',
                isExpanded: true,
                children: [],
              },
            ],
          },
          {
            id: 't5',
            title: 'Sass Documentation',
            url: 'https://sass-lang.com',
            isExpanded: true,
            children: [],
          },
        ],
      },
      {
        id: 't6',
        title: 'Figma',
        url: 'https://figma.com',
        isExpanded: true,
        children: [],
      },
    ],
  },
  {
    id: 'space-personal',
    name: 'Personal',
    tabs: [
      {
        id: 't7',
        title: 'YouTube',
        url: 'https://youtube.com',
        isExpanded: true,
        children: [
          {
            id: 't8',
            title: 'Lo-fi playlist',
            url: 'https://youtube.com/playlist',
            isExpanded: true,
            children: [],
          },
        ],
      },
      {
        id: 't9',
        title: 'Amazon',
        url: 'https://amazon.com',
        isExpanded: true,
        children: [],
      },
    ],
  },
];
