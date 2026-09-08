import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Zap, LayoutDashboard, History, Settings, LogOut, PlusCircle, UserCircle, Sun, Moon, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import BackButton from "../components/BackButton";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Create Incident", path: "/create", icon: PlusCircle },
    { label: "History", path: "/history", icon: History },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#060606] text-zinc-900 dark:text-white flex relative overflow-hidden transition-colors duration-200">
      {/* Background Mesh (Dark Mode Only) */}
      <div className="hidden dark:block absolute inset-0 z-0 bg-mesh opacity-80 pointer-events-none" />
      <div className="hidden dark:block absolute inset-0 z-0 bg-gradient-to-br from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]/90 pointer-events-none" />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-zinc-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-200 dark:border-white/5 bg-white dark:bg-black/80 dark:backdrop-blur-xl flex flex-col shrink-0 transition-transform duration-300 shadow-2xl md:relative md:translate-x-0 md:bg-white md:dark:bg-black/20",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <Zap className="w-6 h-6 text-blue-600 fill-blue-600" />
            <span className="text-xl font-bold tracking-tight">OpsEcho</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold",
                location.pathname === item.path
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 border border-transparent"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform duration-300", location.pathname === item.path ? "scale-110" : "group-hover:scale-110 group-hover:text-zinc-900 dark:group-hover:text-white")} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/5 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-600/20">
              {user?.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.name}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold truncate">
                {user?.role.replace("_", " ")}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10 w-full">
        <header className="h-16 border-b border-zinc-200 dark:border-white/5 flex items-center justify-between px-4 md:px-8 bg-white/50 dark:bg-black/20 dark:backdrop-blur-md transition-colors duration-200 shadow-sm shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            {location.pathname !== '/dashboard' && <BackButton className="mr-0 md:mr-4" />}
            <h2 className="font-bold text-lg text-zinc-900 dark:text-white truncate max-w-[150px] sm:max-w-xs md:max-w-none">
              {navItems.find(item => item.path === location.pathname)?.label || "Incident Detail"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-lg transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link to="/settings" className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <UserCircle className="w-6 h-6" />
            </Link>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
