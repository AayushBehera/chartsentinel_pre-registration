import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export function Gate() {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();
  const setAuthorized = useStore((state) => state.setAuthorized);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1500));
      setStage(1);
      await new Promise(r => setTimeout(r, 2000));
      setStage(2);
      await new Promise(r => setTimeout(r, 2500));
      setStage(3);
    };
    sequence();
  }, []);

  const handleEnter = () => {
    setAuthorized(true);
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303] text-[#ec4899] font-mono overflow-hidden">
      {/* Background Deep Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#030303] to-[#050505]" />
      
      {/* Radial Magenta Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(236,72,153,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl px-6">
        {/* Animated Portal Circle */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="mb-20 relative"
        >
          <div className="w-44 h-44 rounded-full border border-[#ec4899]/25 flex items-center justify-center relative shadow-[0_0_60px_rgba(236,72,153,0.15)] backdrop-blur-sm bg-[rgba(236,72,153,0.02)]">
            {/* Rotating Orbits */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t border-[#ec4899]/35"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 rounded-full border-b border-[#ec4899]/20"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 rounded-full border-t border-[#ec4899]/15"
            />

            {/* Center Pulse */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-6 h-6 rounded-full bg-[#ec4899] shadow-[0_0_30px_#ec4899]"
            />
          </div>
        </motion.div>

        {/* Status Messages */}
        <div className="h-44 mb-14 flex flex-col items-center justify-center space-y-4">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="stage0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-3"
              >
                <p className="text-xs tracking-[0.15em] uppercase text-white/40 font-medium">
                  Establishing secure connection...
                </p>
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#ec4899]/40"
                  />
                  <motion.div
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#ec4899]/40"
                  />
                  <motion.div
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#ec4899]/40"
                  />
                </div>
              </motion.div>
            )}
            {stage === 1 && (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-3"
              >
                <p className="text-xs tracking-[0.15em] uppercase text-white/60 font-medium">
                  Verifying institutional credentials...
                </p>
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#ec4899]/60"
                  />
                  <motion.div
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#ec4899]/60"
                  />
                  <motion.div
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#ec4899]/60"
                  />
                </div>
              </motion.div>
            )}
            {stage === 2 && (
              <motion.div
                key="stage2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center"
                >
                  <svg className="w-10 h-10 text-[#ec4899]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <p className="text-xs tracking-[0.15em] uppercase text-[#ec4899] font-bold">
                  Access granted. Welcome.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enter Button */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(236,72,153,0.35)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnter}
              className="px-12 py-5 border border-[#ec4899]/40 text-[#ec4899] uppercase tracking-[0.2em] text-[10px] hover:bg-[#ec4899]/10 transition-all duration-300 relative overflow-hidden group font-bold rounded-xl shadow-[0_0_25px_rgba(236,72,153,0.15)] bg-[rgba(236,72,153,0.03)]"
            >
              <span className="relative z-10">Enter Portal</span>
              <div className="absolute inset-0 bg-[#ec4899]/12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.12)_50%)] bg-[length:100%_3px] opacity-6" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#ec4899]/15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#ec4899]/15 pointer-events-none" />
      
      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
}
