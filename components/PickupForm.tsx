
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
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 animate-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-6">
            ✅
          </div>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl mb-8">
             <p className="text-slate-800 text-sm leading-relaxed font-medium">
               "Habari! <b>Kifalme Waste Management</b> confirms your <b>{formData.wasteType}</b> pickup 
               (ID: <span className="text-emerald-700 font-black">{pickupId}</span>) is scheduled for 
               {formData.pickupDate === new Date().toISOString().split('T')[0] ? ' today' : ` ${formData.pickupDate}`}. 
               Our team will arrive in 2-4 hours. Est. Payout: <span className="font-black">KES {estimatedEarnings.toLocaleString()}</span>. 
               Please ensure the waste is ready for collection. Asante!"
             </p>
          </div>

          <div className="w-full space-y-4">
             <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Escrow Status</span>
                <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">FUNDS RESERVED</span>
             </div>
             
             <div className="flex flex-col gap-3">
               <button 
                 onClick={() => { setSuccess(false); setStep(1); }}
                 className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all text-sm"
               >
                 Expected Pickup
               </button>
               <button 
                 onClick={() => { setSuccess(false); setStep(1); }}
                 className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all text-sm"
               >
                 Done
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
      {scanning && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent animate-spin rounded-full mb-4"></div>
          <p className="font-bold text-slate-800">Gemini AI Analyzing Proof...</p>
          <div className="w-full h-1 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-emerald-600 transition-all" style={{ width: `${scanProgress}%` }}></div>
          </div>
        </div>
      )}

      {/* Progress Tabs */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`flex-1 h-1.5 rounded-full ${step >= s ? 'bg-emerald-600' : 'bg-slate-100'}`}></div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="animate-in slide-in-from-right">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">Sell Your Waste</h2>
                <p className="text-xs text-slate-500 mt-1">Kifalme Waste Management rates apply.</p>
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100 active:scale-95 transition-all"
              >
                📷 AI Scan
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {WASTE_CATEGORIES.map((cat) => (
                <button
                  key={cat.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, wasteType: cat.type })}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-start gap-1 relative ${
                    formData.wasteType === cat.type
                      ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100'
                      : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-xs font-black text-slate-800">{cat.type}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">{cat.rate} KES/KG</span>
                  <div className="absolute top-2 right-2 text-[8px] bg-slate-200 px-1 rounded font-bold text-slate-500">
                    MIN {cat.minWeight}kg
                  </div>
                </button>
              ))}
            </div>
            <input ref={fileInputRef} type="file" capture="environment" className="hidden" onChange={handleScan} />
            <button
              disabled={!formData.wasteType}
              onClick={() => setStep(2)}
              className="w-full mt-8 bg-slate-900 text-white font-bold py-4 rounded-2xl disabled:opacity-50 shadow-xl"
            >
              Set Weights
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right">
            <h2 className="text-xl font-black text-slate-800 mb-6">Estimate Earnings</h2>
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Payout</p>
                <p className="text-4xl font-black text-emerald-700">KES {estimatedEarnings.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 mt-2">Verified by Kifalme Logistics team</p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Input Weight (KG)</label>
                <div className="relative mt-2">
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder={`Minimum ${selectedCategory?.minWeight}kg`}
                    className={`w-full p-5 rounded-2xl border-2 bg-slate-50 focus:outline-none transition-all ${
                      formData.weight && !isWeightValid ? 'border-red-300' : 'border-slate-100 focus:border-emerald-500'
                    }`}
                  />
                  {formData.weight && !isWeightValid && (
                    <p className="text-[10px] text-red-500 font-bold mt-2 ml-1 animate-pulse">
                      ⚠️ Minimum pickup weight for {formData.wasteType} is {selectedCategory?.minWeight}kg.
                    </p>
                  )}
                </div>
              </div>

              {proofImage && (
                <div className="relative rounded-2xl overflow-hidden h-32 border-2 border-emerald-100 shadow-inner">
                  <img src={proofImage} className="w-full h-full object-cover" alt="Proof" />
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[8px] px-2 py-1 rounded-full font-bold">AI VERIFIED PROOF</div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} type="button" className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-500">Back</button>
              <button disabled={!isWeightValid} onClick={() => setStep(3)} type="button" className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg disabled:opacity-50">Schedule Pickup</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right">
            <h2 className="text-xl font-black text-slate-800 mb-6">Pickup Location</h2>
            <div className="space-y-6">
              
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 block mb-3">Choose Address</label>
                <div className="space-y-2">
                   {SAVED_LOCATIONS.map(loc => (
                     <button
                       key={loc.id}
                       type="button"
                       onClick={() => setFormData({...formData, location: loc})}
                       className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                         formData.location.id === loc.id ? 'border-emerald-600 bg-emerald-50 shadow-sm' : 'border-slate-50 bg-slate-50'
                       }`}
                     >
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg">{loc.icon}</div>
                        <div className="text-left flex-1">
                           <p className="font-bold text-sm text-slate-800">{loc.label}</p>
                           <p className="text-[10px] text-slate-400 truncate w-48">{loc.address}</p>
                        </div>
                        {formData.location.id === loc.id && <span className="text-emerald-600">✓</span>}
                     </button>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                    className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Preferred Time</label>
                  <select
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
                    className="w-full mt-1 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold"
                  >
                    <option value="">Select Time</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(2)} type="button" className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-500">Back</button>
              <button disabled={!formData.pickupDate || !formData.pickupTime} onClick={() => setStep(4)} type="button" className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg disabled:opacity-50">Review</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in slide-in-from-right">
            <h2 className="text-xl font-black text-slate-800 mb-4">Summary</h2>
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-800">{formData.wasteType}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Pickup Point</span>
                <span className="font-bold text-slate-800">{formData.location.label}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Total Weight</span>
                <span className="font-bold text-slate-800">{formData.weight} KG</span>
              </div>
              <div className="h-px bg-slate-200 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-700 uppercase text-[10px]">Estimated Payout</span>
                <span className="text-xl font-black text-emerald-800">KES {estimatedEarnings.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-4 px-2 italic text-center leading-tight">
              Kifalme Waste Management will verify weights on-site. Instant M-Pesa payouts after validation.
            </p>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(3)} type="button" className="flex-1 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-500">Back</button>
              <button type="submit" className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-all">Submit Request</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PickupForm;
