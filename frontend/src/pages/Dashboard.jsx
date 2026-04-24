import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import API from '../api/axios';
import ThemeToggle from '../components/ThemeToggle';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Summary from '../components/Summary';
import { LogOut, LayoutDashboard, PlusCircle, Filter } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ grandTotal: 0, breakdown: [] });
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'food', name: 'Food' },
    { id: 'travel', name: 'Travel' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'health', name: 'Health' },
    { id: 'entertainment', name: 'Fun' },
    { id: 'other', name: 'Other' },
  ];

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get(`/expenses?category=${category}`);
      setExpenses(data.expenses);
    } catch (err) {
      console.error('Error fetching expenses', err);
    }
  };

  const fetchSummary = async () => {
    try {
      const { data } = await API.get('/expenses/summary');
      setSummary(data);
    } catch (err) {
      console.error('Error fetching summary', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchExpenses(), fetchSummary()]);
      setIsLoading(false);
    };
    loadData();
  }, [category]);

  const handleAddExpense = () => {
    fetchExpenses();
    fetchSummary();
    setEditingExpense(null);
  };

  const handleDeleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
      fetchSummary();
    } catch (err) {
      console.error('Error deleting expense', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 transition-colors duration-300">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">ExpenseTracker</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Welcome back, {user?.name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats and Add Form */}
        <div className="lg:col-span-1 space-y-8">
          <Summary summary={summary} />
          
          <div className="glass p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <PlusCircle className="text-blue-500 dark:text-blue-400" size={20} />
              <h2 className="text-lg font-semibold">Add New Expense</h2>
            </div>
            <ExpenseForm 
              onExpenseAdded={handleAddExpense} 
              editingExpense={editingExpense}
              onCancel={() => setEditingExpense(null)}
            />
          </div>
        </div>

        {/* Right Column: List and Filters */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Expenses</h2>
            </div>
            
            {/* Enhanced Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400">
                <Filter size={18} />
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    category === cat.id
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <ExpenseList 
            expenses={expenses} 
            onEdit={setEditingExpense}
            onDelete={handleDeleteExpense} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
