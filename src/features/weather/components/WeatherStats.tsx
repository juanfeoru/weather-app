import StatCard from './StatCard';
import type { WeatherData } from '../types/weather.types';
import { useContext } from 'react';
import { UnitsContext } from '../../../context/units-context';
import { convertWindSpeed } from '../utils/convertWindSpeed';
import { convertPrecipitation } from '../utils/convertPrecipitation';

type Props = {
  weather: WeatherData | null;
};

export default function WeatherStats({ weather }: Props) {
  const units = useContext(UnitsContext);
  if (!units) return null;

  const { wind, precipitation } = units;

  const current = weather?.current;

  const speed = current
    ? convertWindSpeed(current.wind_speed_10m, wind)
    : undefined;

  const rain = current
    ? convertPrecipitation(current.precipitation, precipitation)
    : undefined;

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      <StatCard
        label='Feels Like'
        value={current ? `${Math.round(current.temperature_2m)}°` : '-'}
      />

      <StatCard
        label='Humidity'
        value={current ? `${current.relative_humidity_2m}%` : '-'}
      />

      <StatCard
        label='Wind'
        value={
          speed !== undefined
            ? `${Math.round(speed)} ${wind === 'mph' ? 'mph' : 'km/h'}`
            : '-'
        }
      />

      <StatCard
        label='Precipitation'
        value={
          rain !== undefined
            ? `${rain.toFixed(1)} ${precipitation === 'mm' ? 'mm' : 'in'}`
            : '-'
        }
      />
    </div>
  );
}
