import { ForexWidget } from '../../components/widgets/ForexWidget'
import { HeatmapWidget } from '../../components/widgets/HeatmapWidget'
import { SentimentWidget } from '../../components/widgets/SentimentWidget'

export default function WhatWeDo() {
    const handleApply = () => {
        window.location.hash = '#/register'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section id="features" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 max-w-lg">
                        <h2 className="text-5xl font-bold text-white leading-tight tracking-tighter">
                            Institutional-Grade Intelligence.<br />Actionable Insights.
                        </h2>
                        <p className="text-text-secondary text-lg">
                            ChartSentinel is an institutional-grade trading intelligence platform. Our AI-powered terminal gives traders real-time insights, market signals, and predictive analytics across all major markets.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-4">
                            {['Forex', 'Crypto', 'Stocks', 'Commodities'].map((tag, i) => (
                                <span key={tag} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${i === 0 ? 'bg-[#1c1c24] border border-primary text-white' : 'bg-[#1c1c24] border border-[#26262f] text-text-secondary hover:border-primary hover:text-white'}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4 text-text-secondary">
                            {[
                                'Real-time Signals', 
                                'AI Predictions', 
                                'Sentiment Analysis', 
                                'Risk Management', 
                                'Portfolio Tools', 
                                'API Access'
                            ].map(item => (
                                <div key={item} className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6">
                            <button 
                                onClick={handleApply}
                                className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-base font-bold text-white rounded-full hover:shadow-primary/40 hover:shadow-lg transition-all duration-300">
                                Get Early Access
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[500px] w-full">
                        <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
                            <div className="col-span-2 row-span-1">
                                <ForexWidget />
                            </div>
                            <div className="col-span-1 row-span-1">
                                <HeatmapWidget />
                            </div>
                            <div className="col-span-1 row-span-1">
                                <SentimentWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}