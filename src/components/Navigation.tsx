import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const navItems = [
  { path: '/', label: 'Overview', section: 'hero' },
  { path: '/terminal', label: 'Terminal', section: 'terminal-preview', external: true },
  { path: '/pipeline', label: 'Pipeline', section: 'process', external: true },
  { path: '/trust', label: 'Trust', section: 'metrics', external: true },
  { path: '/interrogation', label: 'AI', section: null, external: true },
  { path: '/screening', label: 'Apply', section: 'cta', external: true },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/success') return null;

  const scrollToSection = (sectionId: string | null, external: boolean, path: string) => {
    if (external || !sectionId) {
      navigate(path);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 pointer-events-none"
    >
      {/* Background blur panel */}
      <div className="absolute inset-0 bg-[rgba(5,5,5,0.8)] backdrop-blur-2xl border-b border-[#26262f]/50" />

      {/* Logo - Text Only */}
      <div className="relative z-10 flex items-center pointer-events-auto cursor-pointer" onClick={() => navigate('/')}>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tight text-white uppercase group-hover:text-[#d946ef] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900 }}>
            ChartSentinel
          </span>
          <span className="text-[10px] text-[#71717a] tracking-[0.2em] font-bold -mt-1 opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
            TRADING TERMINAL
          </span>
        </div>
      </div>

      {/* Nav Items - Desktop */}
      <div className="relative z-10 hidden md:flex items-center gap-2 pointer-events-auto bg-[rgba(9,9,11,0.8)] backdrop-blur-xl px-2 py-2 rounded-2xl border border-[#27272a] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => scrollToSection(item.section, item.external || location.pathname !== '/', item.path)}
              className={cn(
                "font-semibold text-sm tracking-wide transition-all relative px-6 py-3 rounded-xl",
                isActive && location.pathname === '/'
                  ? "text-white bg-gradient-to-br from-[#d946ef]/20 to-[#a21caf]/20"
                  : "text-[#a1a1aa] hover:text-white hover:bg-white/[0.05]"
              )}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              {item.label}
              {isActive && location.pathname === '/' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl border-2 border-[#d946ef]/60 shadow-[0_0_20px_rgba(217,70,239,0.3)]"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* System Status */}
      <div className="relative z-10 flex items-center gap-3 pointer-events-auto">
        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.4)] shadow-[0_0_20px_rgba(34,197,94,0.2)]"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_12px_#22c55e]" />
          <span className="font-semibold text-xs text-[#22c55e] tracking-wide" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            ONLINE
          </span>
        </motion.div>
      </div>
    </motion.nav>
  );
}
