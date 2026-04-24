import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatsChart = () => {
  const [chartData, setChartData] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/expenses/stats');
        
        setChartData({
          labels: data.map(item => item._id),
          datasets: [
            {
              fill: true,
              label: 'Daily Spending ($)',
              data: data.map(item => item.total),
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching chart stats', err);
      }
    };
    fetchStats();
  }, []);

  if (!chartData) return null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
        }
      },
    },
  };

  return (
    <div className="glass p-6 rounded-2xl h-64">
      <h3 className="text-sm font-semibold mb-4 text-slate-500 uppercase tracking-wider">30-Day Spending Trend</h3>
      <div className="h-48">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default StatsChart;
