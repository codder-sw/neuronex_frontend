import React, { useState } from 'react';
import { 
  LayoutDashboard, Pill, Activity, ShieldCheck, 
  Leaf, Menu, X, Stethoscope, LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activePage, setActivePage, userRole, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 🟢 1. ELDER (Buzurg) ke liye sirf ye buttons dikhenge
  const elderMenu = [
    { id: 'Overview', label: '🏠 Overview', icon: <LayoutDashboard size={28}/> },
    { id: 'Medications', label: '💊 Dawaiyan', icon: <Pill size={28}/> },
    { id: 'Trends', label: '📊 Trends', icon: <Activity size={28}/> },
    { id: 'Remedies', label: '🌿 Nuskhe', icon: <Leaf size={28}/> },
    { id: 'Vault', label: '🔐 Vault', icon: <ShieldCheck size={28}/> },
  ];

  // 🟣 2. CARETAKER ke liye sirf ye buttons dikhenge
  const caretakerMenu = [
    { id: 'Caretaker', label: '👨‍⚕️ Dashboard', icon: <Stethoscope size={28}/> },
    { id: 'Medications', label: '💊 Med Tracker', icon: <Pill size={28}/> },
    { id: 'Trends', label: '📊 Health Log', icon: <Activity size={28}/> },
    { id: 'Vault', label: '🔐 Docs Vault', icon: <ShieldCheck size={28}/> },
  ];

  // 🧠 3. LOGIC: Role ke hisaab se sahi menu chuno
  // Agar role 'caretaker' hai toh caretakerMenu, nahi toh elderMenu
  const menuToDisplay = userRole === 'caretaker' ? caretakerMenu : elderMenu;

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed top-5 left-5 z-[60] p-3 bg-white rounded-2xl shadow-lg md:hidden border border-slate-100">
          <Menu size={32} className="text-[#278c5f]" />
        </button>
      )}

      <AnimatePresence>
        {(isOpen || window.innerWidth > 768) && (
          <>
            {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-[100] md:hidden backdrop-blur-sm" />}
            
            <motion.aside 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 z-[110] w-72 bg-white border-r p-8 shadow-2xl md:shadow-none flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="text-3xl font-black text-[#278c5f] italic tracking-tighter">NeuroNex</div>
                <button onClick={() => setIsOpen(false)} className="md:hidden p-2 bg-slate-100 rounded-full"><X size={24}/></button>
              </div>

              {/* ✨ 4. Sirf filtered menu render hoga */}
              <nav className="space-y-4 flex-1">
                {menuToDisplay.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActivePage(item.id); setIsOpen(false); }}
                    className={`w-full flex items-center gap-5 p-5 rounded-[2rem] font-black text-xl transition-all duration-300 ${
                      activePage === item.id 
                      ? 'bg-[#278c5f] text-white shadow-xl' 
                      : 'text-gray-400 hover:bg-green-50 hover:text-[#278c5f]'
                    }`}
                  >
                    {item.icon} <span>{item.label.split(' ')[1]}</span>
                  </button>
                ))}
              </nav>

              {/* 🔴 5. Logout Button (Isse Login screen wapis aayegi) */}
              <button 
                onClick={onLogout}
                className="mt-4 flex items-center gap-4 p-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
              >
                <LogOut size={24} /> Logout
              </button>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;