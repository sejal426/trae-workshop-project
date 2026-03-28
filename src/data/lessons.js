export const lessons = [
  {
    id: 'stock-markets',
    category: 'How the Stock Market Works',
    title: 'Understanding Stock Markets',
    summary: 'Learn how exchanges work and why stock prices move',
    content: `Stock markets are basically fancy flea markets where people buy and sell tiny pieces of companies. When you buy a stock, you're buying a tiny slice of that company — like owning 0.0001% of Apple.

**The Players:**
- **Buyers** — People who think the price will go up 📈
- **Sellers** — People who want to cash out (or think it'll drop) 📉
- **Exchanges** — The marketplaces where they meet (NSE, BSE in India; NYSE, NASDAQ in US)

**What Makes Prices Move?**
Simple economics: if more people want to buy a stock than sell it, the price goes up. It's literally supply and demand, but with more spreadsheets.

**Market Cap = Company's Total Value**
If a company has 1 crore shares at ₹100 each, its market cap is ₹100 crore. Bigger market cap = bigger company (usually).`,
    deepDive: `**Exchanges & Indices:**

NIFTY 50 (India) = Top 50 companies on NSE
SENSEX (India) = Top 30 companies on BSE
S&P 500 (US) = Top 500 US companies
NASDAQ = Tech-heavy US exchange

**Order Types:**
- Market Order: "Buy now at whatever price"
- Limit Order: "Buy only if it drops to X price"
- Stop Loss: "Sell automatically if it falls below X"

**Why Indices Matter:**
When people say "the market is up today," they usually mean the index is up. NIFTY going up means the average of those 50 stocks went up. It's like checking the average temperature, not each city's weather.`,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'What happens when more people want to buy a stock than sell it?',
          options: ['Price goes down', 'Price goes up', 'Nothing changes', 'The company goes bankrupt'],
          correct: 1,
          explanation: 'Basic supply and demand! More buyers than sellers = competition for shares = higher price.'
        },
        {
          id: 'q2',
          question: 'What does market cap represent?',
          options: ['Daily trading volume', 'Total value of a company', 'Company\'s debt', 'Stock exchange size'],
          correct: 1,
          explanation: 'Market cap = share price × total shares. It tells you how much the market thinks the whole company is worth.'
        },
        {
          id: 'q3',
          question: 'If NIFTY 50 is "up 2%", what does that mean?',
          options: ['All 50 stocks are up 2%', 'The average of 50 stocks went up 2%', 'Only the biggest stock went up', 'Trading volume doubled'],
          correct: 1,
          explanation: 'Index represents an average. Some stocks might be up more, some less, but the weighted average is up 2%.'
        }
      ]
    },
    xpReward: 50
  },
  {
    id: 'investment-types',
    category: 'Investment Types',
    title: 'Stocks, ETFs, Mutual Funds & More',
    summary: 'Know your investment options before jumping in',
    content: `**Stocks (Equities)**
Buying a stock = owning a piece of a company. High risk, high potential reward. If the company does well, you do well. If it tanks, you tank.

**ETFs (Exchange Traded Funds)**
Think of ETFs as a basket of stocks bundled together. Buy one ETF = instant diversification. NIFTY BEES gives you exposure to all NIFTY 50 stocks at once.

**Mutual Funds**
Professionally managed pools of money. You pay a fund manager to pick stocks for you. Less control, but someone else's job is to not mess up.

**Bonds**
Lending money to companies/government. Lower risk, lower returns. Like being a banker instead of an owner.

**Crypto**
Digital money that's... a whole thing. Super volatile, not backed by anything real. Fun to talk about at parties, questionable as an investment for beginners.`,
    deepDive: `**Pros & Cons Quick Look:**

| Type | Risk | Potential | Best For |
|------|------|-----------|----------|
| Stocks | High | High | Long-term growth |
| ETFs | Medium | Medium | Beginners, diversification |
| Mutual Funds | Medium | Medium | Hands-off investors |
| Bonds | Low | Low | Stability, income |
| Crypto | Extreme | ??? | Speculation only |

**The Diversification Magic:**
Don't put all your eggs in one basket. Owning 10 different stocks means if one company fails, you lose 10%. Without diversification, you could lose everything. ETFs give you instant diversification with one purchase.`,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'What\'s the main advantage of ETFs over individual stocks?',
          options: ['Higher returns', 'Instant diversification', 'No fees', 'Guaranteed profits'],
          correct: 1,
          explanation: 'Buying an ETF = buying a basket of stocks. One purchase gives you exposure to many companies at once.'
        },
        {
          id: 'q2',
          question: 'If you want stability over high returns, which is better?',
          options: ['Stocks', 'Crypto', 'Bonds', 'Options trading'],
          correct: 2,
          explanation: 'Bonds are lower risk, lower reward. They\'re like being a banker — steady income, less drama.'
        },
        {
          id: 'q3',
          question: 'Mutual funds are best for investors who:',
          options: ['Want maximum control', 'Don\'t want to pick stocks themselves', 'Want to day trade', 'Avoid any fees'],
          correct: 1,
          explanation: 'Mutual funds let professionals manage your money. You pay fees, but someone else does the research and decision-making.'
        }
      ]
    },
    xpReward: 50
  },
  {
    id: 'reading-charts',
    category: 'Reading Stock Charts',
    title: 'How to Actually Read a Chart',
    summary: 'Candlesticks, volume, and moving averages explained',
    content: `**Candlestick Basics:**
Each candle = one time period (day, hour, minute). The body shows where the price opened and closed. The wicks (lines) show the highest and lowest prices that period.

Green candle = price went UP (close > open)
Red candle = price went DOWN (close < open)

**Volume Bars:**
The bars below the chart show how many shares were traded. Big volume + big price move = that move probably means something. Low volume = might just be noise.

**Moving Averages:**
The 7-day MA is the average price over the last 7 days, plotted as a line. It smooths out daily fluctuations so you can see the trend. If the price is above the MA, it's generally bullish.`,
    deepDive: `**Reading Candlesticks Like a Pro:**

- **Long green body:** Buyers dominated, strong upward momentum
- **Long red body:** Sellers dominated, strong downward pressure
- **Small body (doji):** Open and close were almost the same = indecision
- **Long upper wick:** Price tried to go up but sellers pushed back
- **Long lower wick:** Price tried to drop but buyers stepped in

**Support & Resistance:**
Support = a price level where buying pressure stops the fall
Resistance = a price level where selling pressure stops the rise

Think of it like a bounce. When a ball hits the floor (support), it bounces up. When it hits the ceiling (resistance), it falls back down.

**Moving Average Crossovers:**
When the 7-day MA crosses above the 30-day MA = golden cross = bullish signal
When 7-day crosses below 30-day = death cross = bearish signal`,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'A green candlestick means the price:',
          options: ['Opened higher than it closed', 'Closed higher than it opened', 'Stayed the same', 'Had high volume'],
          correct: 1,
          explanation: 'Green = close > open. The price went up during that period.'
        },
        {
          id: 'q2',
          question: 'What does high volume with a big price drop suggest?',
          options: ['The drop is probably noise', 'Many traders believe the drop is significant', 'The stock will bounce back immediately', 'Buy signals'],
          correct: 1,
          explanation: 'High volume + big move = that move has weight behind it. Many traders are acting on it.'
        },
        {
          id: 'q3',
          question: 'If the 7-day MA crosses above the 30-day MA, it\'s called:',
          options: ['Death cross', 'Golden cross', 'Support line', 'Resistance break'],
          correct: 1,
          explanation: 'Golden cross = bullish signal. Short-term momentum is outperforming long-term.'
        }
      ]
    },
    xpReward: 50
  },
  {
    id: 'market-cycles',
    category: 'Market Cycles',
    title: 'Bulls, Bears & Market Crashes',
    summary: 'Understanding market cycles and how they work',
    content: `**Bull Market = 📈 Everything is Going Up**
Think of a bull (the animal) charging forward and upward. Prices are rising, everyone's optimistic, FOMO is real. In bull markets, it feels like you can't lose.

**Bear Market = 📉 Everything is Going Down**
Bears hibernate and retreat downward. Prices are falling, optimism is gone, every headline looks scary. Even good news doesn't help. Classic example: 2008 financial crisis.

**Market Corrections = Quick Rebounds**
A correction is when the market drops 10%+ from its peak but then bounces back. It's like the market taking a breath before continuing up. Usually lasts a few weeks to a few months.

**Market Crashes = The Big Dips**
Sudden, dramatic drops. Black Monday (1987) saw the market drop 22% in ONE DAY. COVID crash in March 2020 dropped ~34% in a month before bouncing back.`,
    deepDive: `**Why Do These Cycles Happen?**

Markets move in cycles because human psychology moves in cycles:
- Greed drives bull markets (everyone wants in)
- Fear drives bear markets (everyone wants out)
- These emotions amplify each other

**The Four Stages of a Market Cycle:**
1. **Accumulation:** Smart money starts buying while others are fearful
2. **Mark-up:** Prices start rising, more people notice and join
3. **Distribution:** Smart money starts selling, everyone feels rich
4. **Mark-down:** Prices fall, panic selling begins, cycle restarts

**What Goes Up Must Come Down (And Vice Versa):**
No bull market lasts forever. No bear market does either. Markets are cyclical because they're driven by humans, and humans are emotional.

**Historical Returns After Major Dips:**
- After every 10% correction, markets have historically recovered
- After every major crash, markets eventually hit new highs
- The key word: eventually. It can take years.`,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'What defines a bear market?',
          options: ['Prices going up 10%', 'Prices falling 20%+', 'High trading volume', 'New all-time highs'],
          correct: 1,
          explanation: 'A bear market is typically defined as a 20%+ drop from recent highs. It represents pessimism and downward momentum.'
        },
        {
          id: 'q2',
          question: 'A market correction is when the market drops:',
          options: ['5%', '10%+ from peak', '50%', 'Any percentage'],
          correct: 1,
          explanation: 'A correction is typically a 10%+ drop from the peak. It\'s the market "correcting" an overvaluation.'
        },
        {
          id: 'q3',
          question: 'What do bull and bear markets represent?',
          options: ['Types of companies', 'Animal spirits in investing', 'Stock exchanges', 'Trading strategies'],
          correct: 1,
          explanation: 'Bull = optimism, prices rising (bull charges up). Bear = pessimism, prices falling (bears hibernate).'
        }
      ]
    },
    xpReward: 50
  },
  {
    id: 'investment-taxes',
    category: 'Taxes on Investments',
    title: 'Capital Gains & Tax Basics',
    summary: 'Know what you owe before you invest',
    content: `**Short-Term vs Long-Term Capital Gains**

When you sell a stock for profit, you owe taxes on those gains. How much you pay depends on HOW LONG you held it:

**Short-Term Capital Gains (STCG):**
- Held for less than 1 year (India) / less than 1 year (US)
- Taxed as your regular income tax slab (India) / ordinary income rate (US)
- Generally not great for you tax-wise

**Long-Term Capital Gains (LTCG):**
- Held for more than 1 year (India) / more than 1 year (US)
- Taxed at lower rates: 20% with indexation (India) / 0-20% depending on income (US)
- Better for your wallet!

**TDS (Tax Deducted at Source) — India Specific:**
When you earn dividends or sell stocks, the government might automatically take a cut before you see the money. TDS on dividends is 10%. Don't worry, you can claim it back when filing ITR.`,
    deepDive: `**India Tax Summary:**

| Type | Holding Period | Tax Rate |
|------|----------------|----------|
| STCG (Equity) | < 1 year | 15% |
| LTCG (Equity) | > 1 year | 20% with indexation |
| STCG (Debt) | < 3 years | As per slab |
| LTCG (Debt) | > 3 years | 20% with indexation |

**Indexation Benefit:**
 LTCG on assets held for 3+ years lets you adjust the purchase price for inflation using something called "indexed cost." This reduces your actual taxable gain. Sweet deal.

**US Tax Summary:**
- STCG: Taxed as ordinary income (10-37% depending on bracket)
- LTCG: 0%, 15%, or 20% depending on income
- Qualified dividends: Same as LTCG rates
- Ordinary dividends: Taxed at income rates

**Practical Tip:**
If you're in a high tax bracket, hold investments for >1 year to get LTCG rates. Every percentage point counts!`,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'You bought a stock and sold it after 8 months for a profit. What tax applies?',
          options: ['LTCG (lower rate)', 'STCG (higher rate)', 'No tax', 'TDS only'],
          correct: 1,
          explanation: 'Held for less than 1 year = short-term capital gains, taxed at your regular income slab rate.'
        },
        {
          id: 'q2',
          question: 'What\'s the main benefit of long-term capital gains?',
          options: ['No tax at all', 'Lower tax rates than short-term', 'Delayed payment', 'TDS exemption'],
          correct: 1,
          explanation: 'LTCG is taxed at preferential rates (20% vs your full income slab). Holding longer = paying less tax on gains.'
        },
        {
          id: 'q3',
          question: 'TDS on dividends in India is currently:',
          options: ['5%', '10%', '20%', '30%'],
          correct: 1,
          explanation: 'TDS on dividends is 10%. You can claim this back when filing your Income Tax Return.'
        }
      ]
    },
    xpReward: 50
  },
  {
    id: 'debt-101',
    category: 'Debt 101',
    title: 'Good Debt vs Bad Debt',
    summary: 'Why some debt makes you money and some ruins you',
    content: `**The Complicated Truth About Debt:**
Not all debt is created equal. Some debt can actually help you build wealth. Some debt will have you paying interest forever and never getting anywhere.

**Good Debt — The Wealth Builders 🏠🎓**

Education Loan: You're investing in yourself. A degree = higher earning potential. The interest rate is usually low, and you don't pay while studying. Worth it if you actually use the degree.

Home Loan: Property tends to appreciate (usually). You're building equity while someone else (the tenant) pays your mortgage. Low interest rates, tax benefits.

Business Loan: If your business idea is solid, borrowed money can generate returns far above the interest rate.

**Bad Debt — The Wealth Destroyers 💸**

Credit Card Debt: 36-48% APR is INSANE. If you owe ₹50,000 and only pay minimums, you'll pay ₹90,000 total over 5 years. The credit card company is winning.

Payday Loans: Predatory lending at its finest. 400% APR is not uncommon. Designed to keep you in permanent debt.`,
    deepDive: `**The Compound Interest Trap:**

Credit card debt is where compound interest goes to destroy dreams.

Example: ₹10,000 balance at 36% APR
- Month 1 interest: ₹300 (₹10,000 × 36% ÷ 12)
- If you only pay ₹300/month minimums, you'll NEVER pay it off
- Total paid over 5 years: ₹18,000+
- Total interest: ₹8,000+

**The Math That Will Scare You:**
Want to be a millionaire? Start with ₹1,00,000 at 36% credit card interest and only pay minimums. Just kidding, DON'T DO THIS.

**Good Debt Characteristics:**
✓ Low interest rate (< 8-10%)
✓ Helps build assets or income potential
✓ Manageable EMI relative to income
✓ Tax benefits available

**Bad Debt Characteristics:**
✗ Very high interest (15%+)
✗ For depreciating assets (new car = loses value the second you drive it)
✗ No income/asset generation
✗ Easy to get (that's how they trap you)`,
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'Which is typically "good debt"?',
          options: ['Credit card for shopping', 'Payday loan', 'Education loan for a valuable degree', 'Car loan for a new SUV'],
          correct: 2,
          explanation: 'Education loans have low rates, you don\'t pay while studying, and a degree increases your earning potential. That\'s investment thinking.'
        },
        {
          id: 'q2',
          question: 'What makes credit card debt so dangerous?',
          options: ['It has no interest', 'The APR can be 36%+ and compounds against you', 'It\'s hard to get', 'It requires collateral'],
          correct: 1,
          explanation: '36%+ APR is predatory. Compound interest works against you, not for you. Minimum payments = paying forever.'
        },
        {
          id: 'q3',
          question: 'A car is generally what type of asset?',
          options: ['Appreciating asset', 'Depreciating asset', 'Neither', 'Depends on the car'],
          correct: 1,
          explanation: 'Cars lose value the moment you drive them. Taking a loan for a depreciating asset = bad debt equation.'
        }
      ]
    },
    xpReward: 50
  }
];

export const categories = [...new Set(lessons.map(l => l.category))];