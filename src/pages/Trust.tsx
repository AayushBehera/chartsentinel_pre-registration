import { motion } from 'framer-motion';
import { Shield, Lock, Server, FileCheck } from 'lucide-react';

const protocols = [
  {
    icon: <Shield className="w-10 h-10 text-[#d946ef]" />,
    title: 'Zero-Knowledge Proofs',
    desc: 'Mathematical verification of transactions without revealing underlying data.'
  },
  {
    icon: <Lock className="w-10 h-10 text-[#d946ef]" />,
    title: 'Homomorphic Encryption',
    desc: 'Computation on encrypted data streams ensuring absolute confidentiality.'
  },
  {
    icon: <Server className="w-10 h-10 text-[#d946ef]" />,
    title: 'Air-Gapped Infrastructure',
    desc: 'Core models are isolated from external networks to prevent unauthorized access.'
  },
  {
    icon: <FileCheck className="w-10 h-10 text-[#d946ef]" />,
    title: 'Regulatory Compliance',
    desc: 'Automated reporting and adherence to global financial regulations.'
  }
];

export function Trust() {
  return (
    <div className="min-h-screen pt-40 px-6 pb-32 relative z-10 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-[rgba(217,70,239,0.1)] border border-[#d946ef]/30 mb-8 shadow-[0_0_40px_rgba(217,70,239,0.2)]"
          >
            <Shield className="w-12 h-12 text-[#d946ef]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            Institutional Trust Protocols
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#9ca3af] text-sm uppercase tracking-[0.15em] max-w-2xl mx-auto"
          >
            Security is not an afterthought. It is the foundation of the platform.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="card-base p-8 group border border-[#26262f]"
            >
              <div className="mb-6 p-4 bg-[rgba(217,70,239,0.08)] rounded-xl inline-block border border-[#d946ef]/20 group-hover:border-[#d946ef]/40 group-hover:bg-[rgba(217,70,239,0.12)] transition-all duration-300 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                {protocol.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-[#d946ef] transition-colors">
                {protocol.title}
              </h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                {protocol.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Verification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border border-[#d946ef]/25 bg-[rgba(217,70,239,0.05)] rounded-2xl p-8 text-center backdrop-blur-sm shadow-[0_0_40px_rgba(217,70,239,0.1)]"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e]" 
            />
            <p className="text-[#d946ef] font-bold tracking-[0.12em] uppercase text-[10px]">System Integrity Verified</p>
          </div>
          <p className="text-[#6b7280] text-xs">All cryptographic signatures valid. Zero breaches in 99,999+ hours of operation.</p>
        </motion.div>
      </div>
    </div>
  );
}
