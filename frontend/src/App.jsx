import { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import StatsCards from './components/StatsCards';
import { api } from './api';
import { motion } from 'framer-motion';

export default function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({});

  const fetchAll = async () => {
    try {
      const [resFeedbacks, resStats] = await Promise.all([
        api.get('/feedback'),
        api.get('/feedback/stats')
      ]);
      setFeedbacks(resFeedbacks.data);
      setStats(resStats.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-10"
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Feedback <span className="text-purple-400">Dashboard</span>
        </h1>
        <div className="text-sm text-gray-400">Modern UI • MERN • Animated</div>
      </motion.div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Columns */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-1">
          <FeedbackForm onSuccess={fetchAll} />
        </div>

        <div className="md:col-span-2">
          <FeedbackList feedbacks={feedbacks} />
        </div>
      </div>
    </div>
  );
}
