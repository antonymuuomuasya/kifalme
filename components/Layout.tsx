
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
    { id: 'sell', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Sell Waste' },
    { id: 'history', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Earnings' },
    { id: 'map', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Maps' },
    { id: 'rewards', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', label: 'Eco Rewards' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white fixed h-full z-30 shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl">K</div>
          <div className="leading-none">
            <h1 className="font-black text-xs tracking-tighter">KIFALME</h1>
            <p className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">Waste Mgmt</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AppTab)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border-2 border-emerald-500/50">
               <img src="https://i.pravatar.cc/100?u=juma" alt="Profile" />
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-xs font-black truncate">Juma M. Kenya</p>
               <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Master level</p>
             </div>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all font-bold text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Header (Web) */}
        <header className="hidden md:flex items-center justify-between p-6 bg-white border-b border-slate-100 sticky top-0 z-20">
          <h2 className="font-black text-slate-800 uppercase tracking-widest text-sm">
            {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex flex-col text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verification</p>
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-end">Certified Entity <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span></p>
            </div>
            <button className="bg-slate-100 p-2.5 rounded-xl hover:bg-slate-200 transition-colors">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden p-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">K</div>
            <h1 className="font-bold text-emerald-900 tracking-tighter text-xs uppercase">KIFALME</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              aria-label="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-emerald-500/30">
               <img src="https://i.pravatar.cc/50?u=juma" alt="Profile" />
            </div>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8">
          {children}
        </main>

        {/* Bottom Nav (Mobile Only) */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
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
              <span className="text-[8px] font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
