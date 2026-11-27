import { useState, useEffect } from 'react';

const STORAGE_KEY = 'gdg-bookmarked-events';

function safeRead(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((x): x is string => typeof x === 'string');
    return [];
  } catch {
    return [];
  }
}

function safeWrite(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // LocalStorage not available
  }
}

export function useBookmarks() {
  const [bookmarked, setBookmarked] = useState<string[]>(safeRead);

  useEffect(() => {
    safeWrite(bookmarked);
  }, [bookmarked]);

  const toggle = (id: string) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id: string) => bookmarked.includes(id);

  return { bookmarked, toggle, isBookmarked };
}
