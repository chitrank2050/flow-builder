import { type Metric, onCLS, onFCP, onINP, onLCP } from 'web-vitals';

declare function gtag(...args: unknown[]): void;

function sendToGoogleAnalytics({ name, delta, value, id }: Metric) {
  if (typeof gtag === 'undefined') return;

  gtag('event', name, {
    value: delta,
    metric_id: id,
    metric_value: value,
    metric_delta: delta,
  })
}

export default function reportWebVitals() {
  onCLS(sendToGoogleAnalytics)
  onFCP(sendToGoogleAnalytics)
  onINP(sendToGoogleAnalytics)
  onLCP(sendToGoogleAnalytics)
}