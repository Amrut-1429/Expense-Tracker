import { Trash2, Edit2, Calendar, Tag, IndianRupee, Utensils, Plane, ShoppingBag, HeartPulse, Gamepad2, MoreHorizontal } from 'lucide-react';

const ExpenseList = ({ expenses, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-slate-800/50 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="glass p-12 text-center rounded-2xl">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-500 mb-4">
          <IndianRupee size={24} />
        </div>
        <p className="text-slate-400">No expenses found. Start by adding one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="group glass p-5 rounded-2xl flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${getCategoryColor(expense.category)}`}>
              {getCategoryIcon(expense.category)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">{expense.title}</h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(expense.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1 uppercase tracking-wider">
                  <Tag size={12} />
                  {expense.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              ₹{expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <div className="flex items-center gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(expense)}
                className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"
                title="Edit expense"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(expense._id)}
                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                title="Delete expense"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'food': return <Utensils size={20} />;
    case 'travel': return <Plane size={20} />;
    case 'shopping': return <ShoppingBag size={20} />;
    case 'health': return <HeartPulse size={20} />;
    case 'entertainment': return <Gamepad2 size={20} />;
    case 'other': return <MoreHorizontal size={20} />;
    default: return <IndianRupee size={20} />;
  }
};

const getCategoryColor = (category) => {
  const colors = {
    food: 'bg-orange-500/10 text-orange-400',
    travel: 'bg-blue-500/10 text-blue-400',
    shopping: 'bg-purple-500/10 text-purple-400',
    health: 'bg-red-500/10 text-red-400',
    entertainment: 'bg-pink-500/10 text-pink-400',
    other: 'bg-slate-500/10 text-slate-400',
  };
  return colors[category] || colors.other;
};

export default ExpenseList;
