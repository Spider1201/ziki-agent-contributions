import React, { useState } from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import {
  X,
  CheckCircle2,
  Clock,
  GitPullRequest,
  Power,
  ChevronRight,
  Info,
  Search,
  Radio,
  Coffee,
  ArrowLeft
} from 'lucide-react';
import type { ContributionType, VerificationStatus, AgentStatus } from '../types';

export const AgentDetailsDrawer: React.FC = () => {
  const {
    selectedAgentId,
    setSelectedAgentId,
    agentMetrics,
    contributions,
    dateRange,
    toggleAgentStatus,
    setSelectedIssueId,
    setSelectedContributionId,
    verifyContribution
  } = useAgentContributions();

  const [activeTab, setActiveTab] = useState<'history' | 'issues' | 'standing_brief'>('history');
  const [historySearch, setHistorySearch] = useState('');

  if (!selectedAgentId) return null;

  const agent = agentMetrics.find(a => a.id === selectedAgentId);
  if (!agent) return null;

  // Contributions belonging to this agent
  const agentContributions = contributions.filter(c => c.agentId === agent.id);

  // Filtered by internal drawer search if any
  const filteredContributions = agentContributions.filter(c => {
    if (!historySearch.trim()) return true;
    const q = historySearch.toLowerCase().trim();
    return (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.issueTitle.toLowerCase().includes(q) ||
      `#${c.issueNumber}`.includes(q) ||
      c.type.toLowerCase().includes(q)
    );
  });

  // Unique issues worked on by this agent
  const workedIssuesMap = new Map();
  agentContributions.forEach(c => {
    if (!workedIssuesMap.has(c.issueId)) {
      workedIssuesMap.set(c.issueId, {
        issueId: c.issueId,
        issueNumber: c.issueNumber,
        issueTitle: c.issueTitle,
        types: new Set([c.type]),
        pointsSum: c.pointsAwarded,
        latestTimestamp: c.timestamp
      });
    } else {
      const existing = workedIssuesMap.get(c.issueId);
      existing.types.add(c.type);
      existing.pointsSum += c.pointsAwarded;
      if (new Date(c.timestamp) > new Date(existing.latestTimestamp)) {
        existing.latestTimestamp = c.timestamp;
      }
    }
  });
  const workedIssues = Array.from(workedIssuesMap.values());

  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'working':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--ziki-blue-soft)', color: 'var(--ziki-blue)', padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '999px', backgroundColor: 'var(--ziki-blue)' }} className="animate-pulse-slow" />
            Working
          </span>
        );
      case 'online':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--mint-soft)', color: 'var(--mint-text)', padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
            <Radio size={12} />
            Online
          </span>
        );
      case 'idle':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--amber-soft)', color: 'var(--amber-text)', padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
            <Coffee size={12} />
            Idle
          </span>
        );
      case 'offline':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'var(--slate-soft)', color: 'var(--slate-text)', padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
            <Power size={11} />
            Offline
          </span>
        );
    }
  };

  const getContributionTypeBadge = (type: ContributionType) => {
    switch (type) {
      case 'solver_fix':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ziki-blue)', backgroundColor: 'var(--ziki-blue-soft)', padding: '2px 7px', borderRadius: '4px' }}>
            Solver Fix
          </span>
        );
      case 'independent_review':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ziki-blue)', backgroundColor: 'var(--ziki-blue-soft)', padding: '2px 7px', borderRadius: '4px' }}>
            Test Verdict
          </span>
        );
      case 'confirming_review':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--mint-text)', backgroundColor: 'var(--mint-soft)', padding: '2px 7px', borderRadius: '4px' }}>
            Confirming Review
          </span>
        );
      case 'triager_clearance':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--amber-text)', backgroundColor: 'var(--amber-soft)', padding: '2px 7px', borderRadius: '4px' }}>
            Triage Clearance
          </span>
        );
      case 'triager_duplicate':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--amber-text)', backgroundColor: 'var(--amber-soft)', padding: '2px 7px', borderRadius: '4px' }}>
            Duplicate Match
          </span>
        );
      case 'issue_report':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--mint-text)', backgroundColor: 'var(--mint-soft)', padding: '2px 7px', borderRadius: '4px' }}>
            Bug Report
          </span>
        );
      default:
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', backgroundColor: 'var(--bg-surface-elevated)', padding: '2px 7px', borderRadius: '4px' }}>
            {type}
          </span>
        );
    }
  };

  const getVerificationStatusBadge = (status: VerificationStatus, points: number, potential: number) => {
    switch (status) {
      case 'verified':
        return (
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--mint-text)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={13} />
            Verified (+{points} pts)
          </span>
        );
      case 'pending':
        return (
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--amber-text)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} />
            Pending ({potential} pts potential)
          </span>
        );
      case 'rejected':
        return (
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--rose-400)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <X size={13} />
            Rejected (0 pts)
          </span>
        );
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={() => setSelectedAgentId(null)}
    >
      <aside
        id="agent-details-drawer"
        style={{
          width: '100%',
          maxWidth: '740px',
          backgroundColor: 'var(--bg-surface)',
          height: '100%',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid var(--border-default)',
          overflowY: 'auto'
        }}
        className="animate-drawer-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header with Back Navigation */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface-elevated)',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          {/* Obvious Back Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <button
              onClick={() => setSelectedAgentId(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--ziki-blue)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '4px 0'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to AI Agents</span>
            </button>

            <button
              onClick={() => setSelectedAgentId(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex'
              }}
              aria-label="Close details"
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--ziki-blue)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 800
                }}
              >
                {agent.shortCode}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {agent.name}
                  </h2>
                  {getStatusBadge(agent.status)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{agent.id}</span>
                  <span>·</span>
                  <span>Level: <strong>{agent.level}</strong></span>
                  <span>·</span>
                  <span>Model: {agent.model}</span>
                </div>
              </div>
            </div>

            {/* Quick Status Toggle in Header */}
            <button
              onClick={() => toggleAgentStatus(agent.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: agent.status === 'offline' ? 'var(--mint-soft)' : 'var(--bg-surface)',
                color: agent.status === 'offline' ? 'var(--mint-text)' : 'var(--text-secondary)',
                border: '1px solid var(--border-default)',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0
              }}
              title="Toggle agent status between online and offline"
            >
              <Power size={12} />
              <span>{agent.status === 'offline' ? 'Set Online' : 'Set Offline'}</span>
            </button>
          </div>
        </div>

        {/* Offline Notice Banner */}
        {agent.status === 'offline' && (
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--slate-soft)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}
          >
            <Info size={16} color="var(--slate-500)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Agent is Offline:</strong> All {agent.lifetimePoints.toLocaleString()} lifetime points, completed issues, and {agentContributions.length} contribution logs remain permanently preserved in Ziki's append-only ledger.
            </span>
          </div>
        )}

        {/* Drawer Content Body */}
        <div style={{ padding: '24px', flex: 1 }}>
          {/* Summary Stat Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginBottom: '24px'
            }}
          >
            <div style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Lifetime Points</span>
              <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--ziki-blue)' }}>
                {agent.lifetimePoints.toLocaleString()}
              </span>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>{dateRange.label}</span>
              <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {agent.periodPoints.toLocaleString()}
              </span>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Verified Work</span>
              <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--mint-text)' }}>
                {agent.verifiedCount}
              </span>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>Issues Completed</span>
              <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {agent.completedIssuesCount}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '20px'
            }}
          >
            <button
              onClick={() => setActiveTab('history')}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 14px',
                borderBottom: activeTab === 'history' ? '2px solid var(--ziki-blue)' : '2px solid transparent',
                color: activeTab === 'history' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Contribution History ({agentContributions.length})
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 14px',
                borderBottom: activeTab === 'issues' ? '2px solid var(--ziki-blue)' : '2px solid transparent',
                color: activeTab === 'issues' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Issues Worked On ({workedIssues.length})
            </button>
            <button
              onClick={() => setActiveTab('standing_brief')}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 14px',
                borderBottom: activeTab === 'standing_brief' ? '2px solid var(--ziki-blue)' : '2px solid transparent',
                color: activeTab === 'standing_brief' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Identity & Standing Brief
            </button>
          </div>

          {/* TAB 1: Contribution History */}
          {activeTab === 'history' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}
              >
                <div style={{ position: 'relative', width: '280px' }}>
                  <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search this agent's history..."
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      borderRadius: '6px',
                      padding: '6px 10px 6px 30px',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                </div>

                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Click any entry to inspect ledger proof
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredContributions.length > 0 ? (
                  filteredContributions.map((contrib) => (
                    <div
                      key={contrib.id}
                      onClick={() => setSelectedContributionId(contrib.id)}
                      style={{
                        backgroundColor: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--ziki-blue)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            {getContributionTypeBadge(contrib.type)}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIssueId(contrib.issueId);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--ziki-blue)',
                                fontWeight: 700,
                                fontSize: '13px',
                                cursor: 'pointer',
                                padding: 0
                              }}
                            >
                              Issue #{contrib.issueNumber}
                            </button>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              · {new Date(contrib.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {contrib.title}
                          </h4>
                        </div>

                        {getVerificationStatusBadge(contrib.verificationStatus, contrib.pointsAwarded, contrib.potentialPoints)}
                      </div>

                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '10px' }}>
                        {contrib.description}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--border-subtle)',
                          fontSize: '11px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                          <GitPullRequest size={12} color="var(--ziki-blue)" />
                          <span>{contrib.evidence.label}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            {contrib.ledgerSourceKey}
                          </span>

                          {contrib.verificationStatus === 'pending' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                verifyContribution(contrib.id);
                              }}
                              style={{
                                backgroundColor: 'var(--mint-500)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '3px 8px',
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              Simulate Signoff (+{contrib.potentialPoints} pts)
                            </button>
                          ) : (
                            <span style={{ color: 'var(--ziki-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                              Inspect Proof <ChevronRight size={12} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                    No contribution records match the search query.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Issues Worked On */}
          {activeTab === 'issues' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {workedIssues.map((item) => (
                <div
                  key={item.issueId}
                  onClick={() => setSelectedIssueId(item.issueId)}
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--ziki-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ziki-blue)', fontSize: '13px' }}>
                        Issue #{item.issueNumber}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Last activity {new Date(item.latestTimestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                      {item.issueTitle}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Points Earned</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--mint-text)', fontSize: '15px' }}>
                        +{item.pointsSum} pts
                      </span>
                    </div>
                    <ChevronRight size={16} color="var(--text-muted)" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Identity & Standing Brief */}
          {activeTab === 'standing_brief' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Standing Instructions (Owner Brief)
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>
                  "{agent.instructions}"
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Technical Specialties
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {agent.specialties.map(spec => (
                    <span
                      key={spec}
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        padding: '3px 9px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '16px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <div><strong>Owner:</strong> {agent.owner}</div>
                <div><strong>Paired At:</strong> {new Date(agent.pairedAt).toLocaleString()}</div>
                <div><strong>Last Activity:</strong> {new Date(agent.lastActive).toLocaleString()}</div>
                <div><strong>Ziki Agent Key:</strong> <code style={{ fontFamily: 'var(--font-mono)' }}>ziki_{agent.shortCode.toLowerCase()}...</code></div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
