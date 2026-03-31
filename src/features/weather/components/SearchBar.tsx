import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useCitySearch } from '../hooks/useCitySearch';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import type { CitySearch } from '../types/weather.types';
import { Search, Loader2 } from 'lucide-react';

type Props = {
  onSearch: (lat: number, lon: number, name: string, country: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 500);
  const { cities, fetchCities, loading: searchLoading } = useCitySearch();

  function handleSearch() {
    if (cities.length > 0) {
      handleSelectCity(cities[0]);
    }
  }

  function handleSelectCity(city: CitySearch) {
    setQuery(`${city.name}, ${city.country}`);
    onSearch(city.latitude, city.longitude, city.name, city.country);
    setIsOpen(false);
  }

  useEffect(() => {
    if (debouncedQuery.length < 2) return;
    fetchCities(debouncedQuery);
  }, [debouncedQuery, fetchCities]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = cities.slice(0, 5);
  const showDropdown = isOpen && debouncedQuery.length >= 2 && results.length > 0;

  return (
    <div className='max-w-xl mx-auto w-full relative' ref={dropdownRef}>
      <div className='flex flex-col sm:flex-row gap-2'>
        <div className='relative flex-1 group'>
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-400 transition-colors'>
            {searchLoading ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              <Search className='w-5 h-5' />
            )}
          </div>
          <Input
            showIcon={false}
            placeholder='Search for a city...'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className='pl-10 h-12 w-full'
            aria-label='Search for a city'
            aria-autocomplete='list'
            aria-expanded={showDropdown}
            aria-haspopup='listbox'
          />
          
          {showDropdown && (
            <ul 
              className='absolute top-full left-0 w-full mt-2 bg-neutral-900 border border-neutral-700/50 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-neutral-800'
              role='listbox'
            >
              {results.map((city) => (
                <li
                  key={`${city.name}-${city.latitude}-${city.longitude}`}
                  onClick={() => handleSelectCity(city)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectCity(city)}
                  tabIndex={0}
                  className='px-6 py-3.5 cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800 outline-none transition text-neutral-200'
                  role='option'
                  aria-selected={false}
                  aria-label={`${city.name}, ${city.country}`}
                >
                  <div className='font-medium'>{city.name}</div>
                  <div className='text-xs text-neutral-400'>{city.country}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='flex gap-2 shrink-0'>
          <Button 
            onClick={handleSearch}
            className='h-12 px-6'
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
