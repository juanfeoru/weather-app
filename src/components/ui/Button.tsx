type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-500/70 transition-colors duration-300 text-white cursor-pointer md:px-6 ${className}`}
    >
      {children}
    </button>
  );
}
