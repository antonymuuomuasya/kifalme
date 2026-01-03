
import React, { useState, useRef } from 'react';
import { WASTE_CATEGORIES, SAVED_LOCATIONS } from '../constants';
import { WasteType, WasteCategory, SavedLocation } from '../types';
import { analyzeWasteImage } from '../services/geminiService';

const PickupForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pickupId, setPickupId] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    wasteType: null as WasteType | null,
    weight: '',
    pickupDate: '',
    pickupTime: '',
    location: SAVED_LOCATIONS[0],
    notes: '',
  });

  const selectedCategory = WASTE_CATEGORIES.find(c => c.type === formData.wasteType);
  const estimatedEarnings = selectedCategory ? (Number(formData.weight) || 0) * selectedCategory.rate : 0;
  const isWeightValid = selectedCategory ? (Number(formData.weight) >= selectedCategory.minWeight) : false;

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    setScanProgress(20);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setProofImage(reader.result as string);
      setScanProgress(50);
      try {
        const result = await analyzeWasteImage(base64);
        setScanProgress(100);
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            wasteType: (result.category || prev.wasteType) as WasteType,
            weight: result.estimatedWeight?.toString() || prev.weight,
            notes: result.advice || prev.notes
          }));
          setScanning(false);
          setStep(2);
        }, 500);
      } catch {
        setScanning(false);
        setStep(2);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = `KFM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setPickupId(id);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-12 shadow-2xl border border-slate-100 animate-in zoom-in duration-500 text-center">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner">
          ✅
        </div>
        <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] mb-10">
           <p className="text-slate-800 text-lg leading-relaxed font-medium italic">
             "Habari! <b>Kifalme Waste Management</b> confirms your <b>{formData.wasteType}</b> pickup 
             (ID: <span className="text-emerald-700 font-black">{pickupId}</span>) is scheduled for 
             {formData.pickupDate === new Date().toISOString().split('T')[0] ? ' today' : ` ${formData.pickupDate}`}. 
             Our team will arrive in 2-4 hours. Est. Payout: <span className="font-black">KES {estimatedEarnings.toLocaleString()}</span>. 
             Please ensure the waste is ready for collection. Asante!"
           </p>
        </div>

        <div className="space-y-6">
           <div className="flex justify-between items-center max-w-xs mx-auto">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Escrow Status</span>
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-4 py-1 rounded-full border border-amber-100">FUNDS RESERVED</span>
           </div>
           
           <div className="flex gap-4 max-w-md mx-auto">
             <button 
               onClick={() => { setSuccess(false); setStep(1); }}
               className="flex-1 bg-emerald-800 text-white py-5 rounded-2xl font-black shadow-xl active:scale-95 transition-all uppercase tracking-widest text-xs"
             >
               Expected Pickup
             </button>
             <button 
               onClick={() => { setSuccess(false); setStep(1); }}
               className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs"
             >
               Done
             </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden animate-in slide-in-from-bottom duration-500">
      {scanning && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent animate-spin rounded-full mb-6"></div>
          <p className="font-black text-slate-800 text-xl">Gemini AI Analyzing Proof...</p>
          <div className="w-full max-w-sm h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
          </div>
        </div>
      )}

      {/* Progress Header */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-black text-slate-900">Request Pickup</h2>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`w-8 h-1.5 rounded-full ${step >= s ? 'bg-emerald-600' : 'bg-slate-100'}`}></div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
              <div>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">Step 01</p>
                <h3 className="text-xl font-bold text-slate-800">What are you selling?</h3>
                <p className="text-sm text-slate-400">Select categories based on local rates.</p>
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-200 hover:bg-emerald-100 transition-all active:scale-95"
              >
                📷 AI Photo Scan
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {WASTE_CATEGORIES.map((cat) => (
                <button
                  key={cat.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, wasteType: cat.type })}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-2 relative ${
                    formData.wasteType === cat.type
                      ? 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-50'
                      : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <span className="text-4xl mb-2">{cat.icon}</span>
                  <span className="text-sm font-black text-slate-800">{cat.type}</span>
                  <span className="text-xs text-emerald-600 font-bold">{cat.rate} KES/KG</span>
                  <div className="absolute top-3 right-3 text-[8px] bg-slate-200 px-2 py-0.5 rounded-full font-black text-slate-500 uppercase tracking-tighter">
                    Min {cat.minWeight}kg
                  </div>
                </button>
              ))}
            </div>
            <input ref={fileInputRef} type="file" capture="environment" className="hidden" onChange={handleScan} />
            <button
              disabled={!formData.wasteType}
              onClick={() => setStep(2)}
              className="w-full mt-12 bg-slate-900 text-white font-black py-5 rounded-[2rem] disabled:opacity-30 shadow-2xl uppercase tracking-widest text-sm hover:bg-slate-800 transition-all"
            >
              Continue to Weights
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-300 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-slate-950 p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Estimated Earnings</p>
                <p className="text-5xl font-black text-white group-hover:scale-110 transition-transform">KES {estimatedEarnings.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-6 font-medium italic">Verified by Kifalme Logistics</p>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Input Weight (KG)</label>
                  <div className="relative mt-3">
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      placeholder={`Min ${selectedCategory?.minWeight}kg`}
                      className={`w-full p-6 rounded-3xl border-2 bg-slate-50 focus:outline-none transition-all text-xl font-black ${
                        formData.weight && !isWeightValid ? 'border-red-300 ring-4 ring-red-50' : 'border-slate-100 focus:border-emerald-500'
                      }`}
                    />
                    {formData.weight && !isWeightValid && (
                      <p className="text-xs text-red-500 font-bold mt-3 ml-2 animate-pulse">
                        ⚠️ Minimum for {formData.wasteType} is {selectedCategory?.minWeight}kg.
                      </p>
                    )}
                  </div>
                </div>

                {proofImage && (
                  <div className="relative rounded-3xl overflow-hidden h-40 border-2 border-emerald-100 shadow-xl group">
                    <img src={proofImage} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Proof" />
                    <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg">AI Verified Photo</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)} type="button" className="flex-1 py-5 border-2 border-slate-100 rounded-2xl font-black text-slate-400 uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Back</button>
              <button disabled={!isWeightValid} onClick={() => setStep(3)} type="button" className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl disabled:opacity-30 uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">Select Logistics</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold text-slate-800 mb-8">Pickup Address & Timing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Saved Addresses</label>
                <div className="space-y-3">
                   {SAVED_LOCATIONS.map(loc => (
                     <button
                       key={loc.id}
                       type="button"
                       onClick={() => setFormData({...formData, location: loc})}
                       className={`w-full p-6 rounded-3xl border-2 flex items-center gap-5 transition-all group ${
                         formData.location.id === loc.id ? 'border-emerald-600 bg-emerald-50 shadow-lg' : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                       }`}
                     >
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{loc.icon}</div>
                        <div className="text-left flex-1 min-w-0">
                           <p className="font-black text-slate-800">{loc.label}</p>
                           <p className="text-xs text-slate-400 truncate">{loc.address}</p>
                        </div>
                        {formData.location.id === loc.id && <span className="text-emerald-600 font-black">✓</span>}
                     </button>
                   ))}
                </div>
              </div>

              <div className="space-y-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                    className="w-full mt-2 p-5 bg-white border border-slate-100 rounded-2xl font-black text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Arrival Window</label>
                  <select
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                    className="w-full mt-2 p-5 bg-white border border-slate-100 rounded-2xl font-black text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                  >
                    <option value="">Select a slot</option>
                    <option value="08:00">08:00 AM - 10:00 AM</option>
                    <option value="10:00">10:00 AM - 12:00 PM</option>
                    <option value="12:00">12:00 PM - 02:00 PM</option>
                    <option value="14:00">02:00 PM - 04:00 PM</option>
                    <option value="16:00">04:00 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={() => setStep(2)} type="button" className="flex-1 py-5 border-2 border-slate-100 rounded-2xl font-black text-slate-400 uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Back</button>
              <button disabled={!formData.pickupDate || !formData.pickupTime} onClick={() => setStep(4)} type="button" className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl disabled:opacity-30 uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">Review Order</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in slide-in-from-right duration-300 max-w-xl mx-auto">
            <h3 className="text-2xl font-black text-slate-900 mb-8 text-center uppercase tracking-widest">Final Summary</h3>
            <div className="bg-white rounded-[2rem] p-8 border-2 border-slate-100 shadow-2xl space-y-6 relative">
              <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-4">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Material</span>
                <span className="font-black text-slate-800">{formData.wasteType}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-4">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Pickup From</span>
                <span className="font-black text-slate-800">{formData.location.label}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-4">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Mass (Estimated)</span>
                <span className="font-black text-slate-800">{formData.weight} KG</span>
              </div>
              <div className="flex justify-between items-center pt-6">
                <span className="font-black text-emerald-700 uppercase tracking-widest text-xs">Total Estimated Payout</span>
                <span className="text-3xl font-black text-emerald-900">KES {estimatedEarnings.toLocaleString()}</span>
              </div>
              <div className="absolute -top-3 -right-3 bg-emerald-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Verified Rates</div>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 mt-10">
               <p className="text-xs text-emerald-800 font-medium leading-relaxed italic text-center">
                 "Our verification team will weigh items on-site using Kifalme digital scales. Payment releases instantly to your dashboard escrow."
               </p>
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={() => setStep(3)} type="button" className="flex-1 py-5 border-2 border-slate-100 rounded-2xl font-black text-slate-400 uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Back</button>
              <button type="submit" className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black shadow-2xl hover:bg-emerald-700 transition-all uppercase tracking-widest text-xs">Submit Request</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PickupForm;
