import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Zap, Activity, Clock, DollarSign, BarChart3, Cpu, Layers, Target, Award, Globe, Users, ChevronDown } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { cn } from '../utils/cn';

interface PricePoint {
  time: string;
  price: number;
}

export function Home() {
  const navigate = useNavigate();
  const [currentPrice, setCurrentPrice] = useState(67842.50);
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Generate realistic price data for hero chart
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const points: PricePoint[] = [];
      const startPrice = 65500;
      const endPrice = 67842;

      for (let i = 0; i < 80; i++) {
        const time = new Date(now.getTime() - (80 - i - 1) * 60000);
        const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        const progress = i / 80;
        const basePrice = startPrice + (endPrice - startPrice) * progress;
        const noise = (Math.random() - 0.45) * 100 * (1 - progress);
        points.push({ time: timeStr, price: basePrice + noise });
      }

      setPriceHistory(points);
    };
    generateData();
  }, []);

  // Update price in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.45) * 30;
        return Math.max(prev + change, 1000);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate chart path
  const chartPath = useMemo(() => {
    if (priceHistory.length === 0) return '';
    const width = 100;
    const height = 100;
    const prices = priceHistory.map(p => p.price);
    const min = Math.min(...prices) - 100;
    const max = Math.max(...prices) + 100;
    const range = max - min;

    return priceHistory.map((point, i) => {
      const x = (i / (priceHistory.length - 1)) * width;
      const y = height - ((point.price - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [priceHistory]);

  const areaPath = useMemo(() => {
    if (priceHistory.length === 0) return '';
    const width = 100;
    const height = 100;
    const prices = priceHistory.map(p => p.price);
    const min = Math.min(...prices) - 100;
    const max = Math.max(...prices) + 100;
    const range = max - min;

    const linePoints = priceHistory.map((point, i) => {
      const x = (i / (priceHistory.length - 1)) * width;
      const y = height - ((point.price - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return `M 0,${height} L ${linePoints} L ${width},${height} Z`;
  }, [priceHistory]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Forex Analytics',
      desc: 'Real-time currency pair analysis with AI-powered predictions',
      gradient: 'from-[#22c55e]/20 to-[#22c55e]/5',
      borderColor: 'border-[#22c55e]/30',
      textColor: 'text-[#22c55e]',
      glow: 'group-hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]'
    },
    {
      icon: TrendingUp,
      title: 'Stock Intelligence',
      desc: 'Deep learning models for equity price movement prediction',
      gradient: 'from-[#d946ef]/20 to-[#d946ef]/5',
      borderColor: 'border-[#d946ef]/30',
      textColor: 'text-[#d946ef]',
      glow: 'group-hover:shadow-[0_0_40px_rgba(217,70,239,0.15)]'
    },
    {
      icon: Zap,
      title: 'Crypto Signals',
      desc: '24/7 cryptocurrency market monitoring and alert system',
      gradient: 'from-[#22d3ee]/20 to-[#22d3ee]/5',
      borderColor: 'border-[#22d3ee]/30',
      textColor: 'text-[#22d3ee]',
      glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]'
    },
    {
      icon: Award,
      title: 'Gold & Commodities',
      desc: 'Precious metals and commodity futures analysis',
      gradient: 'from-[#f59e0b]/20 to-[#f59e0b]/5',
      borderColor: 'border-[#f59e0b]/30',
      textColor: 'text-[#f59e0b]',
      glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      desc: 'For individual traders getting started',
      features: ['Basic market data', '5 AI signals/day', 'Community support', 'Web terminal access'],
      cta: 'Get Started',
      popular: false,
      gradient: 'from-[#26262f] to-[#1c1c24]'
    },
    {
      name: 'Professional',
      price: '$99/mo',
      desc: 'For serious traders seeking an edge',
      features: ['Real-time data feeds', 'Unlimited AI signals', 'Priority support', 'Advanced charting', 'API access', 'Custom alerts'],
      cta: 'Start Pro Trial',
      popular: true,
      gradient: 'from-[#d946ef]/20 to-[#a21caf]/20'
    },
    {
      name: 'Institutional',
      price: 'Custom',
      desc: 'For funds and trading firms',
      features: ['Dedicated infrastructure', 'Custom model training', 'White-label options', 'SLA guarantee', 'On-premise deployment'],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-[#26262f] to-[#1c1c24]'
    }
  ];

  const metrics = [
    { value: '94.7%', label: 'Win Rate', icon: Target },
    { value: '2.5M+', label: 'Signals Generated', icon: Activity },
    { value: '150+', label: 'Markets Covered', icon: Globe },
    { value: '10K+', label: 'Active Traders', icon: Users }
  ];

  const processSteps = [
    { num: '01', title: 'Data Aggregation', desc: 'Collecting real-time market data from 50+ exchanges' },
    { num: '02', title: 'AI Processing', desc: 'Neural networks analyze patterns and sentiment' },
    { num: '03', title: 'Signal Generation', desc: 'High-confidence trade signals with entry/exit points' },
    { num: '04', title: 'Execution', desc: 'One-click trade execution or automated strategies' }
  ];

  return (
    <div className="min-h-screen relative z-10 overflow-x-hidden">
      {/* Global Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0f] to-[#0f0f14]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(217,70,239,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,211,238,0.03)_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(31,31,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(31,31,42,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Hero Section - Full Viewport Height */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 lg:py-0 gap-12 lg:gap-20">
        {/* Hero Content */}
        <motion.div
          className="hero-content flex-1 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white mb-8 leading-[1.05]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Professional insight <br />
            <span className="text-[#d946ef] drop-shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all duration-500 hover:drop-shadow-[0_0_35px_rgba(217,70,239,0.6)]">
              before it happens.
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl opacity-80 font-bold tracking-tight mt-2 block">
              Where data becomes decisions.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#9ca3af] max-w-[540px] mb-10 leading-relaxed font-medium"
          >
            Early access to the ChartSentinel AI trading terminal — built for disciplined, serious traders.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="buttons flex flex-col sm:flex-row items-center gap-5"
          >
            <motion.button
              onClick={() => scrollToSection('terminal-preview')}
              whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(217,70,239,0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="primary w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-[#d946ef] to-[#a21caf] text-white font-bold text-base rounded-full shadow-[0_0_30px_rgba(217,70,239,0.35)] transition-all duration-300"
            >
              Explore Terminal
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('pricing')}
              whileHover={{ scale: 1.02, borderColor: "rgba(217,70,239,0.5)", backgroundColor: "rgba(217,70,239,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="secondary w-full sm:w-auto px-10 py-4 bg-transparent border border-[#26262f] text-[#9ca3af] font-bold text-base rounded-full transition-all duration-300"
            >
              View Pricing
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Chart Panel */}
        <motion.div
          className="chart-panel flex-1 relative"
          initial={{ opacity: 0, x: 40, rotateX: 5, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateX: 0, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#d946ef]/20 to-[#22d3ee]/20 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />

            <motion.img
              src="/chart.png"
              alt="ChartSentinel AI Trading Terminal"
              className="relative w-full max-w-[640px] rounded-2xl border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-10 object-contain"
              style={{ perspective: "1000px" }}
              whileHover={{
                rotateY: -5,
                rotateX: 2,
                scale: 1.02,
                transition: { duration: 0.4 }
              }}
            />

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717a] font-semibold">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-[#d946ef] animate-bounce" />
        </motion.div>
      </section>

      {/* Terminal Preview Section */}
      <section id="terminal-preview" ref={el => sectionsRef.current['terminal'] = el} className="relative z-10 min-h-screen flex items-center px-6 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(217,70,239,0.1)] border border-[#d946ef]/30 mb-6 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
              <Cpu className="w-5 h-5 text-[#d946ef]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#d946ef] font-bold">Live Terminal Preview</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Built for <span className="text-[#d946ef]">Precision Trading</span>
            </h2>
            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto leading-relaxed">
              Experience institutional-grade trading tools with AI-powered insights delivered in real-time.
            </p>
          </motion.div>

          {/* Terminal Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Current Price', value: `$${currentPrice.toLocaleString()}`, change: '+1.87%', positive: true },
              { label: '24h Volume', value: '2.85K BTC', change: '+12.5%', positive: true },
              { label: 'Market Cap', value: '$1.32T', change: '+2.1%', positive: true },
              { label: 'Dominance', value: '52.4%', change: '-0.3%', positive: false }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-[#26262f] bg-gradient-to-br from-[#16161d]/50 to-[#0f0f14]/50 p-5 backdrop-blur-xl"
              >
                <p className="text-[#71717a] text-xs font-semibold mb-2 uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-black text-white mb-2">{stat.value}</p>
                <span className={cn(
                  "text-xs font-bold",
                  stat.positive ? "text-[#22c55e]" : "text-[#ef4444]"
                )}>
                  {stat.change}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Simple Chart Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl border border-[#26262f] overflow-hidden bg-gradient-to-b from-[#0a0a10] to-[#0f0f1a]"
          >
            <div className="p-4 border-b border-[#26262f] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[#9ca3af] text-xs uppercase tracking-wider font-semibold">BTC/USD Live</span>
              </div>
              <span className="text-[#22c55e] text-xs font-bold">+1.87%</span>
            </div>
            <div className="p-6">
              <svg viewBox="0 0 800 200" className="w-full">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line key={i} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#26262f" strokeWidth="1" />
                ))}
                {/* Chart Line */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.3 }}
                  d="M 0,150 Q 100,140 200,120 T 400,100 T 600,80 T 800,50"
                  fill="none"
                  stroke="#d946ef"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(217,70,239,0.5))' }}
                />
                {/* Area Fill */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.3 }}
                  d="M 0,150 Q 100,140 200,120 T 400,100 T 600,80 T 800,50 L 800,200 L 0,200 Z"
                  fill="url(#chartGradient)"
                />
                {/* Pulsing Dot */}
                <motion.circle
                  initial={{ cx: 0, cy: 150 }}
                  animate={{ cx: 800, cy: 50 }}
                  transition={{ duration: 2, delay: 0.3 }}
                  cx="800"
                  cy="50"
                  r="4"
                  fill="#22c55e"
                  className="drop-shadow-[0_0_10px_#22c55e]"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => navigate('/terminal')}
              className="px-8 py-4 bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white font-bold text-sm uppercase tracking-wide rounded-full shadow-[0_0_30px_rgba(217,70,239,0.35)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)] transition-all duration-300"
            >
              Launch Full Terminal
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 min-h-screen flex items-center px-6 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(217,70,239,0.1)] border border-[#d946ef]/30 mb-6">
              <Layers className="w-5 h-5 text-[#d946ef]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#d946ef] font-bold">Market Coverage</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Multi-Asset <span className="text-[#d946ef]">Intelligence</span>
            </h2>
            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto leading-relaxed">
              Comprehensive market analysis across all major asset classes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500",
                  feature.gradient,
                  feature.borderColor,
                  feature.glow
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <feature.icon className={cn("w-10 h-10 mb-4", feature.textColor)} />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative z-10 min-h-screen flex items-center px-6 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(217,70,239,0.1)] border border-[#d946ef]/30 mb-6">
              <Target className="w-5 h-5 text-[#d946ef]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#d946ef] font-bold">How It Works</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              From Data to <span className="text-[#d946ef]">Profit</span>
            </h2>
            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto leading-relaxed">
              Our AI processes market data through multiple stages to generate high-confidence trading signals.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-base p-6 border-l-4 border-[#d946ef]"
              >
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#d946ef] font-bold">Step {step.num}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics / Trust Section */}
      <section id="metrics" className="relative z-10 min-h-screen flex items-center px-6 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(217,70,239,0.1)] border border-[#d946ef]/30 mb-6">
              <Shield className="w-5 h-5 text-[#d946ef]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#d946ef] font-bold">Platform Metrics</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Trusted by <span className="text-[#d946ef]">Traders</span> Worldwide
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#16161d]/50 to-[#0f0f14]/50 border border-[#26262f]"
              >
                <metric.icon className="w-8 h-8 text-[#d946ef] mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-black text-white mb-2">{metric.value}</p>
                <p className="text-[#71717a] text-sm font-semibold uppercase tracking-wide">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-[#d946ef]/25 bg-gradient-to-r from-[#d946ef]/10 via-[#d946ef]/5 to-[#d946ef]/10 rounded-2xl p-8 text-center backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-[#22c55e] shadow-[0_0_15px_#22c55e]"
              />
              <p className="text-[#d946ef] font-bold tracking-[0.12em] uppercase text-[10px]">Platform Status: Operational</p>
            </div>
            <p className="text-[#9ca3af] text-sm">99.99% uptime • Bank-grade encryption • SOC 2 compliant</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 min-h-screen flex items-center px-6 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(217,70,239,0.1)] border border-[#d946ef]/30 mb-6">
              <DollarSign className="w-5 h-5 text-[#d946ef]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#d946ef] font-bold">Pricing Plans</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Choose Your <span className="text-[#d946ef]">Edge</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={cn(
                  "relative rounded-2xl border p-8 transition-all duration-300",
                  plan.popular 
                    ? "border-[#d946ef]/50 shadow-[0_0_40px_rgba(217,70,239,0.15)] scale-105" 
                    : "border-[#26262f] hover:border-[#26262f]/60",
                  "bg-gradient-to-br",
                  plan.gradient
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-[#9ca3af] text-sm mb-4">{plan.desc}</p>
                <p className="text-4xl font-black text-white mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#d4d4d8]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/screening')}
                  className={cn(
                    "w-full py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300",
                    plan.popular
                      ? "bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white shadow-[0_0_25px_rgba(217,70,239,0.35)] hover:shadow-[0_0_40px_rgba(217,70,239,0.5)]"
                      : "bg-transparent border border-[#26262f] text-[#9ca3af] hover:border-[#d946ef]/40 hover:text-white"
                  )}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative z-10 min-h-screen flex items-center px-6 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[rgba(217,70,239,0.1)] border border-[#d946ef]/30 mb-8">
              <Zap className="w-5 h-5 text-[#d946ef]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#d946ef] font-bold">Limited Access</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to <span className="text-[#d946ef]">Begin?</span>
            </h2>
            <p className="text-[#9ca3af] text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Join the waitlist for early access to ChartSentinel. Limited spots available for our beta program.
            </p>
            <motion.button
              onClick={() => navigate('/screening')}
              whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(217,70,239,0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white font-bold text-base rounded-full shadow-[0_0_40px_rgba(217,70,239,0.4)] hover:shadow-[0_0_60px_rgba(217,70,239,0.6)] transition-all duration-300"
            >
              Apply for Early Access
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="relative z-10 border-t border-[#26262f] px-6 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d946ef] to-[#a21caf] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <span className="font-black text-lg text-white uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>ChartSentinel</span>
              </div>
              <p className="text-[#71717a] text-sm leading-relaxed">
                AI-powered trading intelligence for the modern trader.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Product</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('features')} className="text-[#71717a] text-sm hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-[#71717a] text-sm hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollToSection('terminal-preview')} className="text-[#71717a] text-sm hover:text-white transition-colors">Terminal</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('process')} className="text-[#71717a] text-sm hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('metrics')} className="text-[#71717a] text-sm hover:text-white transition-colors">Trust</button></li>
                <li><a href="#" className="text-[#71717a] text-sm hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#71717a] text-sm hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-[#71717a] text-sm hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-[#71717a] text-sm hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#26262f] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#71717a] text-xs">© 2026 ChartSentinel. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#71717a] hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#71717a] hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
