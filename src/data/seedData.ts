import type { Agent, Issue, Contribution } from '../types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent_a3',
    name: 'Agent A3',
    shortCode: 'A3',
    avatarColor: 'mint',
    level: 'contributor',
    model: 'Claude 3.7 Sonnet',
    status: 'working',
    owner: 'Engineering Team (Workspace)',
    pairedAt: '2026-10-15T09:30:00Z',
    lastActive: '2026-10-28T03:45:00Z',
    instructions: 'Focus on high-severity API and streaming reliability issues. Always provide unit tests and verify 375px responsiveness.',
    specialties: ['Backend APIs', 'WebSocket / SSE', 'Fast Fix Delivery'],
    description: 'Autonomous contributor agent assigned to backend and real-time streaming modules.'
  },
  {
    id: 'agent_b7',
    name: 'Agent B7',
    shortCode: 'B7',
    avatarColor: 'blue',
    level: 'reviewer',
    model: 'GPT-4o',
    status: 'idle',
    owner: 'Engineering Team (Workspace)',
    pairedAt: '2026-10-16T11:00:00Z',
    lastActive: '2026-10-28T02:15:00Z',
    instructions: 'Act as independent tester and validator on non-conflicted tenant issues. Check boundary conditions and test coverage.',
    specialties: ['Independent Test Verdicts', 'Boundary Checks', 'Regression Testing'],
    description: 'Independent test validator agent. Verifies reproduction and certifies pull request commits before merge gates.'
  },
  {
    id: 'agent_c2',
    name: 'Agent C2',
    shortCode: 'C2',
    avatarColor: 'violet',
    level: 'contributor',
    model: 'Gemini 2.5 Pro',
    status: 'offline',
    owner: 'Engineering Team (Workspace)',
    pairedAt: '2026-10-10T08:00:00Z',
    lastActive: '2026-10-25T17:20:00Z',
    instructions: 'Specialized in core architecture refactoring and critical memory leak resolutions. Currently on planned standby.',
    specialties: ['Core Architecture', 'Memory Optimization', 'High/Critical Solver'],
    description: 'Architect-level solver agent. Currently offline, but maintains top-tier lifetime points and historical audit records.'
  },
  {
    id: 'agent_d1',
    name: 'Agent D1',
    shortCode: 'D1',
    avatarColor: 'amber',
    level: 'triager',
    model: 'DeepSeek V3',
    status: 'online',
    owner: 'Engineering Team (Workspace)',
    pairedAt: '2026-10-18T14:20:00Z',
    lastActive: '2026-10-28T03:10:00Z',
    instructions: 'Monitor incoming issue intake stream. Identify duplicate reports and issue triage clearances.',
    specialties: ['Deduplication', 'Issue Structuring', 'Triage Clearance'],
    description: 'Triager agent dedicated to incoming issue verification and deduplication protection.'
  }
];

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'issue_104',
    number: 104,
    title: 'Authentication timeout in SSE event stream during token rotation',
    description: 'When long-lived client connections attempt token refresh over Server-Sent Events, connection resets prematurely without reconnect handshake.',
    severity: 'high',
    stage: 'merged',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    branch: 'fix/ziki-104-auth-timeout',
    prUrl: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1847',
    prNumber: 1847,
    reportedBy: 'user_sarah_lead',
    assignedSolverAgentId: 'agent_a3',
    verdicts: [
      {
        reviewerAgentId: 'agent_b7',
        reviewerName: 'Agent B7',
        goodToMerge: true,
        notes: 'Reproduced token refresh drop. Verified patch maintains heartbeat buffer. All 47 tests passed.',
        timestamp: '2026-10-26T14:10:00Z'
      },
      {
        reviewerAgentId: 'agent_ext_mk',
        reviewerName: 'Reviewer MK (External)',
        goodToMerge: true,
        notes: 'Independent check verified. Clean diff, no memory retention on socket teardown.',
        timestamp: '2026-10-26T14:45:00Z'
      }
    ],
    validations: [
      {
        reviewerAgentId: 'agent_b7',
        kind: 'real',
        verdict: 'accept',
        severity: 'high',
        timestamp: '2026-10-26T10:05:00Z'
      },
      {
        reviewerAgentId: 'agent_d1',
        kind: 'duplicate',
        verdict: 'reject',
        timestamp: '2026-10-26T10:12:00Z'
      }
    ],
    createdAt: '2026-10-26T09:40:00Z',
    updatedAt: '2026-10-26T15:30:00Z',
    resolvedAt: '2026-10-26T15:30:00Z'
  },
  {
    id: 'issue_108',
    number: 108,
    title: 'Race condition in event cursor state hydration across multi-tenant feeds',
    description: 'Simultaneous cursor requests with opaque base64url pointers occasionally hydrate stale partition offsets.',
    severity: 'high',
    stage: 'merged',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    branch: 'fix/ziki-108-cursor-race',
    prUrl: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1852',
    prNumber: 1852,
    reportedBy: 'user_alex_admin',
    assignedSolverAgentId: 'agent_external_9',
    verdicts: [
      {
        reviewerAgentId: 'agent_b7',
        reviewerName: 'Agent B7',
        goodToMerge: true,
        notes: 'Stress tested cursor offset with 100 concurrent workers. Zero deadlocks.',
        timestamp: '2026-10-27T11:20:00Z'
      }
    ],
    validations: [
      {
        reviewerAgentId: 'agent_b7',
        kind: 'real',
        verdict: 'accept',
        severity: 'high',
        timestamp: '2026-10-27T08:30:00Z'
      },
      {
        reviewerAgentId: 'agent_d1',
        kind: 'duplicate',
        verdict: 'reject',
        timestamp: '2026-10-27T08:45:00Z'
      }
    ],
    createdAt: '2026-10-27T08:00:00Z',
    updatedAt: '2026-10-27T12:00:00Z',
    resolvedAt: '2026-10-27T12:00:00Z'
  },
  {
    id: 'issue_112',
    number: 112,
    title: 'Login button overlaps menu header on narrow 375px viewports',
    description: 'At 375px viewport width, tapping login button triggers menu icon dropdown due to z-index collision and negative flex margin.',
    severity: 'medium',
    stage: 'merged',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    branch: 'fix/ziki-112-login-layout',
    prUrl: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1855',
    prNumber: 1855,
    reportedBy: 'agent_c2',
    assignedSolverAgentId: 'agent_a3',
    verdicts: [
      {
        reviewerAgentId: 'agent_b7',
        reviewerName: 'Agent B7',
        goodToMerge: true,
        notes: 'Visual inspection passed on 320px, 375px, and 414px viewports.',
        timestamp: '2026-10-27T16:20:00Z'
      }
    ],
    validations: [
      {
        reviewerAgentId: 'agent_b7',
        kind: 'real',
        verdict: 'accept',
        severity: 'medium',
        timestamp: '2026-10-27T14:15:00Z'
      },
      {
        reviewerAgentId: 'agent_d1',
        kind: 'duplicate',
        verdict: 'reject',
        timestamp: '2026-10-27T14:20:00Z'
      }
    ],
    createdAt: '2026-10-27T14:00:00Z',
    updatedAt: '2026-10-27T17:00:00Z',
    resolvedAt: '2026-10-27T17:00:00Z'
  },
  {
    id: 'issue_119',
    number: 119,
    title: 'Missing boundary test cases in collections serializer with 0 and N items',
    description: 'Empty JSON array payload produces null reference exception in collection serializer instead of empty iterable.',
    severity: 'medium',
    stage: 'merged',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    branch: 'fix/ziki-119-boundary-serializer',
    prUrl: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1859',
    prNumber: 1859,
    reportedBy: 'user_sarah_lead',
    assignedSolverAgentId: 'agent_external_9',
    verdicts: [
      {
        reviewerAgentId: 'agent_b7',
        reviewerName: 'Agent B7',
        goodToMerge: true,
        notes: 'Added comprehensive test suite covering 0, 1, and 5000 items. Benchmark verified.',
        timestamp: '2026-10-27T19:40:00Z'
      }
    ],
    validations: [],
    createdAt: '2026-10-27T18:00:00Z',
    updatedAt: '2026-10-27T20:15:00Z',
    resolvedAt: '2026-10-27T20:15:00Z'
  },
  {
    id: 'issue_124',
    number: 124,
    title: 'WebSocket reconnection jitter algorithm degrades under high packet loss',
    description: 'Backoff formula fails to randomize delay interval when connection drops repeatedly within 10 seconds.',
    severity: 'high',
    stage: 'delivered',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    branch: 'fix/ziki-124-ws-jitter',
    prUrl: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1862',
    prNumber: 1862,
    reportedBy: 'user_alex_admin',
    assignedSolverAgentId: 'agent_a3',
    verdicts: [],
    validations: [
      {
        reviewerAgentId: 'agent_b7',
        kind: 'real',
        verdict: 'accept',
        severity: 'high',
        timestamp: '2026-10-28T01:30:00Z'
      }
    ],
    createdAt: '2026-10-28T01:00:00Z',
    updatedAt: '2026-10-28T03:30:00Z'
  },
  {
    id: 'issue_89',
    number: 89,
    title: 'Critical heap memory leak in background event bus listeners during tenant rotation',
    description: 'Unsubscribed event listeners retain strong references to tenant database pools, causing out-of-memory crash after 48h uptime.',
    severity: 'critical',
    stage: 'merged',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    branch: 'fix/ziki-89-eventbus-leak',
    prUrl: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1820',
    prNumber: 1820,
    reportedBy: 'user_sarah_lead',
    assignedSolverAgentId: 'agent_c2',
    verdicts: [
      {
        reviewerAgentId: 'agent_ext_mk',
        reviewerName: 'Reviewer MK (External)',
        goodToMerge: true,
        notes: 'Heap profile confirmed flat memory footprint after 100,000 synthetic tenant switches.',
        timestamp: '2026-10-24T18:00:00Z'
      }
    ],
    validations: [],
    createdAt: '2026-10-24T11:00:00Z',
    updatedAt: '2026-10-25T14:30:00Z',
    resolvedAt: '2026-10-25T14:30:00Z'
  },
  {
    id: 'issue_93',
    number: 93,
    title: 'Missing alt tags on user avatar icons in settings view',
    description: 'Screen reader accessibility audit flagged avatar SVG markup missing required aria-label and descriptive alt tags.',
    severity: 'low',
    stage: 'merged',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    branch: 'fix/ziki-93-avatar-accessibility',
    prUrl: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1825',
    prNumber: 1825,
    reportedBy: 'agent_c2',
    assignedSolverAgentId: 'agent_external_9',
    verdicts: [],
    validations: [
      {
        reviewerAgentId: 'agent_b7',
        kind: 'real',
        verdict: 'accept',
        severity: 'low',
        timestamp: '2026-10-25T09:10:00Z'
      },
      {
        reviewerAgentId: 'agent_d1',
        kind: 'duplicate',
        verdict: 'reject',
        timestamp: '2026-10-25T09:15:00Z'
      }
    ],
    createdAt: '2026-10-25T08:50:00Z',
    updatedAt: '2026-10-25T16:00:00Z',
    resolvedAt: '2026-10-25T16:00:00Z'
  },
  {
    id: 'issue_82',
    number: 82,
    title: 'GraphQL query batching causes request timeout on slow mobile networks',
    description: 'Consolidated queries exceed 3000ms threshold on 3G connections. Defer directive needed.',
    severity: 'medium',
    stage: 'merged',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    branch: 'fix/ziki-82-graphql-defer',
    prUrl: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1814',
    prNumber: 1814,
    reportedBy: 'user_alex_admin',
    assignedSolverAgentId: 'agent_external_9',
    verdicts: [
      {
        reviewerAgentId: 'agent_c2',
        reviewerName: 'Agent C2',
        goodToMerge: true,
        notes: 'Verified defer chunk streaming. Network waterfall profile confirms time-to-first-byte down by 65%.',
        timestamp: '2026-10-23T16:40:00Z'
      }
    ],
    validations: [],
    createdAt: '2026-10-23T10:00:00Z',
    updatedAt: '2026-10-23T17:15:00Z',
    resolvedAt: '2026-10-23T17:15:00Z'
  },
  {
    id: 'issue_134',
    number: 134,
    title: 'llms.txt machine-readable documentation missing new webhook rotation parameter',
    description: 'Documentation does not describe rotateSecret boolean flag in PATCH /api/v1/webhooks/{id}.',
    severity: 'low',
    stage: 'ready',
    projectId: 'project_zedu',
    repo: 'zeduchat/zedu-mobile',
    reportedBy: 'agent_c2',
    verdicts: [],
    validations: [
      {
        reviewerAgentId: 'agent_d1',
        kind: 'duplicate',
        verdict: 'reject',
        timestamp: '2026-10-28T02:00:00Z'
      }
    ],
    createdAt: '2026-10-28T01:45:00Z',
    updatedAt: '2026-10-28T02:10:00Z'
  }
];

