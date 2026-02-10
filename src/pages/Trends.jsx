import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Award, Calendar, ChevronRight } from 'lucide-react';

const Trends = () => {
  // Reference UI: Weekly Adherence & Tracking
  const weeklyData = [
    { day: 'M', value: 60 },
    { day: 'T', value: 85 },
    { day: 'W', value: 70 },
    { day: 'T', value: 95 },
    { day: 'F', value: 80 },
    { day: 'S', value: 90 },
    { day: 'S', value: 100 },
  ];

  return (
    <div className="space-y-8 pb-24 max-w-xl mx-auto px-6 font-sans bg-[#F8FAFC]">
      
      {/* 1. Progress Header Card */}
      <header className="pt-6">
        <h2 className="text-4xl font-black text-[#1e293b]">Health Report</h2>
        <p className="text-[#64748b] font-bold text-lg mt-1 italic">Aap pichle hafte se behtar hain!</p>
      </header>

      {/* 2. Weekly Adherence Ring (Iteration 3: Positive Feedback) */}
      <div className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-50 flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Weekly Score</h3>
          <p className="text-5xl font-black text-[#008094]">94%</p>
          <div className="flex items-center gap-2 text-[#4CAF50] font-bold">
            <Award size={20} /> <span>Bohot Achhe!</span>
          </div>
        </div>
        {/* Simple Circle visual using CSS */}
        <div className="w-24 h-24 rounded-full border-[10px] border-[#E8F5E9] border-t-[#4CAF50] flex items-center justify-center relative">
             <span className="text-xl font-black text-[#008094]">94%</span>
        </div>
      </div>

      {/* 3. Simplified Weekly Chart */}
      <div className="bg-white p-8 rounded-[3.5rem] shadow-sm border border-slate-50 space-y-8">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-2xl font-black text-slate-800">Sugar Level</h3>
          <span className="text-[#1976D2] font-black text-sm bg-[#E3F2FD] px-4 py-1 rounded-full uppercase">Normal</span>
        </div>
        
        {/* Visual Bar Chart for Easy Understanding */}
        <div className="flex items-end justify-between h-40 px-2 gap-3">
          {weeklyData.map((data, i) => (
            <div key={i} className="flex flex-col items-center gap-4 flex-1">
              <motion.div 
                initial={{ height: 0 }} animate={{ height: `${data.value}%` }}
                className={`w-full rounded-t-2xl shadow-sm ${data.value > 90 ? 'bg-[#008094]' : 'bg-[#94e2ee]'}`}
              />
              <span className="text-sm font-black text-slate-400 uppercase">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. History List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-slate-800 px-2">Pichle Records</h3>
        <div className="space-y-4">
          {[
            { title: "Blood Pressure", val: "120/80", time: "Kal, 09:00 AM", color: "text-[#1976D2]", bg: "bg-[#E3F2FD]" },
            { title: "Sugar (Fasting)", val: "138", time: "14 Feb, 07:30 AM", color: "text-[#2E7D32]", bg: "bg-[#E8F5E9]" }
          ].map((log, i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center justify-between active:scale-[0.98] transition-all">
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl ${log.bg} ${log.color}`}><Activity size={28} /></div>
                <div>
                  <h4 className="font-black text-xl text-slate-800">{log.title}</h4>
                  <p className="text-slate-400 font-bold text-sm">{log.time}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-black ${log.color}`}>{log.val}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Support Button */}
      <button className="w-full bg-[#f1f5f9] text-slate-500 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3">
        <Calendar size={24} /> Pura Record Download Karein
      </button>

    </div>
  );
};

export default Trends;