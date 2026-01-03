
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
    { id: 'sell', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Sell' },
    { id: 'history', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Earnings' },
    { id: 'map', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Maps' },
    { id: 'hub', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'Hub' },
    { id: 'rewards', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', label: 'Eco' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center text-white font-bold">K</div>
          <h1 className="font-bold text-emerald-900 tracking-tight text-xs">KIFALME WASTE MANAGEMENT</h1>
        </div>
        <div className="flex items-center gap-3">
           <div className="text-right">
              <p className="text-[8px] font-black text-slate-400 uppercase leading-none">Status</p>
              <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 justify-end">Verified <span className="w-1 h-1 bg-emerald-600 rounded-full animate-pulse"></span></p>
           </div>
           <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-emerald-50 shadow-inner">
             <img src="https://i.pravatar.cc/100?u=juma" alt="Avatar" />
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AppTab)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id ? 'text-emerald-700' : 'text-slate-400'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-emerald-50' : 'bg-transparent'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeTab === item.id ? 2.5 : 2} d={item.icon} />
              </svg>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
