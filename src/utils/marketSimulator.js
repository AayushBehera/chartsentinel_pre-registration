// Market Simulation Service
// Provides simulated real-time market data with realistic price movements

import DataManager from './dataManager'

class MarketSimulator {
  constructor() {
    this.updateInterval = null
    this.listeners = []
    this.baseData = {
      'EUR/USD': { price: 1.0850, volatility: 0.002, baseChange: 0.15 },
      'GBP/USD': { price: 1.2680, volatility: 0.0025, baseChange: 0.22 },
      'BTC/USD': { price: 63450, volatility: 0.008, baseChange: 2.45 },
      'ETH/USD': { price: 3420, volatility: 0.007, baseChange: 1.88 },
      'AAPL': { price: 192.50, volatility: 0.005, baseChange: 1.25 },
      'NVDA': { price: 875.30, volatility: 0.009, baseChange: 3.10 }
    }
  }

  // Subscribe to market updates
  subscribe(callback) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback)
    }
  }

  // Notify all listeners of market updates
  notifyListeners(data) {
    this.listeners.forEach(callback => {
      try {
        callback(data)
      } catch (error) {
        console.error('Error in market listener:', error)
      }
    })
  }

  // Generate random price movement
  generatePriceUpdate(symbol) {
    const base = this.baseData[symbol]
    if (!base) return null

    // Random walk with mean reversion
    const randomChange = (Math.random() - 0.5) * base.volatility * base.price
    const meanReversionForce = (Math.random() - 0.5) * 0.0001 * base.price
    const changePercent = ((randomChange + meanReversionForce) / base.price) * 100

    const newPrice = base.price + randomChange
    const newChange = base.baseChange + changePercent

    base.price = newPrice
    base.baseChange = newChange

    return {
      symbol,
      price: parseFloat(newPrice.toFixed(symbol === 'EUR/USD' ? 4 : 2)),
      change: parseFloat(newChange.toFixed(2)),
      timestamp: new Date().toISOString()
    }
  }

  // Get all market data
  getMarketSnapshot() {
    const updates = {}
    Object.keys(this.baseData).forEach(symbol => {
      updates[symbol] = this.generatePriceUpdate(symbol)
    })
    return {
      timestamp: new Date().toISOString(),
      updates
    }
  }

  // Start simulation
  start(intervalMs = 3000) {
    if (this.updateInterval) return

    // Initial data
    DataManager.initializeMarketData()

    this.updateInterval = setInterval(() => {
      const snapshot = this.getMarketSnapshot()
      
      // Update localStorage
      const marketData = DataManager.getMarketData()
      if (marketData && snapshot.updates) {
        Object.entries(snapshot.updates).forEach(([symbol, data]) => {
          if (data) {
            marketData.symbols[symbol] = {
              price: data.price,
              change: data.change,
              high: marketData.symbols[symbol].high,
              low: marketData.symbols[symbol].low
            }
          }
        })
        localStorage.setItem('chartsentinel_market_data', JSON.stringify(marketData))
      }

      // Notify listeners
      this.notifyListeners(snapshot)
    }, intervalMs)
  }

  // Stop simulation
  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  // Get recent price history for a symbol
  getPriceHistory(symbol, points = 20) {
    const history = []
    const base = this.baseData[symbol]
    if (!base) return history

    let price = base.price
    for (let i = 0; i < points; i++) {
      const randomChange = (Math.random() - 0.5) * base.volatility * price
      price += randomChange
      history.push({
        value: parseFloat(price.toFixed(symbol === 'EUR/USD' ? 4 : 2)),
        timestamp: new Date(Date.now() - (points - i) * 1000).toISOString()
      })
    }
    return history
  }

  // Generate trading signals (simulated)
  generateSignals(symbol) {
    const base = this.baseData[symbol]
    if (!base) return null

    const confidence = Math.random() * 30 + 60 // 60-90%
    const trend = Math.random() > 0.5 ? 'bullish' : 'bearish'

    return {
      symbol,
      signal: trend,
      confidence: parseFloat(confidence.toFixed(1)),
      timestamp: new Date().toISOString(),
      strength: Math.random() > 0.5 ? 'strong' : 'moderate'
    }
  }

  // Get market sentiment (average of all signals)
  getMarketSentiment() {
    let bullishCount = 0
    let totalSignals = 0

    Object.keys(this.baseData).forEach(symbol => {
      const signal = this.generateSignals(symbol)
      if (signal) {
        if (signal.signal === 'bullish') bullishCount++
        totalSignals++
      }
    })

    return {
      bullishPercentage: parseFloat(((bullishCount / totalSignals) * 100).toFixed(1)),
      totalSignals,
      timestamp: new Date().toISOString()
    }
  }

  // Reset simulator
  reset() {
    this.stop()
    this.listeners = []
    Object.keys(this.baseData).forEach(symbol => {
      const original = this.baseData[symbol]
      original.price = original.basePrice || original.price
      original.baseChange = 0
    })
  }
}

// Export singleton instance
export const marketSimulator = new MarketSimulator()

export default MarketSimulator
