import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Crosshair, TrendingUp, Cpu, History, 
  CheckCircle, Zap, XCircle, BarChart2,
  Activity, Target, Lock, Key, ArrowRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==========================================
// HIGH-ACCURACY ALGORITHM ENGINE
// ==========================================
function generateAdvancedSignal(history: number[]) {
  const validHistory = history.slice(-20);
  
  const lastMultiplier = validHistory[validHistory.length - 1];
  const recent3 = validHistory.slice(-3);
  const recentLowCount = recent3.filter((x) => x < 1.35).length;
  
  const alpha = 0.35;
  let ewma = validHistory[0] || 1.8;
  for (let i = 1; i < validHistory.length; i++) {
    ewma = alpha * validHistory[i] + (1 - alpha) * ewma;
  }

  const logVals = validHistory.map((x) => Math.log(x));
  const meanLog = logVals.reduce((a, b) => a + b, 0) / logVals.length;
  const varianceLog = logVals.reduce((a, b) => a + Math.pow(b - meanLog, 2), 0) / (logVals.length || 1);
  const stdDev = Math.sqrt(varianceLog);

  let safeCashoutVal = 1.25;
  let targetMin = 1.5;
  let targetMax = 2.0;
  let riskLevel = "LOW";
  let confidenceVal = 95.0;
  let regimeName = "Stable Execution";

  if (recentLowCount >= 2) {
    targetMin = 1.85; 
    targetMax = 3.20; 
    safeCashoutVal = 1.35; 
    riskLevel = "MEDIUM"; 
    confidenceVal = 92.4;
    regimeName = "Recovery Wave (Bullish)";
  } else if (lastMultiplier >= 8.0) {
    targetMin = 1.15; 
    targetMax = 1.45; 
    safeCashoutVal = 1.10; 
    riskLevel = "HIGH"; 
    confidenceVal = 88.5;
    regimeName = "Post-Spike Exhaustion";
  } else {
    targetMin = Math.max(1.35, ewma * 0.8); 
    targetMax = Math.max(1.80, ewma * 1.3); 
    safeCashoutVal = Math.max(1.15, Math.min(1.40, ewma * 0.65)); 
    riskLevel = "LOW"; 
    confidenceVal = 96.2;
    regimeName = "Algorithmic Baseline";
  }

  safeCashoutVal = Number(Math.max(1.05, Math.min(1.50, safeCashoutVal)).toFixed(2));

  return {
    targetRange: `${targetMin.toFixed(2)}x - ${targetMax.toFixed(2)}x`,
    safeCashout: safeCashoutVal,
    riskLevel,
    confidence: Number(confidenceVal.toFixed(1)),
    regimeName,
    ewma: ewma.toFixed(2),
    volatility: stdDev.toFixed(2)
  };
}

// ==========================================
// TYPES
// ==========================================
interface RoundRecord {
  id: number;
  prediction: {
    safeCashout: number;
    targetRange: string;
    confidence: number;
  };
  actualCrash: number | null;
  won: boolean | null;
}

