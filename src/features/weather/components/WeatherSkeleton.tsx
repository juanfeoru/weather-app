import Skeleton from '../../../components/ui/Skeleton';

export default function WeatherSkeleton() {
  return (
    <div className='space-y-6'>
      <Skeleton className='h-40 w-full' />

      <div className='grid grid-cols-3 gap-4'>
        <Skeleton className='h-24 w-full' />
        <Skeleton className='h-24 w-full' />
        <Skeleton className='h-24 w-full' />
      </div>

      <div className='flex gap-3'>
        <Skeleton className='h-28 w-20' />
        <Skeleton className='h-28 w-20' />
        <Skeleton className='h-28 w-20' />
        <Skeleton className='h-28 w-20' />
      </div>
    </div>
  );
}
