// nodes/types/OutputNode.jsx
import { useState } from 'react';
import { BaseNode } from '../base/BaseNode';


type Props = {
  id: string;
  data?: {
    outputName?: string;
    outputType?: string;
  };
}


export default function OutputNode({ id, data }: Props) {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="←"
      accentColor="#10B981"
      inputs={[{ id: 'value', label: 'value' }]}
      fields={[
        {
          id: 'name',
          type: 'text',
          label: 'Name',
          value: name,
          placeholder: 'output_name',
          onChange: setName,
        },
        {
          id: 'type',
          type: 'select',
          label: 'Type',
          value: outputType,
          options: ['Text', 'Image', 'JSON', 'File'],
          onChange: setOutputType,
        },
      ]}
    />
  );
};