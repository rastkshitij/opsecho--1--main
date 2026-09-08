import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Link } from "react-router-dom";
import { Shield, Zap, MessageSquare, BarChart3, Users, Activity, ArrowRight, Server, Database, Globe, Lock, Sun, Moon, CheckCircle2, Sparkles, ShieldCheck, TicketCheck, Check, Blocks } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const steps = [
  { number: "01", icon: Activity, title: "Open an incident room", text: "Create a room with a focused objective and invite responders with a shareable code." },
  { number: "02", icon: MessageSquare, title: "Talk naturally", text: "Your team uses the live voice room while OpsEcho listens for decisions, symptoms, and next actions." },
  { number: "03", icon: Sparkles, title: "Build shared state", text: "Gemini turns conversation into a structured feed of facts, hypotheses, owners, and risks." },
  { number: "04", icon: ShieldCheck, title: "Approve critical actions", text: "High-impact actions stay under human control with explicit approval and a complete audit trail." },
];

const integrations = [
  { name: "Slack", mark: "S", icon: MessageSquare, color: "purple", description: "Keep your incident channel informed with timely notifications and response updates." },
  { name: "Jira", mark: "J", icon: TicketCheck, color: "blue", description: "Turn incident follow-up into traceable Jira work without copying context by hand." },
];

