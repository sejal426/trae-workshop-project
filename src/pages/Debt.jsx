import { useState, useEffect } from 'react';
import { ChevronRight, AlertTriangle, Calculator, ArrowRight, ChevronLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import useStore from '../store/useStore';
import styles from './Debt.module.css';

const DEBT_TOPICS = [
  {
    id: 'good-debt',
    title: 'Good Debt vs Bad Debt',
    icon: '⚖️',
    summary: 'Why some debt makes you money and some ruins you',
    content: `**The Truth About Debt:**
Not all debt is created equal. Some debt can help you build wealth. Some will have you paying interest forever.

**Good Debt Examples:**

🏠 Home Loan
- Property usually appreciates over time
- Low interest rates (7-8% in India)
- Tax benefits (Section 80C, 80EE)
- Someone else pays your mortgage (tenants)

🎓 Education Loan
- You're investing in earning potential
- Low interest rates (8-10%)
- No EMI while studying
- Moratorium period (no payment until you get a job)

**Bad Debt Examples:**

💳 Credit Card Debt
- 36-48% APR is INSANE
- Minimum payments = paying forever
- The credit card company WINS
- No asset appreciation

🪔 Payday Loans
- Predatory lending at 400%+ APR
- Designed to trap you
- Never take these. Seriously. NEVER.`,
  },
  {
    id: 'compound-trap',
    title: 'The Compound Interest Trap',
    icon: '🧮',
    summary: 'Understanding why debt grows so fast',
    content: `**The Scary Math:**

Credit card companies LOVE compound interest. Here's why you should fear it.

**Example: ₹10,000 at 36% APR**

Month 1 interest: ₹300
Month 2 interest: ₹300 (on ORIGINAL ₹10,000)

But if you only pay minimums (say ₹300/month):
- Month 1: ₹10,000 × 36%/12 = ₹300 interest
- You pay ₹300, balance stays ₹10,000
- This continues FOREVER

**The Real Numbers:**
Pay only minimums on ₹10,000 credit card debt:
- Time to pay off: 5+ years
- Total interest paid: ₹8,000+
- You borrowed ₹10,000, paid back ₹18,000+

**The Rule:**
If you can't pay off a credit card in FULL when the bill comes, you're playing a dangerous game.`,
  },
];

const DEBT_DANGER_QUIZ = [
  {
    id: 'q1',
    scenario: 'Credit card offer: 0% APR for 6 months. Should you take it?',
    options: [
      'Yes, free money!',
      'Only if you can pay it ALL off before 6 months ends',
      'Yes, minimum payments are fine',
      'No, never take credit card offers',
    ],
    correct: 1,
    explanation: '0% APR offers are fine IF you can pay off the ENTIRE balance before the promotional period ends. Otherwise, the rate jumps to 35%+ and you\'re trapped.',
  },
  {
    id: 'q2',
    scenario: 'You need ₹50,000 for an emergency. Payday loan at 400% APR or asking family?',
    options: [
      'Payday loan - quick and easy',
      'Ask family - they won\'t charge 400% interest',
      'Use another credit card',
      'Skip the emergency',
    ],
    correct: 1,
    explanation: 'Payday loans are predatory. A 400% APR means you\'d owe ₹2,00,000 on a ₹50,000 loan in a year. Family might help for free (or at least without interest).',
  },
  {
    id: 'q3',
    scenario: 'Your education loan EMI starts. You\'re unemployed. What do you do?',
    options: [
      'Ignore it - they can\'t find you',
      'Contact the bank and ask about moratorium options',
      'Take a payday loan to pay EMI',
      'Pay minimum amount using credit card',
    ],
    correct: 1,
    explanation: 'Education loans have a moratorium period (no EMI while studying/job hunting). If you can\'t find work, contact the bank - they can extend the moratorium or restructure payments.',
  },
  {
    id: 'q4',
    scenario: 'You see a new car you love. You can "afford" the EMI. Should you buy it?',
    options: [
      'Yes, you can afford it',
      'No - cars depreciate the second you drive them',
      'Lease instead',
      'Buy used instead',
    ],
    correct: 1,
    explanation: 'A new car loses 20% of its value the moment you drive it. A ₹10 lakh car is worth ₹8 lakh tomorrow. The EMI you\'re "affording" is for a depreciating asset.',
  },
];

function Debt() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentView, setCurrentView] = useState('main');
  const [principal, setPrincipal] = useState(10000);
  const [interestRate, setInterestRate] = useState(36);
  const [months, setMonths] = useState(12);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);

  const completeDebtQuiz = useStore((state) => state.completeDebtQuiz);
  const debtQuizCompleted = useStore((state) => state.debtQuizCompleted);

  const chartData = [];
  let balance = principal;
  for (let m = 0; m <= months; m++) {
    chartData.push({
      month: m,
      balance: Math.round(balance * 100) / 100,
    });
    balance = balance * (1 + interestRate / 100 / 12);
  }

  const totalInterest = chartData[months].balance - principal;
  const emi = (principal * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, months)) /
    (Math.pow(1 + interestRate / 100 / 12, months) - 1);
  const totalPayment = emi * months;

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const finishQuiz = () => {
    setShowQuizResult(true);
    completeDebtQuiz();
  };

  const getQuizScore = () => {
    return DEBT_DANGER_QUIZ.reduce((score, q, i) =>
      score + (quizAnswers[i] === q.correct ? 1 : 0), 0);
  };

  if (selectedTopic) {
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => setSelectedTopic(null)}>
          ← Back to Debt
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

  if (currentView === 'compound') {
    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => setCurrentView('main')}>
          ← Back
        </button>
        <div className={styles.header}>
          <h1 className={styles.title}>Compound Interest Visualizer 💰</h1>
          <p className={styles.subtitle}>Watch your debt grow. It's terrifying.</p>
        </div>

        <div className={styles.slidersContainer}>
          <div className={styles.sliderGroup}>
            <label>Principal Amount: ₹{principal.toLocaleString()}</label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={principal}
              onChange={(e) => setPrincipal(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.sliderGroup}>
            <label>Interest Rate: {interestRate}% APR</label>
            <input
              type="range"
              min="1"
              max="50"
              value={interestRate}
              onChange={(e) => setInterestRate(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.sliderGroup}>
            <label>Time Period: {months} months</label>
            <input
              type="range"
              min="1"
              max="60"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#252530" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: '#606070' }}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Months', position: 'insideBottom', offset: -5, fill: '#606070', fontSize: 10 }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#606070' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ background: '#1A1A1F', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Balance']}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#FF4757"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: '#FF4757' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.debtStats}>
          <div className={styles.debtStat}>
            <span>Original Debt</span>
            <span>₹{principal.toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.debtStat}>
            <span>Total Interest</span>
            <span className={styles.danger}>₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.debtStat}>
            <span>Total to Pay</span>
            <span className={styles.danger}>₹{Math.round(chartData[months].balance).toLocaleString('en-IN')}</span>
          </div>
          <div className={styles.debtStat}>
            <span>Monthly EMI</span>
            <span>₹{Math.round(emi).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className={styles.warningBox}>
          <AlertTriangle size={20} />
          <p>This is why credit card debt is terrifying. Borrow ₹{principal.toLocaleString()} at {interestRate}% APR, and you'll pay ₹{Math.round(totalInterest).toLocaleString()} extra over {months} months.</p>
        </div>
      </div>
    );
  }

  if (currentView === 'quiz') {
    const currentQ = DEBT_DANGER_QUIZ[quizIndex];
    const selectedAnswer = quizAnswers[quizIndex];

    if (showQuizResult) {
      const score = getQuizScore();
      return (
        <div className={styles.container}>
          <button className={styles.backBtn} onClick={() => setCurrentView('main')}>
            ← Back to Debt
          </button>
          <div className={styles.quizResult}>
            <div className={styles.quizScore}>
              <span className={styles.bigScore}>{score}</span>
              <span className={styles.smallScore}>/{DEBT_DANGER_QUIZ.length}</span>
            </div>
            <h2>{score >= 3 ? '🏆 Debt Destroyer!' : '📚 Keep Learning!'}</h2>
            <p>{score >= 3 ? 'You know your debt dangers!' : 'Review the scenarios and try again.'}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => setCurrentView('main')}>
          ← Back
        </button>
        <div className={styles.quizHeader}>
          <span>Question {quizIndex + 1}/{DEBT_DANGER_QUIZ.length}</span>
          <div className={styles.quizProgress}>
            {DEBT_DANGER_QUIZ.map((_, i) => (
              <div
                key={i}
                className={`${styles.quizDot} ${quizAnswers[i] !== undefined ? styles.answered : ''} ${quizAnswers[i] === DEBT_DANGER_QUIZ[i].correct ? styles.correct : ''}`}
              />
            ))}
          </div>
        </div>
        <div className={styles.quizCard}>
          <h3>{currentQ.scenario}</h3>
          <div className={styles.quizOptions}>
            {currentQ.options.map((option, i) => (
              <button
                key={i}
                className={`${styles.quizOption} ${selectedAnswer === i ? styles.selected : ''} ${selectedAnswer !== undefined ? (i === currentQ.correct ? styles.correctAnswer : (selectedAnswer === i ? styles.wrongAnswer : '')) : ''}`}
                onClick={() => handleQuizAnswer(quizIndex, i)}
                disabled={selectedAnswer !== undefined}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer !== undefined && (
            <div className={`${styles.explanation} ${selectedAnswer === currentQ.correct ? styles.correctExp : styles.wrongExp}`}>
              <p>{currentQ.explanation}</p>
              {quizIndex < DEBT_DANGER_QUIZ.length - 1 ? (
                <button onClick={() => setQuizIndex(quizIndex + 1)} className={styles.nextQuestion}>
                  Next Question <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={finishQuiz} className={styles.finishQuiz}>
                  See Results
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Debt Decoder 💳</h1>
        <p className={styles.subtitle}>Don't let debt be your enemy. Learn to handle it.</p>
      </div>

      <div className={styles.topicsGrid}>
        {DEBT_TOPICS.map((topic) => (
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

      <div className={styles.toolsSection}>
        <h2>Interactive Tools</h2>

        <button className={styles.toolCard} onClick={() => setCurrentView('compound')}>
          <div className={styles.toolIcon}>📈</div>
          <div className={styles.toolInfo}>
            <h3>Compound Interest Visualizer</h3>
            <p>See how debt grows over time</p>
          </div>
          <ArrowRight size={18} />
        </button>

        <button className={styles.toolCard} onClick={() => { setCurrentView('quiz'); setQuizIndex(0); setQuizAnswers({}); setShowQuizResult(false); }}>
          <div className={styles.toolIcon}>🎯</div>
          <div className={styles.toolInfo}>
            <h3>Debt Danger Zone Quiz</h3>
            <p>{debtQuizCompleted ? '✅ Completed' : 'Test your debt knowledge'}</p>
          </div>
          <ArrowRight size={18} />
        </button>

        <div className={styles.emiCalculator}>
          <h3><Calculator size={16} /> EMI Calculator</h3>
          <EMICalculator />
        </div>
      </div>
    </div>
  );
}

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(24);

  const emi = (loanAmount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, tenure)) /
    (Math.pow(1 + interestRate / 100 / 12, tenure) - 1);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className={styles.emiContainer}>
      <div className={styles.emiSliders}>
        <div className={styles.emiSlider}>
          <label>Loan Amount: ₹{loanAmount.toLocaleString()}</label>
          <input
            type="range"
            min="10000"
            max="5000000"
            step="10000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.emiSlider}>
          <label>Interest Rate: {interestRate}%</label>
          <input
            type="range"
            min="5"
            max="25"
            value={interestRate}
            onChange={(e) => setInterestRate(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.emiSlider}>
          <label>Tenure: {tenure} months</label>
          <input
            type="range"
            min="6"
            max="120"
            step="6"
            value={tenure}
            onChange={(e) => setTenure(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.emiResults}>
        <div className={styles.emiResult}>
          <span>Monthly EMI</span>
          <span className={styles.emiAmount}>₹{Math.round(emi).toLocaleString('en-IN')}</span>
        </div>
        <div className={styles.emiResult}>
          <span>Total Interest</span>
          <span className={styles.interestAmount}>₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
        </div>
        <div className={styles.emiResult}>
          <span>Total Payment</span>
          <span>₹{Math.round(totalPayment).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}

export default Debt;