import type { Node, NodeProps } from '@xyflow/react';
import { useState } from 'react';
import { BaseNode } from '../base/BaseNode';

type NoteNodeData = {
  text?: string;
}

export type NoteNode = Node<NoteNodeData, 'noteNode'>

export default function NoteNode({ id, data }: NodeProps<NoteNode>) {
  const [text, setText] = useState(data?.text || 'Add a note...');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="✎"
      accentColor="#EAB308"
      inputs={[{ id: 'input', label: 'input' }]}
      fields={[
        {
          id: 'note',
          type: 'textarea',
          label: 'Node',
          value: text,
          onChange: setText,
          placeholder: "Add a note..."
        },
      ]}
    />
  );
};