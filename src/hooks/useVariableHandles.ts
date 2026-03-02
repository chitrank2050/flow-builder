import { useMemo } from 'react';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

// Returns a stable array of unique variable names found in text.
// e.g. "Hello {{name}}, you are {{age}}" → ['name', 'age']
export const useVariableHandles = (text: string) =>
  useMemo(() => {
    const found = new Set<string>();
    for (const match of text.matchAll(VAR_REGEX)) found.add(match[1]);
    return [...found];
  }, [text]);