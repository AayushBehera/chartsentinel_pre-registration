import { motion } from "framer-motion"

export default function TradingSignalsBoard() {
    const signals = [
        { asset: 'BTC', action: 'BUY', confidence: 92, entry: '42,150', target: '45,000', timeframe: '4H' },
        { asset: 'ETH', action: 'SELL', confidence: 78, entry: '2,890', target: '2,750', timeframe: '1D' },
        { asset: 'SOL', action: 'BUY', confidence: 85, entry: '150', target: '165', timeframe: '4H' },
        { asset: 'ADA', action: 'SELL', confidence: 65, entry: '0.65', target: '0.60', timeframe: '6H' },
    ]
    return (
        <div className="bg-surface-card border border-white/5 rounded-xl p-6 h-full shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <h3 className="text-2xl font-bold text-white mb-4 font-mono">Active Signals</h3>
            <div className="space-y-4">
                {signals.map((signal, i) => (
                    <motion.div
                        key={signal.asset}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                        <div className="relative bg-bg-secondary border border-white/5 rounded-xl p-4 hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl font-bold text-white font-mono">{signal.asset}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${signal.action === 'BUY' ? 'bg-[rgba(34,197,94,0.15)] text-[#22c55e]' : 'bg-[rgba(239,68,68,0.15)] text-[#ef4444]'}`}>
                                    {signal.action}
                                </span>
                                <span className="ml-auto text-sm text-gray-400 font-mono">{signal.timeframe}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-xs text-gray-500">Confidence</p>
                                    <p className="text-sm font-bold text-white">{signal.confidence}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Entry</p>
                                    <p className="text-sm font-bold text-white">{signal.entry}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Target</p>
                                    <p className="text-sm font-bold text-white">{signal.target}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}