import { ReactNode } from 'react';

const Chip = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-full 
                 hover:bg-blue-200 transition-colors flex items-center gap-2"
    >
      {children}
    </button>
  );
};

export default Chip;