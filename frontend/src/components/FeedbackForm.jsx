import { useState } from 'react';
import { api } from '../api';
import { motion } from 'framer-motion';

export default function FeedbackForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 5 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.message) return setError("Name & message required");

    try {
      setLoading(true);
      await api.post('/feedback', form);
      setForm({ name: '', email: '', message: '', rating: 5 });

      onSuccess && onSuccess();
    } catch (err) {
      setError("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      className="card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold mb-3 text-purple-400">Send Feedback</h2>

      {error && <p className="text-sm text-red-400 mb-2">{error}</p>}

      <div className="grid grid-cols-1 gap-3">
        <input
          className="input"
          placeholder="Your name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Email (optional)"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          className="input resize-none h-28"
          placeholder="Your feedback..."
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />

        <div className="flex justify-between items-center mt-2">
          <select
            className="input w-24 text-center"
            value={form.rating}
            onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <button className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </motion.form>
  );
}
