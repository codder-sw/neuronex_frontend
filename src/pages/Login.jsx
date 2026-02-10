import React, { useState } from 'react';
import { User, HeartHandshake, Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [role, setRole] = useState('elder'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simple Validation
    if (!email || !password) {
      setError("Email aur Password zaruri hain.");
      return;
    }
    // Dummy Auth successful - Role pass kar rahe hain App.jsx ko
    onLogin(role); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl w-full max-w-2xl border-2 border-slate-50">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-green-50 rounded-3xl mb-4"><Sparkles className="text-[#278c5f]" size={32}/></div>
          <h1 className="text-5xl font-black text-[#278c5f] mb-2 tracking-tight">NeuroNex</h1>
          <p className="text-xl text-slate-400 font-bold italic tracking-tighter">Apno ki Sehat ka Saathi</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-8">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-6">
            <button type="button" onClick={() => setRole('elder')} className={`p-8 rounded-[3rem] border-4 flex flex-col items-center gap-3 transition-all ${role === 'elder' ? 'border-[#278c5f] bg-green-50 shadow-lg scale-105' : 'border-slate-50 opacity-40'}`}>
              <User size={48} className={role === 'elder' ? 'text-[#278c5f]' : 'text-slate-400'} />
              <span className="font-black text-xl">Elder</span>
            </button>
            <button type="button" onClick={() => setRole('caretaker')} className={`p-8 rounded-[3rem] border-4 flex flex-col items-center gap-3 transition-all ${role === 'caretaker' ? 'border-indigo-500 bg-indigo-50 shadow-lg scale-105' : 'border-slate-50 opacity-40'}`}>
              <HeartHandshake size={48} className={role === 'caretaker' ? 'text-indigo-500' : 'text-slate-400'} />
              <span className="font-black text-xl">Caretaker</span>
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-5">
            <div className="bg-slate-50 p-6 rounded-[2.5rem] flex items-center gap-4 border-2 border-transparent focus-within:border-blue-400 transition-all">
              <Mail className="text-slate-400" size={28} />
              <input type="email" placeholder="Email Address" className="bg-transparent w-full text-2xl font-bold outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="bg-slate-50 p-6 rounded-[2.5rem] flex items-center gap-4 border-2 border-transparent focus-within:border-blue-400 transition-all">
              <Lock className="text-slate-400" size={28} />
              <input type="password" placeholder="Password" className="bg-transparent w-full text-2xl font-bold outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 font-bold text-center bg-red-50 p-4 rounded-3xl">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-[#2b6cb0] text-white p-8 rounded-[3rem] font-black text-3xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4">
            <LogIn size={32} /> Login Karein
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-12 text-center border-t-2 border-slate-50 pt-8">
          <p className="text-slate-400 font-bold text-lg mb-4">Naya account banana hai?</p>
          <button onClick={onSwitchToRegister} className="text-[#278c5f] font-black text-2xl hover:underline decoration-4 underline-offset-8 transition-all">Register (Naya Khata)</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;