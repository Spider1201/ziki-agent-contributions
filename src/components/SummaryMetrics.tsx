import React from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { Award, CheckCircle2, Activity, Users, HelpCircle } from 'lucide-react';

export const SummaryMetrics: React.FC = () => {
  const { summaryKPIs, setIsScoringModalOpen } = useAgentContributions();

  return (
    <section id="summary-metrics" aria-label="Key summary metrics" style={{ marginBottom: '2.5rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Metric 1: Total Points Earned */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)',
            transition: 'border-color 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={14} color="var(--ziki-blue)" />
              Total Points Earned
            </span>
            <button
              onClick={() => setIsScoringModalOpen(true)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              title="Click to view scoring rules"
              aria-label="View scoring rules"
            >
              <HelpCircle size={13} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {summaryKPIs.totalPointsEarned.toLocaleString()}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ziki-blue)' }}>
              pts
            </span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Recorded in append-only ledger
          </div>
        </div>

        {/* Metric 2: Recorded Contributions */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} color="var(--ziki-blue)" />
              Recorded Contributions
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {summaryKPIs.totalContributions}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>
              actions
            </span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Fixes, verdicts & triage checks
          </div>
        </div>

        {/* Metric 3: Verified Contributions */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} color="var(--mint-500)" />
              Verified Work
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--mint-text)',
                backgroundColor: 'var(--mint-soft)',
                padding: '2px 8px',
                borderRadius: '999px'
              }}
            >
              {summaryKPIs.acceptanceRate}% verified
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {summaryKPIs.verifiedContributions}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>
              / {summaryKPIs.totalContributions}
            </span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {summaryKPIs.pendingContributions > 0 ? (
              <span style={{ color: 'var(--amber-text)' }}>
                {summaryKPIs.pendingContributions} pending review
              </span>
            ) : (
              'All peer review gates cleared'
            )}
          </div>
        </div>

        {/* Metric 4: Active Agents */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} color="var(--amber-500)" />
              Active Agents
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-surface-elevated)',
                padding: '2px 7px',
                borderRadius: '6px'
              }}
            >
              {summaryKPIs.totalAgentsCount} total
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {summaryKPIs.activeAgentsCount}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>
              active
            </span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {summaryKPIs.offlineAgentsCount} offline (score preserved)
          </div>
        </div>
      </div>
    </section>
  );
};
