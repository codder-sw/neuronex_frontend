import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Clock, Square, CheckSquare, Sparkles, BellRing, ThumbsUp } from 'lucide-react';

// 👇 Props receive kiye: medicines (list) aur onToggle (function)
const Medications = ({ medicines, onToggle }) => {
  
  // Local UI State (Sirf dikhane ke liye)
  const [activeReminder, setActiveReminder] = useState(null); 
  const [toast, setToast] = useState({ message: "", type: "" });

  // Logic for Automated Popup (Syncs with Props)
  useEffect(() => {
    const timer = setTimeout(() => {
      const pending = medicines.find(m => m.status === 'Pending');
      if (pending) setActiveReminder(pending);
    }, 5000); 
    return () => clearTimeout(timer);
  }, [medicines]); // Jab medicines prop badlega, ye check karega

  // Handle Toggle Wrapper (Local Toast dikhane ke liye)
  const handleCheck = (id) => {
    onToggle(id); // 👈 Parent App.jsx ko batao
    
    // Agar Reminder khula tha, toh band karo
    if (activeReminder?.id === id) {
      setActiveReminder(null);
      showToast("Shabaash! Aapne dawai le li. ❤️", "success");
    } else {
        // Normal click ke liye toast
        const med = medicines.find(m => m.id === id);
        if (med && med.status === 'Pending') {
            showToast("Bohot Badhiya! Dawai taken. ✅", "success");
        }
    }
  };

  const showToast = (msg, type) => {
    setToast({ message: msg, type: type });
    setTimeout(() => setToast({ message: "", type: "" }), 4000);
  };

  return (
    <div className="space-y-8 relative pb-32 text-slate-800 max-w-2xl mx-auto px-4">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight">Aaj ki Dawaiyaan</h2>
          <p className="text-slate-500 font-bold text-xl italic mt-1">"Sehat hi asli dhan hai."</p>
        </div>
        {/* Note: Add Button removed temporarily as data is controlled by App.jsx */}
      </div>

      {/* MEDICINE LIST (Coming from Props) */}
      <div className="grid gap-6">
        {medicines.map((med) => (
          <motion.div 
            layout
            key={med.id} 
            className={`p-8 rounded-[3.5rem] border-4 flex flex-col gap-6 shadow-xl relative overflow-hidden ${med.status === 'Taken' ? 'bg-green-50 border-green-200' : 'bg-white border-blue-50'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`p-6 rounded-[2rem] ${med.status === 'Taken' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    <Pill size={48} />
                </div>
                <div>
                  <h3 className={`font-black text-3xl ${med.status === 'Taken' ? 'text-slate-300 line-through' : 'text-slate-800'}`}>{med.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-slate-400 font-black text-lg flex items-center gap-2"><Clock size={20} /> {med.time}</p>
                  </div>
                </div>
              </div>
              
              {/* LARGE CHECK BUTTON */}
              <button onClick={() => handleCheck(med.id)} className={`transition-all ${med.status === 'Taken' ? 'text-green-600' : 'text-slate-200'}`}>
                {med.status === 'Taken' ? <CheckSquare size={84} fill="#f0fdf4" /> : <Square size={84} />}
              </button>
            </div>
            
            {/* Instruction Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
               <p className="text-slate-500 font-bold text-lg">
                   {med.status === 'Taken' ? 'Completed' : 'Samay par lein'}
               </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* REMAINDER POPUP */}
      <AnimatePresence>
        {activeReminder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.8, y: 100 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-2xl border-b-[12px] border-blue-600 text-center">
              <div className="flex justify-center mb-8">
                <div className="p-8 bg-blue-50 rounded-full animate-bounce">
                  <BellRing className="text-blue-600" size={64} />
                </div>
              </div>
              <h3 className="text-5xl font-black mb-6 text-blue-900 leading-tight">Dawai ka samay!</h3>
              <p className="text-2xl font-bold text-slate-500 mb-12">Kripya apni <span className="text-blue-600">{activeReminder.name}</span> le lijiye. 😊</p>
              
              <div className="space-y-6">
                <button onClick={() => handleCheck(activeReminder.id)} className="w-full bg-green-600 text-white py-8 rounded-[2.5rem] font-black text-3xl shadow-xl flex items-center justify-center gap-4 active:scale-95 transition-all">
                  <ThumbsUp size={36} /> Maine le li
                </button>
                <button onClick={() => setActiveReminder(null)} className="w-full text-slate-400 py-4 font-black text-xl uppercase tracking-widest">Abhi nahi</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast.message && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white border-4 border-green-500 p-8 rounded-[3rem] shadow-2xl flex items-center gap-5 z-[400] w-[90%] max-w-md">
            <Sparkles className="text-green-500" size={40} />
            <p className="font-black text-2xl text-green-800">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Medications;