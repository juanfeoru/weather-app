import { useState } from 'react';
import { getWeather } from '../services/weatherApi';
import type { WeatherData, LastSearch } from '../types/weather.types';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCity, setLastCity] = useState<LastSearch | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function fetchWeather(
    lat: number,
    lon: number,
    cityName: string,
    country: string,
  ) {
    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);

      const data = await getWeather(lat, lon);

      if (!data) {
        setWeather(null);
        return;
      }

      const hourlyData = data.hourly.time.map((time: string, i: number) => ({
        dt: new Date(time).getTime() / 1000,
        temp: data.hourly.temperature_2m[i],
        weatherCode: data.hourly.weathercode[i],
      }));

      const dailyData = data.daily.time.map((t: number, i: number) => ({
        dt: new Date(t).getTime() / 1000,
        temp: {
          max: data.daily.temperature_2m_max[i],
          min: data.daily.temperature_2m_min[i],
        },
        weatherCode: data.daily.weathercode[i],
      }));

      setWeather({
        city: { name: cityName, country },
        current: data.current,
        hourly: hourlyData,
        daily: dailyData,
      });

      setLastCity({ lat, lon, cityName, country });
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { weather, loading, error, fetchWeather, lastCity, hasSearched };
}
