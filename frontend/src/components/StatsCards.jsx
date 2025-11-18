import { motion } from "framer-motion";

export default function StatsCards({ stats }) {
  const items = [
    { title: "Total Feedbacks", value: stats.total ?? 0 },
    { title: "Average Rating", value: stats.avgRating ?? 0 },
    { title: "Positive (4+)", value: stats.positive ?? 0 },
    { title: "Negative (<=3)", value: stats.negative ?? 0 }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="card py-6 text-center"
        >
          <p className="text-sm text-gray-400">{item.title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mt-2">
            {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
