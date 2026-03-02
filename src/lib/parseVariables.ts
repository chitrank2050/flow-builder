const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

// Pure function — used outside React (e.g. in tests, store, submit logic)
export const parseVariables = (text: string) => {
  const found = new Set();
  for (const match of text.matchAll(VAR_REGEX)) found.add(match[1]);
  return [...found];
};