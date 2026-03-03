import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  isNode,
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

  updateNodeField: <
    T extends PipelineNode['type'],
    K extends keyof Extract<PipelineNode, { type: T }>['data']
  >(
    nodeId: string,
    field: K,
    value: Extract<PipelineNode, { type: T }>['data'][K]
  ) => void

  getPipelineData: () => { nodes: PipelineNode[]; edges: Edge[] }
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
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  deleteNode: (nodeId: string) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
      edges: state.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      ),
    })),

  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes).filter(isNode) as PipelineNode[],
    }),

  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),

  onConnect: (connection) => set((state) => ({
    edges: addEdge(
      {
        ...connection,
        data: {
          label: `${connection.source} → ${connection.target}`,
        },
        type: 'custom',
      },
      state.edges
    ),
  })),

  updateNodeField: <T extends PipelineNode['type'], K extends keyof Extract<PipelineNode, { type: T }>['data']>(
    nodeId: string,
    field: K,
    value: Extract<PipelineNode, { type: T }>['data'][K]
  ) =>
    set((state) => ({
      nodes: state.nodes.map((n) => {
        if (n.id !== nodeId) return n

        // Narrow node type
        const typedNode = n as Extract<PipelineNode, { type: T }>

        return {
          ...typedNode,
          data: {
            ...typedNode.data,
            [field]: value,
          },
        }
      }),
    })),

  getPipelineData: () => ({ nodes: get().nodes, edges: get().edges }),

  clearPipeline: () =>
    set({ nodes: [], edges: [] }),
}))