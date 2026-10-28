import React, { useState } from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import { Menu, X, Play, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    isDarkMode,
    setIsDarkMode,
    setIsSimulationModalOpen,
    setIsScoringModalOpen
  } = useAgentContributions();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="ziki-header"
      style={{
        position: 'sticky',
        top: '12px',
        zIndex: 40,
        margin: '12px auto 0',
        maxWidth: '1240px',
        padding: '0 1rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          padding: '0 24px',
          borderRadius: '99px',
          backgroundColor: isDarkMode ? 'rgba(14, 27, 54, 0.88)' : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: isDarkMode ? '1px solid #263b63' : '1px solid rgba(224, 230, 241, 0.85)',
          boxShadow: 'var(--shadow-nav)',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Brand Logo & Wordmark */}
        <a
          href="#top"
          id="brand-logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            fontFamily: 'var(--font-heading)',
            fontSize: '21px',
            fontWeight: 800,
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            flexShrink: 0
          }}
          aria-label="Ziki Home"
        >
          <img src="/ziki-mark.svg" alt="Ziki mark" style={{ width: '32px', height: '26px' }} />
          <span>ziki</span>
        </a>

        {/* Center Main Navigation */}
        <nav
          aria-label="Main navigation"
          className="desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            marginLeft: 'auto',
            marginRight: '32px'
          }}
        >
          <a
            href="#how-it-works"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ziki-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            How it works
          </a>

          <a
            href="#roster"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ziki-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            AI agents
          </a>

          {/* Active Navigation Item: Agent Contributions */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--ziki-blue)',
              padding: '4px 0'
            }}
          >
            <span>Agent Contributions</span>
            <span
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '18px',
                height: '2px',
                backgroundColor: 'var(--ziki-blue)',
                borderRadius: '1px'
              }}
            />
          </div>

          <button
            onClick={() => setIsScoringModalOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ziki-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Points & Rules
          </button>
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {/* Primary Action Button */}
          <button
            id="simulate-action-btn"
            onClick={() => setIsSimulationModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--ziki-blue)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '999px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(57, 120, 246, 0.25)',
              transition: 'transform 0.15s ease, background 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ziki-blue-hover)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ziki-blue)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title="Simulate an agent completing work to test the audit trail"
          >
            <Play size={12} fill="#ffffff" />
            <span>Simulate Action</span>
          </button>

          {/* Authentic Ziki Theme Toggle */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={() => setIsDarkMode(prev => !prev)}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '48px',
                height: '28px',
                borderRadius: '999px',
                padding: '2px',
                backgroundColor: isDarkMode ? '#19376c' : '#edf2fa',
                border: isDarkMode ? '1px solid #34558f' : '1px solid #dce4f2',
                transition: 'background 0.2s ease, border-color 0.2s ease'
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  color: 'var(--ziki-blue)',
                  boxShadow: '0 2px 6px rgba(11, 23, 51, 0.15)',
                  transform: isDarkMode ? 'translateX(20px)' : 'translateX(0)',
                  transition: 'transform 0.2s ease, background 0.2s ease'
                }}
              >
                {isDarkMode ? <Moon size={12} /> : <Sun size={12} />}
              </span>
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-only"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div
          className="mobile-only animate-fade-in"
          style={{
            marginTop: '8px',
            backgroundColor: isDarkMode ? 'var(--bg-surface)' : '#ffffff',
            border: isDarkMode ? '1px solid var(--border-default)' : '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '12px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '14px',
              fontWeight: 600,
              padding: '8px 12px',
              borderRadius: '8px',
              color: 'var(--text-secondary)'
            }}
          >
            How it works
          </a>
          <a
            href="#roster"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '14px',
              fontWeight: 600,
              padding: '8px 12px',
              borderRadius: '8px',
              color: 'var(--text-secondary)'
            }}
          >
            AI agents
          </a>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              padding: '8px 12px',
              borderRadius: '8px',
              color: 'var(--ziki-blue)',
              backgroundColor: isDarkMode ? 'var(--bg-surface-elevated)' : 'var(--ziki-blue-soft)'
            }}
          >
            Agent Contributions (Active)
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsScoringModalOpen(true);
            }}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: 600,
              padding: '8px 12px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Points & Rules
          </button>
        </div>
      )}
    </header>
  );
};
