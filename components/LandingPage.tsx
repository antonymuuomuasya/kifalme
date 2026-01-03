
import React from 'react';
import { AppTab } from '../types';

interface LandingPageProps {
  onLogin: (initialTab?: AppTab) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-8 md:px-12 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-white font-black text-xl">K</div>
          <div className="leading-none">
            <h1 className="font-black text-lg tracking-tighter text-emerald-950 uppercase">KIFALME</h1>
            <p className="text-[9px] text-emerald-600 font-bold tracking-widest uppercase">Waste Management</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => onLogin('sell')}
            className="text-sm font-bold text-slate-500 hover:text-emerald-900 transition-colors"
          >
            How it Works
          </button>
          <a href="#features" className="text-sm font-bold text-slate-500 hover:text-emerald-900 transition-colors">Our Impact</a>
          <button 
            onClick={() => onLogin('home')}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-800 transition-all active:scale-95"
          >
            Sign In
          </button>
        </div>
        <div className="md:hidden">
            <button onClick={() => onLogin('home')} className="text-xs font-black uppercase text-emerald-700 underline tracking-widest">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in slide-in-from-left duration-700">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Kenya's Smart Circular Economy</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Turn your <span className="text-emerald-600">waste</span> into <span className="text-emerald-700">wealth.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
            Kifalme is the leading platform in Kenya for smart waste management. Sell your recyclables, track your carbon footprint, and get paid instantly via M-Pesa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={() => onLogin('sell')}
              className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all active:scale-95"
            >
              Start Selling Now
            </button>
            <button 
              onClick={() => onLogin('sell')}
              className="bg-slate-50 text-slate-900 px-10 py-5 rounded-[2rem] text-center font-black text-sm uppercase tracking-widest border border-slate-200 hover:bg-white transition-all shadow-sm"
            >
              See How It Works
            </button>
          </div>
          <div className="flex items-center gap-6 pt-6">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => <img key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" src={`https://i.pravatar.cc/100?u=user${i}`} alt="User" />)}
             </div>
             <p className="text-xs text-slate-400 font-bold">Joined by <span className="text-slate-900 font-black">2,500+</span> Kenyan households this week</p>
          </div>
        </div>

        <div className="relative animate-in slide-in-from-right duration-700">
          <div className="bg-gradient-to-br from-emerald-100 to-teal-50 rounded-[4rem] p-12 relative overflow-hidden group">
            <div className="bg-white p-8 rounded-3xl shadow-2xl relative z-10 transform -rotate-2 group-hover:rotate-0 transition-transform duration-700">
               <div className="flex justify-between items-center mb-6">
                 <p className="font-black text-slate-800 uppercase tracking-tighter">Earnings Report</p>
                 <span className="bg-emerald-100 text-emerald-700 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">Verified</span>
               </div>
               <div className="space-y-4">
                 <div className="flex justify-between text-xs font-bold text-slate-400">
                   <span>PET Plastics (42kg)</span>
                   <span className="text-slate-900">KES 840</span>
                 </div>
                 <div className="h-px bg-slate-100"></div>
                 <div className="flex justify-between items-center">
                   <span className="text-xs font-black text-emerald-600">Sent to M-Pesa</span>
                   <span className="text-2xl font-black text-slate-900 tracking-tighter">KES 840.00</span>
                 </div>
               </div>
            </div>
            
            <div className="mt-8 bg-emerald-900 text-white p-8 rounded-3xl relative z-10 transform rotate-2 group-hover:rotate-0 transition-all duration-700">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl">🌱</div>
                 <div>
                   <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">Impact Stats</p>
                   <p className="text-lg font-black tracking-tight">1.2 Tons CO2 Offset</p>
                 </div>
               </div>
               <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">
                 Equivalent to planting 15 trees in the Machakos reforestation belt.
               </p>
            </div>

            <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-300/20 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">The Platform</h3>
             <h2 className="text-4xl font-black text-slate-900 tracking-tight">Built for a cleaner Kenya.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Scheduled Pickups', desc: 'Choose a date and time that works for you. Our drivers come directly to your door.', icon: '📅', color: 'bg-blue-50' },
              { title: 'Local Collection', desc: 'Over 26 hubs across Machakos, Athi River, and Nairobi for easy drop-offs.', icon: '🚚', color: 'bg-amber-50' },
              { title: 'Instant Payouts', desc: 'Direct M-Pesa transfers the moment your waste is verified by our hub teams.', icon: '💰', color: 'bg-emerald-50' }
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 ${f.color} rounded-3xl flex items-center justify-center text-3xl mb-8`}>{f.icon}</div>
                <h4 className="text-xl font-black text-slate-800 mb-4">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="bg-emerald-950 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
               <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Ready to clean up and cash in?</h2>
               <p className="text-emerald-100/70 text-lg">Join the thousands of Kenyans already making an impact with Kifalme Waste Management.</p>
               <button 
                onClick={() => onLogin('home')}
                className="bg-white text-emerald-950 px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-emerald-400 hover:text-white transition-all"
               >
                 Create Free Account
               </button>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
         </div>
         <div className="mt-12 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2024 KIFALME WASTE MANAGEMENT • ATHI RIVER, KENYA</p>
         </div>
      </section>
    </div>
  );
};

export default LandingPage;
