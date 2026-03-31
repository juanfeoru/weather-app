export default function CardLoading() {
  return (
    <div className=' bg-neutral-800 rounded-xl p-6 shadow-lg h-60 flex flex-col justify-center gap-2'>
      <div className='flex items-center justify-center gap-2'>
        <span className='size-2 bg-neutral-200 rounded-full animate-bounce'></span>
        <span className='size-2 bg-neutral-200 rounded-full animate-bounce [animation-delay:0.15s]'></span>
        <span className='size-2 bg-neutral-200 rounded-full animate-bounce [animation-delay:0.3s]'></span>
      </div>
      <p className='text-neutral-200 text-center'>Loading...</p>
    </div>
  );
}
