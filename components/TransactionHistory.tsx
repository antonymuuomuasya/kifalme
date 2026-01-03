
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
    <div className="space-y-6">
      {/* Earnings Summary Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Wallet</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-sm font-bold text-emerald-400">KES</span>
            <h2 className="text-4xl font-black">{IMPACT_STATS.totalEarnings.toLocaleString()}</h2>
          </div>
          <div className="mt-8 flex gap-4">
             <div className="flex-1 bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/5">
               <p className="text-[10px] text-slate-400 uppercase font-bold">In Escrow</p>
               <p className="text-lg font-bold text-amber-400">KES 600</p>
             </div>
             <div className="flex-1 bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/5">
               <p className="text-[10px] text-slate-400 uppercase font-bold">Available</p>
               <p className="text-lg font-bold text-emerald-400">KES 14,850</p>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Escrow & Ongoing Actions */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Escrow & Ongoing</h3>
           <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">Action Required</span>
        </div>
        <div className="space-y-3">
          {ongoing.map(tx => (
            <div key={tx.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${tx.paymentStatus === 'Escrow' ? 'bg-amber-50' : 'bg-slate-50'}`}>
                  {tx.paymentStatus === 'Escrow' ? '🔐' : '🚚'}
                </div>
                <div className="flex-1">
                   <p className="font-black text-slate-800 text-sm">{tx.type} ({tx.id})</p>
                   <p className="text-xs text-slate-500">{tx.weight}kg • Scheduled {tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-800 text-sm">KES {tx.earnings}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                <div className="flex-1">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Status</p>
                   <p className={`text-[11px] font-black ${tx.paymentStatus === 'Escrow' ? 'text-amber-600' : 'text-slate-500'}`}>
                      {tx.paymentStatus === 'Escrow' ? 'FUNDS SECURED IN ESCROW' : 'TRUCK EN ROUTE'}
                   </p>
                </div>
                {tx.paymentStatus === 'Escrow' ? (
                   <button 
                     onClick={() => togglePaymentStatus(tx.id)}
                     className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[11px] font-black shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                   >
                     Confirm Payment
                   </button>
                ) : (
                   <button className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl text-[11px] font-black cursor-not-allowed">
                     Wait for Payout
                   </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Completed History */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1 mt-8">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Payout History</h3>
          <button className="text-[10px] text-emerald-600 font-bold uppercase underline decoration-2">Export Log</button>
        </div>
        <div className="space-y-3">
          {completed.map(tx => (
            <div key={tx.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 group hover:border-emerald-100 transition-all">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-sm font-bold text-slate-400">
                {tx.date.split('-')[2]}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-sm">{tx.type}</p>
                <p className="text-[10px] text-slate-400">{tx.weight}kg • Verified by Kifalme</p>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-700 text-sm">KES {tx.earnings}</p>
                <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Released</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Escrow Help Section */}
      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 mt-8">
        <h4 className="font-black text-emerald-900 text-sm mb-2 flex items-center gap-2">
           🛡️ Secure Escrow Service
        </h4>
        <p className="text-[11px] text-emerald-700 leading-relaxed">
          Kifalme Waste Management holds funds in a secure escrow until weights are verified on-site. 
          Once you confirm payment receipt on this app, the funds are marked as released.
        </p>
      </div>
    </div>
  );
};

export default TransactionHistory;
