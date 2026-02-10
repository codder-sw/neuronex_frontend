import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, Mic, Activity, Heart, 
  Droplets, Wind, X 
} from 'lucide-react';

const Overview = () => {
  const [isListening, setIsListening] = useState(false);
  // Default user name set safely
  const [userName] = useState(localStorage.getItem('userName') || "User");
  const [greeting, setGreeting] = useState("");

  // Logic: Time ke hisaab se Greeting set karna
  useEffect(() => {
    const hour = new Date().getHours();
    const timeText = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
    setGreeting(`${timeText}, ${userName} ☀️`);
  }, [userName]);

  // Vitals Data
  const healthVitals = [
    { label: "Sugar Level", value: "140", unit: "mg/dL", icon: <Droplets className="text-emerald-600" /> },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: <Activity className="text-blue-600" /> },
    { label: "Heart Rate", value: "72", unit: "BPM", icon: <Heart className="text-rose-600" /> },
    { label: "Oxygen", value: "98", unit: "%", icon: <Wind className="text-cyan-600" /> },
  ];

  return (
    <div className="space-y-8 relative text-slate-800">
      
      {/* 1. GREETING HERO */}
      <div className="bg-gradient-to-br from-[#2b6cb0] to-[#4299e1] p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
        <h1 className="text-5xl font-black tracking-tight relative z-10">{greeting}</h1>
        <p className="mt-4 text-blue-100 font-bold text-lg italic relative z-10">"Aapki sehat aaj ekdum tandurust hai!"</p>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* 2. ACTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* AI Assistant Button */}
        <button 
          onClick={() => setIsListening(true)} 
          className="p-8 rounded-[2.5rem] bg-white border-2 border-blue-100 shadow-md flex flex-col items-center gap-4 active:scale-95 group transition-all hover:border-blue-400"
        >
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Mic size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-700">Ask AI Assistant</h3>
        </button>

        {/* Scan Reports Button */}
        <button className="p-8 rounded-[2.5rem] bg-white border-2 border-blue-100 shadow-md flex flex-col items-center gap-4 active:scale-95 group transition-all hover:border-indigo-400">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-700">Scan Reports</h3>
        </button>

        {/* SOS Button */}
        <div className="p-8 rounded-[2.5rem] bg-red-50 border-2 border-red-100 shadow-md flex flex-col items-center gap-4">
          <div className="p-4 bg-red-100 text-red-600 rounded-2xl">
            <AlertCircle size={32} />
          </div>
          <button className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-red-700 transition-colors active:scale-95">
            ACTIVATE SOS
          </button>
        </div>
      </div>

      {/* 3. VITALS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthVitals.map((item, index) => (
          <div key={index} className="bg-white p-7 rounded-[2.5rem] border-2 border-blue-50 shadow-lg flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl">{item.icon}</div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
            </div>
            <div className="flex items-baseline gap-1 font-black text-5xl tracking-tighter text-slate-800">
              {item.value}<span className="text-slate-400 text-sm font-bold">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. ANIMATED AI DASHBOARD */}
      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001a33]/95 backdrop-blur-3xl"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsListening(false)} 
              className="absolute top-10 right-10 p-4 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X size={32}/>
            </button>

            <div className="text-center space-y-16 max-w-2xl w-full px-6 text-white">
              
              {/* Pulsing Mic Animation */}
              <div className="relative inline-block">
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }} 
                  transition={{ repeat: Infinity, duration: 3 }} 
                  className="absolute inset-0 bg-blue-500 rounded-full blur-[80px]" 
                />
                <div className="relative bg-gradient-to-br from-blue-400 to-blue-700 p-16 rounded-full shadow-2xl animate-pulse">
                  <Mic size={100} />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-5xl font-black">Listening...</h2>
                <p className="text-blue-200 text-2xl font-medium">"Pranam {userName}, main aapki kaise sahayata karu?"</p>
              </div>

              {/* Moving Wave Bars */}
              <div className="flex items-end justify-center gap-3 h-24">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [20, Math.random() * 80 + 20, 20] }} 
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }} 
                    className="w-4 bg-gradient-to-t from-blue-600 to-cyan-300 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                  />
                ))}
              </div>

              <button 
                onClick={() => setIsListening(false)} 
                className="px-12 py-5 bg-white text-blue-950 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-blue-50 transition-colors"
              >
                Stop Listening
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Overview;