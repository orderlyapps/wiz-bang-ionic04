<!-- intent-skills:start -->

## Skill Loading

Before substantial work:

- Skill check: run `pnpm dlx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

<!--VITE PLUS END-->

## Code Style Guidelines

### File and Folder Naming

- **Folders**: Use `kebab-case` (e.g., `src/routes/pages/home`, `src/ui/form-inputs`)
- **Component files**: Use `PascalCase` (e.g., `HomePage.tsx`, `FormInput.tsx`)
- **TypeScript files**: Use `camelCase` (e.g., `apiClient.ts`, `utilityHelpers.ts`)

### Object Properties

- **All object properties**: Use `snake_case` (e.g., `user_id`, `first_name`, `is_active`)
- **All functions**: Use `camelCase` (e.g., `fetchUserData()`, `calculateTotal()`, `handleFormSubmit()`)

## Page Component Architecture

- **Route pages** in `src/routes/pages` should be minimal wrapper components that only contain `IonPage`, `IonHeader`, and `IonContent` structure
- **Content components** should be placed in `src/content/pages/{page-name}/` and split into separate files:
  - `{page-name}-header/` - Contains the header content (e.g., `IonToolbar`, `IonTitle`)
  - `{page-name}-content/` - Contains the main page content

### Folder Hierarchy

The folder structure in `src/content/pages/` must match `src/routes/pages/`:

- Child pages (like detail pages) should be nested inside their parent page folder:
  - Route: `/tables/congregation` → `tables/congregation/`
  - Route: `/tables/congregation/:id` → `tables/congregation/congregation-detail/`
- Follow the pattern in `src/apps/base/` as the reference implementation

## Responsive Design

The apps are mobile-first but must work well on tablet and desktop. Always reach for these shared primitives instead of hand-rolling responsive code or hard-coded media queries.

### Breakpoints

Defined in `src/util/hooks/use-breakpoint/breakpoints.ts`:

- `xs` < 640
- `sm` >= 640
- `md` >= 768 (tablet)
- `lg` >= 1024 (desktop)
- `xl` >= 1280
- `2xl` >= 1440

### Content width (`ion-content` modifier classes)

`src/util/vendor/ionic/css/responsive.css` caps content with a centered max-width via `--content-max-width`. Set the appropriate class on every `IonContent`:

- default (no class) → 720px — forms, settings, reading
- `className="content-wide"` → 1200px — lists, tables, dashboards
- `className="content-full"` → no cap — maps, canvases, fullscreen UI

Do not add page-specific percent-padding or media queries to constrain content width.

### Layout primitives

- `Space` (`src/ui/components/layout/space/Space.tsx`) — vertical/horizontal whitespace using the shared `Size` scale.

### Data display

- `MultiColumnList<T>` (`src/ui/components/display/multi-column-list/MultiColumnList.tsx`) — renders items in a responsive CSS grid that automatically picks the column count based on screen width, item count, and font size: 1 col on mobile (`xs`/`sm`) always, 2 on tablet (`md`), 3 on small desktop (`lg`), and 4 on large desktop (`xl`/`2xl`). Column count is capped by item count so 2 items never render 4 columns. Items flow left-to-right then wrap. Column count automatically adjusts based on font size (smaller fonts = more columns, larger fonts = fewer columns). Optional `gap` prop sets the horizontal gap between columns using the shared `Size` scale or `"none"` (defaults to `"sm"`); rows stay flush. Optional `column_offset` prop allows fine-tuning the column count (positive = add columns, negative = reduce columns). Use it for lists of uniform cards/items (e.g. names, tags) where multi-column layout is desirable at wider viewports but there is no tabular column structure. **Important:** When using this component on a page, wrap the page content in `<IonContent className="content-wide">` to ensure the list has enough horizontal space for multiple columns.

### Modals

- `ResponsiveModal` (`src/ui/components/display/responsive-modal/ResponsiveModal.tsx`) — Ionic sheet on mobile (< md), centered card (`size="sm" | "md" | "lg"`) on tablet/desktop. Use this as the default modal wrapper instead of `IonModal` directly.

### Hooks

- `useBreakpoint()` (`src/util/hooks/use-breakpoint/use-breakpoint.ts`) → `{ width, breakpoint, is_mobile, is_tablet, is_desktop }`. Use for behavior branching (popover vs sheet, conditional UI).
- `useKeyboardShortcut(combo, handler, options?)` (`src/util/hooks/use-keyboard-shortcut/use-keyboard-shortcut.ts`) — global key bindings. Combo syntax: `"/"`, `"mod+k"`, `"shift+?"` where `mod` = ⌘ on mac, ctrl elsewhere. Skips text inputs by default. Use for desktop power-user affordances.

### Desktop affordances

`src/util/vendor/ionic/css/desktop.css` is loaded globally. It adds `:focus-visible` rings to buttons/items and hover backgrounds gated by `@media (hover: hover) and (pointer: fine)`. For an item to participate in hover/focus styles, ensure it is button-style (e.g. `<IonItem button>` or `<IonItem routerLink ... button>`).

### When to use what

- New list of uniform cards/items (no column structure) → `MultiColumnList<T>` with `get_id` + `render_item`.
- New modal/dialog → `ResponsiveModal`, not `IonModal` directly.
- Need to branch behavior on viewport → `useBreakpoint()`, never `window.innerWidth` directly.
- Wide page (catalog, dashboard, table) → `<IonContent className="content-wide">`.
- Adding a keyboard shortcut → `useKeyboardShortcut`, never `window.addEventListener("keydown", ...)` ad hoc.
