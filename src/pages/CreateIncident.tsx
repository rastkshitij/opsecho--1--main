import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Terminal, Globe, Layout, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import client from "../api/client";

export default function CreateIncident() {
  const [formData, setFormData] = useState({
    title: "",
    severity: "SEV-2",
    description: "",
    service: "",
    environment: "production",
    impact: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await client.post("/incidents", formData);
      navigate(`/incident/${res.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create incident. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const severities = [
    { id: "SEV-1", label: "Critical", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
    { id: "SEV-2", label: "High", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { id: "SEV-3", label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
    { id: "SEV-4", label: "Low", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="bg-white/80 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-6 md:p-10 rounded-3xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 md:mb-10">
          <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-600/20">
            <ShieldAlert className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Declare Incident</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Initialize a new mission control room and notify responders.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Incident Severity</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {severities.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, severity: s.id })}
                  className={`p-4 rounded-2xl border transition-all text-center ${
                    formData.severity === s.id 
                      ? `${s.bg} ${s.border} ${s.color} ring-2 ring-blue-500/20` 
                      : "bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/5 text-zinc-500 hover:border-zinc-300 dark:hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-lg">{s.id}</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">{s.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 ml-1">Incident Title</label>
            <div className="relative">
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-zinc-900 dark:text-white"
                placeholder="e.g. Payment Gateway timeout errors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 ml-1">Affected Service</label>
              <div className="relative">
                <Layout className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input
                  type="text"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-zinc-900 dark:text-white"
                  placeholder="e.g. checkout-service"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 ml-1">Environment</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <select
                  value={formData.environment}
                  onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                  className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer text-zinc-900 dark:text-white"
                >
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="qa">QA</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 ml-1">Incident Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none text-zinc-900 dark:text-white"
              placeholder="Provide a high-level summary of what is happening..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Declare Incident"}
          </button>
        </form>
      </div>
    </div>
  );
}
