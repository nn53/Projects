import { Outlet, NavLink } from "react-router-dom";
import { Bell, LayoutDashboard, Users, Briefcase, User } from "lucide-react";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#F59E0B] px-6 py-3 flex justify-between items-center shadow">
        <div className="flex items-center space-x-2">
          <img
            src="/src/assets/logo.png"
            alt="InternHub Logo"
            className="h-8 w-8 rounded-full border-2 border-white"
          />
          <h1 className="text-lg font-bold text-white">InternHub</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="text-white" />
          <img
            src="/public/assets/user.png"
            alt="User"
            className="h-8 w-8 rounded-full border-2 border-white"
          />
          <span className="text-sm font-medium text-white">Nimra Naeem</span>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-gray-300 px-6 py-6 shadow-sm rounded-tr-xl rounded-br-xl">
          <nav className="flex flex-col space-y-4 text-sm text-gray-800 font-medium">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[#F59E0B]/10 text-[#F59E0B] font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/candidates"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[#F59E0B]/10 text-[#F59E0B] font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <Users size={18} />
              <span>Candidates</span>
            </NavLink>

            <NavLink
              to="/internships"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[#F59E0B]/10 text-[#F59E0B] font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <Briefcase size={18} />
              <span>Internships</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[#F59E0B]/10 text-[#F59E0B] font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <User size={18} />
              <span>Profile</span>
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 bg-[#F9FAFB] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}