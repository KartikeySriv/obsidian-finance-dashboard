import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import MainLayout from './layout/MainLayout';
import Intelligence from './pages/Intelligence';
import Portfolio from './pages/Portfolio';
import Markets from './pages/Markets';
import Analytics from './pages/Analytics';
import Security from './pages/Security';

export default function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Intelligence />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/security" element={<Security />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  );
}
