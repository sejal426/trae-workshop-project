import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchStockPrice, fetchStockChart } from '../utils/stockApi';

const INITIAL_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2856.75, previousClose: 2832.50, country: 'INDIA', sector: 'Energy', marketCap: '20.5L Cr' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3842.30, previousClose: 3856.20, country: 'INDIA', sector: 'IT', marketCap: '14.2L Cr' },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1524.80, previousClose: 1510.25, country: 'INDIA', sector: 'IT', marketCap: '6.3L Cr' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 712.45, previousClose: 705.80, country: 'INDIA', sector: 'Automobile', marketCap: '2.6L Cr' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1689.60, previousClose: 1695.30, country: 'INDIA', sector: 'Banking', marketCap: '12.8L Cr' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 976.25, previousClose: 970.50, country: 'INDIA', sector: 'Banking', marketCap: '6.8L Cr' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 584.30, previousClose: 580.15, country: 'INDIA', sector: 'Banking', marketCap: '5.2L Cr' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1089.50, previousClose: 1075.80, country: 'INDIA', sector: 'Telecom', marketCap: '6.0L Cr' },
  { symbol: 'ITC', name: 'ITC Limited', price: 456.75, previousClose: 458.20, country: 'INDIA', sector: 'FMCG', marketCap: '5.7L Cr' },
  { symbol: 'LT', name: 'Larsen & Toubro', price: 3542.60, previousClose: 3518.90, country: 'INDIA', sector: 'Construction', marketCap: '4.9L Cr' },
  { symbol: 'WIPRO', name: 'Wipro Limited', price: 485.20, previousClose: 482.50, country: 'INDIA', sector: 'IT', marketCap: '2.1L Cr' },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', price: 1245.80, previousClose: 1238.40, country: 'INDIA', sector: 'Pharma', marketCap: '2.9L Cr' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, previousClose: 176.80, country: 'US', sector: 'Technology', marketCap: '2.78T' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.90, previousClose: 252.30, country: 'US', sector: 'Automobile', marketCap: '791B' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 374.25, previousClose: 371.80, country: 'US', sector: 'Technology', marketCap: '2.78T' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 139.80, previousClose: 138.50, country: 'US', sector: 'Technology', marketCap: '1.73T' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 144.60, previousClose: 143.20, country: 'US', sector: 'E-Commerce', marketCap: '1.49T' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.75, previousClose: 488.30, country: 'US', sector: 'Semiconductor', marketCap: '1.22T' },
  { symbol: 'META', name: 'Meta Platforms', price: 326.50, previousClose: 322.80, country: 'US', sector: 'Social Media', marketCap: '837B' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 158.40, previousClose: 156.90, country: 'US', sector: 'Banking', marketCap: '457B' },
  { symbol: 'V', name: 'Visa Inc.', price: 258.30, previousClose: 255.70, country: 'US', sector: 'Finance', marketCap: '527B' },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 164.20, previousClose: 162.50, country: 'US', sector: 'Retail', marketCap: '442B' },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 91.80, previousClose: 90.25, country: 'US', sector: 'Entertainment', marketCap: '168B' },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 485.60, previousClose: 478.30, country: 'US', sector: 'Streaming', marketCap: '212B' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 452.30, previousClose: 449.80, country: 'US', sector: 'ETF', marketCap: '408B' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 385.40, previousClose: 382.60, country: 'US', sector: 'ETF', marketCap: '210B' },
  { symbol: 'NIFTYBEES', name: 'Nifty Bees ETF', price: 248.50, previousClose: 246.80, country: 'INDIA', sector: 'ETF', marketCap: '14.2K Cr' },
  { symbol: 'GOLDBEES', name: 'Gold Bees ETF', price: 562.30, previousClose: 558.90, country: 'INDIA', sector: 'ETF', marketCap: '8.9K Cr' },
];

