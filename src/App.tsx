// components
import { ReactFlowProvider } from '@xyflow/react'
import PipelineCanvas from './canvas/PipelineCanvas'
import SubmitButton from './canvas/SubmitButton'
import Toolbar from './canvas/Toolbar'

// import '../tailwind.config';

export default function App() {
  return (
    <ReactFlowProvider>
      <Toolbar />
      <PipelineCanvas />
      <SubmitButton />
    </ReactFlowProvider>
  )
}
