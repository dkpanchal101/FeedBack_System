import RatingPill from "./RatingPill";
import { motion } from "framer-motion";

export default function FeedbackList({ feedbacks }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4 text-purple-300">Recent Feedbacks</h3>

      <div className="space-y-4">
        {feedbacks.map((f, i) => (
          <motion.div
            key={f._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/5 border border-white/10 p-4 rounded-xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg">{f.name}</p>
                <p className="text-sm text-gray-300 mt-1">{f.message}</p>
                {f.email && <p className="text-xs text-gray-400 mt-2">{f.email}</p>}
              </div>

              <RatingPill rating={f.rating} />
            </div>

            <p className="text-xs text-gray-600 mt-2">
              {new Date(f.createdAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
