import iconError from '../../../assets/icons/icon-error.svg';
import iconRetry from '../../../assets/icons/icon-retry.svg';

type Props = {
  onRetry: () => void;
};

export default function ErrorCard({ onRetry }: Props) {
  return (
    <div className='bg-neutral-800/50 rounded-xl p-8 text-center text-white max-w-4xl mx-auto flex flex-col justify-center items-center gap-4'>
      <img src={iconError} alt='error icon' className='w-8 h-8 mx-auto mb-2' />
      <h2 className='text-3xl md:text-4xl font-bricolage font-semibold text-balance'>
        Something went wrong
      </h2>
      <p className='text-neutral-300 text-sm text-balance'>
        We couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>

      <button
        onClick={onRetry}
        className='bg-neutral-700 text-white px-5 py-2 rounded-lg flex items-center gap-3 hover:bg-neutral-700/50 transition-colors duration-200 cursor-pointer'
      >
        <img src={iconRetry} alt='retry icon' className='w-4 h-4' />
        Retry
      </button>
    </div>
  );
}
