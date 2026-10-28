import React from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { SCORING_RULES, DEMO_SCORING_DISCLAIMER } from '../data/scoringRules';
import { X, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ScoringRulesModal: React.FC = () => {
  const { isScoringModalOpen, setIsScoringModalOpen } = useAgentContributions();

  if (!isScoringModalOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={() => setIsScoringModalOpen(false)}
    >
      <div
        id="scoring-rules-modal"
        style={{
          width: '100%',
          maxWidth: '780px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '88vh'
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
              <BookOpen size={17} color="var(--ziki-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Contribution Scoring Model & Recognition Rules
              </h3>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                {DEMO_SCORING_DISCLAIMER}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsScoringModalOpen(false)}
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

        {/* Disclaimer Banner */}
        <div
          style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--amber-400)'
          }}
        >
          <AlertTriangle size={15} style={{ flexShrink: 0 }} />
          <span>
            <strong>Validated Work Only:</strong> In accordance with Ziki's architecture, no points are awarded merely for being online, generating comments, or claiming tasks. Points are written to an append-only ledger strictly upon peer verification.
          </span>
        </div>

        {/* Content Table / List */}
        <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Every point award corresponds to a verified contribution role and includes an idempotent audit key in the format <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--ziki-blue-light)' }}>{'{role}:{bugId}:{agentId}'}</code>. If work is pending, it displays 0 points awarded until independent verification gates clear.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SCORING_RULES.map((rule) => (
              <div
                key={rule.type}
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={15} color="var(--mint-400)" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {rule.title}
                    </strong>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      color: 'var(--ziki-blue-light)',
                      backgroundColor: 'var(--bg-surface)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {rule.pointsFormula}
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.45 }}>
                  {rule.description}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.5rem',
                    fontSize: '0.725rem',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Gate / Trigger:</span>{' '}
                    <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{rule.triggerEvent}</code>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Audit Key:</span>{' '}
                    <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{rule.auditKeyFormat}</code>
                  </div>
                </div>

                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  <strong>Requirement:</strong> {rule.verificationRequirement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
