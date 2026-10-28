import React from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import {
  Clock,
  ArrowRight,
  Power,
  Radio,
  Coffee,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import type { AgentStatus } from '../types';

const formatRelativeTime = (isoString: string) => {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 2) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

export const AgentTable: React.FC = () => {
  const {
    agentMetrics,
    setSelectedAgentId,
    toggleAgentStatus
  } = useAgentContributions();

  const renderStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'working':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--ziki-blue-soft)',
              color: 'var(--ziki-blue)',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '999px',
                backgroundColor: 'var(--ziki-blue)',
                display: 'inline-block'
              }}
              className="animate-pulse-slow"
            />
            Working
          </span>
        );
      case 'online':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'var(--mint-soft)',
              color: 'var(--mint-text)',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <Radio size={12} />
            Online
          </span>
        );
      case 'idle':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'var(--amber-soft)',
              color: 'var(--amber-text)',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <Coffee size={12} />
            Idle
          </span>
        );
      case 'offline':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'var(--slate-soft)',
              color: 'var(--slate-text)',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <Power size={11} />
            Offline
          </span>
        );
    }
  };

  const getAvatarBg = (color: string) => {
    switch (color) {
      case 'mint': return '#10b981';
      case 'blue': return '#3978f6';
      case 'violet': return '#8b5cf6';
      case 'amber': return '#f59e0b';
      default: return '#64748b';
    }
  };

  return (
    <section id="roster" aria-label="AI Agents Roster" style={{ marginBottom: '3rem' }}>
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '1rem'
        }}
      >
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '3px' }}>
            AI Agents Roster
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Persistent identities across your project. Click any agent to inspect its contribution profile and audit trail.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <Sparkles size={13} color="var(--ziki-blue)" />
          <span>Scores are immutable and preserved when an agent goes offline</span>
        </div>
      </div>

      {/* Agents Table Card */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '13px'
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderBottom: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                <th style={{ padding: '14px 20px' }}>Agent</th>
                <th style={{ padding: '14px 16px' }}>Status</th>
                <th style={{ padding: '14px 16px' }}>Points Earned</th>
                <th style={{ padding: '14px 16px' }}>Verified Contributions</th>
                <th style={{ padding: '14px 16px' }}>Last Activity</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>View Details</th>
              </tr>
            </thead>
            <tbody>
              {agentMetrics.map((agent) => {
                const isOffline = agent.status === 'offline';
                return (
                  <tr
                    key={agent.id}
                    id={`agent-row-${agent.id}`}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Agent Identity Column */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: getAvatarBg(agent.avatarColor),
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '13px',
                            flexShrink: 0
                          }}
                        >
                          {agent.shortCode}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <strong
                              style={{
                                color: 'var(--text-primary)',
                                fontSize: '14px',
                                cursor: 'pointer'
                              }}
                              onClick={() => setSelectedAgentId(agent.id)}
                            >
                              {agent.name}
                            </strong>
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                backgroundColor: 'var(--bg-surface-elevated)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-muted)'
                              }}
                            >
                              {agent.level}
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {agent.model} · <span style={{ fontFamily: 'var(--font-mono)' }}>{agent.id}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td style={{ padding: '16px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {renderStatusBadge(agent.status)}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAgentStatus(agent.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '11px',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            padding: 0
                          }}
                          title={isOffline ? "Test bringing agent online" : "Test setting agent offline"}
                        >
                          {isOffline ? 'Go online' : 'Set offline'}
                        </button>
                      </div>
                    </td>

                    {/* Points Earned Column */}
                    <td style={{ padding: '16px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '16px',
                            fontWeight: 800,
                            color: 'var(--text-primary)'
                          }}
                        >
                          {agent.lifetimePoints.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ziki-blue)' }}>
                          pts
                        </span>
                      </div>
                      {agent.pendingPoints > 0 && (
                        <div style={{ fontSize: '11px', color: 'var(--amber-text)', marginTop: '2px' }}>
                          +{agent.pendingPoints} pending review
                        </div>
                      )}
                    </td>

                    {/* Verified Contributions Column */}
                    <td style={{ padding: '16px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={14} color="var(--mint-500)" />
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          {agent.verifiedCount} verified
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          ({agent.acceptanceRate}%)
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {agent.completedIssuesCount} issues resolved
                      </div>
                    </td>

                    {/* Last Activity Column */}
                    <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={12} color="var(--text-muted)" />
                        <span>{formatRelativeTime(agent.lastActive)}</span>
                      </div>
                    </td>

                    {/* View Details Column */}
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        id={`view-details-${agent.id}`}
                        onClick={() => setSelectedAgentId(agent.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'var(--bg-surface-elevated)',
                          color: 'var(--ziki-blue)',
                          border: '1px solid var(--border-default)',
                          borderRadius: '999px',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--ziki-blue)';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)';
                          e.currentTarget.style.color = 'var(--ziki-blue)';
                        }}
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Persistence Notice in Table Footer */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: 'var(--text-muted)'
          }}
        >
          <Info size={14} color="var(--ziki-blue)" />
          <span>
            Notice <strong>Agent C2</strong> is currently <em>Offline</em>, but retains <strong>2,250 points</strong> and full historical verification records.
          </span>
        </div>
      </div>
    </section>
  );
};
