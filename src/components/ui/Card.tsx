import bgTodayLarge from '../../assets/icons/bg-today-large.svg';
import bgTodaySmall from '../../assets/icons/bg-today-small.svg';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`relative bg-neutral-800 rounded-xl p-6 shadow-lg overflow-hidden ${className}`}
    >
      <picture className='absolute inset-0'>
        <source media='(min-width: 768px)' srcSet={bgTodayLarge} />
        <img
          src={bgTodaySmall}
          alt=''
          className='w-full h-full object-cover opacity50'
        />
      </picture>

      <div className='relative z-10'>{children}</div>
    </div>
  );
}
