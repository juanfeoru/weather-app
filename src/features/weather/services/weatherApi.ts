import type { SearchCityResponse } from '../types/weather.types';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function getWeather(lat: number, lon: number) {
  const res = await fetch(
    `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode,precipitation&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch weather');
  }

  return res.json();
}

export async function searchCity(query: string): Promise<SearchCityResponse> {
  const res = await fetch(`${GEO_URL}?name=${query}&count=5`);

  if (!res.ok) {
    throw new Error('Failed to fetch city');
  }

  return res.json();
}
