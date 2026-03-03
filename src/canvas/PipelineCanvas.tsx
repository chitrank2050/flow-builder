import { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
  type ReactFlowInstance,
  type XYPosition,
  MarkerType,
} from '@xyflow/react'
import { useShallow } from 'zustand/shallow'

import { nodeTypes, type PipelineNode } from '../nodes'
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

      const { nodeType } = JSON.parse(raw) as { nodeType?: PipelineNode['type'] }

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
      } as PipelineNode)
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
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 18,
            height: 18,
          },
          style: {
            stroke: 'rgba(255,255,255,0.12)',
            strokeWidth: 1.5,
          },
          labelStyle: {
            fill: 'rgba(255,255,255,0.8)',
            fontWeight: 500,
            fontSize: 12,
          },
        }}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
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