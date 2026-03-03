import { NodeToolbar as NT, type NodeToolbarProps } from '@xyflow/react';
import { memo } from 'react';

interface Props extends Pick<NodeToolbarProps, 'isVisible'> { }

const NodeToolbar = ({ isVisible }: Props) => {
  return (
    <NT
      isVisible={isVisible || undefined}
    >
      <button type="button" className="xy-theme__button">Copy Node</button>
      <button type="button" className="xy-theme__button">Delete Node</button>
    </NT>
  );
}

export default memo(NodeToolbar);