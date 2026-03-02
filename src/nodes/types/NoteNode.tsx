import { useState } from 'react';
import { BaseNode } from '../base/BaseNode';

type Props = {
  id: string;
  data?: {
    text?: string;
  };
}

export default function NoteNode({ id, data }: Props) {
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