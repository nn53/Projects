import { ChevronUp, ChevronDown } from "lucide-react";

export default function SortIcon({ active, order }) {
  if (!active) {
    return (
      <div className="flex flex-col items-center leading-none text-gray-400">
        <ChevronUp size={12} className="-mb-1" />
        <ChevronDown size={12} className="-mt-1" />
      </div>
    );
  }

  return order === "asc" ? (
    <ChevronUp size={14} />
  ) : (
    <ChevronDown size={14} />
  );
}