import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';
import useAuthStore from './store/useAuthStore';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Learn from './pages/Learn';
import Trade from './pages/Trade';
import Tax from './pages/Tax';
import Debt from './pages/Debt';
import Profile from './pages/Profile';

function App() {
  const hasOnboarded = useStore((state) => state.hasOnboarded);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (!hasOnboarded) {
    return <Onboarding />;
  }

  return (
    <BrowserRouter>
      <Layout isAuthenticated={isAuthenticated} user={user}>
        <Routes>
          <Route path="/" element={<Navigate to="/learn" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/tax" element={<Tax />} />
          <Route path="/debt" element={<Debt />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;