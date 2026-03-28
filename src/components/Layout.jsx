import { BookOpen, TrendingUp, Receipt, CreditCard, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

const tabs = [
  { path: '/learn', icon: BookOpen, label: 'Learn' },
  { path: '/trade', icon: TrendingUp, label: 'Trade' },
  { path: '/tax', icon: Receipt, label: 'Tax' },
  { path: '/debt', icon: CreditCard, label: 'Debt' },
  { path: '/profile', icon: User, label: 'Profile' },
];

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <nav className={styles.tabBar}>
        {tabs.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={`${styles.tab} ${location.pathname === path ? styles.active : ''}`}
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Layout;