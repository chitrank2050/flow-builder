import { useState } from 'react';
import { BaseNode } from '../base/BaseNode';

type Props = {
  id: string;
  data?: {
    url?: string;
    method?: string;
    auth?: string;
  };
}

export default function ApiNode({ id, data }: Props) {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  const [auth, setAuth] = useState(data?.auth || 'None');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="⇄"
      badge="HTTP"
      accentColor="#F59E0B"
      inputs={[
        { id: 'body', label: 'body' },
        { id: 'headers', label: 'headers' },
      ]}
      outputs={[
        { id: 'response', label: 'response' },
        { id: 'status', label: 'status' },
      ]}
      fields={[
        {
          id: 'method',
          type: 'select',
          label: 'Method',
          value: method,
          options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          onChange: setMethod,
        },
        {
          id: 'url',
          type: 'text',
          label: 'URL',
          value: url,
          placeholder: 'https://api.example.com/endpoint',
          onChange: setUrl,
        },
        {
          id: 'auth',
          type: 'select',
          label: 'Auth',
          value: auth,
          options: ['None', 'Bearer Token', 'API Key', 'Basic Auth'],
          onChange: setAuth,
        },
      ]}
    />
  );
};