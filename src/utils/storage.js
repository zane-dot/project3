export const BOARD_STORAGE_KEY = 'ai-task-board:data';
export const THEME_STORAGE_KEY = 'ai-task-board:theme';

export const loadFromStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage write failures
  }
};
