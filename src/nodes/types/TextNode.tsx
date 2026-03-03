import type { Node, NodeProps } from '@xyflow/react';
import { useCallback, useState } from 'react';

// components/hooks
import { useAutoResize } from '../../hooks/useAutoResize';
import { useVariableHandles } from '../../hooks/useVariableHandles';
import { BaseNode } from '../base/BaseNode';

const ACCENT = '#3B82F6';

type TextNodeData = {
  text?: string;
};

export type TextNode = Node<TextNodeData, 'textNode'>;

export default function TextNode({ id, data }: NodeProps<TextNode>) {
  const [text, setText] = useState<string>(data?.text ?? '{{input}}');

  // parse variables and configure handles
  const variables = useVariableHandles(text);

  const inputHandles = variables.map((v) => ({
    id: v,
    label: v,
  }));

  const { dims, mirrorRef } = useAutoResize(text, 200, 72);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="T"
      accentColor={ACCENT}
      inputs={inputHandles}
      outputs={[
        { id: 'text-output', label: 'output' }
      ]}
      style={{ width: dims.width + 28 }}
    >
      <div className="node-field">
        <span className="field-label">Content</span>
        <textarea
          className="field-textarea"
          value={text}
          onChange={handleChange}
          placeholder="Type text or use {{variable}}"
          style={{
            width: dims.width,
            height: dims.height,
            '--accent': ACCENT,
          } as React.CSSProperties}
        />
      </div>

      {variables.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {variables.map((v) => (
            <span
              key={v}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                padding: '2px 7px',
                borderRadius: 3,
                background: 'rgba(59,130,246,0.1)',
                color: '#93C5FD',
                border: '1px solid rgba(59,130,246,0.2)',
                letterSpacing: '0.04em',
              }}
            >
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}

      {/* invisible mirror used for sizing */}
      <div
        ref={mirrorRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          lineHeight: 1.55,
          padding: '5px 8px',
          overflow: 'hidden',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
    </BaseNode>
  );
};
