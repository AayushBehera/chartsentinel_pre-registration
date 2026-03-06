import { motion } from 'framer-motion';

export function LiveDataFlowVisualization() {
  const streams = [
    { name: 'Price Feed', color: '#22c55e', points: [20, 35, 45, 30, 50, 65, 55, 70, 60, 75] },
    { name: 'Volume', color: '#22d3ee', points: [30, 45, 35, 55, 40, 60, 50, 65, 55, 70] },
    { name: 'AI Signals', color: '#d946ef', points: [15, 25, 35, 30, 45, 40, 55, 50, 65, 60] }
  ];

  return (
    <div className="w-full h-[350px] rounded-2xl overflow-hidden border border-[#26262f] bg-gradient-to-b from-[#050505] to-[#0a0a10] p-6">
      <div className="flex flex-col gap-6 h-full">
        {streams.map((stream, i) => (
          <motion.div
            key={stream.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-4"
          >
            <div className="w-24">
              <p className="text-white text-xs font-bold">{stream.name}</p>
            </div>
            <div className="flex-1 h-12 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  d={`M 0,20 ${stream.points.map((p, j) => `L ${j * 11.11},${40 - p}`).join(' ')}`}
                  fill="none"
                  stroke={stream.color}
                  strokeWidth="1.5"
                  style={{ filter: `drop-shadow(0 0 4px ${stream.color})` }}
                />
              </svg>
            </div>
            <div className="flex gap-1">
              {[...Array(4)].map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.2 + j * 0.3, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: stream.color }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        <p className="text-[#22c55e] text-[10px] font-bold">Connected</p>
      </div>
    </div>
  );
}
