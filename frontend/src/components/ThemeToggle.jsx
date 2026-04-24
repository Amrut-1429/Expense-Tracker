import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-8 p-1 bg-slate-200 dark:bg-slate-800 rounded-full transition-all duration-300 hover:ring-2 ring-blue-500/20 group ${className}`}
      title="Toggle Theme"
    >
      <div className={`absolute w-6 h-6 rounded-full bg-white dark:bg-blue-600 shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${isDark ? 'translate-x-6' : 'translate-x-0'}`}>
        {isDark ? <Moon size={14} className="text-white" /> : <Sun size={14} className="text-amber-500" />}
      </div>
      <div className="flex justify-between w-full px-1.5 text-slate-400 group-hover:text-slate-500 transition-colors">
        <Sun size={12} className={!isDark ? 'opacity-0' : 'opacity-100'} />
        <Moon size={12} className={isDark ? 'opacity-0' : 'opacity-100'} />
      </div>
    </button>
  );
};

export default ThemeToggle;
