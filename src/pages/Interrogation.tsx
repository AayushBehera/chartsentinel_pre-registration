import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'system';
  text: string;
}

export function Interrogation() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'system', text: 'Genesis AI Interrogation Panel Online. State your query.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Our models utilize multi-modal data streams, including sentiment analysis of unstructured financial text.",
        "Latency is optimized to sub-millisecond levels via direct market access (DMA) and FPGA acceleration.",
        "Risk parameters are dynamically adjusted based on real-time volatility clustering models.",
        "The system employs reinforcement learning to adapt to shifting market regimes.",
        "Confidentiality is maintained via zero-knowledge proofs and homomorphic encryption."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'system',
        text: randomResponse
      }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  return (
    <div className="min-h-screen pt-40 px-6 pb-12 relative z-10 flex flex-col items-center">
      <div className="w-full max-w-4xl flex-1 flex flex-col card-base rounded-2xl overflow-hidden border border-[#26262f]">

        {/* Header */}
        <div className="border-b border-[#26262f] p-6 flex items-center justify-between bg-[rgba(22,22,29,0.6)]">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full border border-[#d946ef]/30 flex items-center justify-center relative bg-[rgba(217,70,239,0.1)]">
              <div className="absolute inset-0 bg-[#d946ef]/10 animate-pulse rounded-full" />
              <div className="w-3 h-3 rounded-full bg-[#d946ef] shadow-[0_0_12px_#d946ef]" />
            </div>
            <div>
              <h2 className="text-white font-bold tracking-[0.12em] uppercase text-[10px]">Genesis Core</h2>
              <p className="text-[#d946ef] text-[9px] tracking-[0.12em] uppercase">Neural Link Active</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#6b7280] text-[9px] tracking-[0.12em] uppercase">Uptime</p>
            <p className="text-white/70 text-xs font-bold">99.999%</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex w-full",
                  msg.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.type === 'user'
                      ? "bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white rounded-tr-sm shadow-[0_0_20px_rgba(217,70,239,0.3)]"
                      : "bg-[rgba(22,22,29,0.6)] text-[#d946ef] rounded-tl-sm border border-[#d946ef]/15"
                  )}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-[rgba(22,22,29,0.6)] border border-[#d946ef]/10 rounded-2xl rounded-tl-sm p-4 flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-[#d946ef]/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#d946ef]/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-[#d946ef]/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-[#26262f] bg-[rgba(22,22,29,0.6)]">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <div className="absolute left-4 text-[#d946ef] font-bold">&gt;</div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query the Genesis intelligence..."
              className="w-full bg-[rgba(5,5,5,0.6)] border border-[#26262f] rounded-xl py-4 pl-10 pr-14 text-white placeholder-[#6b7280] focus:outline-none focus:border-[#d946ef]/40 transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 p-3 bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white rounded-lg hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
