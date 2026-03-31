import PageLayout from '../components/layout/PageLayout';
import SearchBar from '../features/weather/components/SearchBar';
import WeatherCard from '../features/weather/components/WeatherCard';
import CardLoading from '../components/ui/CardLoading';
import HourlyForecast from '../features/weather/components/HourlyForecast';
import DailyForecast from '../features/weather/components/DailyForecast';
import WeatherStats from '../features/weather/components/WeatherStats';
import { useWeather } from '../features/weather/hooks/useWeather';
import ErrorCard from '../features/weather/components/ErrorCard';

export default function WeatherPage() {
  const { weather, loading, error, fetchWeather, lastCity } = useWeather();

  return (
    <PageLayout>
      <section className='text-center space-y-6 mb-12'>
        <h1 className='font-bricolage font-bold text-5xl text-white text-balance'>
          How's the sky looking today?
        </h1>
        <SearchBar onSearch={fetchWeather} />
      </section>

      {error && (
        <ErrorCard
          onRetry={() =>
            lastCity &&
            fetchWeather(
              lastCity.lat,
              lastCity.lon,
              lastCity.cityName,
              lastCity.country,
            )
          }
        />
      )}

      {loading && (
        <section className='grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start max-w-7xl mx-auto'>
          <div className='grid gap-6'>
            <CardLoading />
            <WeatherStats weather={null} />
            <DailyForecast />
          </div>

          <div className='md:w-86 shrink-0'>
            <HourlyForecast />
          </div>
        </section>
      )}

      {!loading && !error && weather && (
        <section className='grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start max-w-7xl mx-auto'>
          <div className='grid gap-6'>
            <WeatherCard weather={weather} />
            <WeatherStats weather={weather} />
            <DailyForecast data={weather.daily} />
          </div>

          <div className='md:w-86 shrink-0'>
            <HourlyForecast data={weather.hourly} />
          </div>
        </section>
      )}
    </PageLayout>
  );
}
