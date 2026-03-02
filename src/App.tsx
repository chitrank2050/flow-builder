// components
import PipelineCanvas from './canvas/PipelineCanvas';
import SubmitButton from './canvas/SubmitButton';
import Toolbar from './canvas/Toolbar';

export default function App() {
  return (
    <>
      <Toolbar />
      <PipelineCanvas />
      <SubmitButton />
    </>
  );
}