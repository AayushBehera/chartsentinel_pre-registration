// Data Manager for Pre-Registration System
// Handles all localStorage operations for the application

const STORAGE_KEYS = {
  APPLICATIONS: 'chartsentinel_applications',
  USER_SESSION: 'chartsentinel_user_session',
  MARKET_DATA: 'chartsentinel_market_data',
  ADMIN_SETTINGS: 'chartsentinel_admin_settings'
};

export const DataManager = {
  // Application Management
  addApplication: (applicationData) => {
    try {
      const applications = DataManager.getAllApplications();
      const newApplication = {
        id: `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...applicationData,
        status: 'pending_review',
        createdAt: new Date().toISOString(),
        approvalDate: null
      };
      applications.push(newApplication);
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
      return newApplication;
    } catch (error) {
      console.error('Error adding application:', error);
      return null;
    }
  },

  getAllApplications: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting applications:', error);
      return [];
    }
  },

  getApplication: (id) => {
    try {
      const applications = DataManager.getAllApplications();
      return applications.find(app => app.id === id) || null;
    } catch (error) {
      console.error('Error getting application:', error);
      return null;
    }
  },

  updateApplicationStatus: (id, status) => {
    try {
      const applications = DataManager.getAllApplications();
      const application = applications.find(app => app.id === id);
      if (application) {
        application.status = status;
        if (status === 'approved') {
          application.approvalDate = new Date().toISOString();
        }
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
        return application;
      }
      return null;
    } catch (error) {
      console.error('Error updating application status:', error);
      return null;
    }
  },

  deleteApplication: (id) => {
    try {
      const applications = DataManager.getAllApplications();
      const filtered = applications.filter(app => app.id !== id);
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting application:', error);
      return false;
    }
  },

  applicationExists: (email) => {
    try {
      const applications = DataManager.getAllApplications();
      return applications.some(app => app.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
      console.error('Error checking application:', error);
      return false;
    }
  },

  // User Session Management
  setUserSession: (userId, applicationData) => {
    try {
      const session = {
        userId,
        ...applicationData,
        sessionStarted: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(session));
      return session;
    } catch (error) {
      console.error('Error setting user session:', error);
      return null;
    }
  },

  getUserSession: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user session:', error);
      return null;
    }
  },

  clearUserSession: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
      return true;
    } catch (error) {
      console.error('Error clearing user session:', error);
      return false;
    }
  },

  // Market Data Simulation
  initializeMarketData: () => {
    try {
      const marketData = {
        lastUpdated: new Date().toISOString(),
        symbols: {
          'EUR/USD': { price: 1.0850, change: 0.15, high: 1.0925, low: 1.0745 },
          'GBP/USD': { price: 1.2680, change: 0.22, high: 1.2750, low: 1.2580 },
          'BTC/USD': { price: 63450, change: 2.45, high: 65000, low: 61800 },
          'ETH/USD': { price: 3420, change: 1.88, high: 3580, low: 3280 },
          'AAPL': { price: 192.50, change: 1.25, high: 195.00, low: 189.80 },
          'NVDA': { price: 875.30, change: 3.10, high: 885.00, low: 850.00 }
        }
      };
      localStorage.setItem(STORAGE_KEYS.MARKET_DATA, JSON.stringify(marketData));
      return marketData;
    } catch (error) {
      console.error('Error initializing market data:', error);
      return null;
    }
  },

  getMarketData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MARKET_DATA);
      return data ? JSON.parse(data) : DataManager.initializeMarketData();
    } catch (error) {
      console.error('Error getting market data:', error);
      return null;
    }
  },

  updateMarketPrice: (symbol, newPrice, changePercent) => {
    try {
      const marketData = DataManager.getMarketData();
      if (marketData && marketData.symbols[symbol]) {
        marketData.symbols[symbol].price = newPrice;
        marketData.symbols[symbol].change = changePercent;
        marketData.lastUpdated = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.MARKET_DATA, JSON.stringify(marketData));
        return marketData.symbols[symbol];
      }
      return null;
    } catch (error) {
      console.error('Error updating market price:', error);
      return null;
    }
  },

  // Admin Operations
  getAdminSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADMIN_SETTINGS);
      const defaults = { totalSlots: 100, filledSlots: 0, maxApplicantsPerDay: 20 };
      return data ? JSON.parse(data) : defaults;
    } catch (error) {
      console.error('Error getting admin settings:', error);
      return { totalSlots: 100, filledSlots: 0, maxApplicantsPerDay: 20 };
    }
  },

  updateAdminSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SETTINGS, JSON.stringify(settings));
      return settings;
    } catch (error) {
      console.error('Error updating admin settings:', error);
      return null;
    }
  },

  // Analytics
  getApplicationStats: () => {
    try {
      const applications = DataManager.getAllApplications();
      return {
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending_review').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length
      };
    } catch (error) {
      console.error('Error getting application stats:', error);
      return { total: 0, pending: 0, approved: 0, rejected: 0 };
    }
  }
};

export default DataManager;
