# Pharma Rush — Race Through the Human Body
React + TypeScript + Three.js + Framer Motion (frontend only, mock data, no backend).

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure
- `src/engine/`     Three.js game (GameEngine, world, doctor, entities, particles, audio) — no React inside
- `src/hooks/`      `useGameFlow` connects the engine to React screens
- `src/store/`      profile context (persisted in localStorage)
- `src/data/`       worlds, questions, leaderboards, skins, difficulties (mock data)
- `src/components/` `screens/` (menus), `game/` (HUD, medical event, overlays), `ui/` (shared)

## Add a new world
Add an entry in `src/data/worlds.ts`, and questions in `src/data/questions.ts`.
Controls: arrows / WASD, swipe, Esc to pause.
