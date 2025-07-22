import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [storedEmails, setStoredEmails] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const savedEmails = JSON.parse(localStorage.getItem("emails")) || [];
    setStoredEmails(savedEmails);
  }, []);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const startsWithNumber = /^\d/;

    if (!value) return "Email is required.";
    if (startsWithNumber.test(value)) return "Email cannot start with a number.";
    if (!emailRegex.test(value)) return "Please enter a valid email address.";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required.";
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    const updatedEmails = [...new Set([email, ...storedEmails])];
    localStorage.setItem("emails", JSON.stringify(updatedEmails));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white shadow-xl rounded-2xl px-6 py-10 w-full max-w-sm mt-2">
        <div className="flex justify-center mb-2">
          <img src="/assets/logo.png" alt="InternHub Logo" className="h-20" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-[#F59E0B]">
          InternHub
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          autoComplete="off"
        >
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              autoComplete="off"
            />

            {showSuggestions && storedEmails.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded-lg shadow w-full mt-1 max-h-32 overflow-y-auto">
                {storedEmails
                  .filter((item) =>
                    item.toLowerCase().includes(email.toLowerCase())
                  )
                  .map((item, index) => (
                    <li
                      key={index}
                      className="px-3 py-1 hover:bg-[#F3F4F6] cursor-pointer text-sm"
                      onMouseDown={() => {
                        setEmail(item);
                        setShowSuggestions(false);
                      }}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
            {emailError && (
              <p className="text-red-500 text-sm mt-1 ml-1">{emailError}</p>
            )}
          </div>

          <div>
            <PasswordField
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1 ml-1">{passwordError}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}