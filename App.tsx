
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PickupForm from './components/PickupForm';
import MapScreen from './components/MapScreen';
import Rewards from './components/Rewards';
import ChatBot from './components/ChatBot';
import TransactionHistory from './components/TransactionHistory';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard setActiveTab={setActiveTab} />;
      case 'sell': return <PickupForm />;
      case 'history': return <TransactionHistory />;
      case 'map': return <MapScreen />;
      case 'rewards': return <Rewards />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-500 h-full relative">
        {renderContent()}
        <ChatBot />
      </div>
    </Layout>
  );
};

export default App;