const generateChartData = (basePrice, days = 30) => {
  const data = [];
  let price = basePrice * 0.9;
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.48) * (price * 0.03);
    price = Math.max(price + change, basePrice * 0.5);
    const high = price * (1 + Math.random() * 0.02);
    const low = price * (1 - Math.random() * 0.02);
    const open = low + Math.random() * (high - low);
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.round(price * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      open: Math.round(open * 100) / 100,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    });
  }
  return data;
};

const generatePrediction = (currentPrice, trend) => {
  const trendFactor = trend === 'up' ? 0.015 : trend === 'down' ? -0.015 : 0;
  const noise = () => (Math.random() - 0.5) * 0.03;
  return {
    day7: Math.round(currentPrice * (1 + trendFactor * 7 + noise()) * 100) / 100,
    day30: Math.round(currentPrice * (1 + trendFactor * 30 + noise()) * 100) / 100,
  };
};

const calculateMovingAverages = (chartData) => {
  if (chartData.length < 30) return { day7: chartData[chartData.length - 1]?.price || 0, day30: chartData[chartData.length - 1]?.price || 0 };
  const day7 = chartData.slice(-7).reduce((sum, d) => sum + d.price, 0) / 7;
  const day30 = chartData.reduce((sum, d) => sum + d.price, 0) / 30;
  return { day7: Math.round(day7 * 100) / 100, day30: Math.round(day30 * 100) / 100 };
};

const BADGES = [
  { id: 'first_trade', name: 'First Trade', emoji: '🏆', description: 'Execute your first buy/sell' },
  { id: 'bull_run', name: 'Bull Run', emoji: '📈', description: 'Make 10 successful trades' },
  { id: 'theory_complete', name: 'Theory Complete', emoji: '📚', description: 'Finish all lessons' },
  { id: 'tax_nerd', name: 'Tax Nerd', emoji: '🧾', description: 'Use all tax calculators' },
  { id: 'debt_destroyer', name: 'Debt Destroyer', emoji: '💳', description: 'Complete Debt Danger Zone quiz' },
  { id: 'diamond_hands', name: 'Diamond Hands', emoji: '🎯', description: 'Hold a stock for 30+ simulated days' },
  { id: 'day_trader', name: 'Day Trader', emoji: '🔄', description: 'Make 5 trades in one session' },
];

const LEVELS = [
  { name: 'BrokeButSmart Newbie', minXp: 0, maxXp: 500 },
  { name: 'Money Curious', minXp: 500, maxXp: 1500 },
  { name: 'Financially Awakening', minXp: 1500, maxXp: 3500 },
  { name: 'Market Apprentice', minXp: 3500, maxXp: 7000 },
  { name: 'Smart Money Master', minXp: 7000, maxXp: Infinity },
];

