import type { NodeProps } from '@xyflow/react';
import ApiNode, { type ApiNode as ApiNodeType } from './types/ApiNode';
import ConditionNode, { type ConditionNode as ConditionNodeType } from './types/ConditionNode';
import FilterNode, { type FilterNode as FilterNodeType } from './types/FilterNode';
import InputNode, { type InputNode as InputNodeType } from './types/InputNode';
import LLMNode, { type LLMNode as LLMNodeType } from './types/LlmNode';
import NoteNode, { type NoteNode as NoteNodeType } from './types/NoteNode';
import OutputNode, { type OutputNode as OutputNodeType } from './types/OutputNode';
import TextNode, { type TextNode as TextNodeType } from './types/TextNode';
import TransformNode, { type TransformNode as TransformNodeType } from './types/TransformNode';

export interface NODE_MAP {
  inputNode: InputNodeType
  apiNode: ApiNodeType
  outputNode: OutputNodeType
  llmNode: LLMNodeType
  textNode: TextNodeType
  transformNode: TransformNodeType
  conditionNode: ConditionNodeType
  filterNode: FilterNodeType
  noteNode: NoteNodeType
}

export const nodeTypes: {
  [K in keyof NODE_MAP]: React.ComponentType<NodeProps<NODE_MAP[K]>>
} = {
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
  textNode: TextNode,
  apiNode: ApiNode,
  transformNode: TransformNode,
  conditionNode: ConditionNode,
  filterNode: FilterNode,
  noteNode: NoteNode,
}


export const NODE_CATALOG: {
  type: keyof NODE_MAP
  label: string
  color: string
  icon: string
}[] = [
    { type: 'inputNode', label: 'Input', color: '#06B6D4', icon: '→' },
    { type: 'outputNode', label: 'Output', color: '#10B981', icon: '←' },
    { type: 'llmNode', label: 'LLM', color: '#8B5CF6', icon: '✦' },
    { type: 'textNode', label: 'Text', color: '#3B82F6', icon: 'T' },
    { type: 'apiNode', label: 'API', color: '#F59E0B', icon: '⇄' },
    { type: 'transformNode', label: 'Transform', color: '#EC4899', icon: '⟳' },
    { type: 'conditionNode', label: 'Condition', color: '#EF4444', icon: '⑂' },
    { type: 'filterNode', label: 'Filter', color: '#EAB308', icon: '⊟' },
    { type: 'noteNode', label: 'Note', color: '#64748B', icon: '✎' },
  ]

export type PipelineNode = {
  [K in keyof NODE_MAP]: NODE_MAP[K]
}[keyof NODE_MAP]