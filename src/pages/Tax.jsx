import { useState } from 'react';
import { Calculator, Info, ChevronRight, Receipt, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import styles from './Tax.module.css';

const TAX_TOPICS = [
  {
    id: 'income-tax',
    title: 'Income Tax Basics',
    icon: '💰',
    summary: 'Understand tax slabs and how they apply to YOUR income',
    content: `Whether you're earning from a part-time job or freelance work, understanding income tax is crucial.

**Tax Slabs = Pay More as You Earn More**
Think of tax slabs like a staircase. The first chunk of your income is tax-free or low-tax. As you climb the income ladder, higher portions get taxed at higher rates.

**For India (New Tax Regime):**
- Up to ₹3 lakh: 0%
- ₹3-6 lakh: 5%
- ₹6-9 lakh: 10%
- ₹9-12 lakh: 15%
- ₹12-15 lakh: 20%
- Above ₹15 lakh: 30%

**For US:**
- 10%, 12%, 22%, 24%, 32%, 35%, 37% (depends on filing status and income)

**As a Student:**
If you're earning ₹5 lakh/year (₹41,666/month), you're in the 5% bracket. That means you pay ₹10,000 in tax total, not 5% of your entire income.`,
  },
  {
    id: 'capital-gains',
    title: 'Capital Gains Tax',
    icon: '📈',
    summary: 'What happens when you sell stocks for profit',
    content: `When you sell an investment for more than you paid, that's a capital gain. The tax you pay depends on HOW LONG you held it.

**Short-Term Capital Gains (STCG):**
- Holding period: Less than 1 year
- Taxed as your regular income
- In India: 15% flat on equity gains

**Long-Term Capital Gains (LTCG):**
- Holding period: More than 1 year
- India: 20% with indexation benefit
- US: 0-20% based on income bracket

**Why Indexation Matters (India):**
Indexation adjusts your purchase price for inflation. If you bought stock 3 years ago for ₹1 lakh and inflation was 10% total, your indexed cost is ₹1.3 lakh. So your actual gain is smaller, and you pay tax on less.`,
  },
  {
    id: 'tds-advance',
    title: 'TDS & Advance Tax',
    icon: '🏦',
    summary: 'The government\'s advance collection system',
    content: `**TDS (Tax Deducted at Source):**
TDS is when the payer deducts tax BEFORE giving you money. It's like the government collecting taxes in advance.

Common TDS rates:
- Dividends: 10%
- Freelance payments: 10% (if above ₹30,000)
- Bank interest: 10%

**Good news:** TDS is not extra tax. It's advance tax. When you file your ITR, you can claim it back if your total tax liability is lower.

**Advance Tax:**
If your tax liability is over ₹10,000/year, you need to pay taxes in installments:
- 15% by June 15
- 45% by September 15
- 75% by December 15
- 100% by March 15

**For Students:**
If you're earning very little, you might have zero tax liability. Filing ITR still helps build your tax record and claim refunds.`,
  },
  {
    id: 'itr-filing',
    title: 'ITR Filing & US Taxes',
    icon: '📋',
    summary: 'Get your returns filed right',
    content: `**ITR Filing (India):**

Who must file:
- Income above ₹2.5 lakh (below 60)
- Income above ₹3 lakh (60-80 years)
- Income above ₹5 lakh (above 80 years)

Even if your tax is zero due to TDS, file ITR to:
1. Claim refund of excess TDS
2. Carry forward losses
3. Build your financial identity

**Documents needed:**
- Form 16 (from employer)
- AIS/TIS (annual financial statement)
- Bank statements
- Investment proofs

**US Tax Forms:**

**W-2:** Your employer reports your wages
**1099:** Reports income from freelance/gig work
**Form 1040:** Your main tax return

**Key deadlines:**
- India: July 31 (individual)
- US: April 15 (usually)

**For Students:**
If you're on OPT or have campus jobs, you still need to file taxes! The US tax system requires filing even if you earned very little.`,
  },
];

function Tax() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [calculatorMode, setCalculatorMode] = useState(null);
  const [capitalGainsCalc, setCapitalGainsCalc] = useState({ buyPrice: '', sellPrice: '', holdingPeriod: 'short' });
  const [incomeCalc, setIncomeCalc] = useState({ annualIncome: '', investmentGains: '', deductions: '' });
  const [tdsCalc, setTdsCalc] = useState({ incomeType: 'dividend', amount: '' });
  const [result, setResult] = useState(null);

  const addTaxCalculation = useStore((state) => state.addTaxCalculation);
  const taxCalculations = useStore((state) => state.taxCalculations);

  const calculateCapitalGains = () => {
    const buy = parseFloat(capitalGainsCalc.buyPrice) || 0;
    const sell = parseFloat(capitalGainsCalc.sellPrice) || 0;
    const gain = sell - buy;
    const isLongTerm = capitalGainsCalc.holdingPeriod === 'long';

    let taxRate, taxAmount;
    if (isLongTerm) {
      taxRate = 20;
      taxAmount = gain * 0.2;
    } else {
      taxRate = 15;
      taxAmount = gain * 0.15;
    }

    const calculation = {
      type: 'capital_gains',
      inputs: capitalGainsCalc,
      result: { gain: Math.round(gain * 100) / 100, taxRate, taxAmount: Math.round(taxAmount * 100) / 100, isLongTerm }
    };
    addTaxCalculation(calculation);
    setResult(calculation);
  };

  const calculateIncomeTax = () => {
    const income = parseFloat(incomeCalc.annualIncome) || 0;
    const gains = parseFloat(incomeCalc.investmentGains) || 0;
    const deductions = parseFloat(incomeCalc.deductions) || 0;

    const taxableIncome = Math.max(0, income + gains - deductions);
    let tax = 0;

    const slabs = [
      { limit: 300000, rate: 0 },
      { limit: 600000, rate: 0.05 },
      { limit: 900000, rate: 0.1 },
      { limit: 1200000, rate: 0.15 },
      { limit: 1500000, rate: 0.2 },
      { limit: Infinity, rate: 0.3 },
    ];

    let remaining = taxableIncome;
    let prevLimit = 0;
    for (const slab of slabs) {
      const taxableInSlab = Math.min(remaining, slab.limit - prevLimit);
      tax += taxableInSlab * slab.rate;
      remaining -= taxableInSlab;
      prevLimit = slab.limit;
      if (remaining <= 0) break;
    }

    const effectiveRate = taxableIncome > 0 ? (tax / taxableIncome) * 100 : 0;

    const calculation = {
      type: 'income_tax',
      inputs: incomeCalc,
      result: { taxableIncome: Math.round(taxableIncome), tax: Math.round(tax * 100) / 100, effectiveRate: Math.round(effectiveRate * 100) / 100 }
    };
    addTaxCalculation(calculation);
    setResult(calculation);
  };

  const calculateTDS = () => {
    const amount = parseFloat(tdsCalc.amount) || 0;
    const rates = { dividend: 0.1, freelance: 0.1, interest: 0.1, other: 0.1 };
    const rate = rates[tdsCalc.incomeType] || 0.1;
    const tds = amount * rate;
    const takeHome = amount - tds;

    const calculation = {
      type: 'tds',
      inputs: tdsCalc,
      result: { amount, rate, tds: Math.round(tds * 100) / 100, takeHome: Math.round(takeHome * 100) / 100 }
    };
    addTaxCalculation(calculation);
    setResult(calculation);
  };

  if (selectedTopic) {
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => setSelectedTopic(null)}>
          ← Back to Tax
        </button>
        <div className={styles.topicHeader}>
          <span className={styles.topicIcon}>{selectedTopic.icon}</span>
          <h2>{selectedTopic.title}</h2>
        </div>
        <div className={styles.topicContent}>
          {selectedTopic.content.split('\n\n').map((para, i) => (
            <p key={i}>
              {para.split('**').map((part, j) =>
                j % 2 === 0 ? part : <strong key={j}>{part}</strong>
              )}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tax Explainer 🧾</h1>
        <p className={styles.subtitle}>No banker vibes. Just real talk about taxes.</p>
      </div>

      <div className={styles.topicsGrid}>
        {TAX_TOPICS.map((topic) => (
          <button
            key={topic.id}
            className={styles.topicCard}
            onClick={() => setSelectedTopic(topic)}
          >
            <span className={styles.topicIcon}>{topic.icon}</span>
            <div className={styles.topicInfo}>
              <h3>{topic.title}</h3>
              <p>{topic.summary}</p>
            </div>
            <ChevronRight size={18} className={styles.chevron} />
          </button>
        ))}
      </div>

      <div className={styles.calculatorsSection}>
        <h2><Calculator size={18} /> Tax Calculators</h2>

        <div className={styles.calcTabs}>
          <button
            className={`${styles.calcTab} ${calculatorMode === 'capital' ? styles.activeCalcTab : ''}`}
            onClick={() => { setCalculatorMode('capital'); setResult(null); }}
          >
            Capital Gains
          </button>
          <button
            className={`${styles.calcTab} ${calculatorMode === 'income' ? styles.activeCalcTab : ''}`}
            onClick={() => { setCalculatorMode('income'); setResult(null); }}
          >
            Income Tax
          </button>
          <button
            className={`${styles.calcTab} ${calculatorMode === 'tds' ? styles.activeCalcTab : ''}`}
            onClick={() => { setCalculatorMode('tds'); setResult(null); }}
          >
            TDS
          </button>
        </div>

        {!calculatorMode && (
          <div className={styles.calcPlaceholder}>
            <Calculator size={32} />
            <p>Select a calculator above</p>
          </div>
        )}

        {calculatorMode === 'capital' && (
          <div className={styles.calcForm}>
            <div className={styles.inputGroup}>
              <label>Purchase Price (₹)</label>
              <input
                type="number"
                placeholder="e.g., 50000"
                value={capitalGainsCalc.buyPrice}
                onChange={(e) => setCapitalGainsCalc({ ...capitalGainsCalc, buyPrice: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Sell Price (₹)</label>
              <input
                type="number"
                placeholder="e.g., 75000"
                value={capitalGainsCalc.sellPrice}
                onChange={(e) => setCapitalGainsCalc({ ...capitalGainsCalc, sellPrice: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Holding Period</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="holdingPeriod"
                    value="short"
                    checked={capitalGainsCalc.holdingPeriod === 'short'}
                    onChange={() => setCapitalGainsCalc({ ...capitalGainsCalc, holdingPeriod: 'short' })}
                  />
                  <span>Short-term (&lt;1 year) - 15%</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="holdingPeriod"
                    value="long"
                    checked={capitalGainsCalc.holdingPeriod === 'long'}
                    onChange={() => setCapitalGainsCalc({ ...capitalGainsCalc, holdingPeriod: 'long' })}
                  />
                  <span>Long-term (&gt;1 year) - 20%</span>
                </label>
              </div>
            </div>
            <button className={styles.calcBtn} onClick={calculateCapitalGains}>
              Calculate Tax
            </button>

            {result?.type === 'capital_gains' && (
              <div className={styles.resultCard}>
                <h4>Capital Gains Tax Calculation</h4>
                <div className={styles.resultRow}>
                  <span>Purchase Price</span>
                  <span>₹{parseFloat(result.inputs.buyPrice).toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Sell Price</span>
                  <span>₹{parseFloat(result.inputs.sellPrice).toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Total Gain</span>
                  <span className={result.result.gain >= 0 ? styles.profit : styles.loss}>
                    ₹{result.result.gain.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className={`${styles.resultRow} ${styles.highlight}`}>
                  <span>Tax Rate</span>
                  <span>{result.result.taxRate}% ({result.result.isLongTerm ? 'Long-term' : 'Short-term'})</span>
                </div>
                <div className={`${styles.resultRow} ${styles.total}`}>
                  <span>Tax Amount</span>
                  <span>₹{result.result.taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <p className={styles.resultNote}>
                  {result.result.gain < 0 && 'Note: Loss can be offset against other gains.'}
                </p>
              </div>
            )}
          </div>
        )}

        {calculatorMode === 'income' && (
          <div className={styles.calcForm}>
            <div className={styles.inputGroup}>
              <label>Annual Income (₹)</label>
              <input
                type="number"
                placeholder="e.g., 500000"
                value={incomeCalc.annualIncome}
                onChange={(e) => setIncomeCalc({ ...incomeCalc, annualIncome: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Investment Gains (₹)</label>
              <input
                type="number"
                placeholder="e.g., 50000"
                value={incomeCalc.investmentGains}
                onChange={(e) => setIncomeCalc({ ...incomeCalc, investmentGains: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Deductions (80C, 80D, etc.) (₹)</label>
              <input
                type="number"
                placeholder="e.g., 150000"
                value={incomeCalc.deductions}
                onChange={(e) => setIncomeCalc({ ...incomeCalc, deductions: e.target.value })}
              />
            </div>
            <button className={styles.calcBtn} onClick={calculateIncomeTax}>
              Calculate Tax
            </button>

            {result?.type === 'income_tax' && (
              <div className={styles.resultCard}>
                <h4>Income Tax Calculation</h4>
                <div className={styles.resultRow}>
                  <span>Gross Income</span>
                  <span>₹{parseFloat(result.inputs.annualIncome || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Investment Gains</span>
                  <span>₹{parseFloat(result.inputs.investmentGains || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Deductions</span>
                  <span>-₹{parseFloat(result.inputs.deductions || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className={`${styles.resultRow} ${styles.highlight}`}>
                  <span>Taxable Income</span>
                  <span>₹{result.result.taxableIncome.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>Effective Tax Rate</span>
                  <span>{result.result.effectiveRate}%</span>
                </div>
                <div className={`${styles.resultRow} ${styles.total}`}>
                  <span>Estimated Tax</span>
                  <span>₹{result.result.tax.toLocaleString('en-IN')}</span>
                </div>
                <p className={styles.resultNote}>
                  Based on New Tax Regime slabs. Actual tax may vary based on specific exemptions.
                </p>
              </div>
            )}
          </div>
        )}

        {calculatorMode === 'tds' && (
          <div className={styles.calcForm}>
            <div className={styles.inputGroup}>
              <label>Income Type</label>
              <select
                value={tdsCalc.incomeType}
                onChange={(e) => setTdsCalc({ ...tdsCalc, incomeType: e.target.value })}
              >
                <option value="dividend">Dividend Income</option>
                <option value="freelance">Freelance Payment</option>
                <option value="interest">Bank Interest</option>
                <option value="other">Other Income</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g., 100000"
                value={tdsCalc.amount}
                onChange={(e) => setTdsCalc({ ...tdsCalc, amount: e.target.value })}
              />
            </div>
            <button className={styles.calcBtn} onClick={calculateTDS}>
              Calculate TDS
            </button>

            {result?.type === 'tds' && (
              <div className={styles.resultCard}>
                <h4>TDS Calculation</h4>
                <div className={styles.resultRow}>
                  <span>Gross Amount</span>
                  <span>₹{result.result.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.resultRow}>
                  <span>TDS Rate</span>
                  <span>{(result.result.rate * 100)}%</span>
                </div>
                <div className={`${styles.resultRow} ${styles.total}`}>
                  <span>TDS Deducted</span>
                  <span>₹{result.result.tds.toLocaleString('en-IN')}</span>
                </div>
                <div className={`${styles.resultRow} ${styles.highlight}`}>
                  <span>Take Home</span>
                  <span>₹{result.result.takeHome.toLocaleString('en-IN')}</span>
                </div>
                <p className={styles.resultNote}>
                  You can claim this TDS back when filing your ITR if your total tax liability is lower.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.historySection}>
        <h3><Receipt size={16} /> Recent Calculations ({taxCalculations.length})</h3>
        {taxCalculations.length === 0 ? (
          <p className={styles.emptyHistory}>Use a calculator above to see your history</p>
        ) : (
          <div className={styles.historyList}>
            {taxCalculations.slice(-5).reverse().map((calc) => (
              <div key={calc.id} className={styles.historyItem}>
                <span className={styles.historyType}>
                  {calc.type === 'capital_gains' ? '📈' : calc.type === 'income_tax' ? '💰' : '🏦'}
                  {calc.type.replace('_', ' ')}
                </span>
                <span className={styles.historyResult}>
                  ₹{calc.result.taxAmount?.toLocaleString('en-IN') || calc.result.tds?.toLocaleString('en-IN') || calc.result.tax?.toLocaleString('en-IN') || 0}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tax;