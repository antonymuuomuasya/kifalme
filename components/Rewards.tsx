
import React from 'react';
import { IMPACT_STATS } from '../constants';

const Rewards: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl mb-4 border border-white/30 shadow-inner">
           🏆
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest opacity-80">Eco Warrior Level 4</h2>
        <p className="text-4xl font-black mt-2">{IMPACT_STATS.ecoPoints}</p>
        <p className="text-xs font-medium opacity-90 mt-1">Available Eco-Points</p>
      </div>

      {/* Community Leaderboard (Feature 5) */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4 flex justify-between items-center">
          Leaderboard (Machakos)
          <span className="text-[10px] text-emerald-600 font-bold">Top 10%</span>
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Sarah M.', points: 2850, rank: 1, me: false },
            { name: 'Juma (You)', points: 1250, rank: 12, me: true },
            { name: 'David K.', points: 1100, rank: 15, me: false },
          ].map((user, i) => (
            <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${user.me ? 'bg-emerald-50 ring-1 ring-emerald-200' : ''}`}>
              <span className={`w-6 text-center font-bold text-xs ${i === 0 ? 'text-amber-500' : 'text-slate-400'}`}>#{user.rank}</span>
              <div className="w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
                 <img src={`https://i.pravatar.cc/50?u=${user.name}`} alt="avatar" />
              </div>
              <span className="flex-1 font-bold text-slate-800 text-sm">{user.name}</span>
              <span className="font-black text-slate-600 text-xs">{user.points} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcycled Marketplace (Feature 8) */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 text-lg">Upcycled Marketplace</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Recycled Tote', points: 800, img: 'https://picsum.photos/seed/tote/200' },
            { title: 'Glass Jar Set', points: 1200, img: 'https://picsum.photos/seed/jar/200' },
            { title: 'Metal Art', points: 2500, img: 'https://picsum.photos/seed/art/200' },
            { title: 'Textile Rug', points: 3000, img: 'https://picsum.photos/seed/rug/200' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 group shadow-sm">
               <div className="h-28 relative">
                 <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                 <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded-full text-[8px] font-black text-emerald-700">
                    KIFALME BRAND
                 </div>
               </div>
               <div className="p-3">
                 <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                 <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] font-bold text-emerald-600">{item.points} pts</span>
                    <button className="text-[10px] bg-slate-900 text-white px-2 py-1 rounded-lg">Buy</button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program (Feature 10) */}
      <div className="bg-emerald-800 p-6 rounded-3xl text-white">
         <h4 className="font-bold text-lg">Invite a Neighbor</h4>
         <p className="text-xs text-emerald-100 mt-1">Get 500 Seed Points for every neighbor who joins Kifalme in Machakos.</p>
         <button className="mt-4 w-full bg-white text-emerald-800 font-bold py-3 rounded-2xl text-sm shadow-xl">
           Share Invite Link
         </button>
      </div>
    </div>
  );
};

export default Rewards;
