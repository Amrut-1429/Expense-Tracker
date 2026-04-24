import { useState, useEffect } from 'react';
import API from '../api/axios';
import { Loader2, X } from 'lucide-react';

const ExpenseForm = ({ onExpenseAdded, editingExpense, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: new Date(editingExpense.date).toISOString().split('T')[0],
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (editingExpense) {
        await API.put(`/expenses/${editingExpense._id}`, formData);
      } else {
        await API.post('/expenses', formData);
      }
      
      if (!editingExpense) {
        setFormData({
          title: '',
          amount: '',
          category: 'food',
          date: new Date().toISOString().split('T')[0],
        });
      }
      onExpenseAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save expense');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="text-red-600 dark:text-red-400 text-xs bg-red-50 dark:bg-red-400/10 p-3 rounded-lg border border-red-100 dark:border-red-400/20">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Title</label>
        <input
          type="text"
          name="title"
          required
          placeholder="Lunch, Gas, Rent..."
          className="w-full px-4 py-3"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            required
            placeholder="0.00"
            className="w-full px-4 py-3"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full px-4 py-3"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
        <select
          name="category"
          className="w-full px-4 py-3 cursor-pointer"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        {editingExpense && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-[2] py-3 ${editingExpense ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50`}
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : (editingExpense ? 'Update Expense' : 'Add Expense')}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
