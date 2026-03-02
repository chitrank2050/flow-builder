import { useLayoutEffect, useRef, useState } from 'react';

type Dimensions = {
  width: number;
  height: number;
};

// Measures a hidden mirror element to get natural text dimensions.
// Returns { dims: { width, height }, mirrorRef }
export const useAutoResize = (
  text: string,
  minW = 200,
  minH = 60,
  maxW = 480
) => {
  const [dims, setDims] = useState<Dimensions>({
    width: minW,
    height: minH,
  });

  const mirrorRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = mirrorRef.current;
    if (!el) return;

    el.style.width = `${minW}px`;
    el.textContent = `${text}'\n`;

    const width = Math.min(Math.max(el.scrollWidth, minW), maxW);
    const height = Math.max(el.scrollHeight + 8, minH);

    setDims({ width, height });
  }, [text, minW, minH, maxW]);

  return { dims, mirrorRef };
};