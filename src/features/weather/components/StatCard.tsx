type StatCardProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className='bg-neutral-800 rounded-xl p-4 flex flex-col gap-2'>
      <div className='flex items-center gap-2 text-sm text-neutral-300'>
        {icon}
        <span>{label}</span>
      </div>

      <span className='text-2xl text-neutral-200'>{value}</span>
    </div>
  );
}
