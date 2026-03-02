// nodes/types/FilterNode.jsx
import { useState } from 'react';
import { BaseNode } from '../base/BaseNode';

type Props = {
  id: string;
  data?: {
    field?: string;
    op?: string;
    value?: string;
  }
}

export default function FilterNode({ id, data }: Props) {
  const [field, setField] = useState(data?.field || '');
  const [op, setOp] = useState(data?.op || 'equals');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="⊟"
      accentColor="#EAB308"
      inputs={[{ id: 'list', label: 'list' }]}
      outputs={[
        { id: 'matched', label: 'matched' },
        { id: 'unmatched', label: 'unmatched' },
      ]}
      fields={[
        {
          id: 'field',
          type: 'text',
          label: 'Field',
          value: field,
          placeholder: 'e.g. status',
          onChange: setField,
        },
        {
          id: 'op',
          type: 'select',
          label: 'Operator',
          value: op,
          options: [
            { value: 'equals', label: '= Equals' },
            { value: 'not_equals', label: '≠ Not Equals' },
            { value: 'contains', label: '⊃ Contains' },
            { value: 'greater_than', label: '> Greater Than' },
            { value: 'less_than', label: '< Less Than' },
          ],
          onChange: setOp,
        },
        {
          id: 'value',
          type: 'text',
          label: 'Value',
          value,
          placeholder: 'compare value',
          onChange: setValue,
        },
      ]}
    />
  );
};