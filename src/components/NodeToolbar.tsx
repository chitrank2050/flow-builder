import { NodeToolbar as NT } from '@xyflow/react';
import { memo, useCallback } from 'react';
import { useShallow } from 'zustand/shallow';
import { STORE_SELECTOR } from '../canvas/constants';
import { usePipelineStore } from '../store/pipelineStore';

interface Props {
  id: string
}

const NodeToolbar = ({ id }: Props) => {

  const store = usePipelineStore(useShallow(STORE_SELECTOR))

  const deleteNode = useCallback(() => {
    store.deleteNode(id)
  }, [store, id]);

  return (
    <NT className='[&>button]:rounded-full [&>button]:p-2 flex flex-wrap gap-4 text-sm'>
      <button
        onClick={deleteNode}
        type="button"
        className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded opacity-75 cursor-pointer">
        Delete
      </button>
    </NT>
  );
}

export default memo(NodeToolbar);