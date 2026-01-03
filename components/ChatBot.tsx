
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Jambo! I am Rafiki. How can I help you recycle today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await getChatResponse(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Sorry, I missed that.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'I am having trouble connecting right now.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50 animate-bounce transition-transform active:scale-90"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm h-[80vh] rounded-[2rem] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-4 bg-emerald-700 text-white flex justify-between items-center">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
                 <div>
                   <p className="font-bold">Kifalme Rafiki</p>
                   <p className="text-[10px] text-emerald-200 uppercase font-black">AI Assistant</p>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-slate-400 animate-pulse italic">Rafiki is typing...</div>}
            </div>

            <div className="p-4 border-t border-slate-100 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about recycling..."
                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <button onClick={handleSend} className="bg-emerald-600 text-white p-3 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
