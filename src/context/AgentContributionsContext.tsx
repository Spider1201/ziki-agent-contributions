import React, { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type {
  Agent,
  Issue,
  Contribution,
  AgentStatus,
  ContributionType,
  VerificationStatus,
  DateRangeFilter,
  IssueSeverity
} from '../types';
import { INITIAL_AGENTS, INITIAL_ISSUES, INITIAL_CONTRIBUTIONS } from '../data/seedData';
import { calculateSolverPoints } from '../data/scoringRules';

const STORAGE_KEY_PREFIX = 'ziki_agent_dashboard_v1';

export interface AgentMetrics extends Agent {
  lifetimePoints: number;
  periodPoints: number;
  pendingPoints: number;
  verifiedCount: number;
  pendingCount: number;
  completedIssuesCount: number;
  acceptanceRate: number;
  pointsPerContribution: number;
  rank: number;
}

export interface SummaryKPIs {
  totalPointsEarned: number;
  totalContributions: number;
  verifiedContributions: number;
  pendingContributions: number;
  acceptanceRate: number;
  activeAgentsCount: number;
  totalAgentsCount: number;
  offlineAgentsCount: number;
}

interface AgentContributionsContextType {
  agents: Agent[];
  issues: Issue[];
  contributions: Contribution[];
  agentMetrics: AgentMetrics[];
  summaryKPIs: SummaryKPIs;
  
  // Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: AgentStatus | 'all';
  setStatusFilter: (s: AgentStatus | 'all') => void;
  dateRange: DateRangeFilter;
  setDateRange: (r: DateRangeFilter) => void;
  contributionTypeFilter: ContributionType | 'all';
  setContributionTypeFilter: (t: ContributionType | 'all') => void;
  verificationStatusFilter: VerificationStatus | 'all';
  setVerificationStatusFilter: (v: VerificationStatus | 'all') => void;
  sortBy: 'points' | 'verified' | 'issues' | 'recent' | 'name';
  setSortBy: (s: 'points' | 'verified' | 'issues' | 'recent' | 'name') => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (d: 'asc' | 'desc') => void;

  // Selected views
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  selectedIssueId: string | null;
  setSelectedIssueId: (id: string | null) => void;
  selectedContributionId: string | null;
  setSelectedContributionId: (id: string | null) => void;
  
  // Modals
  isSimulationModalOpen: boolean;
  setIsSimulationModalOpen: (open: boolean) => void;
  isScoringModalOpen: boolean;
  setIsScoringModalOpen: (open: boolean) => void;
  
  // Actions
  toggleAgentStatus: (agentId: string, customStatus?: AgentStatus) => void;
  simulateContribution: (params: {
    agentId: string;
    issueId: string;
    type: ContributionType;
    title: string;
    description: string;
    severity?: IssueSeverity;
    immediateVerify: boolean;
  }) => void;
  verifyContribution: (contributionId: string) => void;
  resetToDefaultData: () => void;
  
  // Toast notifications
  toast: { message: string; type: 'info' | 'success' | 'warning' } | null;
  dismissToast: () => void;

  // Dark mode
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

const DATE_RANGES: DateRangeFilter[] = [
  { id: 'all', label: 'All Time' },
  { id: '7d', label: 'Last 7 Days', days: 7 },
  { id: '30d', label: 'Last 30 Days', days: 30 },
  { id: 'sprint', label: 'Current Sprint (Sprint 42)', days: 14 }
];

const AgentContributionsContext = createContext<AgentContributionsContextType | null>(null);

export const AgentContributionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load state from localStorage or initial
  const [agents, setAgents] = useState<Agent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}_agents`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_AGENTS;
  });

  const [issues, setIssues] = useState<Issue[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}_issues`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ISSUES;
  });

  const [contributions, setContributions] = useState<Contribution[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}_contributions`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CONTRIBUTIONS;
  });

  // UI state & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AgentStatus | 'all'>('all');
  const [dateRange, setDateRange] = useState<DateRangeFilter>(DATE_RANGES[0]);
  const [contributionTypeFilter, setContributionTypeFilter] = useState<ContributionType | 'all'>('all');
  const [verificationStatusFilter, setVerificationStatusFilter] = useState<VerificationStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'points' | 'verified' | 'issues' | 'recent' | 'name'>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Selected item drawers/modals
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [selectedContributionId, setSelectedContributionId] = useState<string | null>(null);
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);
  const [isScoringModalOpen, setIsScoringModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'warning' } | null>(null);

  // Theme preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}_theme`);
    if (saved) return saved === 'dark';
    return true; // Default dark SaaS aesthetic matching Ziki
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}_agents`, JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}_issues`, JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}_contributions`, JSON.stringify(contributions));
  }, [contributions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}_theme`, isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(curr => (curr?.message === message ? null : curr));
    }, 4500);
  };

  const dismissToast = () => setToast(null);

  // Compute derived metrics for each agent (Single source of truth!)
  const agentMetrics: AgentMetrics[] = useMemo(() => {
    const now = new Date();
    const cutoffDate = dateRange.days
      ? new Date(now.getTime() - dateRange.days * 24 * 60 * 60 * 1000)
      : null;

    const computed = agents.map(agent => {
      const agentContribs = contributions.filter(c => c.agentId === agent.id);

      const verifiedContribs = agentContribs.filter(c => c.verificationStatus === 'verified');
      const pendingContribs = agentContribs.filter(c => c.verificationStatus === 'pending');
      const rejectedContribs = agentContribs.filter(c => c.verificationStatus === 'rejected');

      const lifetimePoints = verifiedContribs.reduce((sum, c) => sum + c.pointsAwarded, 0);
      const pendingPoints = pendingContribs.reduce((sum, c) => sum + c.potentialPoints, 0);

      const periodContribs = cutoffDate
        ? verifiedContribs.filter(c => new Date(c.timestamp) >= cutoffDate)
        : verifiedContribs;
      const periodPoints = periodContribs.reduce((sum, c) => sum + c.pointsAwarded, 0);

      // Completed issues: unique issues where this agent delivered verified solver fix
      const solverIssueIds = new Set(
        verifiedContribs.filter(c => c.type === 'solver_fix').map(c => c.issueId)
      );
      const completedIssuesCount = solverIssueIds.size;

      const totalEvaluated = verifiedContribs.length + rejectedContribs.length;
      const acceptanceRate = totalEvaluated > 0
        ? Math.round((verifiedContribs.length / totalEvaluated) * 100)
        : 100;

      const pointsPerContribution = verifiedContribs.length > 0
        ? Math.round(lifetimePoints / verifiedContribs.length)
        : 0;

      return {
        ...agent,
        lifetimePoints,
        periodPoints,
        pendingPoints,
        verifiedCount: verifiedContribs.length,
        pendingCount: pendingContribs.length,
        completedIssuesCount,
        acceptanceRate,
        pointsPerContribution,
        rank: 1 // assigned below
      };
    });

    // Rank agents deterministically by lifetimePoints desc
    const sortedForRank = [...computed].sort((a, b) => b.lifetimePoints - a.lifetimePoints);
    sortedForRank.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    return computed;
  }, [agents, contributions, dateRange]);

  // Overall Summary Metrics (Single source of truth)
  const summaryKPIs: SummaryKPIs = useMemo(() => {
    const verified = contributions.filter(c => c.verificationStatus === 'verified');
    const pending = contributions.filter(c => c.verificationStatus === 'pending');
    const rejected = contributions.filter(c => c.verificationStatus === 'rejected');

    const totalPointsEarned = verified.reduce((sum, c) => sum + c.pointsAwarded, 0);
    const totalCount = contributions.length;
    const evaluatedCount = verified.length + rejected.length;
    const acceptanceRate = evaluatedCount > 0 ? Math.round((verified.length / evaluatedCount) * 100) : 100;

    const activeCount = agents.filter(a => a.status !== 'offline').length;
    const offlineCount = agents.filter(a => a.status === 'offline').length;

    return {
      totalPointsEarned,
      totalContributions: totalCount,
      verifiedContributions: verified.length,
      pendingContributions: pending.length,
      acceptanceRate,
      activeAgentsCount: activeCount,
      totalAgentsCount: agents.length,
      offlineAgentsCount: offlineCount
    };
  }, [agents, contributions]);

  // Toggle status for demo (e.g. Working -> Offline)
  const toggleAgentStatus = (agentId: string, customStatus?: AgentStatus) => {
    const targetAgent = agents.find(a => a.id === agentId);
    if (!targetAgent) return;

    let nextStatus: AgentStatus;
    if (customStatus) {
      nextStatus = customStatus;
    } else {
      // Toggle sequence: working -> idle -> offline -> online -> working
      if (targetAgent.status === 'working') nextStatus = 'offline';
      else if (targetAgent.status === 'offline') nextStatus = 'working';
      else if (targetAgent.status === 'idle') nextStatus = 'offline';
      else nextStatus = 'idle';
    }

    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        return {
          ...a,
          status: nextStatus,
          lastActive: new Date().toISOString()
        };
      }
      return a;
    }));

    if (nextStatus === 'offline') {
      showToast(
        `${targetAgent.name} status switched to Offline. Note: All earned points, audit ledger entries, and historical contributions remain 100% visible and intact.`,
        'warning'
      );
    } else {
      showToast(`${targetAgent.name} status updated to ${nextStatus.toUpperCase()}.`, 'success');
    }
  };

  // Simulate adding a new contribution or event
  const simulateContribution = ({
    agentId,
    issueId,
    type,
    title,
    description,
    severity = 'medium',
    immediateVerify
  }: {
    agentId: string;
    issueId: string;
    type: ContributionType;
    title: string;
    description: string;
    severity?: IssueSeverity;
    immediateVerify: boolean;
  }) => {
    const targetAgent = agents.find(a => a.id === agentId);
    const targetIssue = issues.find(i => i.id === issueId);
    if (!targetAgent || !targetIssue) return;

    let points = 0;
    if (type === 'solver_fix') {
      points = calculateSolverPoints(severity);
    } else if (type === 'independent_review') {
      points = 300;
    } else if (type === 'confirming_review') {
      points = 90;
    } else if (type === 'triager_clearance') {
      points = 30;
    } else if (type === 'triager_duplicate') {
      points = 150;
    } else if (type === 'issue_report') {
      points = 150;
    } else if (type === 'dispatcher_dispatch') {
      points = 60;
    }

    const timestamp = new Date().toISOString();
    const sourceKey = `${type}:${targetIssue.id}:${targetAgent.id}_${Date.now()}`;
    const newContribId = `cnt_${targetAgent.id}_${Date.now()}`;

    const newContrib: Contribution = {
      id: newContribId,
      agentId: targetAgent.id,
      issueId: targetIssue.id,
      issueNumber: targetIssue.number,
      issueTitle: targetIssue.title,
      type,
      title,
      description,
      pointsAwarded: immediateVerify ? points : 0,
      potentialPoints: points,
      verificationStatus: immediateVerify ? 'verified' : 'pending',
      timestamp,
      evidence: {
        type: type === 'solver_fix' ? 'pr' : type === 'independent_review' ? 'test_run' : 'audit_event',
        label: immediateVerify ? `Verified via independent quorum` : `Pending 2 independent review gates`,
        details: `Simulated via demo runner at ${new Date().toLocaleTimeString()}`
      },
      ledgerSourceKey: sourceKey,
      verifiedBy: immediateVerify ? 'Merger Gate (Simulated)' : undefined,
      verifiedAt: immediateVerify ? timestamp : undefined
    };

    setContributions(prev => [newContrib, ...prev]);

    // Update agent lastActive
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, lastActive: timestamp } : a));

    if (immediateVerify) {
      showToast(
        `Recorded contribution for ${targetAgent.name}: +${points} pts awarded to ledger.`,
        'success'
      );
    } else {
      showToast(
        `Recorded pending contribution for ${targetAgent.name} (0 pts awarded, ${points} potential until verified).`,
        'info'
      );
    }
  };

  // Verify a pending contribution
  const verifyContribution = (contributionId: string) => {
    setContributions(prev => prev.map(c => {
      if (c.id === contributionId && c.verificationStatus === 'pending') {
        const timestamp = new Date().toISOString();
        showToast(`Contribution verified: +${c.potentialPoints} pts added to agent total.`, 'success');
        return {
          ...c,
          verificationStatus: 'verified',
          pointsAwarded: c.potentialPoints,
          verifiedBy: 'Merger Admin (Zedu)',
          verifiedAt: timestamp
        };
      }
      return c;
    }));
  };

  // Reset to initial deterministic seed data
  const resetToDefaultData = () => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}_agents`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}_issues`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}_contributions`);
    setAgents(INITIAL_AGENTS);
    setIssues(INITIAL_ISSUES);
    setContributions(INITIAL_CONTRIBUTIONS);
    setSearchQuery('');
    setStatusFilter('all');
    setDateRange(DATE_RANGES[0]);
    setContributionTypeFilter('all');
    setVerificationStatusFilter('all');
    setSelectedAgentId(null);
    setSelectedIssueId(null);
    setSelectedContributionId(null);
    showToast('Dashboard reset to default deterministic demo data.', 'info');
  };

  return (
    <AgentContributionsContext.Provider
      value={{
        agents,
        issues,
        contributions,
        agentMetrics,
        summaryKPIs,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        dateRange,
        setDateRange,
        contributionTypeFilter,
        setContributionTypeFilter,
        verificationStatusFilter,
        setVerificationStatusFilter,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        selectedAgentId,
        setSelectedAgentId,
        selectedIssueId,
        setSelectedIssueId,
        selectedContributionId,
        setSelectedContributionId,
        isSimulationModalOpen,
        setIsSimulationModalOpen,
        isScoringModalOpen,
        setIsScoringModalOpen,
        toggleAgentStatus,
        simulateContribution,
        verifyContribution,
        resetToDefaultData,
        toast,
        dismissToast,
        isDarkMode,
        setIsDarkMode
      }}
    >
      {children}
    </AgentContributionsContext.Provider>
  );
};

export const useAgentContributions = () => {
  const context = useContext(AgentContributionsContext);
  if (!context) {
    throw new Error('useAgentContributions must be used within an AgentContributionsProvider');
  }
  return context;
};
