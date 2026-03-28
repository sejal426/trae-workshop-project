import { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Wallet, PieChart, Bell, X, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import useStore from '../store/useStore';
import styles from './Trade.module.css';

const COLORS = ['#00D26A', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

function Trade() {
  const [view, setView] = useState('portfolio');
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showPrediction, setShowPrediction] = useState(false);

  const stocks = useStore((state) => state.stocks);
  const holdings = useStore((state) => state.holdings);
  const cash = useStore((state) => state.cash);
  const transactions = useStore((state) => state.transactions);
  const marketEvents = useStore((state) => state.marketEvents);
  const buyStock = useStore((state) => state.buyStock);
  const sellStock = useStore((state) => state.sellStock);
  const updateStockPrices = useStore((state) => state.updateStockPrices);
  const fetchLivePrices = useStore((state) => state.fetchLivePrices);
  const addMarketEvent = useStore((state) => state.addMarketEvent);
  const getPortfolioValue = useStore((state) => state.getPortfolioValue);
  const getTotalPnL = useStore((state) => state.getTotalPnL);
  const isLoadingPrices = useStore((state) => state.isLoadingPrices);
  const priceError = useStore((state) => state.priceError);

  const sectors = ['ALL', ...new Set(stocks.map(s => s.sector))];

  useEffect(() => {
    fetchLivePrices();
    const priceInterval = setInterval(fetchLivePrices, 60000);
    const simInterval = setInterval(updateStockPrices, 3000);
    const eventInterval = setInterval(() => {
      if (Math.random() > 0.6) addMarketEvent();
    }, 15000);
    return () => {
      clearInterval(priceInterval);
      clearInterval(simInterval);
      clearInterval(eventInterval);
    };
  }, [fetchLivePrices, updateStockPrices, addMarketEvent]);

  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = countryFilter === 'ALL' || s.country === countryFilter;
    const matchesSector = sectorFilter === 'ALL' || s.sector === sectorFilter;
    return matchesSearch && matchesCountry && matchesSector;
  });

  const portfolioValue = getPortfolioValue();
  const totalPnL = getTotalPnL();
  const portfolioChange = holdings.length > 0
    ? holdings.reduce((sum, h) => sum + ((h.currentPrice - h.avgBuyPrice) * h.quantity), 0)
    : 0;

  const pieData = holdings.map((h, i) => ({
    name: h.symbol,
    value: Math.round(h.currentPrice * h.quantity * 100) / 100,
    color: COLORS[i % COLORS.length],
  }));

  const performanceData = transactions.slice(0, 10).reverse().map((t, i, arr) => {
    const runningTotal = arr.slice(0, i + 1).reduce((sum, tx) => {
      if (tx.type === 'BUY') return sum - (tx.price * tx.quantity);
      return sum + (tx.price * tx.quantity);
    }, 100000);
    return {
      name: new Date(t.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(runningTotal * 100) / 100,
    };
  }).concat({ name: 'Now', value: portfolioValue });

  const handleBuy = () => {
    if (!selectedStock || quantity < 1) return;
    const result = buyStock(selectedStock.symbol, quantity, selectedStock.price);
    if (result.success) {
      setShowBuyModal(false);
      setQuantity(1);
    }
  };

  const handleSell = () => {
    if (!selectedStock || quantity < 1) return;
    const holding = holdings.find(h => h.symbol === selectedStock.symbol);
    if (!holding || holding.quantity < quantity) return;
    const result = sellStock(selectedStock.symbol, quantity, selectedStock.price);
    if (result.success) {
      setShowSellModal(false);
      setQuantity(1);
    }
  };

  if (selectedStock) {
    const holding = holdings.find(h => h.symbol === selectedStock.symbol);
    const stockPnL = holding ? (selectedStock.price - holding.avgBuyPrice) * holding.quantity : 0;
    const chartData = selectedStock.chartData.map(d => ({
      name: d.date,
      price: d.price,
      volume: d.volume,
    }));

    const predictionData = showPrediction ? [
      { name: 'Now', price: selectedStock.price },
      { name: '7D', price: selectedStock.prediction?.day7 || selectedStock.price },
      { name: '30D', price: selectedStock.prediction?.day30 || selectedStock.price },
    ] : null;

    return (
      <div className={styles.stockDetail}>
        <button className={styles.backBtn} onClick={() => setSelectedStock(null)}>
          ← Back to Trade
        </button>

        {marketEvents.length > 0 && marketEvents[0]?.affectedStocks.includes(selectedStock.symbol) && (
          <div className={styles.eventBanner}>
            <span className={styles.eventEmoji}>{marketEvents[0].emoji}</span>
            <span>{marketEvents[0].title}</span>
          </div>
        )}

        <div className={styles.stockHeader}>
          <div>
            <h1 className={styles.stockSymbol}>{selectedStock.symbol}</h1>
            <p className={styles.stockName}>{selectedStock.name}</p>
          </div>
          <div className={styles.stockPrice}>
            <span className={styles.price}>
              ₹{selectedStock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <span className={`${styles.change} ${selectedStock.change >= 0 ? styles.up : styles.down}`}>
              {selectedStock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <h3>Price Chart</h3>
            <label className={styles.predictionToggle}>
              <input
                type="checkbox"
                checked={showPrediction}
                onChange={(e) => setShowPrediction(e.target.checked)}
              />
              <span>Show Prediction</span>
            </label>
          </div>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D26A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D26A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#606070' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#606070' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ background: '#1A1A1F', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#A0A0B0' }}
                />
                <Area type="monotone" dataKey="price" stroke="#00D26A" fill="url(#priceGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {showPrediction && predictionData && (
            <div className={styles.predictionInfo}>
              <p className={styles.predictionLabel}>📊 Predicted Prices (Simulated)</p>
              <div className={styles.predictionValues}>
                <span>7-Day: ₹{predictionData[1].price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                <span>30-Day: ₹{predictionData[2].price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <p className={styles.disclaimer}>⚠️ These are simulated predictions, not financial advice</p>
            </div>
          )}
        </div>

        <div className={styles.stockStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Day High</span>
            <span className={styles.statValue}>₹{selectedStock.dayHigh.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Day Low</span>
            <span className={styles.statValue}>₹{selectedStock.dayLow.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Volume</span>
            <span className={styles.statValue}>{(selectedStock.volume / 1000000).toFixed(2)}M</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>MA 7</span>
            <span className={styles.statValue}>₹{selectedStock.movingAverages.day7.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {holding && (
          <div className={styles.holdingInfo}>
            <h3>Your Position</h3>
            <div className={styles.holdingStats}>
              <div className={styles.holdingStat}>
                <span>Quantity</span>
                <span>{holding.quantity}</span>
              </div>
              <div className={styles.holdingStat}>
                <span>Avg Buy Price</span>
                <span>₹{holding.avgBuyPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.holdingStat}>
                <span>Current Value</span>
                <span>₹{(holding.quantity * selectedStock.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.holdingStat}>
                <span>P&L</span>
                <span className={stockPnL >= 0 ? styles.profit : styles.loss}>
                  {stockPnL >= 0 ? '+' : ''}₹{stockPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className={styles.actionButtons}>
          <button className={styles.buyBtn} onClick={() => { setSelectedStock(selectedStock); setShowBuyModal(true); }}>
            Buy
          </button>
          <button
            className={styles.sellBtn}
            onClick={() => { setSelectedStock(selectedStock); setShowSellModal(true); }}
            disabled={!holding}
          >
            Sell
          </button>
        </div>

        {showBuyModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Buy {selectedStock.symbol}</h3>
                <button onClick={() => setShowBuyModal(false)}><X size={20} /></button>
              </div>
              <div className={styles.modalBody}>
                <p className={styles.modalPrice}>₹{selectedStock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} per share</p>
                <div className={styles.quantityInput}>
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
                <div className={styles.modalTotal}>
                  <span>Total Cost</span>
                  <span>₹{(quantity * selectedStock.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <p className={styles.cashBalance}>Available: ₹{cash.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
              </div>
              <button
                className={styles.confirmBtn}
                onClick={handleBuy}
                disabled={quantity * selectedStock.price > cash}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        )}

        {showSellModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Sell {selectedStock.symbol}</h3>
                <button onClick={() => setShowSellModal(false)}><X size={20} /></button>
              </div>
              <div className={styles.modalBody}>
                <p className={styles.modalPrice}>₹{selectedStock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} per share</p>
                <div className={styles.quantityInput}>
                  <label>Quantity (Max: {holding?.quantity || 0})</label>
                  <input
                    type="number"
                    min="1"
                    max={holding?.quantity || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(holding?.quantity || 1, Math.max(1, parseInt(e.target.value) || 1)))}
                  />
                </div>
                <div className={styles.modalTotal}>
                  <span>Total Value</span>
                  <span>₹{(quantity * selectedStock.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <p className={styles.pnlPreview}>
                  Est. P&L: <span className={stockPnL >= 0 ? styles.profit : styles.loss}>
                    {stockPnL >= 0 ? '+' : ''}₹{((selectedStock.price - (holding?.avgBuyPrice || 0)) * quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </p>
              </div>
              <button className={styles.confirmSellBtn} onClick={handleSell}>
                Confirm Sale
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Trade 💸</h1>
          <p className={styles.subtitle}>Paper trade like a pro. No real money lost (or gained).</p>
        </div>
        {marketEvents.length > 0 && (
          <div className={styles.eventIndicator}>
            <Bell size={16} />
            <span>{marketEvents.length}</span>
          </div>
        )}
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${view === 'portfolio' ? styles.activeTab : ''}`} onClick={() => setView('portfolio')}>
          <Wallet size={18} /> Portfolio
        </button>
        <button className={`${styles.tab} ${view === 'market' ? styles.activeTab : ''}`} onClick={() => setView('market')}>
          <TrendingUp size={18} /> Market
        </button>
      </div>

      <div className={styles.priceStatus}>
        {isLoadingPrices ? (
          <span className={styles.loading}>⟳ Fetching live prices...</span>
        ) : priceError ? (
          <span className={styles.error}>⚠️ {priceError}</span>
        ) : (
          <span className={styles.live}>● LIVE</span>
        )}
      </div>

      {view === 'portfolio' ? (
        <div className={styles.portfolioView}>
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioValue}>
              <span className={styles.portfolioLabel}>Portfolio Value</span>
              <span className={styles.portfolioAmount}>
                ₹{portfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <span className={`${styles.portfolioChange} ${portfolioChange >= 0 ? styles.profit : styles.loss}`}>
                {portfolioChange >= 0 ? '+' : ''}₹{portfolioChange.toLocaleString('en-IN', { minimumFractionDigits: 2 })} today
              </span>
            </div>
            <div className={styles.cashInfo}>
              <span>Cash: ₹{cash.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {holdings.length > 0 && (
            <>
              <div className={styles.allocationSection}>
                <h3><PieChart size={16} /> Allocation</h3>
                <div className={styles.pieChart}>
                  <ResponsiveContainer width="100%" height={160}>
                    <RePieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: '#1A1A1F', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className={styles.legend}>
                  {pieData.map((item, i) => (
                    <div key={i} className={styles.legendItem}>
                      <span className={styles.legendDot} style={{ background: item.color }} />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {performanceData.length > 1 && (
                <div className={styles.performanceSection}>
                  <h3>Performance</h3>
                  <div className={styles.performanceChart}>
                    <ResponsiveContainer width="100%" height={120}>
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00D26A" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#00D26A" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#606070' }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{ background: '#1A1A1F', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#00D26A" fill="url(#perfGradient)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              <div className={styles.holdingsList}>
                <h3>Your Holdings</h3>
                {holdings.map((holding) => {
                  const stock = stocks.find(s => s.symbol === holding.symbol);
                  const pnl = (stock?.price - holding.avgBuyPrice) * holding.quantity;
                  const pnlPercent = ((stock?.price - holding.avgBuyPrice) / holding.avgBuyPrice) * 100;
                  return (
                    <button
                      key={holding.symbol}
                      className={styles.holdingCard}
                      onClick={() => setSelectedStock(stock)}
                    >
                      <div className={styles.holdingLeft}>
                        <span className={styles.holdingSymbol}>{holding.symbol}</span>
                        <span className={styles.holdingQty}>{holding.quantity} shares</span>
                      </div>
                      <div className={styles.holdingRight}>
                        <span className={styles.holdingValue}>
                          ₹{(holding.quantity * stock?.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                        <span className={`${styles.holdingPnL} ${pnl >= 0 ? styles.profit : styles.loss}`}>
                          {pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({pnlPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {holdings.length === 0 && (
            <div className={styles.emptyPortfolio}>
              <p>Your portfolio's emptier than your bank account.</p>
              <p>Time to change that!</p>
              <button onClick={() => setView('market')} className={styles.startTradingBtn}>
                Start Trading →
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.marketView}>
          <div className={styles.searchBar}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search stocks (RELIANCE, AAPL, etc.)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Country:</span>
              {['ALL', 'INDIA', 'US'].map((f) => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${countryFilter === f ? styles.activeFilter : ''}`}
                  onClick={() => setCountryFilter(f)}
                >
                  {f === 'ALL' ? 'All' : f === 'INDIA' ? '🇮🇳 India' : '🇺🇸 US'}
                </button>
              ))}
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Sector:</span>
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className={styles.sectorSelect}
              >
                {sectors.map(s => (
                  <option key={s} value={s}>{s === 'ALL' ? 'All Sectors' : s}</option>
                ))}
              </select>
            </div>
          </div>

          {marketEvents.length > 0 && (
            <div className={styles.eventsFeed}>
              <h4><Bell size={14} /> Market Events</h4>
              {marketEvents.slice(0, 3).map((event) => (
                <div key={event.id} className={styles.eventItem}>
                  <span>{event.emoji}</span>
                  <span>{event.title}</span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.stockList}>
            {filteredStocks.map((stock) => (
              <button
                key={stock.symbol}
                className={styles.stockCard}
                onClick={() => setSelectedStock(stock)}
              >
                <div className={styles.stockInfo}>
                  <span className={styles.stockSymbol}>{stock.symbol}</span>
                  <span className={styles.stockName}>{stock.name}</span>
                  <span className={styles.stockMeta}>{stock.sector} • {stock.marketCap}</span>
                </div>
                <div className={styles.stockPriceInfo}>
                  <span className={styles.stockPrice}>₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  <span className={`${styles.stockChange} ${stock.change >= 0 ? styles.up : styles.down}`}>
                    {stock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Trade;