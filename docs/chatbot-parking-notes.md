# Ask RI Chatbot — Parked for Relaunch

Status: **Disabled from UI, fully built, ready to re-enable when relaunched.**

---

## How to Re-enable

In `components/Layout/AppLayout.tsx`, uncomment two lines:

```tsx
// Line ~15:
import { ChatWidget } from '@/components/Chat/ChatWidget';

// Line ~160:
<ChatWidget />
```

That's it. Everything else is live.

---

## What's Built and Working

### Core AI
- **`app/api/chat/route.ts`** — streaming chat endpoint using Anthropic claude-sonnet-4-6
- **`lib/knowledge-base.ts`** — comprehensive Roof Ignite knowledge base injected into every conversation:
  - Full business model, 9-phase client journey, Death Valley window
  - KPI framework (Layer 1/Layer 2), account health color thresholds
  - Problem diagnosis playbook (10 problems with root cause + fix + who to task)
  - Monday/Thursday Slack update format
  - A2P rules, billing failure protocol, renewal process
  - Meta ad setup rules, Post-Andromeda protocol
  - VA operations, ClickUp task format
  - Full team directory with contact preferences
  - All SOPs, training recordings, Loom walkthroughs

### UI Components
- **`components/Chat/ChatWidget.tsx`** — floating button widget, opens inline chat panel, supports markdown rendering
- **`components/Chat/ChatTab.tsx`** — full-page chat tab (not currently in tab nav but built)

### Question Logging & Memory
- **`app/api/chat/route.ts`** — logs every Q&A exchange to Supabase `chat_logs` (fire-and-forget)
- **`app/api/chat/feedback/route.ts`** — thumbs up/down feedback stored on each log
- **`app/api/admin/chat-logs/route.ts`** — admin API: GET returns recent questions + corrections; PATCH approves/revokes corrections
- Approved corrections from `chat_knowledge` table are injected into AI system prompt on every request

### Admin Insights
- **`components/Admin/AdminDashboard.tsx`** — "Ask RI Insights" panel at bottom of admin page:
  - Recent Questions tab: shows last 50 questions asked, who asked them, expandable AI answer, flagged responses
  - Corrections tab: approve/revoke submitted corrections that get baked into AI context

### Database Tables (Supabase)
- `chat_logs` — every question, answer, user, feedback
- `chat_knowledge` — Q&A corrections, approvable by admin
- Schema is in `supabase/schema.sql` and the setup endpoint (`/api/setup`)

---

## What Needs Work Before Relaunch

### 1. Response Quality
The AI works and answers correctly, but responses need refinement:
- Too verbose for some simple questions
- Occasionally over-hedges ("I'm not sure, ask Jonathan") on things it should know confidently
- Needs more conversational, direct tone tuning

### 2. UI/UX Polish
- The widget button style could be more prominent/welcoming
- Consider a proper onboarding message on first open ("Hi, I'm Ask RI — ask me anything about your role")
- Mobile experience of the chat panel needs testing
- Consider whether full-page ChatTab should replace or supplement the floating widget

### 3. Knowledge Base Gaps to Fill
Known gaps to add to `lib/knowledge-base.ts`:
- Exact billing cycle dates per client (this is live data — can't be in static KB)
- Specific client onboarding checklists (variable per client)
- The exact Account Specific Document template and fields
- Detailed GHL pipeline stage names and what each means
- Exact reminder automation sequences in GHL
- Slack workspace channels full list with purposes

### 4. Long-Term Memory (Corrections Loop)
Currently: pod managers can submit corrections via feedback, admin approves, they get injected into AI.
Future improvement: make the admin approval UI more prominent, notify Jonathan when new corrections are submitted (Slack webhook?).

### 5. Conversation Context
Currently stateless — each message sends full history. For very long conversations this is fine, but consider summarisation for very extended sessions.

---

## Environment Variables Required

| Variable | Where | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel env vars | Powers the AI — get from console.anthropic.com |
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel env vars | Already set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel env vars | Already set |

The `ANTHROPIC_API_KEY` is already set in Vercel. The chatbot works on the deployed site.

---

## File Index

| File | Purpose |
|---|---|
| `components/Chat/ChatWidget.tsx` | Floating chat widget UI |
| `components/Chat/ChatTab.tsx` | Full-page chat tab (unused in nav) |
| `lib/knowledge-base.ts` | AI knowledge base builder |
| `app/api/chat/route.ts` | Streaming chat API endpoint |
| `app/api/chat/feedback/route.ts` | Thumbs up/down feedback endpoint |
| `app/api/admin/chat-logs/route.ts` | Admin insights API |
| `components/Admin/AdminDashboard.tsx` | Admin UI (includes Ask RI Insights panel) |
| `supabase/schema.sql` | DB schema including chat_logs + chat_knowledge |
