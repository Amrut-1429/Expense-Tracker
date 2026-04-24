import { Wallet, PieChart, TrendingUp } from 'lucide-react';

const Summary = ({ summary }) => {
  const { grandTotal, breakdown, budgetLimit } = summary;
  const percentOfBudget = budgetLimit > 0 ? (grandTotal / budgetLimit) * 100 : 0;
  const isOverBudget = grandTotal > budgetLimit && budgetLimit > 0;

  return (
    <div className="space-y-4">
      {/* Total Card */}
      <div className={`relative overflow-hidden ${isOverBudget ? 'bg-gradient-to-br from-red-600 to-red-800' : 'bg-gradient-to-br from-blue-600 to-blue-800'} p-6 rounded-2xl shadow-xl transition-all duration-500`}>
        <div className="absolute -right-4 -top-4 text-white/10">
          <Wallet size={120} />
        </div>
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium mb-1">Total Balance Spent</p>
          <h3 className="text-4xl font-bold text-white">₹{grandTotal.toLocaleString()}</h3>
          
          {budgetLimit > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-white/80">
                <span>Monthly Budget: ₹{budgetLimit.toLocaleString()}</span>
                <span>{percentOfBudget.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${isOverBudget ? 'bg-white' : 'bg-green-400'} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min(percentOfBudget, 100)}%` }}
                />
              </div>
              {isOverBudget && (
                <p className="text-[10px] font-bold text-white uppercase tracking-wider animate-pulse">⚠️ Budget Exceeded!</p>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-white/60 text-xs">
            <TrendingUp size={14} />
            <span>Across {breakdown.length} categories</span>
          </div>
        </div>
      </div>

      {/* Breakdown Card */}
      <div className="glass p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-6">
          <PieChart className="text-blue-500 dark:text-blue-400" size={20} />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Breakdown</h2>
        </div>
        
        <div className="space-y-4">
          {breakdown.length > 0 ? (
            breakdown.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize text-slate-600 dark:text-slate-400">{item.category}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${item.total.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 dark:bg-blue-600 rounded-full" 
                    style={{ width: `${grandTotal > 0 ? (item.total / grandTotal) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 dark:text-slate-500 py-4 text-sm font-medium">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
