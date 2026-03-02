import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  isNode,
  MarkerType,
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

  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes).filter(isNode) as PipelineNode[],
    }),

  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
          style: { stroke: 'rgba(255,255,255,0.12)', strokeWidth: 1.5 },
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