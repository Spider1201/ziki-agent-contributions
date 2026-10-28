import React from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { X, CheckCircle, GitPullRequest, ExternalLink } from 'lucide-react';
import type { IssueSeverity, IssueStage } from '../types';

export const IssueModal: React.FC = () => {
  const {
    selectedIssueId,
    setSelectedIssueId,
    issues,
    agentMetrics,
    setSelectedAgentId
  } = useAgentContributions();

  if (!selectedIssueId) return null;

  const issue = issues.find(i => i.id === selectedIssueId);
  if (!issue) return null;

  const solverAgent = agentMetrics.find(a => a.id === issue.assignedSolverAgentId);

  const STAGES: { key: IssueStage; label: string; step: string }[] = [
    { key: 'reported', label: 'Report', step: '01' },
    { key: 'confirmed', label: 'Confirm', step: '02' },
    { key: 'ready', label: 'Authorize', step: '03' },
    { key: 'claimed', label: 'Claim', step: '04' },
    { key: 'delivered', label: 'Deliver', step: '05' },
    { key: 'proven', label: 'Prove', step: '06' },
    { key: 'merged', label: 'Merge', step: '07' }
  ];

  const getStageIndex = (stage: IssueStage) => {
    switch (stage) {
      case 'reported': return 0;
      case 'confirmed': return 1;
      case 'ready': return 2;
      case 'claimed': return 3;
      case 'delivered': return 4;
      case 'proven': return 5;
      case 'merged': return 6;
      default: return 0;
    }
  };

  const currentStageIdx = getStageIndex(issue.stage);

  const getSeverityBadge = (severity: IssueSeverity) => {
    switch (severity) {
      case 'critical':
        return <span style={{ backgroundColor: 'var(--rose-bg)', color: 'var(--rose-400)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 700 }}>Critical (1,800 pts)</span>;
      case 'high':
        return <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--amber-400)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 700 }}>High (1,200 pts)</span>;
      case 'medium':
        return <span style={{ backgroundColor: 'var(--ziki-blue-subtle)', color: 'var(--ziki-blue-light)', border: '1px solid rgba(57, 120, 246, 0.3)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 700 }}>Medium (750 pts)</span>;
      case 'low':
        return <span style={{ backgroundColor: 'var(--mint-bg)', color: 'var(--mint-400)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.725rem', fontWeight: 700 }}>Low (450 pts)</span>;
    }
  };

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
      onClick={() => setSelectedIssueId(null)}
    >
      <div
        id="issue-details-modal"
        style={{
          width: '100%',
          maxWidth: '720px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
        className="animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ziki-blue-light)', fontSize: '0.9rem' }}>
                ISSUE #{issue.number}
              </span>
              {getSeverityBadge(issue.severity)}
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                {issue.repo}
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {issue.title}
            </h3>
          </div>

          <button
            onClick={() => setSelectedIssueId(null)}
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

        {/* 6-Step Lifecycle Progression */}
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            overflowX: 'auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: '550px' }}>
            {STAGES.map((s, idx) => {
              const isPassed = idx <= currentStageIdx;
              const isCurrent = idx === currentStageIdx;
              return (
                <React.Fragment key={s.key}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.2rem',
                      flex: 1
                    }}
                  >
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '999px',
                        backgroundColor: isCurrent
                          ? 'var(--ziki-blue)'
                          : isPassed
                          ? 'var(--mint-500)'
                          : 'var(--bg-surface-elevated)',
                        color: isPassed ? '#FFFFFF' : 'var(--text-muted)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: isPassed ? 'none' : '1px solid var(--border-default)'
                      }}
                    >
                      {isPassed && !isCurrent ? '✓' : s.step}
                    </span>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? 'var(--text-primary)' : isPassed ? 'var(--text-secondary)' : 'var(--text-muted)'
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < STAGES.length - 1 && (
                    <div
                      style={{
                        height: '2px',
                        width: '20px',
                        backgroundColor: idx < currentStageIdx ? 'var(--mint-500)' : 'var(--border-subtle)',
                        marginTop: '-12px'
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Issue Description */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Problem Context & Reproduction
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {issue.description}
            </p>
          </div>

          {/* Assigned Solver & PR Link */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '1rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem'
            }}
          >
            <div>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>
                Assigned Solver Agent
              </span>
              {solverAgent ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    onClick={() => {
                      setSelectedIssueId(null);
                      setSelectedAgentId(solverAgent.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--ziki-blue-light)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    {solverAgent.name}
                  </button>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    ({solverAgent.model})
                  </span>
                </div>
              ) : (
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Unassigned / Community</span>
              )}
            </div>

            <div>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block' }}>
                Linked Pull Request
              </span>
              {issue.prUrl ? (
                <a
                  href={issue.prUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--ziki-blue)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    marginTop: '0.25rem'
                  }}
                >
                  <GitPullRequest size={13} />
                  <span>PR #{issue.prNumber} ({issue.branch})</span>
                  <ExternalLink size={11} />
                </a>
              ) : (
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No PR linked yet</span>
              )}
            </div>
          </div>

          {/* Independent Test Verdicts Quorum */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Independent Reviewer Verdicts ({issue.verdicts.length} of 2 required)
            </h4>
            {issue.verdicts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {issue.verdicts.map((v, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '0.75rem',
                      fontSize: '0.775rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{v.reviewerName}</strong>
                      <span style={{ color: 'var(--mint-400)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CheckCircle size={11} /> goodToMerge: true
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>"{v.notes}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Waiting for 2 independent reviewer test verdicts (`goodToMerge`).
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
