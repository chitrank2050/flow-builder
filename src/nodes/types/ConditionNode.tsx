import type { Node, NodeProps } from '@xyflow/react'
import { useState } from 'react'
import { BaseNode } from '../base/BaseNode'

type ConditionNodeData = {
  condition?: string
  operator?: string
}

export type ConditionNode = Node<ConditionNodeData, 'conditionNode'>

export default function ConditionNode({ id, data }: NodeProps<ConditionNode>) {
  const [condition, setCondition] = useState(data?.condition || 'value > 0')
  const [operator, setOperator] = useState(data?.operator || 'JS Expression')

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="⑂"
      accentColor="#EF4444"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[
        { id: 'true', label: 'true' },
        { id: 'false', label: 'false' },
      ]}
      fields={[
        {
          id: 'operator',
          type: 'select',
          label: 'Type',
          value: operator,
          options: ['JS Expression', 'Contains', 'Equals', 'Is Empty', 'Greater Than', 'Less Than'],
          onChange: setOperator,
        },
        {
          id: 'condition',
          type: 'text',
          label: 'Condition',
          value: condition,
          placeholder: 'value > 0',
          onChange: setCondition,
        },
      ]}
    />
  )
}
