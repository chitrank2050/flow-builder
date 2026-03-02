import type { Node, NodeProps } from '@xyflow/react';
import { useState } from 'react';
import { BaseNode } from '../base/BaseNode';

type TransformNodeData = {
  fn?: string;
  lang?: string;
}

export type TransformNode = Node<TransformNodeData, 'transform'>

export default function TransformNode({ id, data }: NodeProps<TransformNode>) {
  const [fn, setFn] = useState(data?.fn || 'data => data');
  const [lang, setLang] = useState(data?.lang || 'JavaScript');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⟳"
      accentColor="#EC4899"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
      fields={[
        {
          id: 'lang',
          type: 'select',
          label: 'Language',
          value: lang,
          options: ['JavaScript', 'Python', 'JSONPath', 'Regex'],
          onChange: setLang,
        },
        {
          id: 'fn',
          type: 'textarea',
          label: 'Expression',
          value: fn,
          placeholder: 'data => data',
          rows: 3,
          onChange: setFn,
        },
      ]}
    />
  );
};