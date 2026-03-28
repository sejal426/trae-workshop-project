# BrokeButSmart — Financial Literacy App for College Students

## 1. Concept & Vision

BrokeButSmart is a financial literacy app that speaks to broke college students in their language — casual, relatable, and non-condescending. Think of it as that one friend who's actually good with money explaining things at a house party. The vibe is "fintech meets college textbook" — dark, sleek, with money-green accents that make finance feel less intimidating and more like a game you're excited to play.

The app transforms complex financial concepts into bite-sized, gamified learning experiences with a paper trading simulator at its heart. Users learn by doing, not just reading.

## 2. Design Language

### Aesthetic Direction
Dark mode fintech with a Gen-Z edge. Think Robinhood meets Discord — serious financial tools wrapped in an interface that doesn't make you feel dumb. Neon green accents pop against deep charcoal backgrounds, creating that "money talks" energy without the Wall Street intimidation.

### Color Palette
```
--bg-primary: #0D0D0F        /* Deep black-charcoal */
--bg-secondary: #1A1A1F      /* Card backgrounds */
--bg-tertiary: #252530       /* Elevated surfaces */
--accent-primary: #00D26A     /* Money green - main accent */
--accent-secondary: #00B85C   /* Darker green for hover states */
--accent-warning: #FFB800     /* Gold/amber for warnings */
--accent-danger: #FF4757      /* Red for losses/bad debt */
--text-primary: #FFFFFF       /* Main text */
--text-secondary: #A0A0B0     /* Muted text */
--text-tertiary: #606070      /* Disabled/hint text */
--chart-green: #00D26A        /* Profit/gains */
--chart-red: #FF4757          /* Loss/decline */
```

### Typography
- **Headings**: "Space Grotesk" (Google Font) — Bold, techy, modern
- **Body**: "Inter" (Google Font) — Clean, highly readable at small sizes
- **Monospace/Numbers**: "JetBrains Mono" — For prices, percentages, code-like elements
- **Scale**: 12px (caption) / 14px (body) / 16px (large body) / 20px (h3) / 24px (h2) / 32px (h1) / 48px (hero)

### Spatial System
- Base unit: 4px
- Component padding: 16px (cards), 12px (buttons)
- Section spacing: 32px
- Border radius: 12px (cards), 8px (buttons), 24px (pills)
- Card shadows: 0 4px 24px rgba(0, 210, 106, 0.08)

### Motion Philosophy
- **Micro-interactions**: 150ms ease-out for hovers, toggles
- **Page transitions**: 300ms ease-in-out slide/fade
- **Chart animations**: 600ms ease-out with staggered data points
- **Gamification**: XP counter animates up with spring physics, badges pop with scale bounce
- **Loading states**: Skeleton pulse animation 1.5s infinite

### Visual Assets
- **Icons**: Lucide React (consistent, clean line icons)
- **Charts**: Recharts with custom styling matching the palette
- **Decorative**: Subtle gradient overlays, glow effects on accent elements
- **Illustrations**: Abstract geometric shapes for empty states

## 3. Layout & Structure

### Navigation Architecture
Bottom tab navigation (mobile-first):
1. **Learn** (📚) — Theory Hub
2. **Trade** (💸) — Paper Trading Simulator
3. **Tax** (🧾) — Tax Explainer
4. **Debt** (💳) — Debt Decoder
5. **Profile** (👤) — Stats, badges, settings

### Page Structure
```
App Shell
├── Onboarding Flow (first-time users)
│   └── "What's your vibe?" → Investor / Saver / Confused
├── Tab Screens (persistent navigation)
│   ├── Learn
│   │   ├── Category Cards Grid
│   │   └── Lesson Screen (expander + quiz)
│   ├── Trade
│   │   ├── Portfolio Dashboard
│   │   ├── Stock Browser/Search
│   │   ├── Stock Detail + Chart
│   │   └── Buy/Sell Modal
│   ├── Tax
│   │   ├── Topic Cards
│   │   └── Interactive Calculators
│   ├── Debt
│   │   ├── Topic Cards
│   │   ├── Compound Interest Visualizer
│   │   └── EMI Calculator
│   └── Profile
│       ├── XP & Level Progress
│       ├── Badge Collection
│       └── Portfolio Summary
```

