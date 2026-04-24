import { useState } from 'react';
import API from '../api/axios';
import { Target, Check, Loader2 } from 'lucide-react';

const BudgetSettings = ({ currentBudget, onUpdate }) => {
  const [budget, setBudget] = useState(currentBudget || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.put('/auth/profile', { monthlyBudget: Number(budget) });
      onUpdate();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating budget', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-blue-500" size={20} />
        <h2 className="text-lg font-semibold">Budget Settings</h2>
      </div>
      
      <form onSubmit={handleUpdate} className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Set monthly limit..."
            className="w-full pl-8 pr-4 py-2.5 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : showSuccess ? (
            <Check size={18} />
          ) : (
            'Set'
          )}
        </button>
      </form>
      <p className="mt-3 text-[10px] text-slate-400 uppercase tracking-widest font-medium">Set a limit to get alerts</p>
    </div>
  );
};

export default BudgetSettings;
