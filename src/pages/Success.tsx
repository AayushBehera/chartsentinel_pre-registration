import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] font-mono overflow-hidden">
      {/* Background Deep Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0f] to-[#0f0f14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl px-6">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-14 relative"
        >
          <div className="w-36 h-36 rounded-full border border-[#d946ef]/30 flex items-center justify-center relative bg-[rgba(217,70,239,0.05)] shadow-[0_0_60px_rgba(217,70,239,0.2)]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <CheckCircle className="w-18 h-18 text-[#d946ef]" strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-5"
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.12em] uppercase text-white">Application Received</h1>
          <p className="text-sm tracking-[0.12em] uppercase text-[#9ca3af]">
            Your credentials are under review. You will be contacted via secure channels upon verification.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-14 text-[9px] text-[#6b7280] uppercase tracking-[0.15em]"
        >
          Redirecting to portal...
        </motion.div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-5" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#d946ef]/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#d946ef]/20 pointer-events-none" />
    </div>
  );
}
