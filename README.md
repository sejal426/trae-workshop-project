# BrokeButSmart 💰

### Financial Literacy App for College Students

A mobile-first financial literacy web app that teaches college students about investing, taxes, and debt through gamified learning and paper trading — no real money required.

![Dark Mode](https://img.shields.io/badge/Mode-Dark-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-4.4-yellow)

---

## 🎯 Features

### 📚 Pillar 1 — Theory Hub (Learn)
- **6 Comprehensive Lessons** covering:
  - How Stock Markets Work
  - Investment Types (Stocks, ETFs, Mutual Funds, Bonds)
  - Reading Stock Charts (Candlesticks, Moving Averages)
  - Market Cycles (Bull vs Bear Markets)
  - Taxes on Investments (Capital Gains, TDS)
  - Debt 101 (Good Debt vs Bad Debt)
- **Expandable "Go Deeper" sections** for advanced learners
- **3-Question Quizzes** per lesson with instant feedback
- **XP Rewards** for completing lessons and quizzes

### 💸 Pillar 2 — Paper Trading Simulator
- **28 Real Stocks** from India (NSE) and US (NYSE/NASDAQ)
- **Live Market Prices** via Yahoo Finance API
- **₹1,000 - ₹50,000** starting capital (user selectable)
- **Buy/Sell Trading** with real-time P&L calculation
- **Portfolio Dashboard** with allocation pie chart
- **Performance Graph** tracking portfolio history
- **Market Events Simulator** (RBI rate cuts, earnings, crashes)
- **7-Day & 30-Day Price Predictions** (simulated)

### 🧾 Pillar 3 — Tax Explainer
- Visual explanations of income tax slabs
- Capital Gains Tax calculator (Short-term vs Long-term)
- TDS Calculator for various income types
- Tax Simulator with deductions
- History of all tax calculations

### 💳 Pillar 4 — Debt Decoder
- Good Debt vs Bad Debt explainer cards
- **Compound Interest Visualizer** — watch debt grow with sliders
- **EMI Calculator** for loans
- **Debt Danger Zone Quiz** — scenario-based decision making

### 🎮 Gamification
- **XP System** — earn points for learning and trading
- **5 Levels** — Newbie → Money Curious → Financially Awakening → Market Apprentice → Smart Money Master
- **7 Badges** — First Trade, Bull Run, Theory Complete, Tax Nerd, Debt Destroyer, Diamond Hands, Day Trader
- **Progress Tracking** persisted in localStorage

### 👤 User Authentication
- Sign Up / Login with email and password
- User data stored locally
- Personalized profile with achievements

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
cd traeworkshop

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at **http://localhost:5173**

---

## 📱 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Background Primary | `#0D0D0F` | Main background |
| Background Secondary | `#1A1A1F` | Cards |
| Accent (Money Green) | `#00D26A` | Primary accent, prices |
| Warning | `#FFB800` | Warnings |
| Danger | `#FF4757` | Losses, errors |
| Text Primary | `#FFFFFF` | Main text |
| Text Secondary | `#A0A0B0` | Muted text |

### Typography
- **Headings**: Space Grotesk (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Monospace/Numbers**: JetBrains Mono

### Key Libraries
- **React 18** — UI framework
- **Vite** — Build tool
- **React Router v6** — Routing
- **Zustand** — State management
- **Recharts** — Charts and graphs
- **Lucide React** — Icons

---

## 📂 Project Structure

```
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Router and app shell
├── index.css                # Global styles (CSS variables)
├── store/
│   ├── useStore.js         # Main app state (portfolio, XP, etc.)
│   └── useAuthStore.js     # Authentication state
├── components/
│   ├── Layout.jsx           # Bottom tab navigation
│   └── Layout.module.css
├── pages/
│   ├── Onboarding.jsx       # Welcome + vibe selection + money slider
│   ├── Learn.jsx            # Theory Hub with lessons & quizzes
│   ├── Trade.jsx            # Paper trading simulator
│   ├── Tax.jsx              # Tax explainer & calculators
│   ├── Debt.jsx             # Debt decoder & tools
│   ├── Profile.jsx          # User stats, badges, logout
│   ├── Login.jsx            # User login
│   └── Signup.jsx           # User registration
├── data/
│   └── lessons.js           # Theory content
└── utils/
    └── stockApi.js          # Yahoo Finance API integration
```

---

## 🔌 API Integration

### Yahoo Finance
The app fetches **real-time stock prices** from Yahoo Finance:
- Prices update every 60 seconds
- Historical chart data (1 month)
- Market cap and volume data
- Falls back to simulated prices if API unavailable

### Stock Coverage
| Region | Stocks |
|--------|--------|
| **India** | RELIANCE, TCS, INFY, TATAMOTORS, HDFCBANK, ICICIBANK, SBIN, BHARTIARTL, ITC, LT, WIPRO, SUNPHARMA, NIFTYBEES, GOLDBEES |
| **US** | AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, JPM, V, WMT, DIS, NFLX, SPY, QQQ |

---

## 💡 Key Concepts Taught

### Stock Market
- Exchanges, buyers/sellers, market cap
- Indices (NIFTY 50, S&P 500)
- Order types (Market, Limit, Stop Loss)

### Investing
- Stocks, ETFs, Mutual Funds, Bonds
- Diversification benefits
- Risk vs reward

### Technical Analysis
- Candlestick charts
- Volume analysis
- Moving averages (7-day, 30-day)

### Market Cycles
- Bull vs Bear markets
- Corrections vs Crashes
- Support & Resistance

### Taxes (India)
- Income tax slabs (New Regime)
- Short-term vs Long-term Capital Gains
- TDS on dividends (10%)
- Indexation benefit

### Debt
- Good debt (Education, Home) vs Bad debt (Credit cards, Payday loans)
- Compound interest trap
- EMI calculations

---

## 📱 Screenshots

### Onboarding Flow
1. Welcome screen with gradient title
2. "What's your vibe?" personality selector
3. Money range slider (₹1,000 - ₹50,000) with tier labels
4. Reveal animation for selected amount

### Trade Screen
- Portfolio overview with total value
- Stock list with live prices
- Sector and country filters
- Stock detail view with chart

### Learn Screen
- Category cards
- Expandable lessons
- Interactive quizzes with feedback

---

## 🔒 Data Storage

All data is stored in the browser's **localStorage**:
- `brokebutsmart-storage` — Portfolio, XP, badges, completed lessons
- `brokebutsmart-auth` — User accounts and authentication

**Note:** This is a frontend-only demo. Data is not persisted on a server.

---

## 🎨 Customization

### Changing Brand Colors
Edit `src/index.css`:
```css
:root {
  --accent-primary: #00D26A;     /* Change this for brand color */
  --bg-primary: #0D0D0F;          /* Background */
  /* ... */
}
```

### Adding New Stocks
Edit `INITIAL_STOCKS` array in `src/store/useStore.js`

### Adding New Lessons
Edit `src/data/lessons.js` with new lesson objects

---

## 📄 License

MIT License — free to use for educational purposes.

---

## 🙏 Acknowledgments

- Yahoo Finance for real-time market data
- Vercel for hosting inspiration
- All the open-source libraries used

---

**Built with 💚 for broke but smart college students**
