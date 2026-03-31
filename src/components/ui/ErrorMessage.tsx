type ErrorMessageProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className='text-center py-12'>
      <p className='text-orange-500 mb-4'>{message}</p>

      <button
        onClick={onRetry}
        className='px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition'
      >
        Retry
      </button>
    </div>
  );
}
