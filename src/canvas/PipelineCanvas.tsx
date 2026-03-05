import {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
  type ReactFlowInstance,
  type XYPosition,
} from '@xyflow/react'
import { useCallback, useRef, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import { CANVAS_NODE_TYPES, type PipelineNode } from '../nodes'
import { usePipelineStore } from '../store/pipelineStore'

import {
  APPLICATION_CANVAS_EDGES,
  DEFAULT_EDGE_OPTIONS,
  PRO_OPTIONS,
  SNAP_GRID,
  STORE_SELECTOR,
} from './constants';

export default function PipelineCanvas() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const [rfInstance, setRfInstance] =
    useState<ReactFlowInstance | null>(null)

  const store = usePipelineStore(useShallow(STORE_SELECTOR))

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
        nodeTypes={CANVAS_NODE_TYPES}
        edgeTypes={APPLICATION_CANVAS_EDGES}
        proOptions={PRO_OPTIONS}
        snapGrid={SNAP_GRID}
        snapToGrid
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
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