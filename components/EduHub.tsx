
import React, { useState, useEffect } from 'react';
import { getSustainabilityTips, getLocalEcoNews } from '../services/geminiService';
import { SustainabilityTip } from '../types';

const EduHub: React.FC = () => {
  const [tips, setTips] = useState<SustainabilityTip[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [tipsData, newsData] = await Promise.all([
        getSustainabilityTips(),
        getLocalEcoNews()
      ]);
      setTips(tipsData);
      setNews(newsData);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Knowledge Center</h2>
          <p className="text-slate-500 font-medium">Empowering the circular economy in Kenya through AI insights.</p>
        </div>
        <div className="flex gap-2">
           <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-200 shadow-sm">AI Analytics 2.0</span>
           <span className="bg-slate-100 text-slate-800 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200">2024 Trends</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Local News Grounding Column */}
        <div className="xl:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                🌍 Local Environmental News
                <span className="text-[8px] font-bold bg-white px-2 py-0.5 rounded-full border border-slate-100">Live Grounding</span>
              </h3>
              <button className="text-[10px] text-emerald-600 font-black uppercase tracking-widest hover:underline">Refresh Feed</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {loading ? (
               [1, 2, 3, 4].map(n => <div key={n} className="h-48 bg-white rounded-[2rem] border border-slate-100 animate-pulse shadow-sm"></div>)
             ) : (
               news.map((item, idx) => (
                 <a 
                   key={idx} 
                   href={item.url} 
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all group hover:-translate-y-1"
                 >
                   <div>
                     <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.source}</p>
                        <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                     </div>
                     <h4 className="font-black text-slate-800 text-lg leading-snug line-clamp-3">{item.title}</h4>
                   </div>
                   <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Verified Circular Economy Story
                   </div>
                 </a>
               ))
             )}
           </div>
        </div>

        {/* AI Tips Sidebar */}
        <div className="space-y-6">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-2">Daily AI Tips</h3>
           <div className="space-y-4">
              {loading ? (
                <div className="h-64 bg-slate-100 rounded-[2rem] animate-pulse"></div>
              ) : (
                tips.map((tip, idx) => (
                  <div key={idx} className="bg-emerald-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group hover:bg-emerald-800 transition-colors">
                     <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                           <span className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{tip.category}</span>
                           <span className="text-2xl opacity-40">✨</span>
                        </div>
                        <h4 className="font-black text-xl mb-3 pr-4 tracking-tight">{tip.title}</h4>
                        <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">{tip.content}</p>
                     </div>
                     <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                  </div>
                ))
              )}
           </div>
           
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-3xl mx-auto">🌱</div>
              <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Global Carbon Trend</h5>
              <p className="text-2xl font-black text-emerald-700">+8.4%</p>
              <p className="text-[10px] text-slate-400 font-medium">Waste recovery increase since Hub Athi River opened in 2024.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EduHub;
