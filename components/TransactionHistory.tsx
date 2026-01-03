
import React, { useState } from 'react';
import { MOCK_TRANSACTIONS, IMPACT_STATS } from '../constants';
import { PickupTransaction } from '../types';

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<PickupTransaction[]>(MOCK_TRANSACTIONS);

  const togglePaymentStatus = (id: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          paymentStatus: t.paymentStatus === 'Paid' ? 'Pending' : 'Paid',
          status: 'Completed'
        };
      }
      return t;
    }));
  };

  const ongoing = transactions.filter(t => t.status === 'Ongoing' || t.paymentStatus === 'Escrow');
  const completed = transactions.filter(t => t.status === 'Completed' && t.paymentStatus !== 'Escrow');

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Earnings Overview Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] mb-4">M-Pesa Wallet Balance</p>
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-bold text-emerald-400">KES</span>
                <h2 className="text-6xl font-black leading-none tracking-tighter">
                  {IMPACT_STATS.totalEarnings.toLocaleString()}
                </h2>
              </div>
            </div>
            
            <div className="flex gap-6 w-full md:w-auto">
               <div className="flex-1 bg-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/5 text-center min-w-[140px]">
                 <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">In Escrow</p>
                 <p className="text-2xl font-black text-amber-400">KES 600</p>
               </div>
               <div className="flex-1 bg-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/5 text-center min-w-[140px]">
                 <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Available</p>
                 <p className="text-2xl font-black text-emerald-400">KES 14,850</p>
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex flex-col justify-center items-center gap-4 text-center">
           <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl">🛡️</div>
           <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Escrow Secured</h4>
           <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px]">
             Payments are verified by local Kifalme collection hubs before release.
           </p>
           <button className="bg-slate-100 text-slate-900 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Help Center</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* Left Column: Escrow & Active */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Escrow & Ongoing</h3>
             <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Awaiting Verification</span>
             </div>
          </div>
          <div className="space-y-4">
            {ongoing.map(tx => (
              <div key={tx.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl ${tx.paymentStatus === 'Escrow' ? 'bg-amber-50' : 'bg-emerald-50'}`}>
                    {tx.paymentStatus === 'Escrow' ? '🔐' : '🚚'}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                     <p className="font-black text-slate-800 text-lg uppercase tracking-tight">{tx.type} <span className="text-xs text-slate-400 font-bold ml-2">#{tx.id}</span></p>
                     <p className="text-xs text-slate-500 font-medium">{tx.weight}kg • Scheduled {tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-800 text-xl">KES {tx.earnings}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-50">
                  <div className="text-center md:text-left">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Operational Tracking</p>
                     <p className={`text-[11px] font-black tracking-tight ${tx.paymentStatus === 'Escrow' ? 'text-amber-600' : 'text-slate-500'}`}>
                        {tx.paymentStatus === 'Escrow' ? '✓ FUNDS SECURED • AWAITING FINAL WEIGHT' : '✓ TRUCK DISPATCHED • EN ROUTE TO SYOKIMAU'}
                     </p>
                  </div>
                  {tx.paymentStatus === 'Escrow' ? (
                     <button 
                       onClick={() => togglePaymentStatus(tx.id)}
                       className="w-full md:w-auto bg-emerald-700 text-white px-8 py-3 rounded-2xl text-[11px] font-black shadow-lg shadow-emerald-100 hover:bg-emerald-800 transition-all active:scale-95"
                     >
                       Confirm Receipt
                     </button>
                  ) : (
                     <button className="w-full md:w-auto bg-slate-100 text-slate-400 px-8 py-3 rounded-2xl text-[11px] font-black cursor-not-allowed">
                       Wait for Pickup
                     </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Historical */}
        <section>
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Payout History</h3>
            <button className="text-[9px] text-emerald-600 font-black uppercase tracking-widest hover:underline">Download Audit Log</button>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-50">
              {completed.map(tx => (
                <div key={tx.id} className="p-5 flex items-center gap-6 hover:bg-slate-50 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex flex-col items-center justify-center border border-slate-100 shadow-sm font-black">
                    <span className="text-[8px] text-slate-400 uppercase tracking-tighter">Oct</span>
                    <span className="text-lg text-slate-700">{tx.date.split('-')[2]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{tx.type} Collection</p>
                    <p className="text-[10px] text-slate-400 font-medium">Verified at Machakos Main Hub • {tx.weight} KG</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-800 text-base">KES {tx.earnings}</p>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Released</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {completed.length === 0 && (
              <div className="p-10 text-center text-slate-400 italic text-sm">No historical payouts found.</div>
            )}
          </div>
        </section>
      </div>
      
      {/* Educational Promo (Wide) */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
           <h4 className="text-2xl font-black mb-2 tracking-tight italic">Boost your earnings! 📈</h4>
           <p className="text-emerald-100/70 text-sm leading-relaxed">
             Pure White Paper and PET Plastics currently have a +15% rate bonus in the Athi River sector. 
             Separate your waste at source to maximize your payout KES.
           </p>
        </div>
        <button className="relative z-10 bg-emerald-400 text-emerald-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 hover:bg-emerald-300 transition-all">
          View Current Rates
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
      </div>
    </div>
  );
};

export default TransactionHistory;
