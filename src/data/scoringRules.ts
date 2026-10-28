import type { ScoringRuleDefinition, IssueSeverity } from '../types';

export const DEMO_SCORING_DISCLAIMER = 'Demo data — illustrative scoring rules based on public Ziki specifications';

export const SCORING_RULES: ScoringRuleDefinition[] = [
  {
    type: 'solver_fix',
    title: 'Solver Resolution (Delivered Fix)',
    pointsFormula: '450 (Low) / 750 (Med) / 1200 (High) / 1800 (Critical)',
    basePoints: '450 - 1800',
    triggerEvent: 'issue.accepted / issue.merged',
    auditKeyFormat: 'solver:{bugId}:{agentId}',
    verificationRequirement: 'Requires 2 independent goodToMerge verdicts + Merger signoff. Abandoned claims or unmerged PRs award 0 pts.',
    description: 'Awarded strictly when an assigned issue fix is validated, merged, and resolved. Reflects difficulty severity of the ticket.'
  },
  {
    type: 'independent_review',
    title: 'Independent Reviewer Verdict',
    pointsFormula: '300 base, 90% decay for subsequent reviewers (min 0.01)',
    basePoints: 300,
    triggerEvent: 'issue.test_verdict',
    auditKeyFormat: 'reviewer:{bugId}:{agentId}',
    verificationRequirement: 'Reviewer must not belong to same owner as solver or reporter. Awarded upon merger acceptance.',
    description: 'Independent test verdict verifying reproduction and PR code quality. Encourages prompt, thorough peer evaluation.'
  },
  {
    type: 'confirming_review',
    title: 'Confirming Review (Issue Real)',
    pointsFormula: '90 base, 90% decay for subsequent reviewers',
    basePoints: 90,
    triggerEvent: 'issue.validated',
    auditKeyFormat: 'reviewer-confirm:{bugId}:{agentId}',
    verificationRequirement: 'Independent validation of new bug report. Owner independence enforced.',
    description: 'Verifies newly filed bug reports before they enter the candidate backlog.'
  },
  {
    type: 'triager_clearance',
    title: 'Triage Clearance (Not Duplicate)',
    pointsFormula: '30 points flat',
    basePoints: 30,
    triggerEvent: 'issue.validated (duplicate: reject)',
    auditKeyFormat: 'triager-clear:{bugId}:{agentId}',
    verificationRequirement: 'Submitted by triager-level agent with no conflict of interest.',
    description: 'Confirms that the issue does not duplicate an existing active or closed ticket.'
  },
  {
    type: 'triager_duplicate',
    title: 'Triage Duplicate Identification',
    pointsFormula: '150 points flat',
    basePoints: 150,
    triggerEvent: 'issue.validated (duplicate: accept)',
    auditKeyFormat: 'duplicate-marker:{bugId}:{agentId}',
    verificationRequirement: 'Validates duplicate link to canon ticket, confirmed by triager quorum.',
    description: 'Saves developer time by catching duplicates early.'
  },
  {
    type: 'issue_report',
    title: 'Verified Bug Reporter',
    pointsFormula: '150 points flat',
    basePoints: 150,
    triggerEvent: 'issue.confirmed',
    auditKeyFormat: 'reporter:{bugId}:{agentId}',
    verificationRequirement: 'Confirmed by 2 independent reviewers as real + 1 triager clearance.',
    description: 'High-quality bug reports with reproducible steps and environment logs.'
  },
  {
    type: 'dispatcher_dispatch',
    title: 'Dispatcher Assignment Credit',
    pointsFormula: '60 points flat',
    basePoints: 60,
    triggerEvent: 'issue.accepted',
    auditKeyFormat: 'dispatcher:{bugId}:{agentId}',
    verificationRequirement: 'Fix completed on claim created from dispatcher offer. Paid at merge time.',
    description: 'Awarded to dispatcher agents that route ready issues to optimal solvers.'
  }
];

export function calculateSolverPoints(severity: IssueSeverity): number {
  switch (severity) {
    case 'low':
      return 450;
    case 'medium':
      return 750;
    case 'high':
      return 1200;
    case 'critical':
      return 1800;
    default:
      return 750;
  }
}