export default function LandingPage() {
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const rotateX = useTransform(scrollY, [0, 500], [15, 0]);
  const scale = useTransform(scrollY, [0, 500], [0.95, 1]);
  const translateZ = useTransform(scrollY, [0, 500], [-100, 0]);
  const y = useTransform(scrollY, [0, 500], [50, 0]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">OpsEcho</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-900 dark:hover:text-white transition-colors">How it Works</a>
            <a href="#integrations" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Integrations</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link to="/login" className="hidden sm:block text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs sm:text-sm font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-24 sm:pb-32 px-4 sm:px-6 relative perspective-[2000px] overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-20 left-1/4 w-[40rem] h-[30rem] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute top-40 right-1/4 w-[30rem] h-[20rem] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.15]">
              Turn Incident Chaos into <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Coordinated Intelligence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Real-time AI Incident Commander that listens, analyzes, and synchronizes your team's response using voice, Gemini, and LangGraph.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                Create First Incident
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/join" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-md">
                Join Incident Room
              </Link>
            </div>
          </motion.div>

          <div className="mt-24 relative [perspective:2000px] flex justify-center">
            <motion.div
              style={{
                rotateX,
                scale,
                y,
                z: translateZ,
                transformStyle: "preserve-3d"
              }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-5xl bg-zinc-900/80 border border-white/10 rounded-2xl aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl backdrop-blur-xl"
            >
              {/* Window Controls */}
              <div className="absolute top-0 left-0 w-full h-8 sm:h-10 bg-zinc-800/80 border-b border-white/5 flex items-center px-4 gap-2 z-50">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                <div className="mx-auto flex gap-2 p-1 bg-black/40 rounded-md">
                  <div className="w-20 sm:w-32 h-3 sm:h-4 bg-white/10 rounded-sm" />
                </div>
              </div>

              {/* Advanced 3D Animation Inside */}
              <div className="p-4 sm:p-8 pt-12 sm:pt-16 flex items-center justify-center h-full bg-gradient-to-br from-zinc-950 via-[#0a0a0a] to-zinc-900 relative">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                
                <div className="relative w-full h-full flex items-center justify-center">
                    
                    {/* Status Cards */}
                    <div className="absolute top-4 left-4">
                        <motion.div 
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 1 }}
                           className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 w-64 backdrop-blur-xl flex items-center gap-4 shadow-xl"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                               <Activity className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-xs font-medium text-zinc-400">System Status</div>
                                <div className="text-sm font-bold text-emerald-400">All Services Operational</div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute top-4 right-4">
                        <motion.div 
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 1.2 }}
                           className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 w-72 backdrop-blur-xl flex items-start gap-4 shadow-xl"
                        >
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 relative mt-1">
                               <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-red-500 rounded-full" />
                               <Zap className="w-5 h-5 text-red-400 relative z-10" />
                            </div>
                            <div>
                                <div className="text-xs font-medium text-red-400/80">Active Incident Detected</div>
                                <div className="text-sm font-bold text-red-400 mb-1">API Latency Spike (us-east-1)</div>
                                <div className="text-xs text-red-400/60">AI Commander investigating...</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Central 3D Network Visualization */}
                    <div className="relative w-full max-w-3xl aspect-video flex items-center justify-center">
                        {/* Connecting Lines SVG */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
                                </linearGradient>
                                <linearGradient id="line-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
                                </linearGradient>
                                <linearGradient id="line-grad-3" x1="50%" y1="0%" x2="50%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
                                </linearGradient>
                            </defs>
                            {/* Lines */}
                            <path d="M 400 200 L 250 120" stroke="url(#line-grad-1)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                            <path d="M 400 200 L 550 120" stroke="url(#line-grad-2)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                            <path d="M 400 200 L 400 300" stroke="url(#line-grad-3)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                            
                            {/* Animated Particles on lines */}
                            <motion.circle cx="400" cy="200" r="3" fill="#10b981"
                                animate={{ cx: [400, 250], cy: [200, 120], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.circle cx="400" cy="200" r="3" fill="#ef4444"
                                animate={{ cx: [400, 550], cy: [200, 120], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            />
                            <motion.circle cx="400" cy="200" r="3" fill="#a855f7"
                                animate={{ cx: [400, 400], cy: [200, 300], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                            />
                        </svg>

                        {/* Nodes */}
                        <motion.div 
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[30%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] relative group">
                                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl group-hover:bg-emerald-500/20 transition-colors" />
                                <Database className="w-7 h-7 text-emerald-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-400 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Primary DB</span>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [5, -5, 5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[30%] right-[25%] translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-red-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.15)] relative group">
                                <div className="absolute inset-0 bg-red-500/10 rounded-2xl group-hover:bg-red-500/20 transition-colors" />
                                <Globe className="w-7 h-7 text-red-400" />
                                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                            </div>
                            <span className="text-xs font-medium text-zinc-400 bg-black/50 px-2 py-1 rounded backdrop-blur-sm text-red-400/80">API Gateway</span>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[15%] left-[50%] -translate-x-1/2 translate-y-1/2 z-20 flex flex-col items-center gap-3"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.15)] relative group">
                                <div className="absolute inset-0 bg-purple-500/10 rounded-2xl group-hover:bg-purple-500/20 transition-colors" />
                                <Lock className="w-7 h-7 text-purple-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-400 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Auth Service</span>
                        </motion.div>

                        {/* Central Hub */}
                        <motion.div 
                            animate={{ scale: [1, 1.05, 1], rotateZ: [0, 2, -2, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.5)] border border-blue-400/50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite_linear]" />
                                <Server className="w-10 h-10 text-white relative z-10" />
                            </div>
                            <div className="absolute -inset-8 border border-blue-500/20 rounded-[2.5rem] animate-[spin_10s_linear_infinite]" />
                            <div className="absolute -inset-12 border border-blue-500/10 rounded-[3rem] animate-[spin_15s_linear_infinite_reverse]" />
                        </motion.div>

                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-zinc-950/50 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Mission Control for Modern SREs</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Precision tools designed for high-stress production environments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6 text-blue-400" />}
              title="Voice-to-State"
              description="Real-time Agora voice integration processed by Gemini to maintain a structured incident state."
              delay={0}
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-purple-400" />}
              title="Evidence Tracking"
              description="Differentiate between confirmed facts and hypotheses. Never lose a lead in the noise."
              delay={1}
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
              title="Auto-Timeline"
              description="Every decision, action, and update is automatically logged in a searchable incident timeline."
              delay={2}
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-orange-400" />}
              title="Action Ownership"
              description="Identify action owners directly from conversation. Track status from TODO to Resolved."
              delay={3}
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-red-400" />}
              title="Risk Detection"
              description="AI identifies missing information and potential risks before they escalate."
              delay={4}
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              title="Human Approval"
              description="Critical actions like rollbacks require explicit human sign-off via secure workflows."
              delay={5}
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-zinc-50 dark:bg-[#0a0a0a] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">How it works</h2>
            <h3 className="text-3xl font-bold mb-4">A calmer incident room, from first signal to resolution.</h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              OpsEcho gives responders one shared operational picture while the incident is still moving. Voice, AI, and accountable action tracking work together in real time.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="group rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition-colors hover:border-blue-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-500/40"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold tracking-widest text-zinc-400">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.text}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-7 text-zinc-900 dark:border-white/10 dark:bg-[#11131a] dark:text-white md:grid-cols-[1fr_auto] md:items-center md:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">The response loop</p>
              <h3 className="mt-3 text-2xl font-bold">Observe. Decide. Act. Learn.</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">Every message becomes useful incident context, so responders spend less time reconstructing what happened and more time moving the system forward.</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300"><Users className="h-5 w-5 text-blue-600 dark:text-blue-400" /> One room, one source of truth</div>
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Built for human-led response</div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-32 px-6 bg-white dark:bg-[#060606] border-t border-zinc-200 dark:border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">Integrations</h2>
            <h3 className="text-3xl font-bold mb-4">Bring the tools your response already depends on.</h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              OpsEcho connects the conversation in your incident room to the systems where teams coordinate, document, and follow through.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              const isPurple = integration.color === "purple";
              return (
                <motion.article
                  key={integration.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                  className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold ${isPurple ? "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400" : "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"}`}>
                      {integration.mark}
                    </div>
                    <Icon className={`h-5 w-5 ${isPurple ? "text-purple-500" : "text-blue-500"}`} />
                  </div>
                  <h3 className="mt-7 text-xl font-bold">{integration.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{integration.description}</p>
                  <div className="mt-6 space-y-3 border-t border-zinc-200 pt-5 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-400">
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> OAuth connection from Settings</div>
                    <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Incident context stays attached</div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-blue-200 bg-blue-50 p-7 dark:border-blue-500/20 dark:bg-blue-500/[0.07] md:flex-row md:items-center md:justify-between md:p-9">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-blue-500/10 dark:text-blue-400"><Blocks className="h-5 w-5" /></div>
              <div><h3 className="font-bold">Connect from your workspace</h3><p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Once you are signed in, manage connections and disconnect them at any time in Settings.</p></div>
            </div>
            <Link to="/register" className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500">Get started <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"><Database className="h-4 w-4 text-blue-500" /> More operational connections can be added as your workflow grows.</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#0a0a0a] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="font-bold tracking-tight">OpsEcho</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Security</a>
            <a href="#" className="hover:text-white">Docs</a>
          </div>
          <p className="text-sm text-zinc-500">© 2026 OpsEcho Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay = 0 }: { icon: React.ReactNode, title: string, description: string, delay?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 shadow-lg dark:shadow-none transition-colors h-full flex flex-col"
      >
        <motion.div 
          style={{ translateZ: 60 }}
          className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-6 shadow-inner"
        >
          {icon}
        </motion.div>
        <motion.h3 style={{ translateZ: 40 }} className="text-xl font-bold mb-3">{title}</motion.h3>
        <motion.p style={{ translateZ: 20 }} className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">{description}</motion.p>
      </motion.div>
    </motion.div>
  );
}

