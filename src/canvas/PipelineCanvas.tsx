import { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
  type Node,
  type ReactFlowInstance,
  type XYPosition,
} from '@xyflow/react'
import { useShallow } from 'zustand/shallow'

import { nodeTypes } from '../nodes'
import { usePipelineStore } from '../store/pipelineStore'

import '@xyflow/react/dist/style.css';

/* ========================= */

const proOptions = { hideAttribution: true }
const snapGrid: [number, number] = [16, 16]

/* ========================= */

const selector = (s: ReturnType<typeof usePipelineStore.getState>) => ({
  nodes: s.nodes,
  edges: s.edges,
  getNodeID: s.getNodeID,
  addNode: s.addNode,
  onNodesChange: s.onNodesChange,
  onEdgesChange: s.onEdgesChange,
  onConnect: s.onConnect,
})

/* ========================= */

export default function PipelineCanvas() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const [rfInstance, setRfInstance] =
    useState<ReactFlowInstance | null>(null)

  const store = usePipelineStore(useShallow(selector))

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()

      if (!rfInstance || !wrapperRef.current) return

      const raw = e.dataTransfer.getData('application/reactflow')
      if (!raw) return

      const { nodeType } = JSON.parse(raw) as { nodeType?: string }

      if (!nodeType) return

      const bounds = wrapperRef.current.getBoundingClientRect()

      const position: XYPosition = rfInstance.screenToFlowPosition({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      })

      const id = store.getNodeID(nodeType)

      store.addNode({
        id,
        type: nodeType,
        position,
        data: { id, nodeType },
      } as Node)
    },
    [rfInstance, store]
  )

  const onDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    },
    []
  )

  return (
    <div ref={wrapperRef} className="canvas-wrapper">
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setRfInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={snapGrid}
        snapToGrid
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: 'rgba(255,255,255,0.12)',
            strokeWidth: 1.5,
          },
        }}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="rgba(255,255,255,0.07)"
        />
        <Controls />
        <MiniMap
          nodeColor={() => 'rgba(255,255,255,0.08)'}
          maskColor="rgba(6,8,15,0.6)"
        />
      </ReactFlow>
    </div>
  )
}