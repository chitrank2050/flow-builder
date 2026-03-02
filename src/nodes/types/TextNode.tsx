import { useCallback, useState, } from 'react';
import { Handle, type NodeProps, Position } from 'reactflow';

// hooks
import { useAutoResize } from '../../hooks/useAutoResize';
import { useVariableHandles } from '../../hooks/useVariableHandles';

const ACCENT = '#3B82F6';

type TextNodeData = {
  text?: string;
};

export default function TextNode({ id, data }: NodeProps<TextNodeData>) {
  const [text, setText] = useState<string>(data?.text ?? '{{input}}');

  // Extract unique variables
  const variables = useVariableHandles(text);

  const { dims, mirrorRef } = useAutoResize(text, 200, 72);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  return (
    <div
      className="base-node"
      style={
        {
          '--accent': ACCENT,
          width: dims.width + 28,
        } as React.CSSProperties
      }
    >
      <div className="node-accent-bar" style={{ background: ACCENT }} />

      <div className="node-header">
        <span className="node-icon">T</span>
        <span className="node-title">Text</span>
      </div>

      <div className="node-fields" style={{ paddingBottom: 12 }}>
        <div className="node-field">
          <span className="field-label">Content</span>
          <textarea
            className="field-textarea"
            value={text}
            onChange={handleChange}
            placeholder="Type text or use {{variable}}"
            style={
              {
                width: dims.width,
                height: dims.height,
                '--accent': ACCENT,
              } as React.CSSProperties
            }
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
      </div>

      {/* Hidden mirror */}
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

      {/* Dynamic target handles */}
      {variables.map((v, i) => {
        const top = `${((i + 1) / (variables.length + 1)) * 100}%`;

        return (
          <div key={v}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${v}`}
              style={{ top, background: '#06B6D4' }}
            />
            <span
              className="handle-label handle-label-left"
              style={{ top }}
            >
              {v}
            </span>
          </div>
        );
      })}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%', background: '#10B981' }}
      />
    </div>
  );
};