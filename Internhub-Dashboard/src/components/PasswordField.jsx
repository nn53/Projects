import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({ label, value, onChange, placeholder, error }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className={`w-full border rounded-md p-2 pr-10 text-sm placeholder-gray-400 ${error ? "border-red-500" : "border-gray-300"}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <div
          className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}