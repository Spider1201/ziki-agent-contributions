import React, { useState } from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { X, Play, Sparkles, Info } from 'lucide-react';
import type { ContributionType } from '../types';

export const SimulationModal: React.FC = () => {
  const {
    isSimulationModalOpen,
    setIsSimulationModalOpen,
    agents,
    issues,
    simulateContribution
  } = useAgentContributions();

  const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id || 'agent_a3');
  const [selectedIssueId, setSelectedIssueId] = useState(issues[0]?.id || 'issue_104');
  const [contributionType, setContributionType] = useState<ContributionType>('solver_fix');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [immediateVerify, setImmediateVerify] = useState(true);

  if (!isSimulationModalOpen) return null;

  const currentIssue = issues.find(i => i.id === selectedIssueId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalTitle = title.trim() || getDefaultTitle(contributionType, currentIssue?.number || 104);
    const finalDescription = description.trim() || `Autonomous action simulated via demo runner. Meets verification gate standards.`;

    simulateContribution({
      agentId: selectedAgentId,
      issueId: selectedIssueId,
      type: contributionType,
      title: finalTitle,
      description: finalDescription,
      severity: currentIssue?.severity || 'medium',
      immediateVerify
    });

    setIsSimulationModalOpen(false);
  };

  const getDefaultTitle = (type: ContributionType, issueNum: number) => {
    switch (type) {
      case 'solver_fix': return `Delivered patch & regression unit tests for Issue #${issueNum}`;
      case 'independent_review': return `Executed reproduction test suite (goodToMerge signoff) for Issue #${issueNum}`;
      case 'confirming_review': return `Validated initial bug report as reproducible for Issue #${issueNum}`;
      case 'triager_clearance': return `Cleared duplicate check against backlog for Issue #${issueNum}`;
      case 'triager_duplicate': return `Identified canonical duplicate match for Issue #${issueNum}`;
      case 'issue_report': return `Filed verified bug report with reproduction trace for Issue #${issueNum}`;
      default: return `Recorded contribution for Issue #${issueNum}`;
    }
  };

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
      onClick={() => setIsSimulationModalOpen(false)}
    >
      <div
        id="simulation-modal"
        style={{
          width: '100%',
          maxWidth: '560px',
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
              <Play size={16} color="var(--ziki-blue)" fill="var(--ziki-blue)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Simulate Agent Contribution
              </h3>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                Demonstration tool · Updates append-only ledger and dashboard metrics
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSimulationModalOpen(false)}
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

        {/* Demo Disclaimer */}
        <div
          style={{
            padding: '0.65rem 1.25rem',
            backgroundColor: 'rgba(57, 120, 246, 0.08)',
            borderBottom: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            color: 'var(--ziki-blue-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Info size={13} />
          <span>Demo only — does not execute code against production Ziki repositories.</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Select Agent */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Select Performing Agent
            </label>
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
                padding: '0.5rem',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                outline: 'none'
              }}
            >
              {agents.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.level}) · Status: {a.status.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Select Issue */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Select Target Issue
            </label>
            <select
              value={selectedIssueId}
              onChange={(e) => setSelectedIssueId(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
                padding: '0.5rem',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                outline: 'none'
              }}
            >
              {issues.map(i => (
                <option key={i.id} value={i.id}>
                  #{i.number} - {i.title.slice(0, 48)}... ({i.severity.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Select Contribution Type */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Contribution Type (Action)
            </label>
            <select
              value={contributionType}
              onChange={(e) => setContributionType(e.target.value as ContributionType)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
                padding: '0.5rem',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                outline: 'none'
              }}
            >
              <option value="solver_fix">Deliver Solver Fix (+450 to +1800 pts by severity)</option>
              <option value="independent_review">Submit Independent Test Verdict (+300 pts)</option>
              <option value="confirming_review">Confirm Issue Report Real (+90 pts)</option>
              <option value="triager_clearance">Triage Duplicate Clearance (+30 pts)</option>
              <option value="triager_duplicate">Triage Duplicate Identified (+150 pts)</option>
              <option value="issue_report">File Verified Bug Report (+150 pts)</option>
            </select>
          </div>

          {/* Custom Description (Optional) */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Action Summary (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Leave empty to use default descriptive title..."
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
                padding: '0.5rem',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Description Details */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Technical Details / Evidence Notes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes or details for the audit log..."
              rows={2}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
                padding: '0.5rem',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Immediate Verification Toggle */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <input
              type="checkbox"
              id="immediate-verify-check"
              checked={immediateVerify}
              onChange={(e) => setImmediateVerify(e.target.checked)}
              style={{ cursor: 'pointer', width: '16px', height: '16px' }}
            />
            <label htmlFor="immediate-verify-check" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <strong>Simulate immediate verification</strong> (award points immediately). If unchecked, contribution remains <em>Pending</em> with 0 pts until verified.
            </label>
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsSimulationModalOpen(false)}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.5rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="confirm-simulation-btn"
              style={{
                backgroundColor: 'var(--ziki-blue)',
                border: 'none',
                color: '#FFFFFF',
                padding: '0.5rem 1.1rem',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Sparkles size={14} />
              <span>Record & Update Ledger</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
