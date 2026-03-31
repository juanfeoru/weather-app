import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getWeather } from '../services/weatherApi';
import type { WeatherData, LastSearch } from '../types/weather.types';

const STORAGE_KEY = 'weather-app-last-city';

export function useWeather() {
  const [lastCity, setLastCity] = useState<LastSearch | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error('Error reading from localStorage', err);
      return null;
    }
  });

  const {
    data: weather,
    isLoading: loading,
    isError,
    error,
  } = useQuery<WeatherData | null, Error>({
    queryKey: ['weather', lastCity?.lat, lastCity?.lon],
    queryFn: () => {
      if (!lastCity) return null;
      return getWeather(
        lastCity.lat,
        lastCity.lon,
        lastCity.cityName,
        lastCity.country,
      );
    },
    enabled: !!lastCity,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  useEffect(() => {
    if (lastCity) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lastCity));
    }
  }, [lastCity]);

  const fetchWeather = (
    lat: number,
    lon: number,
    cityName: string,
    country: string,
  ) => {
    setLastCity({ lat, lon, cityName, country });
  };

  return {
    weather,
    loading,
    error: isError ? error?.message || 'Failed to fetch weather' : null,
    fetchWeather,
    lastCity,
  };
}