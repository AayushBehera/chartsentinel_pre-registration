import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { marketSimulator } from '../../utils/marketSimulator'

export default function LiveTicker() {
    const [tickerData, setTickerData] = useState([
        { symbol: 'BTC', price: '63,450.20', change: '+2.4%' },
        { symbol: 'ETH', price: '3,420.15', change: '+1.8%' },
        { symbol: 'SOL', price: '120.45', change: '+0.5%' },
        { symbol: 'AAPL', price: '192.50', change: '+1.2%' },
        { symbol: 'NVDA', price: '875.30', change: '+3.1%' },
        { symbol: 'EUR/USD', price: '1.0850', change: '+0.1%' },
        { symbol: 'GBP/USD', price: '1.2680', change: '+0.2%' },
    ])

    useEffect(() => {
        // Start market simulator
        marketSimulator.start(2000)

        // Subscribe to market updates
        const unsubscribe = marketSimulator.subscribe((snapshot) => {
            if (snapshot && snapshot.updates) {
                const newData = Object.entries(snapshot.updates)
                    .filter(([_, data]) => data !== null)
                    .map(([symbol, data]) => ({
                        symbol: symbol.split('/')[0],
                        price: data.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }),
                        change: (data.change > 0 ? '+' : '') + data.change.toFixed(2) + '%'
                    }))

                if (newData.length > 0) {
                    setTickerData(newData)
                }
            }
        })

        return () => {
            unsubscribe()
            marketSimulator.stop()
        }
    }, [])

    return (
        <div className="w-full overflow-hidden bg-white/5 border-y border-white/5 backdrop-blur-sm py-2">
            <motion.div
                className="flex items-center gap-12 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
                {[...tickerData, ...tickerData, ...tickerData].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-mono">
                        <span className="font-bold text-slate-300">{item.symbol}</span>
                        <span className="text-white">{item.price}</span>
                        <span className={item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                            {item.change}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
