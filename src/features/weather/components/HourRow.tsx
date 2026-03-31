import type { TemperatureUnit } from '../../../context/units-context';

type HourRowProps = {
  time?: string;
  temperature?: number;
  icon?: React.ReactNode;
  unit: TemperatureUnit;
};

export default function HourRow({
  time,
  temperature,
  icon,
  unit,
}: HourRowProps) {
  return (
    <div className='flex items-center justify-between p-3 rounded-lg bg-neutral-700'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>{icon}</div>

        <span className='text-white font-medium'>{time}</span>
      </div>

      <span className='text-neutral-200'>
        {temperature !== undefined
          ? `${temperature}°${unit === 'fahrenheit' ? 'F' : 'C'}`
          : '-'}
      </span>
    </div>
  );
}
