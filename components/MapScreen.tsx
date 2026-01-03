
import React, { useState } from 'react';
import { MOCK_COLLECTION_POINTS } from '../constants';

const MapScreen: React.FC = () => {
  const [selected, setSelected] = useState(MOCK_COLLECTION_POINTS[0]);

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Map Mockup */}
      <div className="h-64 bg-slate-200 rounded-3xl relative overflow-hidden shadow-inner flex items-center justify-center">
         <div className="absolute inset-0 bg-emerald-50 overflow-hidden">
            {/* Mock Map Lines */}
            <div className="w-[200%] h-px bg-slate-200 rotate-45 absolute top-1/2 -left-1/2"></div>
            <div className="w-[200%] h-px bg-slate-200 -rotate-45 absolute top-1/4 -left-1/2"></div>
            <div className="h-[200%] w-px bg-slate-200 absolute left-1/3 -top-1/2"></div>
            <div className="h-[200%] w-px bg-slate-200 absolute left-2/3 -top-1/2"></div>

            {/* Pins */}
            {MOCK_COLLECTION_POINTS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                style={{ top: `${50 + p.lat * 50}%`, left: `${50 + p.lng * 20}%` }}
                className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all ${
                  selected.id === p.id ? 'z-10 scale-125' : 'opacity-70'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                  selected.id === p.id ? 'bg-emerald-600' : 'bg-slate-400'
                }`}></div>
                <div className={`absolute bottom-full mb-1 bg-white px-2 py-0.5 rounded shadow text-[8px] font-bold whitespace-nowrap transition-all ${
                  selected.id === p.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}>
                  {p.name}
                </div>
              </button>
            ))}
         </div>
         <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
            <h4 className="font-bold text-slate-800">{selected.name}</h4>
            <p className="text-xs text-slate-500">{selected.location}</p>
         </div>
      </div>

      {/* List */}
      <div className="flex-1">
        <h3 className="font-bold text-slate-800 mb-4 px-2">Kifalme Collection Points</h3>
        <div className="space-y-3">
          {MOCK_COLLECTION_POINTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selected.id === p.id ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-100' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{p.description}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
