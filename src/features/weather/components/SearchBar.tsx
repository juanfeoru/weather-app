import { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useCitySearch } from '../hooks/useCitySearch';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import type { CitySearch } from '../types/weather.types';

type Props = {
  onSearch: (lat: number, lon: number, name: string, country: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const { cities, fetchCities } = useCitySearch();

  function handleSearch() {
    if (!cities.length) return;

    const city = cities[0];

    onSearch(city.latitude, city.longitude, city.name, city.country);
  }

  function handleSelectCity(city: CitySearch) {
    setQuery(`${city.name}, ${city.country}`);

    onSearch(city.latitude, city.longitude, city.name, city.country);

    setIsOpen(false);
  }

  const showDropdown = isOpen && debouncedQuery;

  const results = cities.slice(0, 5);

  useEffect(() => {
    if (debouncedQuery.length < 2) return;
    fetchCities(debouncedQuery);
  }, [debouncedQuery, fetchCities]);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-3 max-w-xl mx-auto'>
        <div className='relative w-full'>
          <Input
            placeholder='Search for a place...'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
          />

          {showDropdown && (
            <ul className='absolute top-full left-0 w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-50 text-white text-left max-h-60 overflow-y-auto'>
              {results.map((city) => (
                <li
                  key={`${city.name}-${city.latitude}-${city.longitude}`}
                  onClick={() => handleSelectCity(city)}
                  className='px-8 py-3 cursor-pointer hover:bg-neutral-700 transition'
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button onClick={handleSearch}>Search</Button>
      </div>
    </>
  );
}
