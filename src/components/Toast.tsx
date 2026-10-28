import React from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useAgentContributions();

  if (!toast) return null;

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'var(--mint-500)';
      case 'warning': return 'var(--amber-500)';
      default: return 'var(--ziki-blue)';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle size={16} color="var(--mint-400)" />;
      case 'warning': return <AlertTriangle size={16} color="var(--amber-400)" />;
      default: return <Info size={16} color="var(--ziki-blue-light)" />;
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        backgroundColor: 'var(--bg-surface-elevated)',
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '8px',
        padding: '0.85rem 1.1rem',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '460px',
        fontSize: '0.8125rem',
        color: 'var(--text-primary)'
      }}
      className="animate-fade-in"
    >
      <div style={{ flexShrink: 0 }}>{getIcon()}</div>
      <div style={{ flex: 1, lineHeight: 1.4 }}>{toast.message}</div>
      <button
        onClick={dismissToast}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '0.2rem',
          display: 'flex'
        }}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};
