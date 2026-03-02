import type { CSSProperties, ReactNode } from 'react';
import { Handle, Position } from 'reactflow';
import NodeField, { type BaseField } from './NodeField';

// Handle types
interface NodeHandle {
  id: string
  label?: string
  position?: string
}

// Component Props
interface BaseNodeProps {
  id: string
  title: string
  icon?: ReactNode
  badge?: ReactNode
  accentColor?: string
  inputs?: NodeHandle[]
  outputs?: NodeHandle[]
  fields?: BaseField[]
  infoText?: string
  children?: ReactNode
  style?: CSSProperties
}

// Base Node
export const BaseNode = ({
  id,
  title,
  icon,
  badge,
  accentColor = '#3B82F6',
  inputs = [],
  outputs = [],
  fields = [],
  infoText,
  children,
  style = {},
}: BaseNodeProps) => {
  const resolveTop = (arr: NodeHandle[], i: number) =>
    arr[i].position ?? `${((i + 1) / (arr.length + 1)) * 100}%`

  return (
    <div
      className="base-node"
      style={{ '--accent': accentColor, ...style } as CSSProperties}
    >
      <div className="node-accent-bar" style={{ background: accentColor }} />

      <div className="node-header">
        {icon && <span className="node-icon">{icon}</span>}
        <span className="node-title">{title}</span>
        {badge && <span className="node-badge">{badge}</span>}
      </div>

      {infoText && <p className="node-info">{infoText}</p>}

      {fields.length > 0 && (
        <div className="node-fields">
          {fields.map((field) => (
            <NodeField
              key={field.id}
              field={field}
              accentColor={accentColor}
            />
          ))}
        </div>
      )}

      {children && <div className="node-fields">{children}</div>}

      {/* Inputs */}
      {inputs.map((input, i) => {
        const top = resolveTop(inputs, i)
        return (
          <div key={input.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={{ top }}
            />
            {input.label && (
              <span className="handle-label handle-label-left" style={{ top }}>
                {input.label}
              </span>
            )}
          </div>
        )
      })}

      {/* Outputs */}
      {outputs.map((output, i) => {
        const top = resolveTop(outputs, i)
        return (
          <div key={output.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={{ top }}
            />
            {output.label && (
              <span
                className="handle-label handle-label-right"
                style={{ top }}
              >
                {output.label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}