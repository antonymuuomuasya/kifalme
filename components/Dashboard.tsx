
import React from 'react';
import { IMPACT_STATS } from '../constants';
import { AppTab } from '../types';

interface DashboardProps {
  setActiveTab: (tab: AppTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const points = IMPACT_STATS.ecoPoints;
  const growthLevel = Math.min(points / 200, 10);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Hero Card */}
        <div className="lg:col-span-2 bg-emerald-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 min-h-[300px]">
          <div className="relative z-10 flex-1 space-y-4">
            <p className="text-emerald-300 font-bold uppercase tracking-[0.2em] text-[10px]">Active Member • Machakos Hub</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Jambo, Juma! 👋</h2>
            <p className="text-emerald-100/70 text-sm max-w-sm leading-relaxed">
              You've recycled enough waste to power 42 local households this month. Your impact is real and growing!
            </p>
            <div className="pt-4">
              <span className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-950/50">Master Level Tier</span>
            </div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
             <div className="relative group">
                <svg width="140" height="180" viewBox="0 0 100 120" className="drop-shadow-2xl transform transition-transform group-hover:scale-110 duration-500">
                  <rect x="45" y="80" width="10" height="40" fill="#78350f" />
                  <circle cx="50" cy="50" r={25 + growthLevel * 3} fill="#10b981" fillOpacity="0.9" />
                  <circle cx="35" cy="40" r={20 + growthLevel * 2} fill="#059669" fillOpacity="0.8" />
                  <circle cx="65" cy="40" r={20 + growthLevel * 2} fill="#059669" fillOpacity="0.8" />
                  {points > 1000 && <circle cx="50" cy="30" r="10" fill="#fbbf24" className="animate-pulse" />}
                </svg>
                <div className="mt-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-center">
                  <p className="text-[10px] uppercase font-black text-emerald-300">Eco-Tree Vitality</p>
                  <p className="text-xl font-black">{growthLevel * 10}% Mature</p>
                </div>
             </div>
          </div>
          
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-400/5 rounded-full blur-[100px]"></div>
        </div>

        {/* Eco Points Highlight */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-center items-center text-center group transition-all hover:-translate-y-1">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner rotate-3 group-hover:rotate-0 transition-all">🏆</div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Points</p>
          <p className="text-6xl font-black text-slate-900 my-2">{points}</p>
          <div className="mt-6 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-600" style={{ width: '65%' }}></div>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-4 uppercase">750 pts to Next Tier Reward</p>
        </div>

      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Recycled', val: `${IMPACT_STATS.tonnesRecycled} Tons`, sub: 'Life-time mass', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: '♻️' },
          { label: 'CO2 Offset', val: `${IMPACT_STATS.carbonSaved} Tons`, sub: 'Atmospheric save', color: 'text-blue-600', bg: 'bg-blue-50', icon: '☁️' },
          { label: 'Pickups Done', val: IMPACT_STATS.pickupsCompleted, sub: 'Logistics success', color: 'text-orange-600', bg: 'bg-orange-50', icon: '🚚' },
          { label: 'Earnings', val: `KES ${IMPACT_STATS.totalEarnings.toLocaleString()}`, sub: 'Released to M-Pesa', color: 'text-slate-900', bg: 'bg-slate-100', icon: '💰' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-1 transition-all hover:shadow-md">
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center text-xl mb-4`}>{stat.icon}</div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
            <p className="text-[10px] font-medium text-slate-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Split Achievement & News Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
           <h3 className="text-lg font-black text-slate-800 mb-6 flex justify-between items-center">
             Verified Badges
             <button 
              onClick={() => setActiveTab('history')}
              className="text-xs text-emerald-600 underline font-bold hover:text-emerald-800 transition-colors"
             >
               View Wallet
             </button>
           </h3>
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             {[
               { name: 'Plastic Pro', icon: '🥤', color: 'bg-blue-50 border-blue-100' },
               { name: 'Early Bird', icon: '🌅', color: 'bg-amber-50 border-amber-100' },
               { name: 'Metal Master', icon: '🔩', color: 'bg-slate-100 border-slate-200' },
               { name: 'Green Hero', icon: '🌿', color: 'bg-emerald-50 border-emerald-100' },
             ].map((badge, i) => (
               <div key={i} className={`${badge.color} border p-4 rounded-3xl flex flex-col items-center gap-2 group cursor-pointer hover:scale-105 transition-all`}>
                 <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{badge.icon}</span>
                 <span className="text-[9px] font-black text-slate-700 uppercase tracking-tighter text-center">{badge.name}</span>
               </div>
             ))}
           </div>
        </section>

        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between">
           <div>
             <h3 className="text-lg font-black mb-2">Sustainable Communities</h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               Kifalme Waste Management is proud to announce the new "Youth Circle" program in Machakos Town. 
               Join over 2,000 students learning the value of the circular economy.
             </p>
           </div>
           <div className="mt-8 flex items-center justify-between">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(n => <img key={n} className="w-8 h-8 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?u=user${n}`} alt="" />)}
                 <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-black border-2 border-slate-900">+42</div>
              </div>
              <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-xs uppercase hover:bg-emerald-400 transition-colors">Join Local Chapter</button>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
