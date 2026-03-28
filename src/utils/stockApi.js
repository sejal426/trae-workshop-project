const BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

const SYMBOL_MAP = {
  'RELIANCE': 'RELIANCE.NS',
  'TCS': 'TCS.NS',
  'INFY': 'INFY.NS',
  'TATAMOTORS': 'TATAMOTORS.NS',
  'HDFCBANK': 'HDFCBANK.NS',
  'ICICIBANK': 'ICICIBANK.NS',
  'SBIN': 'SBIN.NS',
  'BHARTIARTL': 'BHARTIARTL.NS',
  'ITC': 'ITC.NS',
  'LT': 'LT.NS',
  'WIPRO': 'WIPRO.NS',
  'SUNPHARMA': 'SUNPHARMA.NS',
  'NIFTYBEES': 'NIFTYBEES.NS',
  'GOLDBEES': 'GOLDBEES.NS',
  'AAPL': 'AAPL',
  'TSLA': 'TSLA',
  'MSFT': 'MSFT',
  'GOOGL': 'GOOGL',
  'AMZN': 'AMZN',
  'NVDA': 'NVDA',
  'META': 'META',
  'JPM': 'JPM',
  'V': 'V',
  'WMT': 'WMT',
  'DIS': 'DIS',
  'NFLX': 'NFLX',
  'SPY': 'SPY',
  'QQQ': 'QQQ',
};

const CORS_PROXY = 'https://corsproxy.io/?';

export const fetchStockPrice = async (symbol) => {
  const yahooSymbol = SYMBOL_MAP[symbol] || symbol;

  try {
    const url = `${CORS_PROXY}${encodeURIComponent(`${BASE_URL}/${yahooSymbol}?interval=1d&range=1d`)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data?.chart?.result?.[0]) {
      const result = data.chart.result[0];
      const meta = result.meta;
      const quote = result.timestamp?.[0];
      const priceData = result.indicators?.quote?.[0];

      return {
        symbol,
        price: meta.regularMarketPrice || meta.previousClose,
        previousClose: meta.previousClose || meta.chartPreviousClose,
        change: meta.regularMarketPrice - (meta.previousClose || meta.chartPreviousClose),
        changePercent: ((meta.regularMarketPrice - (meta.previousClose || meta.chartPreviousClose)) / (meta.previousClose || meta.chartPreviousClose)) * 100,
        dayHigh: priceData?.high || meta.regularMarketDayHigh,
        dayLow: priceData?.low || meta.regularMarketDayLow,
        volume: meta.regularMarketVolume || 0,
        currency: meta.currency || 'USD',
        marketCap: formatMarketCap(meta.marketCap || meta.regularMarketCap),
      };
    }
    return null;
  } catch (error) {
    console.warn(`Failed to fetch ${symbol}:`, error);
    return null;
  }
};

export const fetchAllStockPrices = async (stocks) => {
  const results = await Promise.all(
    stocks.map(stock => fetchStockPrice(stock.symbol))
  );

  return stocks.map((stock, index) => {
    const priceData = results[index];
    if (priceData) {
      return {
        ...stock,
        price: priceData.price,
        previousClose: priceData.previousClose,
        change: priceData.change,
        changePercent: priceData.changePercent,
        dayHigh: priceData.dayHigh,
        dayLow: priceData.dayLow,
        volume: priceData.volume,
        marketCap: priceData.marketCap,
      };
    }
    return stock;
  });
};

export const fetchStockChart = async (symbol, range = '1mo') => {
  const yahooSymbol = SYMBOL_MAP[symbol] || symbol;

  try {
    const url = `${CORS_PROXY}${encodeURIComponent(`${BASE_URL}/${yahooSymbol}?interval=1d&range=${range}`)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data?.chart?.result?.[0]) {
      const result = data.chart.result[0];
      const timestamps = result.timestamp || [];
      const quotes = result.indicators?.quote?.[0] || {};
      const closes = quotes.close || [];

      return timestamps.map((ts, i) => ({
        date: new Date(ts * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Math.round((closes[i] || 0) * 100) / 100,
        high: Math.round((quotes.high?.[i] || 0) * 100) / 100,
        low: Math.round((quotes.low?.[i] || 0) * 100) / 100,
        open: Math.round((quotes.open?.[i] || 0) * 100) / 100,
        volume: quotes.volume?.[i] || 0,
      })).filter(d => d.price > 0);
    }
    return [];
  } catch (error) {
    console.warn(`Failed to fetch chart for ${symbol}:`, error);
    return [];
  }
};

const formatMarketCap = (cap) => {
  if (!cap) return 'N/A';
  if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
  if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
  if (cap >= 1e7) return `₹${(cap / 1e7).toFixed(2)}L Cr`;
  if (cap >= 1e5) return `₹${(cap / 1e5).toFixed(2)}K Cr`;
  return `₹${cap.toLocaleString()}`;
};

export const SYMBOLS = Object.keys(SYMBOL_MAP);
