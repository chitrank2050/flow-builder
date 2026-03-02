// nodes/types/InputNode.jsx
import { useState } from 'react';
import { BaseNode } from '../base/BaseNode';

type Props = {
  id: string;
  data?: {
    inputName?: string;
    inputType?: string;
  };
}

export default function InputNode({ id, data }: Props) {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="→"
      accentColor="#06B6D4"
      outputs={[{ id: 'value', label: 'value' }]}
      fields={[
        {
          id: 'name',
          type: 'text',
          label: 'Name',
          value: name,
          placeholder: 'input_name',
          onChange: setName,
        },
        {
          id: 'type',
          type: 'select',
          label: 'Type',
          value: inputType,
          options: ['Text', 'File', 'Number', 'Boolean'],
          onChange: setInputType,
        },
      ]}
    />
  );
};