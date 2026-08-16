# 📋 FlowBoard — Kanban Board with Drag & Drop

FlowBoard is a modern, accessible, high-performance Kanban board built with **React**, **TypeScript**, **dnd-kit**, and **TanStack Query**. It supports smooth drag-and-drop card reordering within and across columns, URL-based state filtering, optimistic UI updates with automatic rollback on network failure, and full keyboard accessibility.

![FlowBoard Drag & Drop Demo](./docs/demo.gif)

---

## ✨ Features

- 🖱️ **Accessible Drag-and-Drop**: Built using `@dnd-kit/core` and `@dnd-kit/sortable` supporting both **mouse** and **keyboard** navigation.
- ⚡ **Optimistic Updates & Instant Rollback**: Reordering cards immediately reflects in the UI. If the server update fails (e.g. backend offline), TanStack Query instantly rolls back state without duplicating or losing cards.
- 🔍 **URL-Driven Search & Filtering**: Text (`title`) and tag (`label`) filters sync dynamically with URL parameters (`useSearchParams`). Shared URLs retain exact search states across refreshes and browser history navigation.
- 🧮 **Derived State Architecture**: Card positions and column distributions are calculated on-the-fly during render. Eliminates state drift bugs caused by duplicated per-column React state.
- 🎨 **Sleek UI & Polish**: Modern dark UI built with Tailwind CSS, custom loading skeletons, empty state indicators, and responsive horizontal column scrolling.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Drag & Drop**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- **State Management & Server Cache**: `@tanstack/react-query` & DevTools
- **Routing & URL State**: `react-router-dom`
- **HTTP Client & Mock Server**: `axios` & `json-server`
- **Styling**: Tailwind CSS & Lucide Icons

---

## 🚀 Quick Start & Setup

### Prerequisites
- Node.js (v18+ recommended)
- `pnpm` (or `npm` / `yarn`)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/FaizaTasneeem/flowboard.git
cd flowboard
pnpm install
```

### 2. Start Mock Backend Server
FlowBoard uses `json-server` to persist columns and cards locally on port 4000.
```bash
npx json-server src/data/db.json --port 4000
```

### 3. Start Frontend Development Server
In a separate terminal window, launch Vite dev server:
```bash
pnpm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧠 Architecture & Key Technical Decisions

### 1. Derived State over Duplicated State
Rather than copying server cards into separate per-column React state objects (`useState`), FlowBoard maintains a single source of truth fetched via TanStack Query (`cards`). Each column computes its card list dynamically during render by filtering `cardData`. This prevents out-of-sync state bugs between column containers and card arrays.

### 2. Immutable Reorder Logic
When dragging cards within or across columns, array transformations are performed using dnd-kit's `arrayMove` helper and pure mapping (`.map()`). Existing state objects are never mutated directly in place, ensuring React accurately detects state diffs and re-renders components efficiently.

### 3. URL Param Persistence
Filters live in the URL search params (`?title=auth&label=bug`). The search inputs read directly from URL query parameters. This allows board states to be bookmarked and shared seamlessly.

---

## 💡 What Was Hard & How I Solved It

### 1. Cross-Column Index Calculation & Reorder Math
**The Challenge**: Moving a card from one column to another using `dnd-kit` requires updating both the target card's `columnId` and recomputing global list order indexes (`order`) across all affected cards without creating duplicate or missing index numbers. Dropping a card onto an empty column vs. dropping it between existing cards required different index offset formulas.

**The Solution**: I designed a deterministic two-step calculation in `handleDragEnd`. First, `updateActiveCardCol` assigns the target `columnId` immutably to the dragged card. Second, if dropping onto an empty column target (`overCardPos === -1`), the position resolves to the last index of that target column (`getOverColumnLastIdx`). Finally, `arrayMove` reorders the array, and a pure `.map()` re-indexes every card with a sequential `order` property before mutating the server cache.

### 2. Optimistic UI Updates with Reliable Cache Rollback
**The Challenge**: Users expect drag-and-drop actions to respond instantly without waiting for network round-trips. However, if the server request fails, the UI must gracefully revert without losing data integrity or creating ghost cards.

**The Solution**: Using TanStack React Query's `useMutation`, I implemented an optimistic update strategy in `useUpdateCardList`:
- **`onMutate`**: Immediately cancels outgoing queries for `['cards']`, snapshots the previous cache state via `queryClient.getQueryData(['cards'])`, and writes the newly computed order directly to the query cache using `queryClient.setQueryData`.
- **`onError`**: Restores the pre-drag snapshot if the mutation throws an error.
- **`onSettled`**: Invalidates `['cards']` to sync with the server once operations complete.
To test rollback resilience, I simulated network failures by stopping `json-server` while dragging — the card animates smoothly to its target position and immediately snaps back to its original position upon backend rejection.

### 3. Accessible Keyboard Navigation
**The Challenge**: Standard visual drag-and-drop often excludes keyboard users.

**The Solution**: Integrated dnd-kit's `KeyboardSensor` with `sortableKeyboardCoordinates`. Users can tab to any card, press `Space`/`Enter` to lift it, navigate using Arrow keys to shift positions or columns, and press `Space`/`Enter` again to drop.

---

## 🧪 Verification & Testing

- **Rollback Test**: Kill `json-server` while dragging a card. The card will optimistically move and instantly snap back to its original position upon failed mutation.
- **Keyboard Test**: Tab to a card, press `Space` to pick up, use `Arrow Keys` to reorder within/across columns, press `Space` to drop.
- **Filter Persistence Test**: Enter search text or select a label tag. Copy the URL, open in a new tab, and verify that the filter inputs and board cards match the query state.

---

## 📜 License
MIT License © [Faiza Tasneem](https://github.com/FaizaTasneeem)

