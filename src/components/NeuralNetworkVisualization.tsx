import { motion } from 'framer-motion';

export function NeuralNetworkVisualization() {
  const layers = [
    { name: 'Input', neurons: 5, color: '#22d3ee' },
    { name: 'Hidden 1', neurons: 6, color: '#a855f7' },
    { name: 'Hidden 2', neurons: 6, color: '#d946ef' },
    { name: 'Hidden 3', neurons: 4, color: '#f0abfc' },
    { name: 'Output', neurons: 3, color: '#22c55e' }
  ];

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#26262f] bg-gradient-to-b from-[#050505] to-[#0a0a10] p-8 relative">
      <div className="flex items-center justify-between h-full gap-4">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 flex flex-col items-center gap-3"
          >
            <div className="flex flex-col gap-4 items-center">
              {Array.from({ length: layer.neurons }).map((_, j) => (
                <motion.div
                  key={j}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + j * 0.05 }}
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: layer.color,
                    boxShadow: `0 0 10px ${layer.color}`
                  }}
                />
              ))}
            </div>
            <p className="text-[#71717a] text-[10px] uppercase tracking-wider mt-4">{layer.name}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Output Labels */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-12">
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-2 h-2 rounded-full bg-[#22c55e] mb-1"
          />
          <p className="text-[#22c55e] text-[10px] font-bold">BUY</p>
        </div>
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="w-2 h-2 rounded-full bg-[#f59e0b] mb-1"
          />
          <p className="text-[#f59e0b] text-[10px] font-bold">HOLD</p>
        </div>
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
            className="w-2 h-2 rounded-full bg-[#ef4444] mb-1"
          />
          <p className="text-[#ef4444] text-[10px] font-bold">SELL</p>
        </div>
      </div>
    </div>
  );
}
