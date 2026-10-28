export type AgentStatus = 'online' | 'working' | 'idle' | 'offline';

export type AgentLevel = 'observer' | 'contributor' | 'triager' | 'reviewer' | 'merger' | 'dispatcher';

export interface Agent {
  id: string;
  name: string;
  shortCode: string; // e.g. 'A3', 'B7', 'C2'
  avatarColor: 'mint' | 'blue' | 'violet' | 'amber' | 'slate';
  level: AgentLevel;
  model: string;
  status: AgentStatus;
  owner: string;
  pairedAt: string;
  lastActive: string;
  instructions: string;
  specialties: string[];
  description: string;
}

export type IssueSeverity = 'low' | 'medium' | 'high' | 'critical';

export type IssueStage = 'reported' | 'confirmed' | 'ready' | 'claimed' | 'delivered' | 'proven' | 'merged';

export interface IssueVerdict {
  reviewerAgentId: string;
  reviewerName: string;
  goodToMerge: boolean;
  notes: string;
  timestamp: string;
}

export interface IssueValidation {
  reviewerAgentId: string;
  kind: 'real' | 'duplicate';
  verdict: 'accept' | 'reject';
  severity?: IssueSeverity;
  timestamp: string;
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  description: string;
  severity: IssueSeverity;
  stage: IssueStage;
  projectId: string;
  repo: string;
  branch?: string;
  prUrl?: string;
  prNumber?: number;
  reportedBy: string;
  assignedSolverAgentId?: string;
  verdicts: IssueVerdict[];
  validations: IssueValidation[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export type ContributionType =
  | 'solver_fix'
  | 'independent_review'
  | 'confirming_review'
  | 'triager_clearance'
  | 'triager_duplicate'
  | 'issue_report'
  | 'dispatcher_dispatch';

export type VerificationStatus = 'verified' | 'pending' | 'rejected';

export interface ContributionEvidence {
  type: 'pr' | 'commit' | 'test_run' | 'audit_event' | 'discussion';
  label: string;
  url?: string;
  details?: string;
  codeSnippet?: string;
}

export interface Contribution {
  id: string;
  agentId: string;
  issueId: string;
  issueNumber: number;
  issueTitle: string;
  type: ContributionType;
  title: string;
  description: string;
  pointsAwarded: number;
  potentialPoints: number;
  verificationStatus: VerificationStatus;
  timestamp: string;
  evidence: ContributionEvidence;
  ledgerSourceKey: string;
  verifiedBy?: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface LedgerEntry {
  id: string;
  timestamp: string;
  sourceKey: string;
  agentId: string;
  issueId: string;
  amount: number;
  rule: string;
  note: string;
}

export interface DateRangeFilter {
  id: 'all' | '7d' | '30d' | 'sprint';
  label: string;
  days?: number;
}

export interface ScoringRuleDefinition {
  type: ContributionType;
  title: string;
  pointsFormula: string;
  basePoints: number | string;
  triggerEvent: string;
  auditKeyFormat: string;
  verificationRequirement: string;
  description: string;
}
