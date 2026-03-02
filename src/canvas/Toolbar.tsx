// canvas/Toolbar.jsx

import { DraggableNode } from '../components/DraggableNode';
import { NODE_CATALOG } from '../nodes';

export default function Toolbar() {
  return (
    <div className="toolbar">
      <span className="toolbar-brand">PIPELINE</span>
      <div className="toolbar-sep" />
      <span className="toolbar-label">Nodes</span>
      <div className="toolbar-nodes">
        {NODE_CATALOG.map((node) => (
          <DraggableNode key={node.type} {...node} />
        ))}
      </div>
    </div>
  );
}