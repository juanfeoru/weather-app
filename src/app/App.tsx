import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';
import WeatherPage from '../pages/WeatherPage';
import { UnitsProvider } from '../context/UnitsProvider';
import ErrorBoundary from '../components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UnitsProvider>
          <WeatherPage />
        </UnitsProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