### Visual Pacing
- Hero sections with gradient backgrounds at top of each tab
- Dense information cards below with clear hierarchy
- Sticky headers for context
- Pull-to-refresh feel with scroll-linked animations
- Modal overlays for actions (buy/sell, quiz)

## 4. Features & Interactions

### Onboarding Flow
1. Welcome screen: "Meet BrokeButSmart — your financially smarter bestie"
2. "What's your vibe?" selector:
   - 🟢 **Investor** — "I got some cash and wanna make it grow"
   - 🔵 **Saver** — "Just trying not to blow my money"
   - 🟡 **Confused** — "IDK what's happening but I wanna learn"
3. Personalized home screen based on selection
4. Starting bonus: ₹1,00,000 fake money credited

### Pillar 1: Theory Hub (Learn)

#### Category Cards
- How Stock Markets Work
- Investment Types
- Reading Stock Charts
- Market Cycles
- Taxes on Investments
- Debt 101

#### Lesson Structure
Each lesson has:
1. **Explainer Card** (3-4 short paragraphs, digestible)
2. **"Go Deeper" Expander** (detailed dive, examples, edge cases)
3. **Quick Quiz** (3 questions, immediate feedback)

#### Interactions
- Card tap → expands to full lesson view
- "Go Deeper" → smooth accordion expand with icon rotation
- Quiz → tap to select answer, green flash for correct, red shake for wrong
- Complete lesson → XP animation + badge unlock check

### Pillar 2: Paper Trading Simulator

#### Stock Browser
- Search bar with autocomplete (RELIANCE, TCS, AAPL, TSLA, etc.)
- Category filters: Indian Stocks / US Stocks / ETFs
- List view with: Ticker, Name, Price, % Change (colored)
- Pull down to refresh simulated prices

#### Stock Detail View
- Large price display with change indicator
- **Candlestick Chart** (simulated, using Recharts)
- Volume bar chart below
- Moving averages overlay (7-day, 30-day)
- **Prediction Toggle**: Show/hide 7-day and 30-day projected prices (dashed lines)
- "Market Event" banner when events are active

#### Buy/Sell Modal
- Quantity slider or manual input
- Instant P&L preview before confirming
- "You're buying ₹X of COMPANY" confirmation
- Success animation on purchase

#### Portfolio Dashboard
- Total portfolio value (large, prominent)
- Cash remaining
- **Allocation Pie Chart** (Recharts)
- Holdings list: Stock, Qty, Avg Price, Current Price, P&L %, P&L ₹
- **Performance Graph**: Portfolio value over time (area chart)
- "Quarterly Tax Summary" expandable section

#### Market Events Simulator
- Random events trigger every 30-60 seconds of active trading
- Events: "RBI cuts interest rates 🔻", "Company posts record profits 📈", "Market crash alert ⚠️"
- Event affects relevant stock prices with visual indicator
- Events logged in a scrollable feed

### Pillar 3: Tax Explainer

#### Topic Cards
- Income Tax Basics
- Capital Gains Tax
- TDS vs Advance Tax
- ITR Filing (India) / Tax Forms (US)

#### Interactive Calculators
1. **Capital Gains Calculator**
   - Input: Purchase price, sale price, holding period
   - Output: Tax rate, tax amount, explanation

2. **Tax Simulator**
   - Inputs: Annual income, investment gains, deductions
   - Output: Estimated tax, effective rate, breakdown

3. **TDS Calculator** (India)
   - Input: Income type, amount
   - Output: TDS deducted, take-home

### Pillar 4: Debt Decoder

#### Compound Interest Visualizer
- Slider: Principal amount (₹1,000 - ₹10,00,000)
- Slider: Interest rate (1% - 50% APR)
- Slider: Time period (1 month - 10 years)
- **Live updating chart** showing exponential growth
- "This is why credit card debt is terrifying" callout

