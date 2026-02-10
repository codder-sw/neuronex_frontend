import React, { useState } from 'react';
import { Leaf, Search, Wind, Droplets, Sun, Flame, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Remedies = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Nuskhe ka Data
  const allRemedies = [
    { 
      id: 1, 
      title: "Adrak-Shahad (Cough)", 
      desc: "Purani khansi ke liye adrak ka ras aur shahad mila kar lein.", 
      category: "Cough",
      icon: <Wind size={24} />,
      color: "bg-orange-50 text-orange-600"
    },
    { 
      id: 2, 
      title: "Jeera Paani (Digestion)", 
      desc: "Pet ki gas aur pachan ke liye bhuna jeera paani mein ubaal kar piyein.", 
      category: "Stomach",
      icon: <Droplets size={24} />,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      id: 3, 
      title: "Haldi Doodh (Immunity)", 
      desc: "Raat ko sone se pehle garam haldi doodh peene se chot aur bimari jaldi theek hoti hai.", 
      category: "General",
      icon: <Flame size={24} />,
      color: "bg-yellow-50 text-yellow-700"
    },
    { 
      id: 4, 
      title: "Tulsi Tea (Cold)", 
      desc: "Sardi-zukham mein Tulsi aur Kaali Mirch ki chai raahat deti hai.", 
      category: "Cold",
      icon: <Leaf size={24} />,
      color: "bg-green-50 text-green-600"
    }
  ];

  // Search Logic
  const filteredRemedies = allRemedies.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-24 max-w-6xl mx-auto p-6">
      
      {/* 🟢 2. HEADER SECTION */}
      <div className="bg-gradient-to-r from-green-600 to-teal-500 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
        <h2 className="text-4xl font-black mb-2">Gharelu Nuskhe</h2>
        <p className="text-xl font-medium opacity-90">Dadi-Nani ke anmol aur asarkaar upchaar.</p>
        <Leaf className="absolute -right-5 -bottom-5 text-white/10 w-48 h-48 rotate-12" />
      </div>

      {/* 🔍 3. SEARCH BAR */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors" size={28} />
        <input 
          type="text" 
          placeholder="Bimari ya nuskha search karein (e.g. Cough)..."
          className="w-full p-8 pl-16 bg-white rounded-[2.5rem] border-2 border-slate-50 shadow-md focus:border-green-400 outline-none text-xl font-bold transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 📦 4. REMEDY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredRemedies.length > 0 ? (
          filteredRemedies.map((item) => (
            <motion.div 
              layout
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[3rem] border-2 border-slate-50 shadow-lg flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className={`p-5 rounded-2xl ${item.color}`}>
                  {item.icon}
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 font-bold text-lg leading-relaxed">{item.desc}</p>
              </div>
              <button className="mt-4 flex items-center gap-2 text-green-600 font-black hover:gap-4 transition-all uppercase text-sm tracking-widest">
                Poora Padhein <Heart size={16} />
              </button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <p className="text-2xl font-black text-slate-400 italic">"Humein koi nuskha nahi mila, kuch aur search karein!"</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Remedies;