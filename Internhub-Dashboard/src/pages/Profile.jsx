import { useState } from "react";
import FormField from "../components/FormField";
import Button from "../components/Button";

export default function Profile() {
  const [user] = useState({
    name: "Nimra Naeem",
    email: "nimranaeem@gmail.com",
    role: "Developer",
    department: "Software Development",
    phone: "+92 3096007129",
    joinDate: "January 2023",
    avatar: ""
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!passwords.current) newErrors.current = "Current password is required.";
    if (!passwords.new) {
      newErrors.new = "New password is required.";
    } else if (passwords.new.length < 6) {
      newErrors.new = "Password must be at least 6 characters.";
    }
    if (!passwords.confirm) {
      newErrors.confirm = "Please confirm your new password.";
    } else if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSuccess(true);
    setPasswords({ current: "", new: "", confirm: "" });
    setErrors({});
    setTimeout(() => setSuccess(false), 3000);
  };

  const inputClass = (field) =>
    `w-full p-2 border rounded ${errors[field] ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <h1 className="text-2xl font-bold text-[#000000] mb-1">Profile</h1>
      <p className="text-sm text-gray-600 mb-6">
        Manage your personal and role information
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
          <div className="flex flex-1 items-center justify-between px-6" style={{ minHeight: "200px" }}>
            <div className="flex flex-col items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#F59E0B] shadow"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-[#F59E0B] shadow bg-gray-100" />
              )}
              <button className="mt-2 text-sm text-[#F59E0B] hover:underline">
                Change Photo
              </button>
            </div>

            <div className="text-sm text-gray-800 text-left">
              <div className="mb-3">
                <p className="text-black-500 font-medium">Full Name</p>
                <p className="mt-1">{user.name}</p>
              </div>
              <div className="mb-3">
                <p className="text-black-500 font-medium">Email</p>
                <p className="mt-1">{user.email}</p>
              </div>
              <div className="mb-3">
                <p className="text-black-500 font-medium">Department</p>
                <p className="mt-1">{user.department}</p>
              </div>
              <div>
                <p className="text-black-500 font-medium">Role</p>
                <p className="mt-1">{user.role}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button className="text-sm px-5 py-2">Edit Profile</Button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Update Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <FormField label="Current Password">
              <input
                type="password"
                placeholder="Enter current password"
                className={inputClass("current")}
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
              />
              {errors.current && (
                <p className="text-xs text-red-600 mt-1">{errors.current}</p>
              )}
            </FormField>

            <FormField label="New Password">
              <input
                type="password"
                placeholder="New Password"
                className={inputClass("new")}
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
              />
              {errors.new && (
                <p className="text-xs text-red-600 mt-1">{errors.new}</p>
              )}
            </FormField>

            <FormField label="Confirm New Password">
              <input
                type="password"
                placeholder="Confirm new password"
                className={inputClass("confirm")}
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
              />
              {errors.confirm && (
                <p className="text-xs text-red-600 mt-1">{errors.confirm}</p>
              )}
            </FormField>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="text-sm px-5 py-2">
                Update Password
              </Button>
            </div>

            {success && (
              <p className="text-green-600 text-sm text-center mt-2">
                Password updated successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}