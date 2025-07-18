export default function InputField({ label, type = "text", value, onChange, placeholder, error }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded-md p-2 text-sm placeholder-gray-400 ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}