import { useUpdateNodeInternals } from '@xyflow/react';
import { useEffect } from 'react';

/**
 * Simple helper that invokes `updateNodeInternals(id)` whenever `deps` change.
 *
 * This abstracts the pattern of calling the React Flow hook from within a node
 * component so you don't have to repeat the effect every time.
 *
 * @param id - the node id whose internals should be refreshed
 * @param deps - additional dependencies that should trigger an update.  Common
 *               examples are the number of handles or the node dimensions.
 */
export function useUpdateNodeInternalsEffect(
  id: string,
  deps: readonly unknown[] = []
) {
  const update = useUpdateNodeInternals();

  useEffect(() => {
    if (!id) return;
    update(id);
  }, [id, update, ...deps]);
}