#### Good Debt vs Bad Debt Cards
- Swipeable card stack
- Each card: Type, Example, Why it's good/bad, Real stats
- Good: Education loan, Home loan
- Bad: Credit card, Payday loan

#### EMI Calculator
- Inputs: Loan amount, interest rate, tenure (months/years)
- Output: Monthly EMI, total interest, total payment
- Amortization breakdown chart

#### Debt Danger Zone Quiz
- Scenario-based questions
- Example: "Credit card offer: 0% APR for 6 months. Should you take it?"
- Tap to reveal explanation
- Tracks score

### Gamification System

#### XP & Levels
- Complete lesson: +50 XP
- Complete quiz (all correct): +100 XP bonus
- Make first trade: +25 XP
- Complete tax calculator: +30 XP
- Use EMI calculator: +20 XP

**Levels**:
1. BrokeButSmart Newbie (0-500 XP)
2. Money Curious (500-1500 XP)
3. Financially Awakening (1500-3500 XP)
4. Market Apprentice (3500-7000 XP)
5. Smart Money Master (7000+ XP)

#### Badges
- 🏆 **First Trade** — Execute your first buy/sell
- 📈 **Bull Run** — Make 10 successful trades
- 📚 **Theory Complete** — Finish all lessons
- 🧾 **Tax Nerd** — Use all tax calculators
- 💳 **Debt Destroyer** — Complete Debt Danger Zone quiz
- 🎯 **Diamond Hands** — Hold a stock for 30+ simulated days
- 🔄 **Day Trader** — Make 5 trades in one session

#### Progress Indicators
- XP progress bar on profile
- Badge grid with locked/unlocked states
- "Today's goal" suggested action on home

### Error States
- Empty portfolio: "Your portfolio's emptier than your bank account. Time to change that!"
- No search results: "We couldn't find that stock. Maybe check the ticker symbol?"
- Quiz wrong answer: Red shake + "Not quite! The right answer is..."
- Network error: "Looks like we're broke (connection-wise). Try again?"

## 5. Component Inventory

### Core Components

#### Button
- **Variants**: Primary (green fill), Secondary (outline), Ghost (text only), Danger (red)
- **Sizes**: Small (32px), Medium (44px), Large (52px)
- **States**: Default, Hover (brightness +10%), Active (scale 0.98), Disabled (opacity 0.5), Loading (spinner)

#### Card
- Background: --bg-secondary
- Border: 1px solid rgba(255,255,255,0.05)
- Border-radius: 12px
- Shadow: 0 4px 24px rgba(0, 210, 106, 0.08)
- **States**: Default, Hover (border glow), Active (scale 0.99)

#### Input
- Background: --bg-tertiary
- Border: 1px solid rgba(255,255,255,0.1)
- Border-radius: 8px
- **States**: Default, Focus (green border glow), Error (red border), Disabled

#### Tab Bar
- Fixed bottom, 64px height
- Background: --bg-secondary with top border
- Icons: 24px, labels 10px below
- Active: --accent-primary with subtle glow

#### Stock List Item
- Ticker symbol (bold, monospace)
- Company name (truncated)
- Price (right aligned)
- Change % badge (green/red pill)

#### Chart Components
- **Candlestick**: Green body (up), Red body (down)
- **Line**: Gradient fill below, white stroke
- **Area**: With glow effect on line
- **Pie/Donut**: With center statistic

#### Modal
- Centered overlay, 90% width max 400px
- Background: --bg-secondary
- Border-radius: 16px
- Slide-up animation on mobile

#### Toast/Notification
- Bottom positioned, auto-dismiss 3s
- Types: Success (green), Error (red), Info (blue), Warning (amber)

#### Slider
- Track: --bg-tertiary
- Fill: --accent-primary
- Thumb: 20px circle with glow

#### Quiz Question
- Question text
- 4 option buttons in 2x2 grid
- Selected state: border glow
- Correct: green flash + checkmark
- Wrong: red shake + X

