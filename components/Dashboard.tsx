
import React from 'react';
import { IMPACT_STATS } from '../constants';

const Dashboard: React.FC = () => {
  const points = IMPACT_STATS.ecoPoints;
  const growthLevel = Math.min(points / 200, 10); // Max growth at 2000 points

  return (
    <div className="space-y-6">
      {/* Welcome Card & Eco-Tree */}
      <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden min-h-[220px]">
        <div className="relative z-10">
          <p className="text-emerald-200 text-sm font-medium">Habari, Juma!</p>
          <h2 className="text-2xl font-bold mt-1">Impact Level: Master</h2>
          
          <div className="mt-8 flex items-end gap-6">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-widest text-emerald-100">Eco Points</p>
              <p className="text-2xl font-black">{points}</p>
            </div>
            {/* Visual Growth Tree */}
            <div className="flex-1 flex flex-col items-center">
               <div className="relative">
                  {/* Simplistic Tree SVG that grows based on points */}
                  <svg width="80" height="100" viewBox="0 0 100 120" className="transition-all duration-1000">
                    <rect x="45" y="80" width="10" height="40" fill="#78350f" />
                    <circle cx="50" cy="50" r={20 + growthLevel * 3} fill="#10b981" fillOpacity="0.8" />
                    <circle cx="35" cy="40" r={15 + growthLevel * 2} fill="#059669" fillOpacity="0.7" />
                    <circle cx="65" cy="40" r={15 + growthLevel * 2} fill="#059669" fillOpacity="0.7" />
                    {points > 1000 && <circle cx="50" cy="30" r="10" fill="#f59e0b" />} {/* Fruit for high points */}
                  </svg>
                  <div className="absolute -bottom-2 w-full text-center">
                    <span className="text-[8px] bg-emerald-500/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Eco-Tree v2.0</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-800 rounded-full opacity-50"></div>
      </div>

      {/* Badges / Achievements (Feature 9) */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3 px-1">Eco Achievements</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
           {[
             { name: 'Plastic Pro', icon: '🥤', color: 'bg-blue-50 border-blue-100' },
             { name: 'Early Bird', icon: '🌅', color: 'bg-amber-50 border-amber-100' },
             { name: 'Metal Master', icon: '🔩', color: 'bg-slate-100 border-slate-200' },
             { name: 'Green Hero', icon: '🌿', color: 'bg-emerald-50 border-emerald-100' },
           ].map((badge, i) => (
             <div key={i} className={`${badge.color} border min-w-[100px] p-3 rounded-2xl flex flex-col items-center gap-1`}>
               <span className="text-2xl">{badge.icon}</span>
               <span className="text-[10px] font-bold text-slate-700 whitespace-nowrap">{badge.name}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
          <p className="text-2xl font-bold text-slate-800">{IMPACT_STATS.tonnesRecycled}t</p>
          <p className="text-xs text-slate-500 font-medium">Total Recycled</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <p className="text-2xl font-bold text-slate-800">{IMPACT_STATS.carbonSaved}t</p>
          <p className="text-xs text-slate-500 font-medium">CO2 Offset</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
