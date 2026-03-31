import iconSearch from '../../assets/icons/icon-search.svg';

type InputProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

export default function Input({
  value,
  onChange,
  placeholder,
  className,
}: InputProps) {
  return (
    <div className='relative w-full'>
      <img
        src={iconSearch}
        className='absolute left-4 top-1/2 -translate-y-1/2'
      />

      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-blue-500 pl-12 ${className}`}
      />
    </div>
  );
}
