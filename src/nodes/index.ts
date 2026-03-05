import type { NodeTypes } from '@xyflow/react';
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
  output: OutputNodeType
  api: ApiNodeType
  llm: LLMNodeType
  text: TextNodeType
  transform: TransformNodeType
  condition: ConditionNodeType
  filter: FilterNodeType
  note: NoteNodeType
}

export const NODE_CATALOG = [
  { type: 'input', label: 'Input', color: '#06B6D4', icon: '→', component: InputNode },
  { type: 'output', label: 'Output', color: '#10B981', icon: '←', component: OutputNode },
  { type: 'llm', label: 'LLM', color: '#8B5CF6', icon: '✦', component: LLMNode },
  { type: 'text', label: 'Text', color: '#3B82F6', icon: 'T', component: TextNode },
  { type: 'api', label: 'API', color: '#F59E0B', icon: '⇄', component: ApiNode },
  { type: 'transform', label: 'Transform', color: '#EC4899', icon: '⟳', component: TransformNode },
  { type: 'condition', label: 'Condition', color: '#EF4444', icon: '⑂', component: ConditionNode },
  { type: 'filter', label: 'Filter', color: '#EAB308', icon: '⊟', component: FilterNode },
  { type: 'note', label: 'Note', color: '#64748B', icon: '✎', component: NoteNode },
] as const;

export type NodeType = typeof NODE_CATALOG[number]['type'];


type ExtractNodeData<T> =
  T extends React.ComponentType<infer P>
  ? P extends { data: infer D }
  ? D
  : never
  : never;

export const CANVAS_NODE_TYPES: NodeTypes = Object.fromEntries(
  NODE_CATALOG.map(n => [n.type, n.component])
);

export type PipelineNode =
  ExtractNodeData<typeof NODE_CATALOG[number]['component']>;