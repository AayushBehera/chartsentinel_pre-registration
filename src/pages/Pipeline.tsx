import { motion } from 'framer-motion';
import { Cpu, Zap, Layers, Activity, Shield } from 'lucide-react';

const stages = [
  {
    id: '01',
    title: 'Data Ingestion',
    desc: 'Real-time aggregation of market data, alternative data, and sentiment streams.',
    color: '#d946ef',
    icon: Layers
  },
  {
    id: '02',
    title: 'Feature Engineering',
    desc: 'Extraction of predictive signals using deep learning and NLP models.',
    color: '#22d3ee',
    icon: Cpu
  },
  {
    id: '03',
    title: 'Alpha Generation',
    desc: 'Ensemble models predict price movements across multiple time horizons.',
    color: '#a855f7',
    icon: Zap
  },
  {
    id: '04',
    title: 'Risk Management',
    desc: 'Dynamic portfolio optimization and volatility clustering analysis.',
    color: '#f0abfc',
    icon: Shield
  },
  {
    id: '05',
    title: 'Execution',
    desc: 'Low-latency order routing and smart execution algorithms.',
    color: '#fb7185',
    icon: Activity
  }
];

export function Pipeline() {
  return (
    <div className="min-h-screen pt-32 px-6 pb-20 relative z-10 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(217,70,239,0.1)] border border-[#d946ef]/30 mb-6 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
            <Cpu className="w-5 h-5 text-[#d946ef]" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#d946ef] font-bold">System Architecture</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Intelligence <span className="text-[#d946ef]">Pipeline</span>
          </h2>
          <p className="text-[#9ca3af] text-sm uppercase tracking-[0.15em] max-w-3xl mx-auto leading-relaxed">
            From raw market data to executed trades in sub-milliseconds.
          </p>
        </motion.div>

        {/* Pipeline Visualization - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 p-8 rounded-2xl border border-[#26262f] bg-gradient-to-b from-[#050505] to-[#0a0a10]"
        >
          <div className="flex items-center justify-between gap-4">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${stage.color}15` }}
                >
                  <stage.icon className="w-7 h-7" style={{ color: stage.color }} />
                </div>
                <p className="text-white text-xs font-bold">{stage.title}</p>
                {i < stages.length - 1 && (
                  <div className="absolute left-1/2 top-7 w-24 h-px" style={{ backgroundColor: `${stage.color}40` }} />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-base p-6 group border-l-4 hover:border-l-[3px] transition-all duration-300"
              style={{ borderLeftColor: stage.color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: `${stage.color}15` }}
                >
                  <stage.icon className="w-5 h-5" style={{ color: stage.color }} />
                </div>
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                  style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                >
                  Phase {stage.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{stage.title}</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">{stage.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border border-[#d946ef]/25 bg-gradient-to-r from-[#d946ef]/10 via-[#d946ef]/5 to-[#d946ef]/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '<1ms', label: 'Latency' },
              { value: '50+', label: 'Data Sources' },
              { value: '99.99%', label: 'Uptime' },
              { value: '24/7', label: 'Monitoring' }
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-white mb-2">{metric.value}</p>
                <p className="text-[#71717a] text-xs uppercase tracking-wider">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
