import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';
import Onboarding from './pages/Onboarding';
import Layout from './components/Layout';
import Learn from './pages/Learn';
import Trade from './pages/Trade';
import Tax from './pages/Tax';
import Debt from './pages/Debt';
import Profile from './pages/Profile';

function App() {
  const hasOnboarded = useStore((state) => state.hasOnboarded);

  if (!hasOnboarded) {
    return <Onboarding />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/learn" replace />} />
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