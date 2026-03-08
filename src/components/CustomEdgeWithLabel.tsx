import { BaseEdge, EdgeLabelRenderer, getBezierPath, type Position } from '@xyflow/react'
import { memo } from 'react'

type Props = {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition?: Position
  targetPosition: Position
  data: {
    label: string
  }
}

const CustomEdgeWithLabel = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: Props) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="edge-label-renderer__custom-edge nodrag nopan"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default memo(CustomEdgeWithLabel)
