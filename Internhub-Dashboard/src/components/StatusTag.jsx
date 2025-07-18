export default function StatusTag({ status }) {
  const lower = status.toLowerCase();

  const statusMap = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    open: "bg-green-100 text-green-700",      
    closed: "bg-red-100 text-red-700",       
  };

  const style = statusMap[lower] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${style}`}>
      {status}
    </span>
  );
}
