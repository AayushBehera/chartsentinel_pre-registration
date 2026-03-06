import { useMemo } from 'react';

export function Background() {
  // Generate random stars for CSS-only background
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505] overflow-hidden">
      {/* Base Deep Black Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0f] to-[#0f0f14]" />

      {/* Radial Gradient - Core Purple Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(217,70,239,0.08),transparent_70%)] pointer-events-none blur-3xl" />

      {/* Radial Gradient - Bottom Left Purple */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(217,70,239,0.05),transparent_70%)] pointer-events-none blur-3xl" />

      {/* Radial Gradient - Top Right Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(34,211,238,0.04),transparent_70%)] pointer-events-none blur-3xl" />

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.6)_100%)] pointer-events-none" />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-5" />

      {/* CSS-only Animated Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white/40 animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Purple Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#d946ef]/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: '0 0 10px rgba(217, 70, 239, 0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
