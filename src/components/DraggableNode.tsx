import { memo } from 'react'

type Props = {
  type: string
  label: string
  color: string
  icon: string
}

const DraggableNode = ({ type, label, color, icon }: Props) => {
  const onDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <button
      type="button"
      className="draggable-node"
      draggable
      onDragStart={onDragStart}
      aria-label={`Drag to add ${label}`}
      title={`Add ${label}`}
    >
      <span className="node-dot" style={{ background: color, boxShadow: `0 0 6px ${color}66` }} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, opacity: 0.5 }}>
        {icon}
      </span>
      {label}
    </button>
  )
}

export default memo(DraggableNode)
