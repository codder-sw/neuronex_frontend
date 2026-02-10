import React, { useState } from 'react';
import { User, HeartHandshake, Mail, Lock, CheckCircle, ArrowRight, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = ({ onSwitchToLogin }) => {
  const [role, setRole] = useState('elder'); // Default role
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. Validation Logic
    if (!formData.name || !formData.email || !formData.password) {
      setError("Kripya sabhi jaankari bharein.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password ek jaise nahi hain.");
      return;
    }

    // 2. Dummy Registration Success
    setSuccess(true);
    // 2 second baad wapis login par bhej denge
    setTimeout(() => onSwitchToLogin(), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl w-full max-w-2xl border-2 border-slate-100"
      >
        <h2 className="text-4xl font-black text-[#278c5f] mb-2 text-center">Naya Khata (Register)</h2>
        <p className="text-xl text-slate-400 font-bold text-center mb-10">NeuroNex Parivaar mein judiye!</p>

        {success ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-green-50 p-10 rounded-[3rem] text-center border-2 border-green-100">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={80} />
            <h3 className="text-3xl font-black text-green-700">Registration Safal!</h3>
            <p className="text-xl text-green-600 font-bold mt-2">Ab aap Login kar sakte hain.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Role Selection (Bade Buttons) */}
            <div className="grid grid-cols-2 gap-6">
              <button type="button" onClick={() => setRole('elder')} className={`p-6 rounded-[2.5rem] border-4 flex flex-col items-center gap-2 transition-all ${role === 'elder' ? 'border-[#278c5f] bg-green-50' : 'border-slate-50 bg-white opacity-50'}`}>
                <User size={32} className={role === 'elder' ? 'text-[#278c5f]' : 'text-slate-400'} />
                <span className="font-black text-lg">Elder</span>
              </button>
              <button type="button" onClick={() => setRole('caretaker')} className={`p-6 rounded-[2.5rem] border-4 flex flex-col items-center gap-2 transition-all ${role === 'caretaker' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-50 bg-white opacity-50'}`}>
                <HeartHandshake size={32} className={role === 'caretaker' ? 'text-indigo-500' : 'text-slate-400'} />
                <span className="font-black text-lg">Caretaker</span>
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
               <div className="bg-slate-50 p-5 rounded-[2rem] flex items-center gap-4 border-2 border-transparent focus-within:border-blue-400 transition-all">
                <User className="text-slate-400" />
                <input type="text" placeholder="Pura Naam" className="bg-transparent w-full text-xl font-bold outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="bg-slate-50 p-5 rounded-[2rem] flex items-center gap-4 border-2 border-transparent focus-within:border-blue-400 transition-all">
                <Mail className="text-slate-400" />
                <input type="email" placeholder="Email Address" className="bg-transparent w-full text-xl font-bold outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-[2rem] flex items-center gap-4 border-2 border-transparent focus-within:border-blue-400 transition-all">
                  <Lock className="text-slate-400" />
                  <input type="password" placeholder="Password" className="bg-transparent w-full text-xl font-bold outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
                <div className="bg-slate-50 p-5 rounded-[2rem] flex items-center gap-4 border-2 border-transparent focus-within:border-blue-400 transition-all">
                  <Lock className="text-slate-400" />
                  <input type="password" placeholder="Confirm" className="bg-transparent w-full text-xl font-bold outline-none" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="bg-red-50 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-bold"><XCircle size={20}/> {error}</div>}

            <button type="submit" className="w-full bg-[#278c5f] text-white p-7 rounded-[2.5rem] font-black text-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
              Register Karein <ArrowRight />
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <button onClick={onSwitchToLogin} className="text-slate-400 font-bold text-lg hover:text-[#278c5f] transition-colors underline decoration-2 underline-offset-4">Pehle se account hai? Login Karein</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;