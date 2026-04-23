import TradingVisualization from './TradingVisualization'

export default function Process() {
    const handleApply = () => {
        window.location.hash = '#/register'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section id="process" className="py-24 bg-bg-primary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Visual Content Left */}
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/5] h-[600px] w-full bg-surface-card border border-white/5 shadow-2xl">
                        <TradingVisualization />
                    </div>

                    {/* Right Content */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-12">
                            <span className="text-sm font-bold tracking-widest text-primary uppercase">
                                How It Works
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 mb-6">
                                Get Access in 3 Steps
                            </h2>
                            <p className="text-text-secondary max-w-md leading-relaxed">
                                Apply for early access, get reviewed by our team, and start trading with institutional-grade tools.
                            </p>
                            <div className="flex gap-4 mt-8">
                                <button 
                                    onClick={handleApply}
                                    className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 rounded-full text-sm font-semibold hover:shadow-lg transition-all text-white">
                                    Apply for Access
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { id: 1, icon: '📝', title: 'Submit Application', desc: 'Fill out a quick form with your trading experience and goals. We verify your information.' },
                                { id: 2, icon: '✓', title: 'Get Approved', desc: 'Our team reviews your application (24-48 hours). Approved users get instant access to the platform.' },
                                { id: 3, icon: '🚀', title: 'Start Trading', desc: 'Log in to your private dashboard and start using all features. Premium tools locked in at early access rates.' }
                            ].map(step => (
                                <div key={step.id} className="bg-surface-card border border-white/5 rounded-lg p-6 relative group transition-colors">
                                    <span className="absolute top-4 right-6 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">STEP {step.id}</span>
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl mt-1">{step.icon}</span>
                                        <div>
                                            <h4 className="text-lg font-bold mb-2 text-text-primary">{step.title}</h4>
                                            <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}