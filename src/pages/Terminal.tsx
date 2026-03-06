import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { Activity, TrendingUp, DollarSign, Clock, Zap, Shield, ArrowUpRight, ArrowDownRight, BarChart3, Layers, Cpu } from 'lucide-react';

interface PricePoint {
  time: string;
  price: number;
  volume: number;
}

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

export function Terminal() {
  const [currentPrice, setCurrentPrice] = useState(67842.50);
  const [priceChange, setPriceChange] = useState(1247.30);
  const [priceChangePercent, setPriceChangePercent] = useState(1.87);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [orderBook, setOrderBook] = useState<OrderBook>({ bids: [], asks: [] });
  const [logs, setLogs] = useState<string[]>([]);
  const [high24h, setHigh24h] = useState(68150.00);
  const [low24h, setLow24h] = useState(65200.00);
  const [volume24h, setVolume24h] = useState(2847.65);
  const [chartType, setChartType] = useState<'line' | 'candle'>('candle');
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'positions'>('overview');
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Generate realistic initial price history with upward trend
  useEffect(() => {
    const generateInitialData = () => {
      const now = Date.now();
      const points: PricePoint[] = [];
      const candles: CandleData[] = [];

      const startPrice = 65500;
      const endPrice = 67842;
      const totalPoints = 100;
      const candleCount = 50;

      for (let i = 0; i < totalPoints; i++) {
        const timestamp = now - (totalPoints - i - 1) * 60000;
        const time = new Date(timestamp);
        const timeString = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

        const progress = i / totalPoints;
        const basePrice = startPrice + (endPrice - startPrice) * progress;
        const noise = (Math.random() - 0.45) * 150 * (1 - progress);
        const price = basePrice + noise;
        const volume = 20 + Math.random() * 80;

        points.push({ time: timeString, price, volume });
      }

      let lastClose = startPrice;
      for (let i = 0; i < candleCount; i++) {
        const timestamp = Math.floor((now - (candleCount - i - 1) * 300000) / 1000);
        const progress = i / candleCount;
        const basePrice = startPrice + (endPrice - startPrice) * progress;

        const open = lastClose;
        const volatility = 200 + Math.random() * 300;
        const direction = Math.random() > 0.45 ? 1 : -1;
        const close = basePrice + direction * (Math.random() * volatility);
        const high = Math.max(open, close) + Math.random() * 150;
        const low = Math.min(open, close) - Math.random() * 150;
        const volume = 50 + Math.random() * 150;

        candles.push({ time: timestamp, open, high, low, close, volume });
        lastClose = close;
      }

      setPriceHistory(points);
      setCandleData(candles);
      setCurrentPrice(endPrice + 342.50);
    };

    generateInitialData();
  }, []);

  // Update price in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.45) * 35;
        const newPrice = Math.max(prev + change, 1000);
        const basePrice = 66595.20;
        const newChange = newPrice - basePrice;
        setPriceChange(newChange);
        setPriceChangePercent((newChange / basePrice) * 100);
        return newPrice;
      });

      if (Math.random() > 0.95) {
        setHigh24h(prev => Math.max(prev, currentPrice + Math.random() * 100));
        setLow24h(prev => Math.min(prev, 65200 - Math.random() * 100));
        setVolume24h(prev => prev + Math.random() * 0.5);
      }

      setPriceHistory(prev => {
        const newHistory = [...prev];
        const lastPoint = newHistory[newHistory.length - 1];
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

        if (Math.random() > 0.7) {
          const newPrice = lastPoint.price + (Math.random() - 0.45) * 30;
          newHistory[newHistory.length - 1] = {
            ...lastPoint,
            price: newPrice,
            time: timeString,
            volume: lastPoint.volume + Math.random() * 5
          };
        } else if (Math.random() > 0.95) {
          const newPrice = lastPoint.price + (Math.random() - 0.45) * 40;
          newHistory.push({ time: timeString, price: newPrice, volume: 20 + Math.random() * 80 });
          if (newHistory.length > 100) newHistory.shift();
        }

        return newHistory;
      });

      setCandleData(prev => {
        if (prev.length === 0) return prev;
        const newCandles = [...prev];
        const lastCandle = newCandles[newCandles.length - 1];

        if (Math.random() > 0.8) {
          const priceChange = (Math.random() - 0.45) * 50;
          const newClose = lastCandle.close + priceChange;
          const newHigh = Math.max(lastCandle.high, newClose + Math.random() * 30);
          const newLow = Math.min(lastCandle.low, newClose - Math.random() * 30);

          newCandles[newCandles.length - 1] = {
            ...lastCandle,
            close: newClose,
            high: newHigh,
            low: newLow,
            volume: lastCandle.volume + Math.random() * 10
          };
        }

        return newCandles;
      });

      setOrderBook({
        asks: Array.from({ length: 6 }).map((_, i) => ({
          price: currentPrice + 50 + i * 25 + Math.random() * 10,
          amount: 0.1 + Math.random() * 2.5,
          total: 0
        })).reverse(),
        bids: Array.from({ length: 6 }).map((_, i) => ({
          price: currentPrice - 50 - i * 25 - Math.random() * 10,
          amount: 0.1 + Math.random() * 2.5,
          total: 0
        }))
      });

      if (Math.random() > 0.85) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        const actions = ['Order executed', 'Liquidity update', 'Spread adjustment', 'Volume spike detected', 'AI signal generated'];
        const action = actions[Math.floor(Math.random() * actions.length)];
        setLogs(prev => [...prev.slice(-8), `[${timeString}] ${action} - ${(Math.random() * 10).toFixed(2)} BTC`]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [currentPrice]);

  const chartData = useMemo(() => {
    if (priceHistory.length === 0) return { min: 65000, max: 68500, range: 3500 };
    const prices = priceHistory.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.08;
    return {
      min: min - padding,
      max: max + padding,
      range: (max + padding) - (min - padding)
    };
  }, [priceHistory]);

  const linePath = useMemo(() => {
    if (priceHistory.length === 0) return '';

    const width = 100;
    const height = 100;
    const padding = 5;

    return priceHistory.map((point, i) => {
      const x = (i / (priceHistory.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((point.price - chartData.min) / chartData.range) * (height - padding * 2) - padding;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [priceHistory, chartData]);

  const areaPath = useMemo(() => {
    if (priceHistory.length === 0) return '';

    const width = 100;
    const height = 100;
    const padding = 5;

    const linePoints = priceHistory.map((point, i) => {
      const x = (i / (priceHistory.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((point.price - chartData.min) / chartData.range) * (height - padding * 2) - padding;
      return `${x},${y}`;
    }).join(' ');

    const firstX = padding;
    const lastX = width - padding;

    return `M ${firstX},${height} L ${linePoints} L ${lastX},${height} Z`;
  }, [priceHistory, chartData]);

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D', '1W'];

  const candleChartData = useMemo(() => {
    if (candleData.length === 0) return { min: 65000, max: 68500, range: 3500, candles: [] };
    const prices = candleData.flatMap(c => [c.high, c.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.1;
    return {
      min: min - padding,
      max: max + padding,
      range: (max + padding) - (min - padding),
      candles: candleData
    };
  }, [candleData]);

  const statsCards = [
    {
      icon: TrendingUp,
      label: '24h High',
      value: `$${high24h.toFixed(2)}`,
      change: '+2.4%',
      isPositive: true,
      gradient: 'from-[#22c55e]/20 to-[#22c55e]/5',
      borderColor: 'border-[#22c55e]/30',
      textColor: 'text-[#22c55e]',
      glow: 'group-hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]'
    },
    {
      icon: TrendingUp,
      label: '24h Low',
      value: `$${low24h.toFixed(2)}`,
      change: '-1.8%',
      isPositive: false,
      gradient: 'from-[#ef4444]/20 to-[#ef4444]/5',
      borderColor: 'border-[#ef4444]/30',
      textColor: 'text-[#ef4444]',
      glow: 'group-hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]'
    },
    {
      icon: BarChart3,
      label: '24h Volume',
      value: `${volume24h.toFixed(2)}K`,
      change: '+12.5%',
      isPositive: true,
      gradient: 'from-[#d946ef]/20 to-[#d946ef]/5',
      borderColor: 'border-[#d946ef]/30',
      textColor: 'text-[#d946ef]',
      glow: 'group-hover:shadow-[0_0_40px_rgba(217,70,239,0.15)]'
    },
    {
      icon: Zap,
      label: 'Volatility',
      value: '3.24%',
      change: '-0.8%',
      isPositive: true,
      gradient: 'from-[#22d3ee]/20 to-[#22d3ee]/5',
      borderColor: 'border-[#22d3ee]/30',
      textColor: 'text-[#22d3ee]',
      glow: 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-6 pb-16 relative z-10 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#d946ef]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#22d3ee]/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />
      </div>

      <div className="max-w-[1800px] mx-auto relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d946ef] to-[#a21caf] flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.4)]">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      BTC/USD
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#22c55e] text-[10px] font-bold tracking-wider rounded-lg uppercase">
                        Perpetual
                      </span>
                      <span className="px-2.5 py-1 bg-[#d946ef]/15 border border-[#d946ef]/40 text-[#d946ef] text-[10px] font-bold tracking-wider rounded-lg uppercase">
                        AI-Powered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-6xl font-black text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-bold",
                  priceChange >= 0 ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#ef4444]/15 text-[#ef4444]"
                )}>
                  {priceChange >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  <span className="text-xl">
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#16161d]/80 backdrop-blur-xl border border-[#26262f] rounded-2xl p-1.5">
                <button
                  onClick={() => setChartType('candle')}
                  className={cn(
                    "px-5 py-2.5 text-xs font-bold tracking-wide rounded-xl transition-all duration-300",
                    chartType === 'candle'
                      ? "bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white shadow-[0_0_25px_rgba(217,70,239,0.4)]"
                      : "text-[#71717a] hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  Candles
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={cn(
                    "px-5 py-2.5 text-xs font-bold tracking-wide rounded-xl transition-all duration-300",
                    chartType === 'line'
                      ? "bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white shadow-[0_0_25px_rgba(217,70,239,0.4)]"
                      : "text-[#71717a] hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  Line
                </button>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-3 bg-[#22c55e]/15 border border-[#22c55e]/40 rounded-2xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_15px_#22c55e]" />
                <span className="text-[#22c55e] text-sm font-bold tracking-wide">LIVE</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-500",
                stat.gradient,
                stat.borderColor,
                stat.glow
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-2.5 rounded-xl bg-gradient-to-br", stat.gradient)}>
                    <stat.icon className={cn("w-5 h-5", stat.textColor)} />
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2.5 py-1 rounded-lg",
                    stat.isPositive ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#ef4444]/15 text-[#ef4444]"
                  )}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-[#9ca3af] text-xs font-semibold mb-1.5 tracking-wide uppercase">{stat.label}</p>
                <p className={cn("text-2xl font-black", stat.textColor)}>{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8"
          >
            <div className="card-base p-6 h-full">
              {/* Timeframe Selector */}
              <div className="flex items-center justify-between mb-6 border-b border-[#26262f]/60 pb-4">
                <div className="flex gap-2">
                  {timeframes.map(tf => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTimeframe(tf)}
                      className={cn(
                        "px-4 py-2 text-xs font-bold tracking-wide rounded-xl transition-all duration-300",
                        selectedTimeframe === tf
                          ? "bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white shadow-[0_0_20px_rgba(217,70,239,0.35)]"
                          : "text-[#71717a] hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-[#26262f]"
                      )}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-[#71717a] text-xs font-semibold">
                    <Activity className="w-4 h-4" />
                    <span>Real-time Data</span>
                  </div>
                </div>
              </div>

              {/* Chart Container */}
              <div ref={chartContainerRef} className="relative h-[500px] bg-gradient-to-b from-[#0a0a10]/80 to-[#0f0f1a]/80 rounded-2xl border border-[#26262f]/60 overflow-hidden backdrop-blur-xl">
                {/* Grid Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#26262f]/40 to-transparent" style={{ top: `${(i + 1) * 20}%` }} />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#26262f]/40 to-transparent" style={{ left: `${(i + 1) * 8.33}%` }} />
                  ))}
                </div>

                {/* Price Labels */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a10]/90 to-transparent border-l border-[#26262f]/40 flex flex-col justify-between py-5 px-4 text-xs font-mono text-[#71717a] font-semibold">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const price = chartData.max - (chartData.range / 5) * i;
                    return <span key={i}>${price.toLocaleString()}</span>;
                  })}
                </div>

                {/* Chart Display */}
                {chartType === 'line' ? (
                  <svg className="absolute inset-0 right-20 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGradientPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#d946ef" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="lineGradientPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d946ef" />
                        <stop offset="50%" stopColor="#e879f9" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>

                    <path
                      d={areaPath}
                      fill="url(#areaGradientPurple)"
                      className="transition-all duration-300"
                    />

                    <path
                      d={linePath}
                      fill="none"
                      stroke="url(#lineGradientPurple)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300 drop-shadow-[0_0_12px_rgba(217,70,239,0.6)]"
                    />
                  </svg>
                ) : (
                  <div className="absolute inset-0 right-20 px-4 pb-8 flex items-end justify-between">
                    {candleChartData.candles.map((candle, i) => {
                      const isGreen = candle.close >= candle.open;

                      const chartHeight = 450;
                      const getY = (price: number) => {
                        return ((candleChartData.max - price) / candleChartData.range) * chartHeight;
                      };

                      const openY = getY(candle.open);
                      const closeY = getY(candle.close);
                      const highY = getY(candle.high);
                      const lowY = getY(candle.low);

                      const bodyTop = Math.min(openY, closeY);
                      const bodyHeight = Math.max(Math.abs(closeY - openY), 2);

                      return (
                        <div key={i} className="relative flex-1 flex flex-col items-center group h-full">
                          <div
                            className={cn(
                              "absolute w-[1px] z-0 transition-colors duration-300",
                              isGreen ? "bg-[#22c55e]/50" : "bg-[#ef4444]/50"
                            )}
                            style={{
                              top: `${highY}px`,
                              height: `${lowY - highY}px`
                            }}
                          />

                          <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            className={cn(
                              "absolute w-[70%] min-w-[5px] max-w-[12px] rounded-sm z-10 transition-all duration-300",
                              isGreen
                                ? "bg-gradient-to-b from-[#22c55e] to-[#16a34a] shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.7)]"
                                : "bg-gradient-to-b from-[#ef4444] to-[#dc2626] shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.7)]"
                            )}
                            style={{
                              top: `${bodyTop}px`,
                              height: `${bodyHeight}px`,
                              transformOrigin: isGreen ? "bottom" : "top"
                            }}
                          />

                          {/* Tooltip */}
                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50"
                            >
                              <div className="bg-gradient-to-br from-[#16161d] to-[#0f0f14] border border-[#26262f] rounded-2xl p-4 text-[11px] font-mono whitespace-nowrap shadow-2xl backdrop-blur-xl">
                                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                                  <span className="text-[#71717a] font-semibold">Open:</span>
                                  <span className="text-white font-black">${candle.open.toFixed(2)}</span>
                                  <span className="text-[#71717a] font-semibold">High:</span>
                                  <span className="text-[#22c55e] font-black">${candle.high.toFixed(2)}</span>
                                  <span className="text-[#71717a] font-semibold">Low:</span>
                                  <span className="text-[#ef4444] font-black">${candle.low.toFixed(2)}</span>
                                  <span className="text-[#71717a] font-semibold">Close:</span>
                                  <span className="text-white font-black">${candle.close.toFixed(2)}</span>
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Current Price Line */}
                <div
                  className="absolute left-0 right-24 h-px bg-gradient-to-r from-transparent via-[#d946ef] to-transparent border-t border-dashed"
                  style={{
                    bottom: `${((currentPrice - chartData.min) / chartData.range) * 100}%`
                  }}
                >
                  <div className="absolute right-0 -translate-y-1/2 translate-x-full px-4 py-2 bg-gradient-to-r from-[#d946ef] to-[#a21caf] text-white text-xs font-bold rounded-lg shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                    ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Pulsing dot at current price */}
                <div
                  className="absolute right-24 w-3 h-3 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-full shadow-[0_0_20px_#22c55e]"
                  style={{
                    bottom: `${((currentPrice - chartData.min) / chartData.range) * 100}%`,
                    transform: 'translateX(50%)'
                  }}
                >
                  <div className="absolute inset-0 bg-[#22c55e] rounded-full animate-ping opacity-75" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* Order Book */}
            <div className="card-base p-5">
              <div className="flex items-center justify-between mb-4 border-b border-[#26262f]/60 pb-3">
                <h3 className="text-[#9ca3af] tracking-wide text-xs font-bold uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#d946ef]" />
                  Order Book
                </h3>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  <span className="text-[#71717a] font-semibold">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-[10px] text-[#71717a] tracking-wider font-bold mb-3 px-2 uppercase">
                <span>Price (USD)</span>
                <span className="text-center">Amount</span>
                <span className="text-right">Total</span>
              </div>
              
              <div className="space-y-0.5 mb-4">
                {orderBook.asks.map((ask, i) => (
                  <div key={`ask-${i}`} className="grid grid-cols-3 gap-2 text-[10px] relative py-2 px-2 hover:bg-white/[0.03] rounded-lg transition-all duration-200">
                    <div className="absolute inset-0 bg-gradient-to-l from-[#ef4444]/15 to-transparent rounded-lg" style={{ width: `${Math.min(ask.amount * 30, 100)}%`, right: 0, left: 'auto' }} />
                    <span className="text-[#ef4444] font-mono relative z-10 font-bold">${ask.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <span className="text-[#9ca3af] text-center font-mono relative z-10">{ask.amount.toFixed(3)}</span>
                    <span className="text-[#9ca3af] text-right font-mono relative z-10">{(ask.price * ask.amount / 1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>
              
              <div className="py-4 border-y border-[#26262f]/60 text-center mb-4 bg-gradient-to-r from-[#d946ef]/10 via-[#d946ef]/5 to-[#d946ef]/10 rounded-xl">
                <span className="text-2xl font-black text-white">${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className={cn("text-sm ml-3 font-bold", priceChange >= 0 ? "text-[#22c55e]" : "text-[#ef4444]")}>
                  {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChangePercent).toFixed(2)}%
                </span>
              </div>
              
              <div className="space-y-0.5">
                {orderBook.bids.map((bid, i) => (
                  <div key={`bid-${i}`} className="grid grid-cols-3 gap-2 text-[10px] relative py-2 px-2 hover:bg-white/[0.03] rounded-lg transition-all duration-200">
                    <div className="absolute inset-0 bg-gradient-to-l from-[#22c55e]/15 to-transparent rounded-lg" style={{ width: `${Math.min(bid.amount * 30, 100)}%`, right: 0, left: 'auto' }} />
                    <span className="text-[#22c55e] font-mono relative z-10 font-bold">${bid.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <span className="text-[#9ca3af] text-center font-mono relative z-10">{bid.amount.toFixed(3)}</span>
                    <span className="text-[#9ca3af] text-right font-mono relative z-10">{(bid.price * bid.amount / 1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="card-base p-5 flex-1">
              <div className="flex items-center justify-between mb-4 border-b border-[#26262f]/60 pb-3">
                <h3 className="text-[#9ca3af] tracking-wide text-xs font-bold uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#22d3ee]" />
                  Recent Activity
                </h3>
                <Shield className="w-4 h-4 text-[#d946ef]" />
              </div>
              
              <div className="space-y-2.5 min-h-[200px]">
                {logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[180px] text-[#71717a]">
                    <Cpu className="w-8 h-8 mb-3 text-[#d946ef]/50" />
                    <p className="text-sm font-semibold">Initializing market data...</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="text-[11px] font-mono p-3 rounded-xl bg-gradient-to-r from-[#d946ef]/5 to-transparent border border-[#26262f]/40 hover:border-[#d946ef]/40 transition-all duration-300"
                      >
                        <span className="text-[#d946ef]">{log}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
