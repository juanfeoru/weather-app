import WeatherPage from '../pages/WeatherPage';
import { UnitsProvider } from '../context/UnitsProvider';

function App() {

  return (
    <UnitsProvider>
      <WeatherPage />
    </UnitsProvider>
  );
}

export default App;
