import type { SearchCityResponse, WeatherData } from '../types/weather.types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function getWeather(
  lat: number,
  lon: number,
  cityName: string,
  country: string,
): Promise<WeatherData> {
  const res = await fetch(
    `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode,precipitation&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
  );

  if (!res.ok) {
    const errorMsg = `Weather API error: ${res.status} ${res.statusText}`;
    console.error(errorMsg);
    throw new Error('Unable to retrieve weather data. Please try again later.');
  }

  const data = await res.json();

  // Transform the API response to our domain model (WeatherData)
  return {
    city: {
      name: cityName,
      country,
    },
    current: {
      temperature_2m: data.current.temperature_2m,
      relative_humidity_2m: data.current.relative_humidity_2m,
      wind_speed_10m: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
    },
    hourly: data.hourly.time.map((time: string, index: number) => ({
      dt: new Date(time).getTime() / 1000,
      temp: data.hourly.temperature_2m[index],
      weatherCode: data.hourly.weathercode[index],
    })),
    daily: data.daily.time.map((time: string, index: number) => ({
      dt: new Date(time).getTime() / 1000,
      temp: {
        min: data.daily.temperature_2m_min[index],
        max: data.daily.temperature_2m_max[index],
      },
      weathercode: data.daily.weathercode[index],
    })),
  };
}

export async function searchCity(query: string): Promise<SearchCityResponse> {
  if (!query.trim()) return { results: [] };

  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(query)}&count=5`);

  if (!res.ok) {
    throw new Error('City search failed. Please check your connection.');
  }

  return res.json();
}