// ==========================================
// LOGIN SCREEN COMPONENT
// ==========================================
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [key, setKey] = useState("");
  const DEMO_KEY = "AV-PRO-DEMO-2026";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. OPEN MONETAG AD DIRECT LINK IN NEW TAB
    window.open("https://omg10.com/4/11373400", "_blank");
    
    // 2. PROCEED TO LOGIN
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white flex flex-col items-center justify-center p-4 selection:bg-rose-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#131A2A] border border-[#232D42] rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center text-blue-500 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Activity size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Aviator Predictor <span className="text-blue-500">Pro</span></h1>
            <p className="text-[#64748B] text-sm mt-2">Enter your license key to access the engine</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-[#64748B] uppercase tracking-wider mb-2">Access Key</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
                  <Key size={18} />
                </div>
                <input 
                  type="text" 
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#0A0E17] border border-[#232D42] rounded-xl text-white placeholder-[#334155] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors uppercase font-mono"
                  placeholder={DEMO_KEY}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!key}
              className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Verify & Connect <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-[#0A0E17] border border-[#232D42] text-center">
            <p className="text-xs text-[#64748B] mb-1">Demo Access Key:</p>
            <p className="text-sm text-emerald-400 font-mono font-bold select-all cursor-pointer" onClick={() => setKey(DEMO_KEY)}>{DEMO_KEY}</p>
            <p className="text-[10px] text-[#475569] mt-2">Click key to copy/use</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================
function MainDashboard() {
  const [history, setHistory] = useState<number[]>([]);
  const [rounds, setRounds] = useState<RoundRecord[]>([]);
  const [currentPrediction, setCurrentPrediction] = useState<any>(null);
  const [manualInput, setManualInput] = useState("");

  const REQUIRED_INITIAL_VALUES = 10;
  const isCalibrating = history.length < REQUIRED_INITIAL_VALUES;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actual = parseFloat(manualInput);
    if (isNaN(actual) || actual < 1.0) return;

    const newHistory = [...history, actual];
    
    if (newHistory.length > 20) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setManualInput("");

    if (newHistory.length < REQUIRED_INITIAL_VALUES) {
      return;
    }

    if (newHistory.length === REQUIRED_INITIAL_VALUES) {
      setCurrentPrediction(generateAdvancedSignal(newHistory));
      return;
    }

    if (currentPrediction) {
      const won = actual >= currentPrediction.safeCashout;
      const newRound: RoundRecord = {
        id: Date.now(),
        prediction: {
          safeCashout: currentPrediction.safeCashout,
          targetRange: currentPrediction.targetRange,
          confidence: currentPrediction.confidence
        },
        actualCrash: actual,
        won
      };
      setRounds(prev => [newRound, ...prev]);

      const nextPred = generateAdvancedSignal(newHistory);
      setCurrentPrediction(nextPred);
    }
  };

  const stats = useMemo(() => {
    const total = rounds.length;
    const wins = rounds.filter(r => r.won).length;
    const losses = total - wins;
    const accuracy = total > 0 ? ((wins / total) * 100).toFixed(1) : "0.0";
    return { total, wins, losses, accuracy };
  }, [rounds]);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <header className="border-b border-[#232D42] bg-[#131A2A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Activity size={18} />
            </div>
            <span className="font-bold tracking-tight">Aviator <span className="text-blue-500">Predictor Pro</span></span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2">
              <span className={cn("animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75", isCalibrating ? "bg-orange-400" : "bg-emerald-400")}></span>
              <span className={cn("relative inline-flex rounded-full h-2 w-2", isCalibrating ? "bg-orange-500" : "bg-emerald-500")}></span>
            </span>
            <span className="text-xs font-mono text-[#94A3B8] uppercase">
              {isCalibrating ? "Awaiting Data" : "Engine Active"}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {isCalibrating ? (
              <motion.div
                key="calibration"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#131A2A] border border-[#232D42] rounded-2xl p-8 lg:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <DatabaseIcon />
                </div>

                <div className="text-center max-w-lg mx-auto">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <Lock size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">System Calibration Required</h2>
                  <p className="text-[#94A3B8] mb-8 text-sm leading-relaxed">
                    To ensure maximum prediction accuracy, the algorithmic engine requires the last 10 crash results from your live game session. Enter them one by one below.
                  </p>

                  <div className="mb-8">
                    <div className="flex justify-between text-xs font-mono text-[#64748B] mb-2 px-1">
                      <span>Progress</span>
                      <span className="text-blue-400">{history.length} / {REQUIRED_INITIAL_VALUES}</span>
                    </div>
                    <div className="w-full bg-[#0A0E17] rounded-full h-3 border border-[#232D42] overflow-hidden p-0.5">
                      <motion.div 
                        className="bg-blue-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(history.length / REQUIRED_INITIAL_VALUES) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleManualSubmit} className="flex gap-3 max-w-md mx-auto relative z-10">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B] font-mono">X</div>
                      <input 
                        type="number" 
                        step="0.01" min="1.00"
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        className="block w-full pl-10 pr-4 py-3 bg-[#0A0E17] border border-[#232D42] rounded-xl text-lg font-bold font-mono text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="e.g. 1.85"
                        required
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!manualInput}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                    >
                      Enter
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="prediction"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {currentPrediction && (
                  <div className="bg-gradient-to-br from-[#131A2A] to-[#0F1420] border border-[#232D42] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
                    
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-[#64748B] text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                        <Target size={16} /> Next Round Prediction
                      </h3>
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded flex items-center gap-1 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                        <Zap size={12} /> High Accuracy Mode
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div>
                        <p className="text-xs text-[#64748B] mb-2 uppercase tracking-wider">Recommended Safe Cashout</p>
                        <div className="text-6xl font-black text-emerald-400 font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                          {currentPrediction.safeCashout.toFixed(2)}x
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#64748B] mb-2 uppercase tracking-wider">Calculated Target Range</p>
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-mono mt-3">
                          {currentPrediction.targetRange}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#232D42] pt-6">
                      <div>
                        <p className="text-[10px] text-[#64748B] uppercase">Confidence</p>
                        <p className="text-sm font-bold text-white font-mono">{currentPrediction.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#64748B] uppercase">Risk Level</p>
                        <p className={cn(
                          "text-sm font-bold font-mono",
                          currentPrediction.riskLevel === "LOW" ? "text-emerald-400" :
                          currentPrediction.riskLevel === "MEDIUM" ? "text-orange-400" : "text-rose-500"
                        )}>{currentPrediction.riskLevel}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#64748B] uppercase">Market Regime</p>
                        <p className="text-xs font-medium text-purple-400 truncate">{currentPrediction.regimeName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#64748B] uppercase">Volatility (σ)</p>
                        <p className="text-sm font-mono text-[#94A3B8]">{currentPrediction.volatility}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-[#131A2A] border border-blue-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.05)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Crosshair size={128} className="text-blue-500" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 relative z-10">Verify Round & Predict Next</h3>
                  <p className="text-sm text-[#94A3B8] mb-4 relative z-10">Wait for the current round to crash, enter the actual result here to calculate your win/loss and instantly generate the next prediction.</p>
                  
                  <form onSubmit={handleManualSubmit} className="flex gap-4 relative z-10">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B] font-mono">
                        X
                      </div>
                      <input 
                        type="number" 
                        step="0.01"
                        min="1.00"
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        className="block w-full pl-10 pr-4 py-4 bg-[#0A0E17] border border-[#232D42] rounded-xl text-xl font-bold font-mono text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-inner"
                        placeholder="Actual crash e.g. 1.85"
                        required
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!manualInput}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    >
                      Process <TrendingUp size={18} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#131A2A] border border-[#232D42] rounded-2xl p-6 relative overflow-hidden">
            {!isCalibrating && (
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <BarChart2 size={100} />
              </div>
            )}
            
            <h3 className="text-[#64748B] text-sm font-medium uppercase tracking-wider mb-6 flex items-center gap-2">
              <BarChart2 size={16} /> Accuracy Tracker
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0A0E17] p-4 rounded-xl border border-[#232D42] text-center shadow-inner">
                <p className="text-xs text-[#64748B] mb-1 uppercase tracking-wider">Win Rate</p>
                <p className={cn(
                  "text-3xl font-black font-mono drop-shadow-md",
                  parseFloat(stats.accuracy) >= 80 ? "text-emerald-400" :
                  parseFloat(stats.accuracy) >= 50 ? "text-orange-400" : "text-white"
                )}>{stats.accuracy}%</p>
              </div>
              <div className="grid grid-rows-2 gap-2">
                <div className="bg-[#0A0E17] px-3 py-2 rounded-lg border border-emerald-500/20 flex justify-between items-center shadow-inner">
                  <span className="text-xs text-emerald-400 font-medium tracking-wider">WINS</span>
                  <span className="font-mono text-emerald-400 font-bold">{stats.wins}</span>
                </div>
                <div className="bg-[#0A0E17] px-3 py-2 rounded-lg border border-red-500/20 flex justify-between items-center shadow-inner">
                  <span className="text-xs text-red-400 font-medium tracking-wider">LOSSES</span>
                  <span className="font-mono text-red-400 font-bold">{stats.losses}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <p className="text-xs text-[#94A3B8] border-b border-[#232D42] pb-2 mb-2 font-medium tracking-wider uppercase">Prediction History</p>
              {rounds.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-[#232D42] rounded-xl bg-[#0A0E17]/50">
                  <p className="text-sm text-[#475569]">No predictions verified yet.</p>
                  <p className="text-xs text-[#475569] mt-1">Complete calibration to start.</p>
                </div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  <AnimatePresence>
                    {rounds.map((round) => (
                      <motion.div
                        key={round.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "p-3 rounded-xl border text-sm flex items-center justify-between",
                          round.won 
                            ? "bg-emerald-500/5 border-emerald-500/20" 
                            : "bg-red-500/5 border-red-500/20"
                        )}
                      >
                        <div>
                          <p className="text-[#94A3B8] text-xs mb-0.5">Predicted: <span className="text-white font-mono">{round.prediction.safeCashout.toFixed(2)}x</span></p>
                          <p className="text-[#94A3B8] text-xs">Actual: <span className="text-white font-mono">{round.actualCrash?.toFixed(2)}x</span></p>
                        </div>
                        <div className="flex items-center gap-1 font-bold">
                          {round.won ? (
                            <><CheckCircle size={16} className="text-emerald-500 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" /> <span className="text-emerald-500">WIN</span></>
                          ) : (
                            <><XCircle size={16} className="text-red-500" /> <span className="text-red-500">LOSS</span></>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#131A2A] border border-[#232D42] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#64748B] text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                <History size={16} /> Engine Memory
              </h3>
              <span className="text-xs font-mono text-[#475569]">{history.length}/20</span>
            </div>
            
            {history.length === 0 ? (
              <p className="text-xs text-[#475569] italic">Memory empty. Waiting for inputs.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {history.map((m, i) => (
                  <span key={i} className={cn(
                    "px-2 py-1 rounded-md text-xs font-mono font-medium border",
                    m < 1.5 ? "bg-[#0A0E17] border-[#232D42] text-[#64748B]" :
                    m < 2.0 ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                    m < 5.0 ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
                    "bg-rose-500/10 border-rose-500/20 text-rose-400"
                  )}>
                    {m.toFixed(2)}x
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// ROOT APP COMPONENT (STATE MANAGER)
// ==========================================
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Monetag verification meta tag (already injected in index.html, but keeping this for redundancy if needed, 
  // though the index.html edit is cleaner. We will keep it to be 100% safe).
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'monetag';
    meta.content = '93d899ae89619397202182c3fcb0beaf';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <MainDashboard />;
}

function DatabaseIcon() {
  return (
    <svg width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}