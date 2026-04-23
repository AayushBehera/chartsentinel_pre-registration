export default function Pricing() {

    const handleApply = () => {
        window.location.hash = '#/register'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const Checkmark = () => <span className="text-primary font-bold">✓</span>

    return (
        <section id="pricing" className="py-24 bg-bg-secondary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-sm font-bold tracking-widest text-primary uppercase">
                        Early Access Pricing
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 mb-6">
                        Lock In Your Advantage
                    </h2>
                    <p className="text-text-secondary leading-relaxed">
                        Select your plan during early access and lock in premium rates. Regular pricing will be significantly higher once we launch publicly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Starter Tier */}
                    <div className="bg-surface-card border border-white/5 rounded-lg p-8 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                        <span className="text-text-muted text-sm font-medium mb-4">Starter</span>
                        <div className="text-5xl font-bold mb-2 text-white">$49</div>
                        <span className="text-sm text-text-muted mb-8">/month</span>
                        <ul className="space-y-4 mb-12 flex-grow text-text-secondary">
                            <li className="flex items-center gap-3"><Checkmark /> Real-time market data</li>
                            <li className="flex items-center gap-3"><Checkmark /> Basic charting tools</li>
                            <li className="flex items-center gap-3"><Checkmark /> Standard indicators</li>
                            <li className="flex items-center gap-3"><Checkmark /> Community access</li>
                        </ul>
                        <button 
                            onClick={handleApply}
                            className="w-full py-3 bg-white/5 border border-white/10 rounded-full text-sm font-semibold hover:bg-white/10 transition-all text-white">
                            Choose Plan
                        </button>
                    </div>

                    {/* Professional Tier (Highlighted) */}
                    <div className="bg-surface-card border border-primary/50 rounded-lg p-8 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-xs font-bold text-white bg-primary py-1 px-4 rounded-bl-lg">MOST POPULAR</div>
                        <span className="text-primary text-sm font-medium mb-4">Professional</span>
                        <div className="text-5xl font-bold mb-2 text-white">$99</div>
                        <span className="text-sm text-text-muted mb-8">/month</span>
                        <ul className="space-y-4 mb-12 flex-grow text-text-secondary">
                            <li className="flex items-center gap-3"><Checkmark /> Everything in Starter</li>
                            <li className="flex items-center gap-3"><Checkmark /> Advanced AI predictions</li>
                            <li className="flex items-center gap-3"><Checkmark /> Portfolio analytics</li>
                            <li className="flex items-center gap-3"><Checkmark /> API access</li>
                            <li className="flex items-center gap-3"><Checkmark /> Priority support</li>
                        </ul>
                        <button 
                            onClick={handleApply}
                            className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 rounded-full text-sm font-semibold hover:shadow-[0_0_20px_rgba(217,70,239,0.35)] transition-all text-white">
                            Apply Now
                        </button>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="bg-surface-card border border-white/5 rounded-lg p-8 flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                        <span className="text-text-muted text-sm font-medium mb-4">Enterprise</span>
                        <div className="text-5xl font-bold mb-2 text-white">Custom</div>
                        <span className="text-sm text-text-muted mb-8">Annual Billing</span>
                        <ul className="space-y-4 mb-12 flex-grow text-text-secondary">
                            <li className="flex items-center gap-3"><Checkmark /> Everything in Professional</li>
                            <li className="flex items-center gap-3"><Checkmark /> Institutional data feeds</li>
                            <li className="flex items-center gap-3"><Checkmark /> Custom integrations</li>
                            <li className="flex items-center gap-3"><Checkmark /> Dedicated account manager</li>
                            <li className="flex items-center gap-3"><Checkmark /> White-label options</li>
                        </ul>
                        <button 
                            onClick={handleApply}
                            className="w-full py-3 bg-white/5 border border-white/10 rounded-full text-sm font-semibold hover:bg-white/10 transition-all text-white">
                            Contact Sales
                        </button>
                    </div>
                </div>

                <div className="mt-16 p-8 bg-surface-card border border-white/5 rounded-lg text-center shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                    <p className="text-text-secondary">
                        💡 <strong>Early Access Bonus:</strong> Lock in your rate now and keep it even after we launch. 
                        Early access members get a <strong>lifetime 30% discount</strong> on all plans.
                    </p>
                </div>
            </div>
        </section>
    )
}