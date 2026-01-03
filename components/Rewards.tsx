
import React from 'react';
import { IMPACT_STATS } from '../constants';

const Rewards: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl mb-4 border border-white/30 shadow-inner">
           🏆
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest opacity-80">Eco Warrior Level 4</h2>
        <p className="text-4xl font-black mt-2">{IMPACT_STATS.ecoPoints}</p>
        <p className="text-xs font-medium opacity-90 mt-1">Available Eco-Points</p>
      </div>

      {/* Community Leaderboard */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h3 className="text-lg font-black text-slate-800 mb-6 flex justify-between items-center">
          Leaderboard (Machakos)
          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Top 10% Overall</span>
        </h3>
        <div className="space-y-4">
          {[
            { name: 'Sarah M.', points: 2850, rank: 1, me: false },
            { name: 'Juma (You)', points: 1250, rank: 12, me: true },
            { name: 'David K.', points: 1100, rank: 15, me: false },
            { name: 'Mercy W.', points: 980, rank: 22, me: false },
          ].map((user, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-3xl transition-all ${user.me ? 'bg-emerald-50 border-2 border-emerald-200' : 'hover:bg-slate-50 border-2 border-transparent'}`}>
              <span className={`w-8 text-center font-black text-sm ${user.rank === 1 ? 'text-amber-500' : 'text-slate-400'}`}>#{user.rank}</span>
              <div className="w-12 h-12 bg-slate-200 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                 <img src={`https://i.pravatar.cc/100?u=${user.name}`} alt="avatar" />
              </div>
              <div className="flex-1">
                <p className="font-black text-slate-800 text-sm">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Machakos Chapter</p>
              </div>
              <span className="font-black text-slate-900 text-sm">{user.points.toLocaleString()} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-emerald-800 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
         <div className="relative z-10">
            <h4 className="font-black text-2xl tracking-tight mb-2">Invite a Neighbor 🏘️</h4>
            <p className="text-sm text-emerald-100/70 max-w-sm leading-relaxed mb-6">
              Empower your community. Get 500 Kifalme Points for every neighbor who joins Kifalme Waste Management in Machakos.
            </p>
            <button className="bg-white text-emerald-800 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-emerald-400 hover:text-white transition-all shadow-xl shadow-emerald-950/20">
              Generate Invite Link
            </button>
         </div>
         <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      </div>
    </div>
  );
};

export default Rewards;
