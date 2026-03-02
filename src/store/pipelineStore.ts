import { create } from 'zustand'

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from 'reactflow'

// Custom Node Data Type
export interface PipelineNodeData {
  [key: string]: unknown
}

// Store Type
interface PipelineState {
  nodes: Node<PipelineNodeData>[]
  edges: Edge[]
  nodeIDs: Record<string, number>

  getNodeID: (type: string) => string
  addNode: (node: Node<PipelineNodeData>) => void

  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void

  updateNodeField: (nodeId: string, field: string, value: any) => void

  getPipelineData: () => {
    nodes: Node<PipelineNodeData>[]
    edges: Edge[]
  }

  clearPipeline: () => void
}

// Store Implementation
export const usePipelineStore = create<PipelineState>((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const ids = {
      ...get().nodeIDs,
      [type]: (get().nodeIDs[type] ?? 0) + 1,
    }

    set({ nodeIDs: ids })
    return `${type}-${ids[type]}`
  },

  addNode: (node) =>
    set({
      nodes: [...get().nodes, node],
    }),

  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    }),

  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),

  onConnect: (connection) =>
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 18,
            height: 18,
          },
          style: {
            stroke: 'rgba(255,255,255,0.12)',
            strokeWidth: 1.5,
          },
        },
        get().edges
      ),
    }),

  updateNodeField: (nodeId, field, value) =>
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId
          ? {
            ...n,
            data: {
              ...n.data,
              [field]: value,
            },
          }
          : n
      ),
    }),

  getPipelineData: () => ({
    nodes: get().nodes,
    edges: get().edges,
  }),

  clearPipeline: () =>
    set({
      nodes: [],
      edges: [],
    }),
}))