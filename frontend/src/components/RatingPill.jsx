export default function RatingPill({ rating }) {
  const color = rating >= 4 ? 'bg-emerald-500' : rating < 3 ? 'bg-red-500' : 'bg-yellow-400';
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${color} text-gray-900`}>
      {rating}
    </span>
  );
}
