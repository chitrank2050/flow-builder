import type { DefaultEdgeOptions, EdgeTypes, ProOptions, SnapGrid } from '@xyflow/react';
import { MarkerType } from '@xyflow/react';

import CustomEdgeWithLabel from '../components/CustomEdgeWithLabel';
import type { usePipelineStore } from '../store/pipelineStore';

// edge type mapping for the main application canvas; kept at module scope so
// it isn't re‑created on every render of <PipelineCanvas />.
export const APPLICATION_CANVAS_EDGES: EdgeTypes = {
  custom: CustomEdgeWithLabel,
};

// shared default options used when creating new edges.  exported so tests or
// other modules can reference the same values.
export const DEFAULT_EDGE_OPTIONS: DefaultEdgeOptions = {
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
};


export const PRO_OPTIONS: ProOptions = { hideAttribution: true }

export const SNAP_GRID: SnapGrid = [16, 16]

/* ========================= */

export const STORE_SELECTOR = (s: ReturnType<typeof usePipelineStore.getState>) => ({
  nodes: s.nodes,
  edges: s.edges,
  getNodeID: s.getNodeID,
  addNode: s.addNode,
  onNodesChange: s.onNodesChange,
  onEdgesChange: s.onEdgesChange,
  onConnect: s.onConnect
})
