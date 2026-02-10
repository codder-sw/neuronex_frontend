import React from 'react';
import { User, HeartHandshake } from 'lucide-react'; // Icons
import { motion } from 'framer-motion'; // Animation ke liye

const Login = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      
      {/* 1. Welcoming Header with Animation */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black text-[#278c5f] mb-4">NeuroNex Swagat</h1>
        <p className="text-xl text-slate-500 font-bold">Kripya apni pehchan batayein</p>
      </motion.div>

      {/* 2. Selection Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* Card 1: ELDER (Buzurg) */}
        <motion.button 
          whileHover={{ scale: 1.02 }} // Mouse upar lane par thoda bada hoga
          whileTap={{ scale: 0.95 }}   // Click karne par thoda dabega
          onClick={() => onLogin('elder')}
          className="bg-white p-10 rounded-[3rem] border-4 border-transparent hover:border-[#278c5f] shadow-xl flex flex-col items-center gap-6 group transition-all"
        >
          <div className="p-8 bg-green-50 rounded-full text-[#278c5f] group-hover:bg-[#278c5f] group-hover:text-white transition-colors">
            <User size={64} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Main Buzurg Hoon</h2>
            <p className="text-slate-400 font-bold mt-2">(I am an Elder)</p>
          </div>
        </motion.button>

        {/* Card 2: CARETAKER (Dekh-bhal karne wala) */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLogin('caretaker')}
          className="bg-white p-10 rounded-[3rem] border-4 border-transparent hover:border-indigo-500 shadow-xl flex flex-col items-center gap-6 group transition-all"
        >
          <div className="p-8 bg-indigo-50 rounded-full text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
            <HeartHandshake size={64} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Main Caretaker Hoon</h2>
            <p className="text-slate-400 font-bold mt-2">(I am a Caretaker)</p>
          </div>
        </motion.button>

      </div>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="mt-12 text-slate-400 font-bold text-sm"
      >
        Surakshit • Aasaan • Bharosemand
      </motion.p>
    </div>
  );
};

export default Login;