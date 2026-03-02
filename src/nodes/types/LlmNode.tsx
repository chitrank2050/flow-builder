// nodes/types/LLMNode.jsx
import { useState } from 'react';
import { BaseNode } from '../base/BaseNode';

type Props = {
  id: string;
  data?: {
    model?: string;
    temperature?: string;
  };
}


export default function LLMNode({ id, data }: Props) {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  const [temperature, setTemperature] = useState(data?.temperature || '0.7');

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="✦"
      badge="AI"
      accentColor="#8B5CF6"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
      fields={[
        {
          id: 'model',
          type: 'select',
          label: 'Model',
          value: model,
          options: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo', 'claude-3-5-sonnet', 'claude-3-haiku', 'gemini-1.5-pro'],
          onChange: setModel,
        },
        {
          id: 'temperature',
          type: 'number',
          label: 'Temperature',
          value: temperature,
          placeholder: '0.0 – 2.0',
          onChange: setTemperature,
        },
      ]}
    />
  );
};