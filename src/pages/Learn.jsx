import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import useStore from '../store/useStore';
import { lessons, categories } from '../data/lessons';
import styles from './Learn.module.css';

function Learn() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedDeepDive, setExpandedDeepDive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const completedLessons = useStore((state) => state.completedLessons);
  const completeLesson = useStore((state) => state.completeLesson);
  const completeQuiz = useStore((state) => state.completeQuiz);
  const xp = useStore((state) => state.xp);

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setExpandedDeepDive(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
    setCorrectCount(0);
  };

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === selectedLesson.quiz.questions[currentQuestion].correct) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedLesson.quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      completeLesson(selectedLesson.id);
      completeQuiz(selectedLesson.id, correctCount + (selectedAnswer === selectedLesson.quiz.questions[currentQuestion].correct ? 1 : 0));
    }
  };

  const renderBackButton = () => {
    setSelectedLesson(null);
  };

  if (selectedLesson) {
    const question = selectedLesson.quiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    const isCompleted = completedLessons.includes(selectedLesson.id);

    return (
      <div className={styles.lessonContainer}>
        <button className={styles.backBtn} onClick={renderBackButton}>
          ← Back to Lessons
        </button>

        <div className={styles.lessonHeader}>
          <span className={styles.category}>{selectedLesson.category}</span>
          <h2 className={styles.lessonTitle}>{selectedLesson.title}</h2>
          {isCompleted && (
            <span className={styles.completedBadge}>
              <Check size={14} /> Completed +50 XP
            </span>
          )}
        </div>

        <div className={styles.contentSection}>
          <div className={styles.contentText}>
            {selectedLesson.content.split('\n\n').map((para, i) => (
              <p key={i}>
                {para.split('**').map((part, j) =>
                  j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                )}
              </p>
            ))}
          </div>
        </div>

        <button
          className={styles.deepDiveBtn}
          onClick={() => setExpandedDeepDive(!expandedDeepDive)}
        >
          {expandedDeepDive ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          Go Deeper
        </button>

        {expandedDeepDive && (
          <div className={styles.deepDiveContent}>
            <div className={styles.contentText}>
              {selectedLesson.deepDive.split('\n\n').map((para, i) => (
                <p key={i}>
                  {para.split('**').map((part, j) =>
                    j % 2 === 0 ? part : <strong key={j}>{part}</strong>
                  )}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className={styles.quizSection}>
          <h3 className={styles.quizTitle}>Quick Quiz</h3>
          {!quizComplete ? (
            <div className={styles.quizCard}>
              <p className={styles.questionText}>
                {currentQuestion + 1}. {question.question}
              </p>
              <div className={styles.optionsGrid}>
                {question.options.map((option, index) => {
                  let optionClass = styles.option;
                  if (showResult) {
                    if (index === question.correct) {
                      optionClass += ` ${styles.correct}`;
                    } else if (index === selectedAnswer && !isCorrect) {
                      optionClass += ` ${styles.wrong}`;
                    }
                  }

                  return (
                    <button
                      key={index}
                      className={optionClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                    >
                      <span className={styles.optionLetter}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                      {showResult && index === question.correct && <Check size={16} />}
                      {showResult && index === selectedAnswer && index !== question.correct && <X size={16} />}
                    </button>
                  );
                })}
              </div>
              {showResult && (
                <div className={`${styles.explanation} ${isCorrect ? styles.correctExp : styles.wrongExp}`}>
                  <p>{question.explanation}</p>
                  <button className={styles.nextBtn} onClick={handleNextQuestion}>
                    {currentQuestion < selectedLesson.quiz.questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.quizResult}>
              <div className={styles.resultScore}>
                <span className={styles.scoreNum}>{correctCount}</span>
                <span className={styles.scoreTotal}>/{selectedLesson.quiz.questions.length}</span>
              </div>
              <p className={styles.resultText}>
                {correctCount === 3
                  ? '🏆 Perfect! +100 XP Bonus!'
                  : correctCount >= 2
                  ? '👍 Good job! Keep learning!'
                  : '📚 Review this lesson and try again!'}
              </p>
              <p className={styles.xpGained}>
                +{correctCount === 3 ? 150 : 50} XP earned
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Theory Hub 📚</h1>
        <p className={styles.subtitle}>Learn the basics. Get smarter. No fluff.</p>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }} />
        <span className={styles.progressText}>{completedLessons.length}/{lessons.length} completed</span>
      </div>

      <div className={styles.categories}>
        {categories.map((category) => (
          <div key={category} className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <div className={styles.lessonGrid}>
              {lessons
                .filter((l) => l.category === category)
                .map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      className={`${styles.lessonCard} ${isCompleted ? styles.completed : ''}`}
                      onClick={() => handleSelectLesson(lesson)}
                    >
                      <div className={styles.cardHeader}>
                        <span className={styles.cardTitle}>{lesson.title}</span>
                        {isCompleted && <Check size={16} className={styles.checkIcon} />}
                      </div>
                      <p className={styles.cardSummary}>{lesson.summary}</p>
                      <span className={styles.xpBadge}>+{lesson.xpReward} XP</span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learn;