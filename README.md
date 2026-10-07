# Pharma Rush — Race Through the Human Body
React + TypeScript + Three.js + Framer Motion (frontend only, mock data, no backend).


## Structure
- `src/engine/`     Three.js game (GameEngine, world, doctor, entities, particles, audio) — no React inside
- `src/hooks/`      `useGameFlow` connects the engine to React screens
- `src/store/`      profile context (persisted in localStorage)
- `src/data/`       worlds, questions, leaderboards, skins, difficulties (mock data)
- `src/components/` `screens/` (menus), `game/` (HUD, medical event, overlays), `ui/` (shared)

