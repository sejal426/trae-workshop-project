import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import styles from './Onboarding.module.css';

const MONEY_TIERS = [
  { min: 1000, max: 5000, label: 'Budget Trader', color: '#FF4757', emoji: '😬' },
  { min: 5001, max: 15000, label: 'Getting Started', color: '#FFB800', emoji: '👍' },
  { min: 15001, max: 30000, label: 'Serious Learner', color: '#3B82F6', emoji: '📊' },
  { min: 30001, max: 50000, label: 'High Roller', color: '#00D26A', emoji: '💎' },
];

const getTierForAmount = (amount) => {
  return MONEY_TIERS.find(tier => amount >= tier.min && amount <= tier.max) || MONEY_TIERS[0];
};

function Onboarding() {
  const [step, setStep] = useState(0);
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(10000);
  const [revealedAmount, setRevealedAmount] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const onboard = useStore((state) => state.onboard);

  const currentTier = getTierForAmount(selectedAmount);

  useEffect(() => {
    if (isRevealing) {
      const timer = setTimeout(() => {
        setRevealedAmount(selectedAmount);
        setIsRevealing(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isRevealing, selectedAmount]);

  const handleSelect = (vibe) => {
    setSelectedVibe(vibe);
  };

  const handleContinue = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1 && selectedVibe) {
      setStep(2);
    } else if (step === 2) {
      setIsRevealing(true);
      setTimeout(() => {
        onboard(selectedVibe, selectedAmount);
      }, 1500);
    }
  };

  const vibes = [
  {
    id: 'investor',
    title: 'Investor',
    subtitle: "I got some cash and wanna make it grow",
    emoji: '🟢',
    color: '#00D26A',
  },
  {
    id: 'saver',
    title: 'Saver',
    subtitle: "Just trying not to blow my money",
    emoji: '🔵',
    color: '#3B82F6',
  },
  {
    id: 'confused',
    title: 'Confused',
    subtitle: "IDK what's happening but I wanna learn",
    emoji: '🟡',
    color: '#FFB800',
  },
];

return (
    <div className={styles.container}>
      <div className={styles.content}>
        {step === 0 ? (
          <div className={styles.welcome}>
            <div className={styles.logo}>💰</div>
            <h1 className={styles.title}>BrokeButSmart</h1>
            <p className={styles.tagline}>Your financially smarter bestie</p>
            <p className={styles.description}>
              Learn investing, taxes, and debt without the BS. Practice trading with fake money.
              No bank account required (but honestly, you probably don't have one rn).
            </p>
          </div>
        ) : step === 1 ? (
          <div className={styles.vibeSelect}>
            <h2 className={styles.vibeTitle}>What's your vibe?</h2>
            <p className={styles.vibeSubtitle}>We'll personalize your experience</p>
            <div className={styles.vibeList}>
              {vibes.map((vibe) => (
                <button
                  key={vibe.id}
                  className={`${styles.vibeCard} ${selectedVibe === vibe.id ? styles.selected : ''}`}
                  onClick={() => handleSelect(vibe.id)}
                  style={{ '--vibe-color': vibe.color }}
                >
                  <span className={styles.vibeEmoji}>{vibe.emoji}</span>
                  <span className={styles.vibeName}>{vibe.title}</span>
                  <span className={styles.vibeDesc}>{vibe.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.moneySelect}>
            <h2 className={styles.moneyTitle}>Pick Your Starting Cash</h2>
            <p className={styles.moneySubtitle}>This is fake money. Don't get too excited.</p>

            <div className={styles.amountDisplay} style={{ '--tier-color': currentTier.color }}>
              <span className={styles.tierEmoji}>{currentTier.emoji}</span>
              <span className={styles.tierLabel}>{currentTier.label}</span>
              <div className={`${styles.amountValue} ${isRevealing ? styles.revealing : ''} ${revealedAmount ? styles.revealed : ''}`}>
                {revealedAmount ? (
                  <>₹{revealedAmount.toLocaleString('en-IN')}</>
                ) : (
                  <>₹{selectedAmount.toLocaleString('en-IN')}</>
                )}
              </div>
            </div>

            <div className={styles.sliderContainer}>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={selectedAmount}
                onChange={(e) => { setSelectedAmount(parseInt(e.target.value)); setRevealedAmount(null); }}
                className={styles.moneySlider}
                style={{ '--tier-color': currentTier.color }}
              />
              <div className={styles.sliderLabels}>
                <span>₹1,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            <div className={styles.tierGrid}>
              {MONEY_TIERS.map((tier) => {
                const isActive = selectedAmount >= tier.min && selectedAmount <= tier.max;
                return (
                  <div
                    key={tier.label}
                    className={`${styles.tierCard} ${isActive ? styles.activeTier : ''}`}
                    style={{ '--tier-color': tier.color }}
                  >
                    <span className={styles.tierCardEmoji}>{tier.emoji}</span>
                    <span className={styles.tierCardLabel}>{tier.label}</span>
                    <span className={styles.tierCardRange}>₹{tier.min.toLocaleString('en-IN')} - ₹{tier.max.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <button
          className={styles.continueBtn}
          onClick={handleContinue}
          disabled={(step === 1 && !selectedVibe) || (step === 2 && isRevealing)}
        >
          {step === 0 ? "Let's Go →" : step === 1 ? (selectedVibe ? 'Next: Pick Cash 💰' : 'Choose your vibe') : (isRevealing ? 'Revealing...' : 'Start Learning 💪')}
        </button>
        <p className={styles.skipText}>
          {step === 0 && "No account needed. Just start investing (fake) knowledge."}
          {step === 1 && "Your vibe helps us personalize your learning path."}
          {step === 2 && "Choose how much fake cash you wanna play with."}
        </p>
      </div>
    </div>
  );
}

export default Onboarding;