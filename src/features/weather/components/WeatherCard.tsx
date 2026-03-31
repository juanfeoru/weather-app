import Card from '../../../components/ui/Card';
import type { WeatherData } from '../types/weather.types';

type Props = {
  weather: WeatherData;
};

export default function WeatherCard({ weather }: Props) {
  const city = weather.city.name;
  const country = weather.city.country;
  const temp = Math.round(weather.current.temperature_2m);

  return (
    <Card className='h-60 flex flex-col text-white md:justify-center'>
      <div className='md:flex items-center justify-between'>
        <div className='text-center md:text-left'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            {city}, {country}
          </h2>

          <p className='text-neutral-200'>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        <p className='text-8xl font-bold italic text-right md:text-left'>
          {temp}°
        </p>
      </div>
    </Card>
  );
}
