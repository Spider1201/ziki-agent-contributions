import React from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { X, Award, Hash } from 'lucide-react';

export const ContributionModal: React.FC = () => {
  const {
    selectedContributionId,
    setSelectedContributionId,
    contributions,
    agentMetrics,
    setSelectedIssueId,
    verifyContribution
  } = useAgentContributions();

  if (!selectedContributionId) return null;

  const contribution = contributions.find(c => c.id === selectedContributionId);
  if (!contribution) return null;

  const agent = agentMetrics.find(a => a.id === contribution.agentId);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(3px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={() => setSelectedContributionId(null)}
    >
      <div
        id="contribution-audit-modal"
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--ziki-blue-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Award size={18} color="var(--ziki-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Contribution Audit & Ledger Proof
              </h3>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {contribution.id}
              </span>
            </div>
          </div>

          <button
            onClick={() => setSelectedContributionId(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Main Title & Issue Reference */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <button
                onClick={() => {
                  setSelectedContributionId(null);
                  setSelectedIssueId(contribution.issueId);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ziki-blue-light)',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Issue #{contribution.issueNumber}: {contribution.issueTitle}
              </button>
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.35 }}>
              {contribution.title}
            </h4>
          </div>

          {/* Points Breakdown Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Reward Awarded
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: contribution.verificationStatus === 'verified' ? 'var(--mint-400)' : 'var(--amber-400)' }}>
                  {contribution.verificationStatus === 'verified' ? `+${contribution.pointsAwarded}` : '0'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  pts {contribution.verificationStatus === 'pending' && `(${contribution.potentialPoints} pending verification)`}
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Verification Gate
              </span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: contribution.verificationStatus === 'verified' ? 'var(--mint-400)' : 'var(--amber-400)' }}>
                {contribution.verificationStatus === 'verified' ? 'Passed Independent Gate' : 'Pending Review'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
              Contribution Summary & Action
            </span>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {contribution.description}
            </p>
          </div>

          {/* Ledger Key & Verification Proof */}
          <div style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '0.85rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
              <Hash size={12} color="var(--ziki-blue)" />
              Append-Only Ledger Key (Idempotent)
            </span>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ziki-blue-light)', wordBreak: 'break-all', display: 'block' }}>
              {contribution.ledgerSourceKey}
            </code>
            <div style={{ marginTop: '0.5rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              Attributed to: <strong>{agent?.name}</strong> ({agent?.model}) · Timestamp: {new Date(contribution.timestamp).toUTCString()}
            </div>
          </div>

          {/* Code or Evidence Diff */}
          {contribution.evidence.codeSnippet && (
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                Code Artifact / Snapshot
              </span>
              <pre
                style={{
                  backgroundColor: '#050811',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  fontSize: '0.725rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  overflowX: 'auto',
                  lineHeight: 1.45
                }}
              >
                {contribution.evidence.codeSnippet}
              </pre>
            </div>
          )}

          {/* Pending Verification Action */}
          {contribution.verificationStatus === 'pending' && (
            <div
              style={{
                backgroundColor: 'var(--amber-bg)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--amber-400)' }}>
                <strong>Work submitted:</strong> Waiting for 2 independent reviewer test verdicts before points are written to ledger.
              </div>
              <button
                onClick={() => {
                  verifyContribution(contribution.id);
                  setSelectedContributionId(null);
                }}
                style={{
                  backgroundColor: 'var(--mint-500)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Simulate Signoff (+{contribution.potentialPoints} pts)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
