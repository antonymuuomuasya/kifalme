
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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-slate-800">Learn & Impact</h2>
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">AI Insights</span>
      </div>

      {/* Local News Grounding (Feature 3) */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
           🌍 Local Eco-News
           <span className="text-[8px] bg-slate-100 text-slate-400 px-1 rounded">via Google Search</span>
        </h3>
        {loading ? (
          <div className="h-20 bg-slate-100 animate-pulse rounded-2xl w-full"></div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {news.map((item, idx) => (
              <a 
                key={idx} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="min-w-[240px] bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">{item.source}</p>
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-2">{item.title}</h4>
                </div>
                <div className="mt-4 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                   <span>Read more</span>
                   <span>→</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-700">Daily AI Tips</h3>
        {loading ? (
          <div className="space-y-3">
             <div className="h-32 bg-slate-100 animate-pulse rounded-2xl"></div>
          </div>
        ) : (
          tips.map((tip, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 bg-emerald-50 rounded-bl-3xl group-hover:bg-emerald-100 transition-colors">
                 <span className="text-[10px] font-bold text-emerald-600 uppercase">{tip.category}</span>
               </div>
               <h4 className="font-bold text-slate-800 text-lg mb-2 pr-12">{tip.title}</h4>
               <p className="text-sm text-slate-600 leading-relaxed">{tip.content}</p>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="font-bold text-slate-700 mb-4">Carbon Impact (Global)</h3>
        <div className="bg-slate-900 rounded-3xl p-6 text-white">
           <div className="flex justify-between items-start mb-4">
              <p className="text-xs text-emerald-400 font-bold uppercase">Kenya Market Trend</p>
              <span className="text-2xl">📈</span>
           </div>
           <p className="text-lg font-bold">8.4% increase in plastic recovery since Kifalme Hub Athi River opened.</p>
           <p className="text-xs text-slate-400 mt-2">Source: Kifalme Data Analytics v1.2</p>
        </div>
      </div>
    </div>
  );
};

export default EduHub;
