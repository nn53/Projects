export default function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`bg-[#F59E0B] text-white px-4 py-2 rounded hover:bg-amber-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}