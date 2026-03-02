import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// components
import PipelineCanvas from './canvas/PipelineCanvas';
import SubmitButton from './canvas/SubmitButton';
import Toolbar from './canvas/Toolbar';

export default function App() {
  const isProduction = import.meta.env.PROD;

  return (
    <>
      <Toolbar />
      <PipelineCanvas />
      <SubmitButton />
      {isProduction && (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      )}
    </>
  );
}