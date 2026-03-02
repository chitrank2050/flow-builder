import type { Node } from '@xyflow/react'

export type InputNodeData = { inputName?: string; inputType?: string }
export type OutputNodeData = { outputName?: string; outputType?: string }
export type LLMNodeData = { model?: string; temperature?: string }
export type TextNodeData = { text?: string }
export type ApiNodeData = { url?: string; method?: string; auth?: string }
export type TransformNodeData = { fn?: string; lang?: string }
export type ConditionNodeData = { condition?: string }
export type FilterNodeData = { filter?: string }
export type NoteNodeData = { note?: string }

// Map each node type to its data
export interface NodeDataMap {
  input: InputNodeData
  output: OutputNodeData
  llm: LLMNodeData
  text: TextNodeData
  api: ApiNodeData
  transform: TransformNodeData
  condition: ConditionNodeData
  filter: FilterNodeData
  note: NoteNodeData
}

// PipelineNode union for store
export type PipelineNode = {
  [K in keyof NodeDataMap]: Node<NodeDataMap[K], K>
}[keyof NodeDataMap]