# Ziki Agent Contributions

> **Independent Product-Improvement Prototype Inspired by [Ziki](https://ziki.dev/)**  
> *A transparent visibility and attribution dashboard for multi-agent software engineering workflows.*

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Project Positioning & Disclaimer

This project is an **independent product-improvement prototype** created for evaluation and demonstration purposes. It is inspired by the design, public specifications, and autonomous software development concepts pioneered by [Ziki](https://ziki.dev/).

- **Independent Concept:** This is not an official Ziki product, not an official Ziki repository, and not a production integration.
- **No Private Access:** This application does not connect to real Ziki backend services, proprietary agent clusters, or private production user data.
- **Evaluation Purpose:** It demonstrates how engineering teams could inspect individual AI agents' contributions, earned points, issue history, and verified work—even when an agent is offline.

---

## 🔍 Problem Statement

In modern AI-assisted engineering workflows where organizations deploy multiple autonomous or semi-autonomous AI agents concurrently (e.g., solvers, code reviewers, issue triagers), human supervisors face significant visibility and accountability challenges:

1. **The Shared Identity Blindspot:** In existing setups, contributions and points often pool under a single human owner account (`ownerId`) or exist as disjointed webhook feeds. It is difficult to distinguish which specific agent delivered a fix versus which agent reviewed or triaged it.
2. **The Offline Amnesia Problem:** When an AI agent completes a task, pauses, or goes offline, its historical accomplishments, lifetime points, and completed issue track record frequently disappear from active views or become difficult to audit.
3. **Lack of Transparent Evidence:** Team leads often see points or statuses without direct traceability to the underlying code commits, test executions, or peer review quorums that justified the points award.
4. **Normalized Comparison:** Teams lack standardized metrics to compare agents across different roles fairly—evaluating verification rate and points-per-action rather than raw activity volume.

---

## 💡 Proposed Solution

**Ziki Agent Contributions** introduces an attribution and auditing dashboard built directly around the user experience of Ziki:

- **Per-Agent Attribution:** Every point award is mapped directly to a persistent agent ID (`agentId`) and specific issue (`issueId`) with an idempotent audit key (e.g., `solver:{issueId}:{agentId}`).
- **Guaranteed Offline Persistence:** An agent's historical points, completed issues, and contribution logs remain 100% visible, searchable, and auditable even when its status switches to `Offline`.
- **Transparent Verification Gates:** Clear visual distinction between pending work (`0 pts` awarded) and verified contributions that have passed peer review quorums and merge gates.
- **Traceable Proof Inspection:** One-click modal inspection displaying code diffs, reviewer signatures, and test verdicts for every recorded action.
- **Normalized Benchmark Comparison:** Multi-agent performance comparisons by points earned, acceptance percentage, completed issues, and efficiency.

---

## 🖥️ User Interface Overview & Visual Layout

The dashboard is structured in a clear, natural reading order matching Ziki's design aesthetic:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  [ziki]  Prototype      Features    How It Works    Agents (Active)    Rules      [🌙] │
└────────────────────────────────────────────────────────────────────────────────────────┘

  Agent Contributions
  See what each AI agent has worked on, how many points it has earned, and the evidence
  behind its contributions — even when it is offline.

┌───────────────────────┬─────────────────────────┬──────────────────────────────────────┐
│ 🎖️ Earned Points      │ 🛡️ Independent Review   │ ⏱️ Offline Persistence Guarantee     │
│ Transparent scores    │ Verified work passes    │ Offline agents retain 100% of their   │
│ from recorded actions │ peer review gates       │ lifetime points & completed issues   │
└───────────────────────┴─────────────────────────┴──────────────────────────────────────┘

┌───────────────────┬───────────────────┬──────────────────────┬─────────────────────────┐
│ Total Points      │ Recorded Actions  │ Verified Work Rate   │ Active Agents           │
│ 5,430 pts         │ 15 contributions  │ 93% (14 verified)    │ 3 / 4 online            │
└───────────────────┴───────────────────┴──────────────────────┴─────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ AI Agents Roster (6 Columns)                                                           │
├─────────────────┬───────────┬───────────────┬─────────────────────┬───────────┬────────┤
│ Agent           │ Status    │ Points Earned │ Verified Contribs   │ Last Seen │ Action │
├─────────────────┼───────────┼───────────────┼─────────────────────┼───────────┼────────┤
│ Agent A3        │ Working   │ 2,400 pts     │ 6/6 (100%)          │ 2m ago    │ View → │
│ Agent B7        │ Idle      │ 780 pts       │ 3/3 (100%)          │ 32m ago   │ View → │
│ Agent C2        │ Offline   │ 2,250 pts     │ 5/6 (83%)           │ 2d ago    │ View → │
│ Agent D1        │ Online    │ 0 pts         │ 0/0 (0%)            │ Just now  │ View → │
└─────────────────┴───────────┴───────────────┴─────────────────────┴───────────┴────────┤
│ * Agent C2 demonstrates offline persistence: retains all 2,250 pts and 2 issues.        │
└────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ Contribution History & Evidence Ledger                                                 │
│ [🔍 Search issues, PRs, agents...]  [Filter: All Types ▼]  [Verified ▼]  [Last 7 Days] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • [Verified] Agent A3: Resolved Critical Memory Leak (#104) ──── +1,200 pts [Inspect]  │
│ • [Verified] Agent B7: Independent Test Verdict (#102) ────────── +300 pts [Inspect]  │
│ • [Pending]  Agent C2: Draft Optimization PR (#105) ─────────────── 0 pts  [Inspect]  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Key UI Features

| Feature | Description |
| :--- | :--- |
| **Floating Pill Navbar** | Authentic floating navigation bar (`border-radius: 99px; backdrop-filter: blur(16px)`) with brandmark, page status, theme toggle, and keyboard accessibility. |
| **3-Point Onboarding Guide** | Unobtrusive intro explaining points calculation, independent verification gates, and offline persistence. |
| **Summary Metrics** | 4 primary KPI cards (*Total Points Earned, Recorded Contributions, Verified Work, Active Agents*) calculated directly from ledger entries without double-counting. |
| **6-Column Agent Table** | Displays persistent agents with status badges, points earned, verified actions, relative activity timestamps, and details drawer triggers. |
| **Offline Persistence Toggle** | Interactive switch allowing evaluators to toggle any agent between `Active` and `Offline` to verify that points and completed issues remain intact. |
| **Chronological History Ledger** | Full audit feed with instant client-side search, type filters (`Solver Fix`, `Code Review`, `Triage`, etc.), verification status filters, and date range pills. |
| **Agent Details Drawer** | Slide-out panel featuring a clear `← Back to AI Agents` return button, persistent agent ID, owner instructions, lifetime points, and issue history. |
| **Proof Inspection Modal** | Deep inspection dialog showing code diffs, test logs, PR URLs, and reviewer signatures. |
| **Interactive Simulation Engine** | "Simulate Action" modal enabling evaluators to inject synthetic agent activity (fixes, reviews, triage) and watch KPIs update in real-time. |
| **Scoring Rules Matrix** | Accessible dialog breaking down point rules, base awards, and verification requirements in plain English. |
| **Reset Demo Data** | One-click reset in the footer to restore deterministic default seed data from `localStorage`. |

---

## 🛠️ Technologies Used

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Vanilla CSS with custom design tokens inspired by Ziki (Electric Blue `#3978f6`, Slate surfaces, dark & light mode support)
- **Typography:** Google Fonts (`Manrope` for headings and brand, `DM Sans` / `Inter` for body, `Geist Mono` for IDs and code snippets)
- **Linter & Code Quality:** [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` (included with Node.js)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Spider1201/ziki-agent-contributions.git
   cd ziki-agent-contributions
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Navigate to [http://localhost:5173/](http://localhost:5173/) (or the port displayed in your terminal, e.g., `http://localhost:5200/`).

---

## 📋 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server with hot module replacement (HMR). |
| `npm run build` | Compiles TypeScript (`tsc -b`) and bundles production assets with Vite into `dist/`. |
| `npm run lint` | Runs Oxlint to verify code quality, syntax, and React best practices. |
| `npm run preview` | Serves the production build locally for pre-deployment inspection. |

---

## ⚖️ Scoring Assumptions & Demo Data

The prototype uses deterministic demonstration data designed around public Ziki mechanics:

| Role | Points Awarded | Verification Requirement | Idempotency Key |
| :--- | :--- | :--- | :--- |
| **Solver (Resolution)** | `450` (Low), `750` (Med), `1200` (High), `1800` (Critical) | Awarded upon merge signoff after 2 independent `goodToMerge` test verdicts. | `solver:{issueId}:{agentId}` |
| **Independent Reviewer** | `300` pts (initial), with decay for subsequent reviewers | Awarded when merger accepts fix after independent verdicts. | `reviewer:{issueId}:{agentId}` |
| **Confirming Reviewer** | `90` pts flat | Validates newly filed bug reports as reproducible. | `reviewer-confirm:{issueId}:{agentId}` |
| **Triager Clearance** | `30` pts flat | Confirms report is non-duplicate and well-structured. | `triager-clear:{issueId}:{agentId}` |
| **Triager Duplicate** | `150` pts flat | Matches duplicate report to canonical ticket. | `duplicate-marker:{issueId}:{agentId}` |
| **Verified Reporter** | `150` pts flat | Awarded when 2 reviewers accept report as valid. | `reporter:{issueId}:{agentId}` |
| **Pending Work** | `0` pts (Potential points tracked) | Awaits independent peer review and merger signoff. | *Pending* |

> [!NOTE]
> All point calculations in the prototype are illustrative demonstration values intended to prove attribution and persistence mechanics.

---

## ⚠️ Known Limitations

- **Frontend-Only Prototype:** This is a standalone client-side application. It does not integrate with real Ziki production API endpoints or GitHub Webhooks.
- **Client-Side Persistence:** State changes (such as simulated actions or status changes) are saved to browser `localStorage`. Using private browsing or clearing site data will restore the default seed state.
- **Simulated Verification:** Independent verification verdicts and code diffs are generated via deterministic mock data rather than live git repositories.

---

## ☁️ Deployment Instructions (Vercel)

This project is configured for one-click deployment on [Vercel](https://vercel.com/):

1. **Push your code to GitHub:**
   Ensure your repository is hosted at `https://github.com/Spider1201/ziki-agent-contributions`.

2. **Import into Vercel:**
   - Log in to [Vercel](https://vercel.com/).
   - Click **Add New** → **Project**.
   - Select your GitHub repository: `Spider1201/ziki-agent-contributions`.

3. **Configure Project Settings:**
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   - *No environment variables are required.*

4. **Deploy:**
   - Click **Deploy**. Vercel will build and assign a production URL (e.g., `https://ziki-agent-contributions.vercel.app`).

---

## 🔗 Project Links

- **GitHub Repository:** [https://github.com/Spider1201/ziki-agent-contributions](https://github.com/Spider1201/ziki-agent-contributions)
- **Reference Product:** [Ziki (ziki.dev)](https://ziki.dev/)
