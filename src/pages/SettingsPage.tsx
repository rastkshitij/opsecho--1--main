import React, { useState, useEffect } from "react";
import { User, Bell, Mic, Blocks, Save, CheckCircle2, Monitor, Moon, Sun, Volume2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  
  // Read query parameters
  const [activeTab, setActiveTab] = useState("profile");
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("integration") || params.get("error")) {
      setActiveTab("integrations");
    }
  }, []);

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "ENGINEER",
    phone: "",
    timezone: "UTC-8 (Pacific Time)",
    department: "Engineering",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundEffects: true,
  });

  const [integrations, setIntegrations] = useState<string[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/integrations`, {
        headers: { "x-user-id": user.id }
      })
      .then(res => res.json())
      .then(data => {
        if (data.integrations) {
          setIntegrations(data.integrations.map((i: any) => i.provider));
        }
      })
      .catch(err => console.error("Failed to fetch integrations", err));
    }
  }, [user]);

  const handleConnectIntegration = (provider: string) => {
    if (!user) return;
    window.location.href = `/api/integrations/${provider}/authorize?userId=${user.id}`;
  };

  const handleDisconnectIntegration = async (provider: string) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/integrations/${provider}`, {
        method: "DELETE",
        headers: { "x-user-id": user.id }
      });
      if (res.ok) {
        setIntegrations(integrations.filter(i => i !== provider.toUpperCase()));
      }
    } catch (err) {
      console.error("Failed to disconnect integration", err);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "audio", label: "Audio & Voice", icon: Mic },
    { id: "integrations", label: "Integrations", icon: Blocks },
  ];

  return (
    <div className="max-w-5xl mx-auto py-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-zinc-400 text-sm">Manage your account preferences and application settings.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium border",
                  isActive
                    ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                    : "bg-zinc-100 dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/5 hover:bg-zinc-200 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                <Icon className={clsx("w-5 h-5", isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400 dark:text-zinc-500")} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          <div className="glass-panel rounded-2xl p-6 min-h-[500px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-bold mb-1 text-zinc-900 dark:text-white">Profile Information</h2>
                    <p className="text-xs text-zinc-500">Update your account's profile information and email address.</p>
                  </div>
                  
                  <form onSubmit={handleSave} className="space-y-5">
                    <div className="flex items-center gap-6 pb-4 border-b border-zinc-200 dark:border-white/5">
                      <div className="relative group cursor-pointer">
                        <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                          {profileData.name.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-bold uppercase tracking-widest text-white">Edit</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{profileData.name || "User"}</h3>
                        <p className="text-zinc-500 text-sm uppercase tracking-widest font-semibold">{profileData.role.replace('_', ' ')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Email Address</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
                          disabled
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Phone Number (Alerts)</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-zinc-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Department</label>
                        <select
                          value={profileData.department}
                          onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                          className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-zinc-900 dark:text-white appearance-none"
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="SRE">Site Reliability (SRE)</option>
                          <option value="Product">Product</option>
                          <option value="Support">Customer Support</option>
                          <option value="Executive">Executive</option>
                        </select>
                      </div>

                      <div className="space-y-2 col-span-2">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Timezone</label>
                        <select
                          value={profileData.timezone}
                          onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                          className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all text-zinc-900 dark:text-white appearance-none"
                        >
                          <option value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</option>
                          <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
                          <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                          <option value="UTC+1 (CET)">UTC+1 (CET)</option>
                          <option value="UTC+5:30 (IST)">UTC+5:30 (IST)</option>
                          <option value="UTC+10 (AEST)">UTC+10 (AEST)</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === "preferences" && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-lg font-bold mb-1">Appearance & Notifications</h2>
                    <p className="text-xs text-zinc-500">Customize how the application looks and how you are notified.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button 
                        onClick={() => setTheme('dark')}
                        className={clsx("p-4 rounded-xl border flex flex-col items-center gap-3 transition-all", theme === 'dark' ? "bg-blue-50 dark:bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400" : "bg-zinc-50 dark:bg-black/20 border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5")}
                      >
                        <Moon className="w-6 h-6" />
                        <span className="text-sm font-bold">Dark</span>
                      </button>
                      <button 
                        onClick={() => setTheme('light')}
                        className={clsx("p-4 rounded-xl border flex flex-col items-center gap-3 transition-all", theme === 'light' ? "bg-blue-50 dark:bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400" : "bg-zinc-50 dark:bg-black/20 border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5")}
                      >
                        <Sun className="w-6 h-6" />
                        <span className="text-sm font-bold">Light</span>
                      </button>
                      <button 
                        onClick={() => setTheme('system')}
                        className={clsx("p-4 rounded-xl border flex flex-col items-center gap-3 transition-all", theme === 'system' ? "bg-blue-50 dark:bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400" : "bg-zinc-50 dark:bg-black/20 border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5")}
                      >
                        <Monitor className="w-6 h-6" />
                        <span className="text-sm font-bold">System</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-white/5 pb-2">Notifications</h3>
                    
                    <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                      <div>
                        <p className="font-bold text-sm">Email Notifications</p>
                        <p className="text-xs text-zinc-500 mt-1">Receive email alerts for critical incidents you are assigned to.</p>
                      </div>
                      <button 
                        onClick={() => setPreferences({...preferences, emailNotifications: !preferences.emailNotifications})}
                        className={clsx("w-12 h-6 rounded-full transition-colors relative", preferences.emailNotifications ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" : "bg-zinc-700")}
                      >
                        <div className={clsx("w-4 h-4 rounded-full bg-white absolute top-1 transition-all", preferences.emailNotifications ? "left-7" : "left-1")} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                      <div>
                        <p className="font-bold text-sm">Push Notifications</p>
                        <p className="text-xs text-zinc-500 mt-1">Receive browser push notifications for updates.</p>
                      </div>
                      <button 
                        onClick={() => setPreferences({...preferences, pushNotifications: !preferences.pushNotifications})}
                        className={clsx("w-12 h-6 rounded-full transition-colors relative", preferences.pushNotifications ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" : "bg-zinc-700")}
                      >
                        <div className={clsx("w-4 h-4 rounded-full bg-white absolute top-1 transition-all", preferences.pushNotifications ? "left-7" : "left-1")} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "audio" && (
                <motion.div
                  key="audio"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-bold mb-1 text-zinc-900 dark:text-white">Audio & Voice</h2>
                    <p className="text-xs text-zinc-500">Manage your microphone and speaker devices for Incident Rooms.</p>
                  </div>
                  
                  <div className="p-6 bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                      <Volume2 className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-zinc-900 dark:text-white">Device Settings</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">Audio devices are automatically managed when you enter an active Incident Room. Advanced device selection is coming soon.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "integrations" && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-lg font-bold mb-1 text-zinc-900 dark:text-white">Connected Integrations</h2>
                    <p className="text-xs text-zinc-500">Connect third-party tools to sync alerts and incidents.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Slack Integration Card */}
                    <div className="flex items-center justify-between p-5 bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                      {integrations.includes("SLACK") && (
                        <div className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-wider rounded-bl-lg">
                          Connected
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-xl font-bold text-purple-600 dark:text-purple-400">
                          S
                        </div>
                        <div>
                          <h3 className="font-bold text-zinc-900 dark:text-white">Slack</h3>
                          <p className="text-xs text-zinc-500 mt-0.5">Send incident notifications to Slack channels</p>
                        </div>
                      </div>
                      {integrations.includes("SLACK") ? (
                        <button 
                          onClick={() => handleDisconnectIntegration("slack")}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-lg transition-colors border border-red-500/20"
                        >
                          Disconnect
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleConnectIntegration("slack")}
                          className="px-4 py-2 bg-zinc-200 dark:bg-white/5 hover:bg-zinc-300 dark:hover:bg-white/10 text-xs font-bold rounded-lg transition-colors border border-zinc-300 dark:border-white/5 text-zinc-700 dark:text-white"
                        >
                          Connect
                        </button>
                      )}
                    </div>

                    {/* Jira Integration Card */}
                    <div className="flex items-center justify-between p-5 bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                      {integrations.includes("JIRA") && (
                        <div className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-bold uppercase tracking-wider rounded-bl-lg">
                          Connected
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400">
                          J
                        </div>
                        <div>
                          <h3 className="font-bold text-zinc-900 dark:text-white">Jira</h3>
                          <p className="text-xs text-zinc-500 mt-0.5">Automatically sync incidents with Jira tickets</p>
                        </div>
                      </div>
                      {integrations.includes("JIRA") ? (
                        <button 
                          onClick={() => handleDisconnectIntegration("jira")}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-lg transition-colors border border-red-500/20"
                        >
                          Disconnect
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleConnectIntegration("jira")}
                          className="px-4 py-2 bg-zinc-200 dark:bg-white/5 hover:bg-zinc-300 dark:hover:bg-white/10 text-xs font-bold rounded-lg transition-colors border border-zinc-300 dark:border-white/5 text-zinc-700 dark:text-white"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Save Action Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-[#121212] to-transparent pointer-events-none flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={clsx(
                  "pointer-events-auto flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg",
                  showSuccess 
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20" 
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
                )}
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : showSuccess ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? "Saving..." : showSuccess ? "Saved Successfully" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
