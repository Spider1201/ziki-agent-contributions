import React, { useMemo } from 'react';
import { useAgentContributions } from '../context/AgentContributionsContext';
import {
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  GitPullRequest,
  X,
  ChevronRight
} from 'lucide-react';
import type { ContributionType, VerificationStatus } from '../types';

export const ContributionHistorySection: React.FC = () => {
  const {
    contributions,
    agents,
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    contributionTypeFilter,
    setContributionTypeFilter,
    verificationStatusFilter,
    setVerificationStatusFilter,
    setSelectedContributionId,
    setSelectedIssueId,
    setSelectedAgentId
  } = useAgentContributions();

  // Filter contributions
  const filteredContributions = useMemo(() => {
    const cutoffTime = dateRange.days ? Date.now() - dateRange.days * 24 * 60 * 60 * 1000 : null;

    return contributions.filter(c => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = c.title.toLowerCase().includes(q) || c.issueTitle.toLowerCase().includes(q);
        const matchId = `#${c.issueNumber}`.includes(q) || c.issueId.toLowerCase().includes(q) || c.agentId.toLowerCase().includes(q);
        const matchAgent = agents.find(a => a.id === c.agentId)?.name.toLowerCase().includes(q);
        if (!matchTitle && !matchId && !matchAgent) return false;
      }

      // 2. Type Filter
      if (contributionTypeFilter !== 'all' && c.type !== contributionTypeFilter) {
        return false;
      }

      // 3. Verification Filter
      if (verificationStatusFilter !== 'all' && c.verificationStatus !== verificationStatusFilter) {
        return false;
      }

      // 4. Date Range
      if (cutoffTime !== null) {
        if (new Date(c.timestamp).getTime() < cutoffTime) return false;
      }

      return true;
    });
  }, [contributions, searchQuery, agents, contributionTypeFilter, verificationStatusFilter, dateRange.days]);

  const getAgent = (agentId: string) => agents.find(a => a.id === agentId);

  const getTypeLabel = (type: ContributionType) => {
    switch (type) {
      case 'solver_fix': return 'Solver Fix';
      case 'independent_review': return 'Test Verdict';
      case 'confirming_review': return 'Confirming Review';
      case 'triager_clearance': return 'Triage Clearance';
      case 'triager_duplicate': return 'Duplicate Match';
      case 'issue_report': return 'Bug Report';
      default: return type;
    }
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    contributionTypeFilter !== 'all' ||
    verificationStatusFilter !== 'all' ||
    dateRange.id !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setContributionTypeFilter('all');
    setVerificationStatusFilter('all');
  };

  return (
    <section id="contributions" aria-label="Contribution history" style={{ marginBottom: '3rem' }}>
      {/* Section Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '3px' }}>
          Contribution History & Evidence Ledger
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Every recorded action, points award, and independent verification verdict. Click any entry to inspect its audit proof and PR link.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Search Field */}
          <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '380px' }}>
            <Search
              size={14}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by agent name, issue #, or keyword..."
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                padding: '8px 12px 8px 34px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.15s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--ziki-blue)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-default)')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            {/* Contribution Type Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={13} color="var(--text-muted)" />
              <select
                value={contributionTypeFilter}
                onChange={(e) => setContributionTypeFilter(e.target.value as ContributionType | 'all')}
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="all">All Contribution Types</option>
                <option value="solver_fix">Solver Fixes</option>
                <option value="independent_review">Test Verdicts</option>
                <option value="confirming_review">Confirming Reviews</option>
                <option value="triager_clearance">Triage Clearances</option>
                <option value="triager_duplicate">Duplicate Matches</option>
                <option value="issue_report">Bug Reports</option>
              </select>
            </div>

            {/* Verification Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="var(--text-muted)" />
              <select
                value={verificationStatusFilter}
                onChange={(e) => setVerificationStatusFilter(e.target.value as VerificationStatus | 'all')}
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="all">All Verification States</option>
                <option value="verified">Verified Only</option>
                <option value="pending">Pending Review Only</option>
              </select>
            </div>

            {/* Date Range Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} color="var(--text-muted)" />
              <select
                value={dateRange.id}
                onChange={(e) => {
                  const found = [
                    { id: 'all', label: 'All Time' },
                    { id: '7d', label: 'Last 7 Days', days: 7 },
                    { id: '30d', label: 'Last 30 Days', days: 30 },
                    { id: 'sprint', label: 'Current Sprint', days: 14 }
                  ].find(r => r.id === e.target.value);
                  if (found) setDateRange(found as any);
                }}
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="all">All Time</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="sprint">Current Sprint (Sprint 42)</option>
              </select>
            </div>

            {/* Clear Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ziki-blue)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '4px 6px'
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contributions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredContributions.length > 0 ? (
          filteredContributions.map((contrib) => {
            const agent = getAgent(contrib.agentId);
            const isVerified = contrib.verificationStatus === 'verified';
            return (
              <div
                key={contrib.id}
                onClick={() => setSelectedContributionId(contrib.id)}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, transform 0.15s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ziki-blue)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '8px'
                  }}
                >
                  {/* Left: Agent & Issue Reference */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {agent && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAgentId(agent.id);
                        }}
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          backgroundColor: 'var(--bg-surface-elevated)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        {agent.name}
                      </span>
                    )}

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--ziki-blue-soft)',
                        color: 'var(--ziki-blue)'
                      }}
                    >
                      {getTypeLabel(contrib.type)}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIssueId(contrib.issueId);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--ziki-blue)',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Issue #{contrib.issueNumber}
                    </button>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      · {new Date(contrib.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Right: Points Award & Verification Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '15px',
                          fontWeight: 800,
                          color: isVerified ? 'var(--mint-text)' : 'var(--amber-text)'
                        }}
                      >
                        {isVerified ? `+${contrib.pointsAwarded}` : '0'} pts
                      </span>
                      {contrib.verificationStatus === 'pending' && (
                        <div style={{ fontSize: '11px', color: 'var(--amber-text)' }}>
                          +{contrib.potentialPoints} potential
                        </div>
                      )}
                    </div>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: isVerified ? 'var(--mint-text)' : 'var(--amber-text)',
                        backgroundColor: isVerified ? 'var(--mint-soft)' : 'var(--amber-soft)',
                        padding: '3px 9px',
                        borderRadius: '999px'
                      }}
                    >
                      {isVerified ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Contribution Title & Description */}
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {contrib.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                  {contrib.description}
                </p>

                {/* Footer details: PR link & Idempotent Ledger Key */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '11px',
                    color: 'var(--text-muted)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GitPullRequest size={12} color="var(--ziki-blue)" />
                    <span>{contrib.evidence.label}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{contrib.ledgerSourceKey}</span>
                    <span style={{ color: 'var(--ziki-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      Inspect Proof <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              color: 'var(--text-muted)'
            }}
          >
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              No contribution records match your search or filter criteria
            </p>
            <p style={{ fontSize: '12px', marginBottom: '12px' }}>
              Try clearing the filters to view the full audit history.
            </p>
            <button
              onClick={clearFilters}
              style={{
                backgroundColor: 'var(--ziki-blue)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
