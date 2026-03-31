import Card from '../../../components/ui/Card';
import type { WeatherData } from '../types/weather.types';

type Props = {
  weather: WeatherData;
};

export default function WeatherCard({ weather }: Props) {
  const city = weather.city.name;
  const country = weather.city.country;
  const temp = Math.round(weather.current.temperature_2m);

  const fullDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card 
      className='h-60 flex flex-col text-white md:justify-center'
      aria-labelledby='current-weather-heading'
    >
      <div className='md:flex items-center justify-between'>
        <div className='text-center md:text-left'>
          <h2 id='current-weather-heading' className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            <span className='sr-only'>Current weather in </span>
            {city}, {country}
          </h2>

          <time 
            dateTime={new Date().toISOString()} 
            className='text-neutral-200 block mt-1'
          >
            {fullDate}
          </time>
        </div>

        <div 
          className='text-8xl font-bold italic text-right md:text-left'
          aria-label={`Current temperature: ${temp} degrees`}
        >
          {temp}<span aria-hidden='true'>°</span>
        </div>
      </div>
    </Card>
  );
}
