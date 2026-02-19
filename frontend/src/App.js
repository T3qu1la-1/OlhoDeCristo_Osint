import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PentesterPage from './pages/PentesterPage';
import OSINTPage from './pages/OSINTPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'pentester':
        return <PentesterPage />;
      case 'osint':
        return <OSINTPage />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
