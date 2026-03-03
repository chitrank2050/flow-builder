// canvas/SubmitButton.jsx
import { useState } from 'react';
import { usePipelineStore } from '../store/pipelineStore';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function SubmitButton() {
  const [status, setStatus] = useState<null | 'loading' | 'success' | 'error'>(null); // null | 'loading' | 'success' | 'error'
  const [result, setResult] = useState<null | { [key: string]: any }>(null);
  const getPipelineData = usePipelineStore((s) => s.getPipelineData);
  const nodes = usePipelineStore((s) => s.nodes);
  const edges = usePipelineStore((s) => s.edges);

  const handleSubmit = async () => {
    setStatus('loading');
    setResult(null);

    try {
      const { nodes, edges } = getPipelineData();

      const res = await fetch(`${API_BASE}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setResult(data);
      setStatus('success');
    } catch (err: any) {
      setResult({ error: err?.message });
      setStatus('error');
    }
  };

  return (
    <div className="submit-bar">
      <div className="status-text">
        <span className="status-dot" />
        {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
      </div>

      {status === 'success' && result && (
        <div className="submit-result success">
          ✓ {result.num_nodes ?? '?'} nodes · {result.num_edges ?? '?'} edges
          {result.is_dag ? ' · DAG ✓' : ''}
        </div>
      )}
      {status === 'error' && result && (
        <div className="submit-result error">
          ✗ {result.error}
        </div>
      )}

      <button
        type='submit'
        className={`submit-btn ${status === 'loading' ? 'loading' : ''}`}
        onClick={handleSubmit}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? '◌ Running...' : '▷ Run Pipeline'}
      </button>
    </div>
  );
}