import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, ArrowLeft, Search, Activity, ShieldAlert, ArrowRight } from "lucide-react";
import client from "../api/client";
import { motion } from "motion/react";

export default function JoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode) return;

    setIsLoading(true);
    setError("");
    try {
      const res = await client.post("/incidents/join", { roomCode });
      navigate(`/incident/${res.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid room code or incident not found");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-white flex flex-col items-center justify-center p-6 selection:bg-blue-500/30 transition-colors duration-200">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/20">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Join Response Room</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Enter a unique incident code to coordinate with the team.</p>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleJoin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Room Code</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="E.G. PAY-4827"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="w-full bg-white dark:bg-black/50 border border-zinc-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-mono tracking-widest text-lg text-zinc-900 dark:text-white"
                  autoFocus
                />
              </div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-xs mt-2 ml-1"
                >
                  <ShieldAlert className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </div>

            <button
              disabled={isLoading || !roomCode}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Join Incident
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-white/5 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
              <Activity className="w-5 h-5 text-blue-500 mb-2" />
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Active Stats</p>
              <p className="text-xl font-bold mt-1 tracking-tight">Live</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5">
              <ShieldAlert className="w-5 h-5 text-orange-500 mb-2" />
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Safety First</p>
              <p className="text-xl font-bold mt-1 tracking-tight">Audit</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-600">
          Don't have a code? <Link to="/dashboard" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4">Check your dashboard</Link>
        </p>
      </motion.div>
    </div>
  );
}
