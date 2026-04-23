import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { DotPattern } from '../../components/ui/Patterns'

export default function TradingVisualization() {
    const candlesticks = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => {
            const open = 100 + Math.random() * 50
            const close = open + (Math.random() - 0.5) * 20
            const high = Math.max(open, close) + Math.random() * 10
            const low = Math.min(open, close) - Math.random() * 10
            return { open, close, high, low, bullish: close > open }
        })
    }, [])

    const maxPrice = Math.max(...candlesticks.map(c => c.high))
    const minPrice = Math.min(...candlesticks.map(c => c.low))
    const priceRange = maxPrice - minPrice

    return (
        <div className="relative w-full h-full bg-bg-secondary overflow-hidden flex flex-col border border-white/5 rounded-3xl shadow-2xl">
            {/* Header */}
            <div className="relative z-10 p-4 border-b border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-white font-mono">BTC/USD</h3>
                    <p className="text-green-400 text-sm font-mono">+2.4% • $42,150.20</p>
                </div>
                <div className="flex gap-2">
                    {['1H', '4H', '1D', '1W'].map(t => (
                        <span key={t} className="px-3 py-1 rounded bg-white/5 text-xs text-text-secondary hover:text-white cursor-pointer transition-colors border border-white/10">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {/* Candlestick Chart */}
            <div className="relative flex-1 p-6" style={{ background: '#0a0a10' }}>
                <div className="absolute inset-6 flex items-end gap-1.5">
                    {candlesticks.map((candle, i) => {
                        const bodyHeight = Math.abs(candle.close - candle.open) / priceRange * 100
                        const wickHeight = (candle.high - candle.low) / priceRange * 100
                        const bodyBottom = (candle.close < candle.open ? candle.close : candle.open - minPrice) / priceRange * 100
                        const wickBottom = (candle.low - minPrice) / priceRange * 100

                        const isBullish = candle.bullish;

                        return (
                            <motion.div
                                key={i}
                                className="relative flex-1 flex flex-col items-center justify-end"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                {/* Wick */}
                                <div
                                    className="w-px"
                                    style={{ 
                                        height: `${wickHeight}%`, 
                                        marginBottom: `${wickBottom}%`,
                                        backgroundColor: isBullish ? '#22c55e' : '#ef4444'
                                    }}
                                />
                                {/* Body */}
                                <div
                                    className="w-full absolute bottom-0"
                                    style={{ 
                                        height: `${bodyHeight}%`, 
                                        bottom: `${bodyBottom}%`,
                                        backgroundColor: isBullish ? '#22c55e' : '#ef4444'
                                    }}
                                />
                            </motion.div>
                        )
                    })}
                </div>

                {/* Price Grid Lines */}
                {[0, 25, 50, 75, 100].map(pct => (
                    <div
                        key={pct}
                        className="absolute left-6 right-6 border-t"
                        style={{ bottom: `${pct}%`, borderColor: 'rgba(31, 31, 42, 0.5)' }}
                    >
                        <span className="absolute -left-2 -translate-x-full text-[10px] text-text-muted font-mono">
                            ${(minPrice + (priceRange * pct / 100)).toFixed(0)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Floating Trade Indicators */}
            <motion.div
                className="absolute top-1/4 right-10 bg-green-500/15 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30"
                animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
            >
                BUY 2.5 BTC
            </motion.div>

            <motion.div
                className="absolute bottom-1/3 left-10 bg-red-500/15 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30"
                animate={{ y: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
                SELL 1.8 BTC
            </motion.div>
        </div>
    )
}