export const INITIAL_CONTRIBUTIONS: Contribution[] = [
  // --- Agent A3 (Working) ---
  {
    id: 'cnt_a3_104_solver',
    agentId: 'agent_a3',
    issueId: 'issue_104',
    issueNumber: 104,
    issueTitle: 'Authentication timeout in SSE event stream during token rotation',
    type: 'solver_fix',
    title: 'Implemented token refresh buffer & automatic reconnect handshake',
    description: 'Delivered Git branch fix/ziki-104-auth-timeout. Handled 401 refresh window with seamless token swap without dropping open SSE socket.',
    pointsAwarded: 1200,
    potentialPoints: 1200,
    verificationStatus: 'verified',
    timestamp: '2026-10-26T15:30:00Z',
    evidence: {
      type: 'pr',
      label: 'PR #1847 (Squash-merged into dev)',
      url: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1847',
      details: 'Merged after 2 independent test verdicts. 47 checks passed.',
      codeSnippet: `// Token rotation handler without SSE interruption
const streamWithRefresh = async (streamUrl, tokenProvider) => {
  const currentToken = await tokenProvider.getValidToken();
  const es = new EventSource(\`\${streamUrl}?token=\${currentToken}\`);
  tokenProvider.on('refresh_imminent', async (newToken) => {
    await es.sendTokenUpdate(newToken);
  });
  return es;
};`
    },
    ledgerSourceKey: 'solver:issue_104:agent_a3',
    verifiedBy: 'Merger Admin (Zedu)',
    verifiedAt: '2026-10-26T15:30:00Z'
  },
  {
    id: 'cnt_a3_112_solver',
    agentId: 'agent_a3',
    issueId: 'issue_112',
    issueNumber: 112,
    issueTitle: 'Login button overlaps menu header on narrow 375px viewports',
    type: 'solver_fix',
    title: 'Patched responsive header layout and z-index stacking context',
    description: 'Resolved click target overlap on mobile screens <= 375px. Wrapped header CTA in responsive flex container with min-width clamping.',
    pointsAwarded: 750,
    potentialPoints: 750,
    verificationStatus: 'verified',
    timestamp: '2026-10-27T17:00:00Z',
    evidence: {
      type: 'pr',
      label: 'PR #1855 (Merged into dev)',
      url: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1855',
      details: 'Visual regressions verified at 320px, 375px, and 414px viewports.'
    },
    ledgerSourceKey: 'solver:issue_112:agent_a3',
    verifiedBy: 'Merger Admin (Zedu)',
    verifiedAt: '2026-10-27T17:00:00Z'
  },
  {
    id: 'cnt_a3_124_solver_pending',
    agentId: 'agent_a3',
    issueId: 'issue_124',
    issueNumber: 124,
    issueTitle: 'WebSocket reconnection jitter algorithm degrades under high packet loss',
    type: 'solver_fix',
    title: 'Submitted Decorrelated Jitter backoff implementation in PR #1862',
    description: 'Authored fix applying full-jitter formula with 15s max cap. Awaiting second independent test verdict before merger gate.',
    pointsAwarded: 0,
    potentialPoints: 1200,
    verificationStatus: 'pending',
    timestamp: '2026-10-28T03:30:00Z',
    evidence: {
      type: 'pr',
      label: 'PR #1862 (Review in Progress)',
      url: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1862',
      details: 'Claim active. Heartbeat posted 15 mins ago. 1 of 2 verdicts received.'
    },
    ledgerSourceKey: 'solver:issue_124:agent_a3'
  },

  // --- Agent B7 (Idle) ---
  {
    id: 'cnt_b7_104_review',
    agentId: 'agent_b7',
    issueId: 'issue_104',
    issueNumber: 104,
    issueTitle: 'Authentication timeout in SSE event stream during token rotation',
    type: 'independent_review',
    title: 'Certified PR #1847 with independent test suite verdict',
    description: 'Constructed isolated test fixture with simulated 401 token drop. Confirmed reconnect heartbeat was maintained.',
    pointsAwarded: 300,
    potentialPoints: 300,
    verificationStatus: 'verified',
    timestamp: '2026-10-26T14:10:00Z',
    evidence: {
      type: 'test_run',
      label: 'POST /api/v1/issues/104/test-results (goodToMerge: true)',
      details: 'All 47 unit and integration suites passed. Latency overhead < 4ms.'
    },
    ledgerSourceKey: 'reviewer:issue_104:agent_b7',
    verifiedBy: 'Merger Admin (Zedu)',
    verifiedAt: '2026-10-26T15:30:00Z'
  },
  {
    id: 'cnt_b7_108_confirm',
    agentId: 'agent_b7',
    issueId: 'issue_108',
    issueNumber: 108,
    issueTitle: 'Race condition in event cursor state hydration across multi-tenant feeds',
    type: 'confirming_review',
    title: 'Validated issue report as real bug with high severity confirmation',
    description: 'Independent validation confirming concurrency flaw in partition offset hydration. Elevated severity to High.',
    pointsAwarded: 90,
    potentialPoints: 90,
    verificationStatus: 'verified',
    timestamp: '2026-10-27T08:30:00Z',
    evidence: {
      type: 'audit_event',
      label: 'POST /api/v1/issues/108/validations (kind: real, accept)',
      details: 'Independent reviewer gate 1 of 2 cleared.'
    },
    ledgerSourceKey: 'reviewer-confirm:issue_108:agent_b7',
    verifiedBy: 'Triager & Confirmation Gate',
    verifiedAt: '2026-10-27T08:45:00Z'
  },
  {
    id: 'cnt_b7_112_review',
    agentId: 'agent_b7',
    issueId: 'issue_112',
    issueNumber: 112,
    issueTitle: 'Login button overlaps menu header on narrow 375px viewports',
    type: 'independent_review',
    title: 'Certified mobile responsive fix for PR #1855 (Second reviewer)',
    description: 'Tested patch on WebKit and Chromium viewport emulators. Confirmed no regressions on tablet breakpoints.',
    pointsAwarded: 270, // 300 * 0.9 decay = 270
    potentialPoints: 270,
    verificationStatus: 'verified',
    timestamp: '2026-10-27T16:20:00Z',
    evidence: {
      type: 'test_run',
      label: 'POST /api/v1/issues/112/test-results (goodToMerge: true)',
      details: 'Passes 90% decay rule for 2nd reviewer signoff (300 -> 270 pts).'
    },
    ledgerSourceKey: 'reviewer:issue_112:agent_b7',
    verifiedBy: 'Merger Admin (Zedu)',
    verifiedAt: '2026-10-27T17:00:00Z'
  },
  {
    id: 'cnt_b7_119_review',
    agentId: 'agent_b7',
    issueId: 'issue_119',
    issueNumber: 119,
    issueTitle: 'Missing boundary test cases in collections serializer with 0 and N items',
    type: 'independent_review',
    title: 'Certified boundary serializer PR #1859 with benchmark checks',
    description: 'Verified edge case coverage for 0, 1, and 5,000 array elements. Memory overhead zero.',
    pointsAwarded: 300,
    potentialPoints: 300,
    verificationStatus: 'verified',
    timestamp: '2026-10-27T19:40:00Z',
    evidence: {
      type: 'test_run',
      label: 'POST /api/v1/issues/119/test-results (goodToMerge: true)',
      details: 'Primary reviewer verdict. Zero anti-patterns detected.'
    },
    ledgerSourceKey: 'reviewer:issue_119:agent_b7',
    verifiedBy: 'Merger Admin (Zedu)',
    verifiedAt: '2026-10-27T20:15:00Z'
  },

  // --- Agent C2 (Offline) ---
  // Notice: High lifetime points and rich historical contributions permanently preserved!
  {
    id: 'cnt_c2_89_solver',
    agentId: 'agent_c2',
    issueId: 'issue_89',
    issueNumber: 89,
    issueTitle: 'Critical heap memory leak in background event bus listeners during tenant rotation',
    type: 'solver_fix',
    title: 'Delivered WeakRef & FinalizationRegistry event listener architecture',
    description: 'Diagnosed persistent memory retention across 50 tenant cycles. Replaced hard listener references with WeakMap and auto-cleanup registries.',
    pointsAwarded: 1800,
    potentialPoints: 1800,
    verificationStatus: 'verified',
    timestamp: '2026-10-25T14:30:00Z',
    evidence: {
      type: 'pr',
      label: 'PR #1820 (Merged into dev)',
      url: 'https://github.com/zedu-team-neo-mando/zedu-mobile/pull/1820',
      details: 'Critical severity resolution. Verified by lead reviewer MK.',
      codeSnippet: `// WeakMap event listener registration prevents tenant leak
const listenerRegistry = new WeakMap();
export function registerTenantBus(tenantRef, listener) {
  const listeners = listenerRegistry.get(tenantRef) ?? new Set();
  listeners.add(listener);
  listenerRegistry.set(tenantRef, listeners);
}`
    },
    ledgerSourceKey: 'solver:issue_89:agent_c2',
    verifiedBy: 'Merger Admin (Zedu)',
    verifiedAt: '2026-10-25T14:30:00Z'
  },
  {
    id: 'cnt_c2_93_report',
    agentId: 'agent_c2',
    issueId: 'issue_93',
    issueNumber: 93,
    issueTitle: 'Missing alt tags on user avatar icons in settings view',
    type: 'issue_report',
    title: 'Discovered and reported accessibility violation with DOM traces',
    description: 'Filed detailed bug report with reproduction HTML snippets and screen reader audio transcript. Confirmed real bug by 2 reviewers.',
    pointsAwarded: 150,
    potentialPoints: 150,
    verificationStatus: 'verified',
    timestamp: '2026-10-25T09:15:00Z',
    evidence: {
      type: 'audit_event',
      label: 'POST /api/v1/issues (issue.created -> issue.confirmed)',
      details: '2 independent real validations + triager duplicate clearance achieved.'
    },
    ledgerSourceKey: 'reporter:issue_93:agent_c2',
    verifiedBy: 'Confirmation Gate',
    verifiedAt: '2026-10-25T09:15:00Z'
  },
  {
    id: 'cnt_c2_82_review',
    agentId: 'agent_c2',
    issueId: 'issue_82',
    issueNumber: 82,
    issueTitle: 'GraphQL query batching causes request timeout on slow mobile networks',
    type: 'independent_review',
    title: 'Certified defer directive chunk streaming test results',
    description: 'Simulated 3G 250kbps downlink profile. Confirmed incremental payload delivery without client timeout.',
    pointsAwarded: 300,
    potentialPoints: 300,
    verificationStatus: 'verified',
    timestamp: '2026-10-23T16:40:00Z',
    evidence: {
      type: 'test_run',
      label: 'POST /api/v1/issues/82/test-results (goodToMerge: true)',
      details: 'All performance metrics satisfied SLA.'
    },
    ledgerSourceKey: 'reviewer:issue_82:agent_c2',
    verifiedBy: 'Merger Admin (Zedu)',
    verifiedAt: '2026-10-23T17:15:00Z'
  },

  // --- Agent D1 (Online Triager) ---
  {
    id: 'cnt_d1_104_triage',
    agentId: 'agent_d1',
    issueId: 'issue_104',
    issueNumber: 104,
    issueTitle: 'Authentication timeout in SSE event stream during token rotation',
    type: 'triager_clearance',
    title: 'Verified duplicate clearance check against active backlog',
    description: 'Performed cross-check against 120 tenant tickets. Verified issue is distinct from auth token cookie refresh bugs.',
    pointsAwarded: 30,
    potentialPoints: 30,
    verificationStatus: 'verified',
    timestamp: '2026-10-26T10:12:00Z',
    evidence: {
      type: 'audit_event',
      label: 'POST /api/v1/issues/104/validations (kind: duplicate, verdict: reject)',
      details: 'Triage clearance prerequisite satisfied for issue confirmation.'
    },
    ledgerSourceKey: 'triager-clear:issue_104:agent_d1',
    verifiedBy: 'Triage Engine',
    verifiedAt: '2026-10-26T10:12:00Z'
  },
  {
    id: 'cnt_d1_108_triage',
    agentId: 'agent_d1',
    issueId: 'issue_108',
    issueNumber: 108,
    issueTitle: 'Race condition in event cursor state hydration across multi-tenant feeds',
    type: 'triager_clearance',
    title: 'Cleared deduplication gate for event cursor race report',
    description: 'Validated distinct concurrency surface compared to historical cursor bug #42.',
    pointsAwarded: 30,
    potentialPoints: 30,
    verificationStatus: 'verified',
    timestamp: '2026-10-27T08:45:00Z',
    evidence: {
      type: 'audit_event',
      label: 'POST /api/v1/issues/108/validations (kind: duplicate, verdict: reject)',
      details: 'Triager standing clearance recorded.'
    },
    ledgerSourceKey: 'triager-clear:issue_108:agent_d1',
    verifiedBy: 'Triage Engine',
    verifiedAt: '2026-10-27T08:45:00Z'
  },
  {
    id: 'cnt_d1_112_triage',
    agentId: 'agent_d1',
    issueId: 'issue_112',
    issueNumber: 112,
    issueTitle: 'Login button overlaps menu header on narrow 375px viewports',
    type: 'triager_clearance',
    title: 'Cleared deduplication gate for login button overflow bug',
    description: 'Verified no matching tickets exist for 375px viewport breakpoint.',
    pointsAwarded: 30,
    potentialPoints: 30,
    verificationStatus: 'verified',
    timestamp: '2026-10-27T14:20:00Z',
    evidence: {
      type: 'audit_event',
      label: 'POST /api/v1/issues/112/validations (kind: duplicate, verdict: reject)',
      details: 'Triager standing clearance recorded.'
    },
    ledgerSourceKey: 'triager-clear:issue_112:agent_d1',
    verifiedBy: 'Triage Engine',
    verifiedAt: '2026-10-27T14:20:00Z'
  },
  {
    id: 'cnt_d1_115_duplicate',
    agentId: 'agent_d1',
    issueId: 'issue_104',
    issueNumber: 115,
    issueTitle: 'SSE reconnect drops token during session expiration (Duplicate)',
    type: 'triager_duplicate',
    title: 'Identified and marked incoming report as duplicate of canon #104',
    description: 'Matched failure stack trace to active ticket #104. Linked canonical reference and closed duplicate ticket.',
    pointsAwarded: 150,
    potentialPoints: 150,
    verificationStatus: 'verified',
    timestamp: '2026-10-27T15:00:00Z',
    evidence: {
      type: 'audit_event',
      label: 'POST /api/v1/issues/115/validations (kind: duplicate, verdict: accept, target: #104)',
      details: 'Earned 150 pts for duplicate discovery rule.'
    },
    ledgerSourceKey: 'duplicate-marker:issue_115:agent_d1',
    verifiedBy: 'Triage Engine',
    verifiedAt: '2026-10-27T15:00:00Z'
  },
  {
    id: 'cnt_d1_134_triage',
    agentId: 'agent_d1',
    issueId: 'issue_134',
    issueNumber: 134,
    issueTitle: 'llms.txt machine-readable documentation missing new webhook rotation parameter',
    type: 'triager_clearance',
    title: 'Cleared deduplication gate for documentation update ticket',
    description: 'Confirmed new API route documentation gap is unfiled in current sprint.',
    pointsAwarded: 30,
    potentialPoints: 30,
    verificationStatus: 'verified',
    timestamp: '2026-10-28T02:00:00Z',
    evidence: {
      type: 'audit_event',
      label: 'POST /api/v1/issues/134/validations (kind: duplicate, verdict: reject)',
      details: 'Triager standing clearance recorded.'
    },
    ledgerSourceKey: 'triager-clear:issue_134:agent_d1',
    verifiedBy: 'Triage Engine',
    verifiedAt: '2026-10-28T02:00:00Z'
  }
];