## 6. Technical Approach

### Stack
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **State Management**: Zustand (lightweight, simple)
- **Charts**: Recharts
- **Styling**: CSS Modules with CSS Variables
- **Icons**: Lucide React
- **Animations**: CSS transitions + Framer Motion for complex sequences

### Data Model

```typescript
interface User {
  id: string;
  vibe: 'investor' | 'saver' | 'confused';
  xp: number;
  level: number;
  badges: Badge[];
  wallet: Wallet;
  portfolio: Portfolio;
  completedLessons: string[];
  quizScores: Record<string, number>;
  createdAt: Date;
}

interface Wallet {
  cash: number; // Starting: ₹1,00,000
  currency: 'INR' | 'USD';
}

interface Portfolio {
  holdings: Holding[];
  transactionHistory: Transaction[];
  performanceHistory: PerformanceEntry[];
}

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  lastUpdated: Date;
}

interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  quantity: number;
  price: number;
  timestamp: Date;
  pnl?: number; // For SELL transactions
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  chartData: CandlestickData[];
  movingAverages: { day7: number; day30: number };
  prediction?: { day7: number; day30: number };
  country: 'INDIA' | 'US';
}

interface MarketEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  affectedStocks: string[];
  priceImpact: number; // percentage
  timestamp: Date;
}

interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  content: string; // Main explainer
  deepDive: string; // Expandable content
  quiz: Quiz;
  xpReward: number;
}

interface Quiz {
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
```

### Stock Price Simulation Algorithm

```typescript
function simulatePriceMovement(currentPrice: number, trend: number): number {
  const volatility = 0.02; // 2% max daily movement
  const randomWalk = (Math.random() - 0.5) * 2 * volatility;
  const trendBias = trend * 0.01; // Small trend influence
  const newPrice = currentPrice * (1 + randomWalk + trendBias);
  return Math.round(newPrice * 100) / 100;
}

function generatePrediction(currentPrice: number, trend: 'up' | 'down' | 'neutral'): { day7: number; day30: number } {
  // Generate realistic-looking prediction curve
  const trendFactor = trend === 'up' ? 0.02 : trend === 'down' ? -0.02 : 0;
  const day7 = currentPrice * (1 + trendFactor * 7 + (Math.random() - 0.5) * 0.05);
  const day30 = currentPrice * (1 + trendFactor * 30 + (Math.random() - 0.5) * 0.1);
  return {
    day7: Math.round(day7 * 100) / 100,
    day30: Math.round(day30 * 100) / 100
  };
}
```

### State Persistence
- Use localStorage for user state persistence
- Zustand persist middleware
- Hydrate on app load

### File Structure
```
src/
├── main.jsx
├── App.jsx
├── index.css (global styles, CSS variables)
├── store/
│   └── useStore.js (Zustand store)
├── components/
│   ├── common/ (Button, Card, Input, Modal, etc.)
│   ├── charts/ (StockChart, PortfolioChart, etc.)
│   ├── trade/ (StockList, BuyModal, PortfolioView)
│   ├── learn/ (LessonCard, Quiz, ExpandableContent)
│   ├── tax/ (TaxCalculator, CapitalGainsCalc)
│   └── debt/ (EMICalculator, CompoundVisualizer)
├── pages/
│   ├── Learn.jsx
│   ├── Trade.jsx
│   ├── Tax.jsx
│   ├── Debt.jsx
│   └── Profile.jsx
├── data/
│   ├── stocks.js (stock list with initial prices)
│   ├── lessons.js (theory content)
│   └── marketEvents.js
└── utils/
    ├── priceSimulation.js
    └── calculations.js
```

### Responsive Breakpoints
- Mobile: 320px - 480px (primary target)
- Tablet: 481px - 768px
- Desktop: 769px+ (but optimized for mobile-first)

### Performance Considerations
- Lazy load chart components
- Memoize expensive calculations
- Debounce search input
- Virtualize long lists if needed
- Use CSS transforms for animations (GPU acceleration)
