export default function StatsCard({ title, value, growth, growthColor = "text-blue-600" }) {
  return (
    <div className="bg-white shadow hover:shadow-md transition-all rounded-md p-3 h-[108px] flex flex-col items-center justify-center text-center text-sm text-gray-700">
      <h2 className="text-xs font-semibold text-[#F59E0B]">{title}</h2>
      <p className="text-xl font-bold">{value}</p>
      <p className={`text-[10px] ${growthColor}`}>{growth}</p>
    </div>
  );
}