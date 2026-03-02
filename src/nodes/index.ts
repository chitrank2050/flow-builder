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
  input: InputNodeType
  api: ApiNodeType
  output: OutputNodeType
  llm: LLMNodeType
  text: TextNodeType
  transform: TransformNodeType
  condition: ConditionNodeType
  filter: FilterNodeType
  note: NoteNodeType
}

export const nodeTypes: {
  [K in keyof NODE_MAP]: React.ComponentType<any>
} = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  api: ApiNode,
  transform: TransformNode,
  condition: ConditionNode,
  filter: FilterNode,
  note: NoteNode,
}


export const NODE_CATALOG: {
  type: keyof NODE_MAP
  label: string
  color: string
  icon: string
}[] = [
    { type: 'input', label: 'Input', color: '#06B6D4', icon: '→' },
    { type: 'input', label: 'Output', color: '#10B981', icon: '←' },
    { type: 'llm', label: 'LLM', color: '#8B5CF6', icon: '✦' },
    { type: 'text', label: 'Text', color: '#3B82F6', icon: 'T' },
    { type: 'api', label: 'API', color: '#F59E0B', icon: '⇄' },
    { type: 'transform', label: 'Transform', color: '#EC4899', icon: '⟳' },
    { type: 'condition', label: 'Condition', color: '#EF4444', icon: '⑂' },
    { type: 'filter', label: 'Filter', color: '#EAB308', icon: '⊟' },
    { type: 'note', label: 'Note', color: '#64748B', icon: '✎' },
  ]

export type PipelineNode = {
  [K in keyof NODE_MAP]: NODE_MAP[K]
}[keyof NODE_MAP]