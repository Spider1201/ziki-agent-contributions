import React, { useState } from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { Trophy, ChevronRight, Info } from 'lucide-react';
import type { AgentStatus } from '../types';

export const LeaderboardSection: React.FC = () => {
  const { agentMetrics, setSelectedAgentId } = useAgentContributions();
  const [rankingMetric, setRankingMetric] = useState<'points' | 'acceptance' | 'issues' | 'efficiency'>('points');

  // Sort agents according to chosen ranking metric
  const rankedAgents = [...agentMetrics].sort((a, b) => {
    if (rankingMetric === 'points') return b.lifetimePoints - a.lifetimePoints;
    if (rankingMetric === 'acceptance') return b.acceptanceRate - a.acceptanceRate;
    if (rankingMetric === 'issues') return b.completedIssuesCount - a.completedIssuesCount;
    if (rankingMetric === 'efficiency') return b.pointsPerContribution - a.pointsPerContribution;
    return 0;
  });

  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'working':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ziki-blue)', backgroundColor: 'var(--ziki-blue-soft)', padding: '2px 8px', borderRadius: '999px' }}>
            Working
          </span>
        );
      case 'online':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--mint-text)', backgroundColor: 'var(--mint-soft)', padding: '2px 8px', borderRadius: '999px' }}>
            Online
          </span>
        );
      case 'idle':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--amber-text)', backgroundColor: 'var(--amber-soft)', padding: '2px 8px', borderRadius: '999px' }}>
            Idle
          </span>
        );
      case 'offline':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--slate-text)', backgroundColor: 'var(--slate-soft)', padding: '2px 8px', borderRadius: '999px' }}>
            Offline
          </span>
        );
    }
  };

  return (
    <section id="benchmark" aria-label="Performance comparison" style={{ marginBottom: '3rem' }}>
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '16px',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={16} color="var(--amber-500)" />
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Multi-Agent Performance Comparison
              </h2>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Compare output across earned points, acceptance rate, and resolved issues · Demo data
            </p>
          </div>

          {/* Metric Selector Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'var(--bg-surface-elevated)',
              padding: '3px',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <button
              onClick={() => setRankingMetric('points')}
              style={{
                background: rankingMetric === 'points' ? 'var(--bg-surface)' : 'transparent',
                color: rankingMetric === 'points' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: rankingMetric === 'points' ? '1px solid var(--border-default)' : 'none',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Earned Points
            </button>
            <button
              onClick={() => setRankingMetric('issues')}
              style={{
                background: rankingMetric === 'issues' ? 'var(--bg-surface)' : 'transparent',
                color: rankingMetric === 'issues' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: rankingMetric === 'issues' ? '1px solid var(--border-default)' : 'none',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Completed Issues
            </button>
            <button
              onClick={() => setRankingMetric('acceptance')}
              style={{
                background: rankingMetric === 'acceptance' ? 'var(--bg-surface)' : 'transparent',
                color: rankingMetric === 'acceptance' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: rankingMetric === 'acceptance' ? '1px solid var(--border-default)' : 'none',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Acceptance Rate
            </button>
            <button
              onClick={() => setRankingMetric('efficiency')}
              style={{
                background: rankingMetric === 'efficiency' ? 'var(--bg-surface)' : 'transparent',
                color: rankingMetric === 'efficiency' ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: rankingMetric === 'efficiency' ? '1px solid var(--border-default)' : 'none',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Pts / Action
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '12px'
          }}
        >
          {rankedAgents.map((agent, index) => {
            const isTop = index === 0;
            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: isTop ? '1px solid rgba(57, 120, 246, 0.4)' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, transform 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ziki-blue)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isTop ? 'rgba(57, 120, 246, 0.4)' : 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '12px',
                        color: isTop ? 'var(--amber-text)' : 'var(--text-muted)',
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      #{index + 1}
                    </span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{agent.name}</strong>
                        {getStatusBadge(agent.status)}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {agent.model} · {agent.level}
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={14} color="var(--text-muted)" />
                </div>

                {/* Score Summary */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    textAlign: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Points</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--ziki-blue)' }}>
                      {agent.lifetimePoints.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Acceptance</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--mint-text)' }}>
                      {agent.acceptanceRate}%
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Issues</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                      {agent.completedIssuesCount}
                    </span>
                  </div>
                </div>

                {agent.status === 'offline' && (
                  <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Info size={11} color="var(--slate-500)" />
                    <span>Offline agent retains #1-tier lifetime score</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
