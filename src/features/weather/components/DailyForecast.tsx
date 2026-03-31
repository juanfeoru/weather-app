import DayCard from './DayCard';
import { getWeatherIcon } from '../utils/weatherIcons';
import { formatDay } from '../utils/formatDay';

type DailyForecastProps = {
  data?: {
    dt: number;
    temp: { min: number; max: number };
    weathercode: number;
  }[];
};

export default function DailyForecast({ data }: DailyForecastProps) {
  const days = data?.slice(0, 7) ?? [];

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-white text-lg font-semibold'>Daily forecast</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4'>
        {days.length === 0
          ? Array.from({ length: 7 }).map((_, i) => <DayCard key={i} />)
          : days.map((day) => {
              const icon = getWeatherIcon(day.weathercode);

              return (
                <DayCard
                  key={day.dt}
                  day={formatDay(day.dt)}
                  icon={
                    <img src={icon} alt='weather icon' className='w-8 h-8' />
                  }
                  maxTemp={Math.round(day.temp.max)}
                  minTemp={Math.round(day.temp.min)}
                />
              );
            })}
      </div>
    </div>
  );
}
