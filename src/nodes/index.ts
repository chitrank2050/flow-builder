import ApiNode from './types/ApiNode';
import ConditionNode from './types/ConditionNode';
import FilterNode from './types/FilterNode';
import InputNode from './types/InputNode';
import LLMNode from './types/LlmNode';
import NoteNode from './types/NoteNode';
import OutputNode from './types/OutputNode';
import TextNode from './types/TextNode';
import TransformNode from './types/TransformNode';

// Passed directly to ReactFlow's nodeTypes prop
export const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  api: ApiNode,
  transform: TransformNode,
  condition: ConditionNode,
  filter: FilterNode,
  note: NoteNode,
};

export const NODE_CATALOG = [
  { type: 'customInput', label: 'Input', color: '#06B6D4', icon: '→' },
  { type: 'customOutput', label: 'Output', color: '#10B981', icon: '←' },
  { type: 'llm', label: 'LLM', color: '#8B5CF6', icon: '✦' },
  { type: 'text', label: 'Text', color: '#3B82F6', icon: 'T' },
  { type: 'api', label: 'API', color: '#F59E0B', icon: '⇄' },
  { type: 'transform', label: 'Transform', color: '#EC4899', icon: '⟳' },
  { type: 'condition', label: 'Condition', color: '#EF4444', icon: '⑂' },
  { type: 'filter', label: 'Filter', color: '#EAB308', icon: '⊟' },
  { type: 'note', label: 'Note', color: '#64748B', icon: '✎' },
];