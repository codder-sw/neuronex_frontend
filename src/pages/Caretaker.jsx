import React from 'react';
import { HeartPulse, Activity, CheckCircle, Clock, Brain, Moon, Smile, FileText, AlertCircle } from 'lucide-react';
import InfoCard from '../components/InfoCard'; 

// 👇 Props mein 'medicines' receive kiya jo App.jsx se aa raha hai
const Caretaker = ({ medicines }) => {
  return (
    <div className="space-y-10 pb-24 max-w-6xl mx-auto p-6 text-slate-800">
      
      {/* 1. HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-10 rounded-[3rem] text-white shadow-xl">
        <h2 className="text-4xl font-black mb-2">Caretaker Dashboard</h2>
        <p className="text-xl font-medium opacity-90">Buzurgon ki health aur dawaiyon ki live monitoring.</p>
      </div>

      {/* 2. VITALS SNAPSHOT (Visual only for now) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Mood" color="emerald" icon={<Smile size={28} />}>
           <div className="text-3xl font-black text-emerald-600">Khush 😊</div>
        </InfoCard>
        <InfoCard title="Neend" color="indigo" icon={<Moon size={28} />}>
           <div className="text-3xl font-black text-indigo-600">6.5 Ghante</div>
        </InfoCard>
        <InfoCard title="Stress" color="orange" icon={<Brain size={28} />}>
           <div className="text-3xl font-black text-orange-600">Normal</div>
        </InfoCard>
      </div>

      {/* 3. SYNCED MEDICINE TRACKER (The Magic Part) */}
      <div>
        <div className="flex justify-between items-center px-4 mb-4">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <FileText className="text-blue-500" /> Elder's Medicine Log
          </h3>
          <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full font-bold text-sm animate-pulse">
            Live Syncing...
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {medicines.map((med) => (
            <div key={med.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${med.status === 'Taken' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                   <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-black text-xl text-slate-700">{med.name}</h4>
                  <p className="text-slate-400 font-bold">{med.time}</p>
                </div>
              </div>
              
              {/* LIVE STATUS INDICATOR */}
              <div className="flex items-center gap-4">
                {med.status === 'Taken' ? (
                  <span className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-black flex items-center gap-2">
                    <CheckCircle size={20} /> Taken
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-700 px-6 py-2 rounded-full font-black flex items-center gap-2">
                    <AlertCircle size={20} /> Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MEDICAL HISTORY CARD */}
      <div className="mt-8 p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
         <h4 className="font-black text-slate-400 uppercase tracking-widest text-sm mb-4">Quick Note</h4>
         <p className="text-slate-600 font-medium italic">
            "Agar koi dawai 'Pending' dikh rahi hai toh kripya Dadaji ko call karke yaad dilayein."
         </p>
      </div>

    </div>
  );
};

export default Caretaker;