const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      stocks: INITIAL_STOCKS.map(s => ({
        ...s,
        change: Math.round((s.price - s.previousClose) * 100) / 100,
        changePercent: Math.round(((s.price - s.previousClose) / s.previousClose) * 10000) / 100,
        dayHigh: Math.max(s.price, s.previousClose) * 1.01,
        dayLow: Math.min(s.price, s.previousClose) * 0.99,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
        chartData: generateChartData(s.price),
        movingAverages: calculateMovingAverages(generateChartData(s.price)),
        prediction: generatePrediction(s.price, 'neutral'),
      })),
      marketEvents: [],
      transactions: [],
      holdings: [],
      cash: 100000,
      xp: 0,
      badges: [],
      completedLessons: [],
      quizScores: {},
      taxCalculations: [],
      debtQuizCompleted: false,
      sessionTrades: 0,
      hasOnboarded: false,
      isLoadingPrices: false,
      lastPriceUpdate: null,
      priceError: null,

      fetchLivePrices: async () => {
        const state = get();
        if (state.isLoadingPrices) return;

        set({ isLoadingPrices: true, priceError: null });

        try {
          const updatedStocks = await Promise.all(
            state.stocks.map(async (stock) => {
              const liveData = await fetchStockPrice(stock.symbol);
              if (liveData) {
                const chartData = await fetchStockChart(stock.symbol, '1mo');
                const newMA = calculateMovingAverages(chartData.length > 0 ? chartData : state.stocks.find(s => s.symbol === stock.symbol)?.chartData || []);

                return {
                  ...stock,
                  price: liveData.price,
                  previousClose: liveData.previousClose,
                  change: liveData.change,
                  changePercent: liveData.changePercent,
                  dayHigh: liveData.dayHigh,
                  dayLow: liveData.dayLow,
                  volume: liveData.volume,
                  marketCap: liveData.marketCap,
                  chartData: chartData.length > 0 ? chartData : stock.chartData,
                  movingAverages: newMA,
                  prediction: generatePrediction(liveData.price, liveData.change >= 0 ? 'up' : 'down'),
                };
              }
              return stock;
            })
          );

          const updatedHoldings = state.holdings.map(holding => {
            const updated = updatedStocks.find(s => s.symbol === holding.symbol);
            return updated ? { ...holding, currentPrice: updated.price } : holding;
          });

          set({
            stocks: updatedStocks,
            holdings: updatedHoldings,
            isLoadingPrices: false,
            lastPriceUpdate: new Date().toISOString(),
          });
        } catch (error) {
          set({
            isLoadingPrices: false,
            priceError: 'Failed to fetch live prices. Using simulated data.',
          });
        }
      },

      fetchStockChartData: async (symbol) => {
        const state = get();
        const chartData = await fetchStockChart(symbol, '1mo');

        if (chartData.length > 0) {
          const updatedStocks = state.stocks.map(s =>
            s.symbol === symbol ? {
              ...s,
              chartData,
              movingAverages: calculateMovingAverages(chartData),
            } : s
          );
          set({ stocks: updatedStocks });
        }

        return chartData;
      },

      onboard: (vibe, startingAmount) => set({
        user: { vibe, startingAmount, createdAt: new Date().toISOString() },
        hasOnboarded: true,
        cash: startingAmount,
        xp: 0,
        badges: [],
        completedLessons: [],
        quizScores: {},
        taxCalculations: [],
        debtQuizCompleted: false,
        sessionTrades: 0,
        holdings: [],
        transactions: [],
      }),

      buyStock: (symbol, quantity, price) => {
        const state = get();
        const totalCost = quantity * price;
        if (totalCost > state.cash) return { success: false, message: 'Insufficient funds' };

        const existingHolding = state.holdings.find(h => h.symbol === symbol);
        let newHoldings;
        if (existingHolding) {
          const newQty = existingHolding.quantity + quantity;
          const newAvgPrice = ((existingHolding.quantity * existingHolding.avgBuyPrice) + (quantity * price)) / newQty;
          newHoldings = state.holdings.map(h =>
            h.symbol === symbol ? { ...h, quantity: newQty, avgBuyPrice: Math.round(newAvgPrice * 100) / 100, currentPrice: price } : h
          );
        } else {
          const stock = state.stocks.find(s => s.symbol === symbol);
          newHoldings = [...state.holdings, {
            symbol,
            name: stock.name,
            quantity,
            avgBuyPrice: price,
            currentPrice: price,
            buyDate: new Date().toISOString(),
          }];
        }

        const newTransaction = {
          id: Date.now().toString(),
          type: 'BUY',
          symbol,
          quantity,
          price,
          timestamp: new Date().toISOString(),
        };

        const isFirstTrade = state.transactions.length === 0;
        const newXp = state.xp + 25 + (isFirstTrade ? 25 : 0);
        const newBadges = [...state.badges];
        if (isFirstTrade && !newBadges.find(b => b.id === 'first_trade')) {
          newBadges.push(BADGES.find(b => b.id === 'first_trade'));
        }
        const tradeCount = state.transactions.filter(t => t.type === 'BUY').length + 1;
        if (tradeCount >= 10 && !newBadges.find(b => b.id === 'bull_run')) {
          newBadges.push(BADGES.find(b => b.id === 'bull_run'));
        }

        return set({
          cash: Math.round((state.cash - totalCost) * 100) / 100,
          holdings: newHoldings,
          transactions: [newTransaction, ...state.transactions],
          xp: newXp,
          badges: newBadges,
          sessionTrades: state.sessionTrades + 1,
        }), { success: true };
      },

      sellStock: (symbol, quantity, price) => {
        const state = get();
        const holding = state.holdings.find(h => h.symbol === symbol);
        if (!holding || holding.quantity < quantity) return { success: false, message: 'Insufficient holdings' };

        const pnl = (price - holding.avgBuyPrice) * quantity;
        let newHoldings;
        if (holding.quantity === quantity) {
          newHoldings = state.holdings.filter(h => h.symbol !== symbol);
        } else {
          newHoldings = state.holdings.map(h =>
            h.symbol === symbol ? { ...h, quantity: h.quantity - quantity } : h
          );
        }

        const newTransaction = {
          id: Date.now().toString(),
          type: 'SELL',
          symbol,
          quantity,
          price,
          pnl: Math.round(pnl * 100) / 100,
          timestamp: new Date().toISOString(),
        };

        return set({
          cash: Math.round((state.cash + quantity * price) * 100) / 100,
          holdings: newHoldings,
          transactions: [newTransaction, ...state.transactions],
          sessionTrades: state.sessionTrades + 1,
        }), { success: true };
      },

      updateStockPrices: () => {
        const state = get();
        const updatedStocks = state.stocks.map(stock => {
          const volatility = 0.02;
          const randomWalk = (Math.random() - 0.5) * 2 * volatility;
          const trendBias = stock.changePercent > 0 ? 0.002 : stock.changePercent < 0 ? -0.002 : 0;
          const newPrice = Math.round(stock.price * (1 + randomWalk + trendBias) * 100) / 100;

          const lastChart = stock.chartData[stock.chartData.length - 1];
          const newChartPoint = {
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: newPrice,
            high: Math.max(newPrice, lastChart?.price || newPrice) * (1 + Math.random() * 0.005),
            low: Math.min(newPrice, lastChart?.price || newPrice) * (1 - Math.random() * 0.005),
            open: lastChart?.price || newPrice,
            volume: Math.floor(Math.random() * 10000000) + 1000000,
          };
          const newChartData = [...stock.chartData.slice(-29), newChartPoint];
          const newMA = calculateMovingAverages(newChartData);

          return {
            ...stock,
            price: newPrice,
            change: Math.round((newPrice - stock.previousClose) * 100) / 100,
            changePercent: Math.round(((newPrice - stock.previousClose) / stock.previousClose) * 10000) / 100,
            chartData: newChartData,
            movingAverages: newMA,
            prediction: generatePrediction(newPrice, newPrice > stock.previousClose ? 'up' : newPrice < stock.previousClose ? 'down' : 'neutral'),
          };
        });

        const updatedHoldings = state.holdings.map(holding => {
          const updated = updatedStocks.find(s => s.symbol === holding.symbol);
          return updated ? { ...holding, currentPrice: updated.price } : holding;
        });

        set({ stocks: updatedStocks, holdings: updatedHoldings });
      },

      addMarketEvent: () => {
        const state = get();
        const events = [
          { title: 'RBI cuts interest rates', description: 'Central bank eases monetary policy', emoji: '🔻', impact: -0.5 },
          { title: 'Company posts record profits', description: 'Strong quarterly earnings beat expectations', emoji: '📈', impact: 1.5 },
          { title: 'Market crash alert', description: 'Global markets in red amid recession fears', emoji: '⚠️', impact: -2.5 },
          { title: 'Tech sector rally', description: 'IT stocks surge on strong hiring data', emoji: '💻', impact: 1.2 },
          { title: 'Oil prices drop', description: 'Crude falls on supply surplus concerns', emoji: '🛢️', impact: -0.8 },
          { title: 'Rally continues', description: 'Bull market extends gains for third week', emoji: '🚀', impact: 2.0 },
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        const affectedIndices = Math.floor(Math.random() * 3) + 2;
        const affected = state.stocks.slice(0, affectedIndices).map(s => s.symbol);

        const newEvent = {
          id: Date.now().toString(),
          ...event,
          affectedStocks: affected,
          timestamp: new Date().toISOString(),
        };

        const updatedStocks = state.stocks.map(stock => {
          if (affected.includes(stock.symbol)) {
            const newPrice = Math.round(stock.price * (1 + event.impact / 100) * 100) / 100;
            return { ...stock, price: newPrice };
          }
          return stock;
        });

        set({ marketEvents: [newEvent, ...state.marketEvents.slice(0, 9)], stocks: updatedStocks });
      },

      completeLesson: (lessonId) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return;

        const newCompleted = [...state.completedLessons, lessonId];
        const newXp = state.xp + 50;
        let newBadges = [...state.badges];

        if (newCompleted.length >= 6 && !newBadges.find(b => b.id === 'theory_complete')) {
          newBadges.push(BADGES.find(b => b.id === 'theory_complete'));
        }

        set({ completedLessons: newCompleted, xp: newXp, badges: newBadges });
      },

      completeQuiz: (lessonId, score) => {
        const state = get();
        const newScores = { ...state.quizScores, [lessonId]: score };
        const allCorrect = score === 3;
        const newXp = state.xp + (allCorrect ? 150 : 50);

        set({ quizScores: newScores, xp: newXp });
      },

      addTaxCalculation: (calc) => {
        const state = get();
        const newCalculations = [...state.taxCalculations, { ...calc, id: Date.now().toString(), timestamp: new Date().toISOString() }];
        const newBadges = [...state.badges];

        if (newCalculations.length >= 3 && !newBadges.find(b => b.id === 'tax_nerd')) {
          newBadges.push(BADGES.find(b => b.id === 'tax_nerd'));
        }

        set({ taxCalculations: newCalculations, badges: newBadges, xp: state.xp + 30 });
      },

      completeDebtQuiz: () => {
        const state = get();
        const newBadges = [...state.badges];
        if (!newBadges.find(b => b.id === 'debt_destroyer')) {
          newBadges.push(BADGES.find(b => b.id === 'debt_destroyer'));
        }
        set({ debtQuizCompleted: true, badges: newBadges, xp: state.xp + 75 });
      },

      getLevel: () => {
        const { xp } = get();
        return LEVELS.find(level => xp >= level.minXp && xp < level.maxXp) || LEVELS[LEVELS.length - 1];
      },

      getPortfolioValue: () => {
        const { holdings, cash } = get();
        const holdingsValue = holdings.reduce((sum, h) => sum + (h.currentPrice * h.quantity), 0);
        return Math.round((holdingsValue + cash) * 100) / 100;
      },

      getTotalPnL: () => {
        const { holdings } = get();
        return holdings.reduce((sum, h) => sum + ((h.currentPrice - h.avgBuyPrice) * h.quantity), 0);
      },
    }),
    {
      name: 'brokebutsmart-storage',
      partialize: (state) => ({
        user: state.user,
        hasOnboarded: state.hasOnboarded,
        cash: state.cash,
        xp: state.xp,
        badges: state.badges,
        completedLessons: state.completedLessons,
        quizScores: state.quizScores,
        taxCalculations: state.taxCalculations,
        debtQuizCompleted: state.debtQuizCompleted,
        holdings: state.holdings,
        transactions: state.transactions,
      }),
    }
  )
);

export default useStore;