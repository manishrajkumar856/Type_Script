# AI Battle Arena - Modern Refactor Plan

Refactor the existing AI Battle Arena frontend into a scalable, feature-based architecture and implement multiple-message support with a premium, minimal design.

## User Review Required

> [!IMPORTANT]
> **Architecture Change**: We are moving from a single-file `App.jsx` to a 4-layer feature-based structure: `app`, `pages`, `features`, and `shared`. This follows modern best practices for React applications.
> **State Management**: Each chat session will now support multiple messages, where each message contains a user query, two solutions, and a judge's verdict.

## Proposed Changes

### Core Structure Setup
We will establish a modular structure where each major feature contains its own internal layers:
- `src/features/[FeatureName]/`:
  - `components/`: UI components specific to the feature.
  - `pages/`: Page-level compositions for the feature.
  - `hooks/`: Feature-specific logic and state management.
  - `services/`: Data fetching and API interaction logic.
- `src/shared/`: Truly global UI primitives, utilities, and constants.
- `src/app/`: Application entry point, global providers, and routing.

---

### Layered Feature Implementation (e.g., Chat Feature)
- `src/features/Chat/components/`:
  - `MessageThread.jsx`: Displays the list of messages.
  - `MessageItem.jsx`: Layout for user query + solutions + judge.
  - `ChatInput.jsx`: Entry point for new messages.
- `src/features/Chat/pages/`:
  - `ChatArena.jsx`: The main view combining the thread and input.
- `src/features/Chat/hooks/`:
  - `useChat.js`: Logic for managing the message array and loading states.
- `src/features/Chat/services/`:
  - `chatService.js`: Mocked API for generating solutions and judging.


## Open Questions

- **Persistence**: Do you want the chat history to persist (e.g., in `localStorage`) or is it okay for it to reset on page refresh for now?
- **Animations**: Should we prioritize transition animations (Framer Motion) or stick to standard Tailwind/CSS transitions?

## Verification Plan

### Automated Tests
- Build verification: `npm run build`
- Linting check: `npm run lint`

### Manual Verification
1.  Verify the side-by-side solution layout for each message.
2.  Test the "multiple messages" flow by sending 3-4 consecutive prompts.
3.  Ensure the "Judge Recommendation" appears clearly below each battle result.
4.  Check responsiveness and "breathing space" on desktop screens.
