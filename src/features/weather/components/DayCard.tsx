type DayCardProps = {
  day?: string;
  icon?: React.ReactNode;
  maxTemp?: number;
  minTemp?: number;
};

export default function DayCard({ day, icon, maxTemp, minTemp }: DayCardProps) {
  return (
    <div className='bg-neutral-800 rounded-xl p-4 flex flex-col items-center gap-2'>
      <span className='text-white'>{day}</span>

      <div className='text-xl'>{icon}</div>

      <div className='text-center text-sm flex items-center gap-4'>
        <span className='text-white'>
          {maxTemp !== undefined ? `${maxTemp}°` : ''}
        </span>
        <span className='text-neutral-400'>
          {minTemp !== undefined ? `${minTemp}°` : ''}
        </span>
      </div>
    </div>
  );
}
