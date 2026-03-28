import { Award, TrendingUp, Target, BookOpen, Zap, ChevronRight, LogOut } from 'lucide-react';
import useStore from '../store/useStore';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const BADGES_DATA = [
  { id: 'first_trade', name: 'First Trade', emoji: '🏆', description: 'Execute your first buy/sell', condition: (s) => s.transactions.length > 0 },
  { id: 'bull_run', name: 'Bull Run', emoji: '📈', description: 'Make 10 successful trades', condition: (s) => s.transactions.filter(t => t.type === 'BUY').length >= 10 },
  { id: 'theory_complete', name: 'Theory Complete', emoji: '📚', description: 'Finish all lessons', condition: (s) => s.completedLessons.length >= 6 },
  { id: 'tax_nerd', name: 'Tax Nerd', emoji: '🧾', description: 'Use all tax calculators', condition: (s) => s.taxCalculations.length >= 3 },
  { id: 'debt_destroyer', name: 'Debt Destroyer', emoji: '💳', description: 'Complete Debt Danger Zone quiz', condition: (s) => s.debtQuizCompleted },
  { id: 'diamond_hands', name: 'Diamond Hands', emoji: '🎯', description: 'Hold a stock for 30+ simulated days', condition: (s) => s.holdings.some(h => { const days = (Date.now() - new Date(h.buyDate).getTime()) / (1000 * 60 * 60 * 24); return days >= 30; }) },
  { id: 'day_trader', name: 'Day Trader', emoji: '🔄', description: 'Make 5 trades in one session', condition: (s) => s.sessionTrades >= 5 },
];

const LEVELS = [
  { name: 'BrokeButSmart Newbie', minXp: 0, maxXp: 500, emoji: '🐣' },
  { name: 'Money Curious', minXp: 500, maxXp: 1500, emoji: '🤔' },
  { name: 'Financially Awakening', minXp: 1500, maxXp: 3500, emoji: '💡' },
  { name: 'Market Apprentice', minXp: 3500, maxXp: 7000, emoji: '📊' },
  { name: 'Smart Money Master', minXp: 7000, maxXp: Infinity, emoji: '👑' },
];

