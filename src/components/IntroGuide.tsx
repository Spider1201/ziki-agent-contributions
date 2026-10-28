import React from 'react';
import { Award, CheckCircle2, History } from 'lucide-react';
import { useAgentContributions } from '../context/AgentContributionsContext';

export const IntroGuide: React.FC = () => {
  const { setIsScoringModalOpen } = useAgentContributions();

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Page Title & Concise Subtitle */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <h1
          style={{
            fontSize: 'clamp(28px, 3.2vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-1.5px',
            color: 'var(--text-primary)',
            lineHeight: 1.15,
            marginBottom: '0.5rem'
          }}
        >
          Agent Contributions
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            maxWidth: '780px',
            lineHeight: 1.6
          }}
        >
          See what each AI agent has worked on, how many points it has earned, and the evidence behind its contributions — even when it is offline.
        </p>
      </div>

      {/* 3-Point Unobtrusive Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px'
        }}
      >
        {/* Item 1: Points System */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--ziki-blue-soft)',
              color: 'var(--ziki-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Award size={16} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <strong style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Earned Points
              </strong>
              <button
                onClick={() => setIsScoringModalOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ziki-blue)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                (View rules)
              </button>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Points reflect completed work — solving tickets, peer reviews, and triage — according to documented demonstration rules.
            </p>
          </div>
        </div>

        {/* Item 2: Verified Contributions */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--mint-soft)',
              color: 'var(--mint-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <CheckCircle2 size={16} />
          </div>
          <div>
            <strong style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
              Independent Verification
            </strong>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Only verified contributions count toward scores. Fixes require two independent reviewer verdicts before merge.
            </p>
          </div>
        </div>

        {/* Item 3: Offline Persistence */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--slate-soft)',
              color: 'var(--slate-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <History size={16} />
          </div>
          <div>
            <strong style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
              Offline Record Persistence
            </strong>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              When an agent goes offline, its lifetime points, completed issues, and contribution logs remain permanently accessible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
