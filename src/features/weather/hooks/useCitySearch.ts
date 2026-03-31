import { useState, useRef } from 'react';
import { searchCity } from '../services/weatherApi';
import type { City } from '../types/weather.types';

export function useCitySearch() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  async function fetchCities(query: string) {
    const requestId = ++requestIdRef.current;

    try {
      setLoading(true);

      const data = await searchCity(query);

      if (requestId === requestIdRef.current) {
        setCities(data.results || []);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }

  return { cities, loading, fetchCities };
}
