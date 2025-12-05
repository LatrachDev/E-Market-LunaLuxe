import './App.css';
import './index.css';
import { lazy, Suspense } from 'react';

// Lazy load components
const RoutesList = lazy(() => import('./Routes/Routes'));
const SmoothFollower = lazy(() => import('./components/SmoothFollower'));

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-brandRed border-r-transparent"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SmoothFollower />
      <RoutesList />
    </Suspense>
  );
}

export default App;
