import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export function PipelineVisualization() {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#26262f] bg-gradient-to-b from-[#050505] to-[#0a0a10] p-8">
      <div className="flex items-center justify-between h-full">
        {[
          { id: '01', title: 'Data', color: '#22d3ee' },
          { id: '02', title: 'Ingestion', color: '#22c55e' },
          { id: '03', title: 'Features', color: '#d946ef' },
          { id: '04', title: 'Alpha', color: '#a855f7' },
          { id: '05', title: 'Risk', color: '#f0abfc' },
          { id: '06', title: 'Execution', color: '#fb7185' }
        ].map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.color, boxShadow: `0 0 20px ${stage.color}` }}
              />
              {i < 5 && (
                <div className="w-16 h-px" style={{ backgroundColor: `${stage.color}40` }} />
              )}
            </div>
            <p className="text-white text-xs font-bold">{stage.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
