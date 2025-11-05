
# Snake — React + TypeScript + Vite

A small, playable Snake game built with React, TypeScript and Vite.

This repository contains a simple implementation of the classic Snake game with keyboard controls, a speed slider, and an adaptive grid board.

## Features

- Playable Snake game with WASD / arrow key controls and space to pause.
- Score counter and increasing difficulty (speed increases when eating food).
- UI controls for Start / Pause / Reset and a speed slider.
- Implemented with React + TypeScript and bundled with Vite.

## Tech stack

- React 19
- TypeScript
- Vite
- ESLint (dev)

## Getting started

Prerequisites: Node.js (recommend v18 or later) and npm.

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

3. Open the app

Open http://localhost:5173 (Vite will print the exact URL in the terminal).

Build for production

```powershell
npm run build
```

Preview the production build locally

```powershell
npm run preview
```

Lint the code

```powershell
npm run lint
```

## Controls & gameplay

- Move: Arrow keys or WASD
- Pause / Resume: Space
- Buttons: Start, Pause, Reset
- Speed: use the slider to change the tick interval (lower = faster)

Objective: eat the food (red cell) to grow the snake and increase your score. Avoid colliding with the walls or the snake's body.

## Project structure

- `src/components/SnakeGame.tsx` — main game component (board, game loop, state, controls).
- `src/App.tsx` — application entry that renders the game.
- `src/index.css`, `src/App.css`, `src/components/SnakeGame.css` — styles for layout and the game board.
- `package.json` — scripts and dependencies.

## Notes for contributors

- Follow the existing TypeScript and React style in the repo.
- Add tests or simple integration checks as small, focused PRs.

If you'd like, I can add a small test harness or a GitHub Actions workflow to run linting on PRs.

## License

No license is specified in this repository. If you want to open-source this project, consider adding a `LICENSE` file (for example, MIT).

## Try it (quick)

```powershell
npm install
npm run dev
```

---

If you want any additions (README screenshot, license, CI, or a short playable demo build uploaded), tell me which and I’ll add it.
