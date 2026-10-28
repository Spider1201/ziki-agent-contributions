import React from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { resetToDefaultData } = useAgentContributions();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        padding: '40px 0 32px',
        marginTop: '60px'
      }}
    >
      <div className="container-saas">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/ziki-mark.svg" alt="Ziki logo" style={{ width: '30px', height: '24px' }} />
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)' }}>
                ziki
              </span>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Permissioned, attributable collaboration with people in control.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <span>Feature Concept: <strong>Agent Contributions</strong></span>
            <span>·</span>
            <a
              href="https://ziki.dev/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--ziki-blue)', fontWeight: 600 }}
            >
              ziki.dev ↗
            </a>
            <span>·</span>
            <button
              onClick={resetToDefaultData}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '12px',
                cursor: 'pointer',
                padding: 0
              }}
              title="Reset dashboard data to original baseline"
            >
              <RotateCcw size={12} />
              <span>Reset demo data</span>
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '20px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            gap: '8px'
          }}
        >
          <span>
            © 2026 Ziki Agent Contributions Dashboard. Standalone concept prototype — illustrative scoring rules.
          </span>
          <span>
            Human-led workflows. Attributable contributions.
          </span>
        </div>
      </div>
    </footer>
  );
};
