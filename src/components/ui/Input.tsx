import iconSearch from '../../assets/icons/icon-search.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showIcon?: boolean;
}

export default function Input({
  showIcon = true,
  className,
  ...props
}: InputProps) {
  return (
    <div className='relative w-full'>
      {showIcon && (
        <img
          src={iconSearch}
          className='absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none'
          alt=''
        />
      )}

      <input
        type='text'
        className={`w-full px-4 py-3 rounded-lg bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-blue-500 ${
          showIcon ? 'pl-12' : ''
        } ${className}`}
        {...props}
      />
    </div>
  );
}
