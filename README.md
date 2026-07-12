# wiz-bang

A React 19 + TypeScript web app powered by the [Vite+](https://viteplus.dev/guide/) unified toolchain.

## Tech Stack

- **React 19** with React Compiler enabled
- **TypeScript 6**
- **Vite+** (`vp`) — wraps Vite, Rolldown, Oxlint, Oxfmt, and Vitest in a single CLI

## Getting Started

```bash
pnpm install   # or: vp install
vp dev         # start dev server with HMR
```

## Scripts

| Command      | Description                         |
| ------------ | ----------------------------------- |
| `vp dev`     | Start development server            |
| `vp build`   | Type-check and build for production |
| `vp preview` | Preview the production build        |
| `vp check`   | Format, lint, and type-check        |
| `vp test`    | Run tests                           |
| `vp lint .`  | Lint the project                    |

## Project Structure

```
src/
  content/      # Content and data
  global/       # App-wide state and configuration
  routes/
    pages/      # Route page components (IonPage wrappers only)
  ui/
    colors/     # Design tokens
    components/ # Shared UI components
    css/        # Global styles
  main.tsx      # Entry point
```

## Path Aliases

| Alias      | Path           |
| ---------- | -------------- |
| `@`        | `src/`         |
| `@content` | `src/content/` |
| `@global`  | `src/global/`  |
| `@routes`  | `src/routes/`  |
| `@ui`      | `src/ui/`      |
