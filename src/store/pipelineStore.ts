import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from '@xyflow/react'
import { create } from 'zustand'
import type { PipelineNode } from '../nodes'

// Store Type
interface PipelineState {
  nodes: PipelineNode[]
  edges: Edge[]
  nodeIDs: Record<string, number>
  getNodeID: (type: PipelineNode['type']) => string
  addNode: (node: PipelineNode) => void
  deleteNode: (id: string) => void
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
  updateNodeField: (nodeId: string, field: string, value: unknown) => void
  getPipelineData: () => { nodes: PipelineNode[]; edges: Edge[] }
  clearPipeline: () => void
}

// Store Implementation
export const usePipelineStore = create<PipelineState>((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const count = (get().nodeIDs[type] ?? 0) + 1
    set((state) => ({ nodeIDs: { ...state.nodeIDs, [type]: count } }))
    return `${type}-${count}`
  },

  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),

  deleteNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
      edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
    })),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes) as PipelineNode[],
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          type: 'custom' as const,
          data: { label: `${connection.source} → ${connection.target}` },
        },
        state.edges
      ),
    })),

  updateNodeField: (nodeId, field, value) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id !== nodeId ? n : ({ ...n, data: { ...n.data, [field]: value } } as PipelineNode)
      ),
    })),

  getPipelineData: () => ({ nodes: get().nodes, edges: get().edges }),

  clearPipeline: () => set({ nodes: [], edges: [] }),
}))