function Profile() {
  const user = useStore((state) => state.user);
  const xp = useStore((state) => state.xp);
  const badges = useStore((state) => state.badges);
  const completedLessons = useStore((state) => state.completedLessons);
  const holdings = useStore((state) => state.holdings);
  const transactions = useStore((state) => state.transactions);
  const taxCalculations = useStore((state) => state.taxCalculations);
  const debtQuizCompleted = useStore((state) => state.debtQuizCompleted);
  const cash = useStore((state) => state.cash);
  const getPortfolioValue = useStore((state) => state.getPortfolioValue);
  const getTotalPnL = useStore((state) => state.getTotalPnL);
  const logout = useAuthStore((state) => state.logout);
  const authUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentLevel = LEVELS.find(level => xp >= level.minXp && xp < level.maxXp) || LEVELS[LEVELS.length - 1];
  const currentLevelIndex = LEVELS.indexOf(currentLevel);
  const nextLevel = LEVELS[currentLevelIndex + 1];
  const progressToNext = nextLevel ? ((xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100 : 100;

  const portfolioValue = getPortfolioValue();
  const totalPnL = getTotalPnL();

  const vibeEmoji = user?.vibe === 'investor' ? '🟢' : user?.vibe === 'saver' ? '🔵' : '🟡';
  const vibeText = user?.vibe === 'investor' ? 'Investor' : user?.vibe === 'saver' ? 'Saver' : 'Confused';

  const earnedBadgeIds = badges.map(b => b.id);
  const availableBadges = BADGES_DATA.filter(b => earnedBadgeIds.includes(b.id));

  const stats = [
    { label: 'Portfolio Value', value: `₹${portfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: TrendingUp },
    { label: 'Cash Available', value: `₹${cash.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: Zap },
    { label: 'Total P&L', value: `${totalPnL >= 0 ? '+' : ''}₹${totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: totalPnL >= 0 ? TrendingUp : Award, positive: totalPnL >= 0 },
    { label: 'Lessons Done', value: `${completedLessons.length}/6`, icon: BookOpen },
    { label: 'Trades Made', value: transactions.length.toString(), icon: Target },
    { label: 'Tax Calcs', value: taxCalculations.length.toString(), icon: Award },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <span>{vibeEmoji}</span>
            </div>
            <div>
              <h1 className={styles.name}>{authUser?.name || 'BrokeButSmart User'}</h1>
              <p className={styles.vibe}>{authUser?.email}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className={styles.levelCard}>
        <div className={styles.levelHeader}>
          <span className={styles.levelEmoji}>{currentLevel.emoji}</span>
          <div className={styles.levelInfo}>
            <span className={styles.levelName}>{currentLevel.name}</span>
            <span className={styles.xpDisplay}>{xp.toLocaleString()} XP</span>
          </div>
        </div>
        {nextLevel && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressToNext}%` }} />
            </div>
            <span className={styles.progressText}>
              {nextLevel.minXp - xp} XP to {nextLevel.name} {nextLevel.emoji}
            </span>
          </div>
        )}
        <div className={styles.levelGrid}>
          {LEVELS.map((level, i) => (
            <div
              key={level.name}
              className={`${styles.levelPip} ${i <= currentLevelIndex ? styles.achieved : ''}`}
              title={level.name}
            >
              {level.emoji}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <stat.icon size={18} className={styles.statIcon} />
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.badgesSection}>
        <h2><Award size={18} /> Badges ({availableBadges.length}/{BADGES_DATA.length})</h2>
        <div className={styles.badgesGrid}>
          {BADGES_DATA.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`${styles.badgeCard} ${isEarned ? styles.earned : styles.locked}`}
                title={badge.description}
              >
                <span className={styles.badgeEmoji}>{badge.emoji}</span>
                <span className={styles.badgeName}>{badge.name}</span>
                {isEarned && <span className={styles.badgeCheck}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.achievementsSection}>
        <h2><Target size={18} /> Achievements</h2>
        <div className={styles.achievementsList}>
          {completedLessons.length === 6 && (
            <div className={styles.achievement}>
              <span>📚</span>
              <span>Completed all theory lessons</span>
            </div>
          )}
          {transactions.length > 0 && (
            <div className={styles.achievement}>
              <span>💸</span>
              <span>Made first trade</span>
            </div>
          )}
          {holdings.length >= 5 && (
            <div className={styles.achievement}>
              <span>📊</span>
              <span>Diversified portfolio (5+ stocks)</span>
            </div>
          )}
          {totalPnL > 1000 && (
            <div className={styles.achievement}>
              <span>💰</span>
              <span>Profited over ₹1,000</span>
            </div>
          )}
          {debtQuizCompleted && (
            <div className={styles.achievement}>
              <span>🎯</span>
              <span>Completed Debt Danger Zone</span>
            </div>
          )}
          {taxCalculations.length >= 3 && (
            <div className={styles.achievement}>
              <span>🧾</span>
              <span>Mastered tax calculators</span>
            </div>
          )}
          {Object.keys(transactions).length === 0 && (
            <p className={styles.noAchievements}>Start trading and learning to unlock achievements!</p>
          )}
        </div>
      </div>

      <div className={styles.recentSection}>
        <h2>Recent Activity</h2>
        {transactions.length === 0 ? (
          <p className={styles.emptyActivity}>No activity yet. Start by exploring the Learn tab!</p>
        ) : (
          <div className={styles.activityList}>
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className={styles.activityItem}>
                <span className={`${styles.txType} ${tx.type === 'BUY' ? styles.buy : styles.sell}`}>
                  {tx.type === 'BUY' ? 'Bought' : 'Sold'}
                </span>
                <span className={styles.txDetails}>
                  {tx.quantity}x {tx.symbol}
                </span>
                <span className={styles.txPrice}>
                  ₹{(tx.price * tx.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;