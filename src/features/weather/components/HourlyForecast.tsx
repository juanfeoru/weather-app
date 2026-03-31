import HourRow from './HourRow';
import { getWeatherIcon } from '../utils/weatherIcons';
import { DailyDropdown } from '../../../components/ui/Dropdown';
import { useState, useContext } from 'react';
import { UnitsContext } from '../../../context/units-context';

type HourlyData = {
  dt: number;
  temp: number;
  weatherCode: number;
};

type HourlyForecastProps = {
  data?: HourlyData[];
};

export default function HourlyForecast({ data }: HourlyForecastProps) {
  const [selectedDay, setSelectedDay] = useState<string>('monday');

  const units = useContext(UnitsContext);
  if (!units) return null;

  const { temperature } = units;

  const filteredHours = data
    ? data.filter((hour) => {
        const day = new Date(hour.dt * 1000)
          .toLocaleDateString('en-US', { weekday: 'long' })
          .toLowerCase();

        return day === selectedDay;
      })
    : [];

  function convertTemperature(temp: number, unit: string) {
    if (unit === 'fahrenheit') {
      return (temp * 9) / 5 + 32;
    }
    return temp;
  }

  return (
    <div className='flex flex-col gap-2 bg-neutral-800 rounded-xl p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-lg font-semibold'>Hourly forecast</h2>
        <DailyDropdown selectedDay={selectedDay} onChangeDay={setSelectedDay} />
      </div>

      {!data
        ? Array.from({ length: 8 }).map((_, i) => (
            <HourRow key={i} unit={temperature} />
          ))
        : filteredHours.slice(0, 8).map((hour) => (
            <HourRow
              key={hour.dt}
              time={new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
                hour: 'numeric',
                hour12: true,
              })}
              temperature={Math.round(
                convertTemperature(hour.temp, temperature),
              )}
              unit={temperature}
              icon={
                <img
                  src={getWeatherIcon(hour.weatherCode)}
                  className='size-6'
                />
              }
            />
          ))}
    </div>
  );
}
