import React from 'react';
import { AgentContributionsProvider } from './context/AgentContributionsContext';
import { Header } from './components/Header';
import { IntroGuide } from './components/IntroGuide';
import { SummaryMetrics } from './components/SummaryMetrics';
import { AgentTable } from './components/AgentTable';
import { ContributionHistorySection } from './components/ContributionHistorySection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { AgentDetailsDrawer } from './components/AgentDetailsDrawer';
import { ContributionModal } from './components/ContributionModal';
import { IssueModal } from './components/IssueModal';
import { SimulationModal } from './components/SimulationModal';
import { ScoringRulesModal } from './components/ScoringRulesModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Clean, authentic Ziki navigation header */}
      <Header />

      {/* Main Dashboard organized in natural reading order */}
      <main id="main-content" style={{ flex: 1, padding: '2.5rem 0' }}>
        <div className="container-saas">
          {/* 1. Page Title & 3-Point Unobtrusive Overview */}
          <IntroGuide />

          {/* 2. Summary Metrics with Clear Straightforward Labels */}
          <SummaryMetrics />

          {/* 3. AI Agents Roster (6-column clean table) */}
          <AgentTable />

          {/* 4. Contribution History & Evidence Ledger (with search & filters) */}
          <ContributionHistorySection />

          {/* 5. Performance Comparison Benchmark */}
          <LeaderboardSection />
        </div>
      </main>

      {/* Modals & Drawers */}
      <AgentDetailsDrawer />
      <ContributionModal />
      <IssueModal />
      <SimulationModal />
      <ScoringRulesModal />
      <Toast />

      {/* Clean Ziki Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AgentContributionsProvider>
      <AppContent />
    </AgentContributionsProvider>
  );
};

export default App;
