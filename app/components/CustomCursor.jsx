'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.opacity = '0';
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
      cursor.style.opacity = '1';
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
}
