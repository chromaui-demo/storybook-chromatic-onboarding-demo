# Storybook and Chromatic SE field lab

This repository is a hands-on product lab for sales and solutions engineers. The ten-session core
builds Storybook and Chromatic fluency. Five optional sessions cover composition, scale, upgrade
judgment, and a mock customer call.

- [Open the hosted field lab](https://ethriel3695.github.io/storybook-multi-framework-demo/).
- [Read the course overview](docs/onboarding/README.mdx).
- [Set up a new computer](docs/onboarding/SETUP.mdx), including VS Code and Codex.

The pnpm and Turborepo workspace contains one Hub and five framework-specific Storybooks. The Hub uses
Storybook composition to give customers one entry point while each framework keeps its own renderer,
build, and tests.

The onboarding Hub is designed to be published separately from the SE's React Storybook. See
[the deployment runbook](docs/DEPLOYMENT.md) for the reasoning, CI setup, and hosted-composition
options.

| Package                  | Port | Rendering environment                       |
| ------------------------ | ---: | ------------------------------------------- |
| `@demo/hub`              | 6006 | Composed entry point                        |
| `@demo/react`            | 6007 | React + Vite                                |
| `@demo/nextjs`           | 6008 | Next.js                                     |
| `@demo/angular`          | 6009 | Angular standalone component                |
| `@demo/web-components`   | 6010 | Lit custom element                          |
| `@demo/react-native-web` | 6011 | React Native primitives rendered on the web |

## Quick start for an existing development environment

- Node.js 20
- pnpm 10.19 through Corepack
- Git

## Run the demo

```sh
pnpm install
pnpm dev
```

Open [http://localhost:6006](http://localhost:6006). The command starts the Hub and all five referenced
Storybooks. Use the setup guide if VS Code, Codex, Git, Node.js, or pnpm is not installed yet.

If another project already uses this range, shift all six ports together. For example,
`STORYBOOK_PORT_OFFSET=100 pnpm dev` serves the Hub at `http://localhost:6106` and React at
`http://localhost:6107`.

Verify the workspace before you change it:

```sh
pnpm typecheck
pnpm build-storybook
```

## Suggested SE demo path

1. Ask which frameworks and ownership boundaries matter before you open a story.
2. Start in the Hub and show the relevant framework sections in one sidebar.
3. Open the React **ReservationCard / Responsive coverage** story. Use the viewport toolbar to switch
   between compact (360 px), the canonical breakpoint (640 px), and desktop (1200 px).
4. Explain that the component remains fluid between those widths. Chromatic `modes`
   deliberately sample named widths for stable visual baselines.
5. Open React **Reservation interaction**. Run or step through the `play` function. It increments the
   guest count, clicks Reserve, validates the callback payload, and confirms the rendered status.
6. If relevant, open Angular **Output interaction** to show the same journey with an Angular `@Output`.
7. If relevant, open Web Components **Custom event interaction** to show a bubbling `CustomEvent`
   crossing the shadow-DOM boundary with a validated payload.
8. Open Next.js **App Router link** and **Favorite interaction** to show framework-aware navigation and
   browser behavior.
9. Open React Native Web **Mobile web** and **Press interaction**. State that this provides mobile
   browser coverage for native primitives, not native iOS/Android screenshots.

## Talking points mapped to the agenda

### Hosting several frameworks under one domain

The hub's `.storybook/main.ts` uses Storybook `refs`. Locally, each ref points to another port. In a
hosted environment, publish each static Storybook separately and set the five URL variables before
building the hub:

```sh
STORYBOOK_REACT_URL=https://ui.example.com/react/ \
STORYBOOK_NEXTJS_URL=https://ui.example.com/nextjs/ \
STORYBOOK_ANGULAR_URL=https://ui.example.com/angular/ \
STORYBOOK_WEB_COMPONENTS_URL=https://ui.example.com/web-components/ \
STORYBOOK_REACT_NATIVE_WEB_URL=https://ui.example.com/react-native-web/ \
pnpm --filter @demo/hub build-storybook
```

A CDN or reverse proxy can serve the hub at `https://ui.example.com/` and the child builds at those
paths. Users enter through one domain and one navigation tree, while teams can retain separate build,
ownership, and deployment boundaries.

Composition does not merge test runs. Run Chromatic on each child project so snapshots and baselines
stay with the framework that renders them; publish the hub for discovery and navigation.

### Platform and rendering coverage

- React, Next.js, Angular, and Lit each run in their native Storybook renderer.
- The examples intentionally model the same reservation-card domain so differences are easy to
  compare without pretending that the implementations are shared.
- React Native Web demonstrates mobile-oriented components in a browser. Device-native screenshots,
  gestures, and platform APIs need a separate native test layer.

### Responsive visual testing

The shared `config/responsive.ts` file defines named viewport presets and Chromatic modes once. Each
`Responsive coverage` story opts into those modes. This supports both approaches customers commonly
need:

- **Canonical breakpoints:** stable snapshots at 360, 640, and 1200 px.
- **Fluid design:** the component uses flexible grids and `clamp()` between sample widths; add a
  custom viewport in the toolbar for exploratory review.
- **Preselected versus custom sizes:** presets keep CI coverage intentional and bounded, while the
  Storybook viewport tool accepts ad hoc sizes during development.

Storybook composition does not currently synchronize toolbar globals into referenced Storybooks. Use
the hub for discovery, then open a child Storybook (the globe/extra-actions control beside its name)
when demonstrating live viewport switching. Chromatic still applies the named `modes` directly while
testing each child project, so CI responsive coverage is unaffected by that composition boundary.

Visual tests are stories: change an argument or rendering state to update a case, export a new story
to add a case, and remove the export to remove that case. Chromatic detects visual changes and keeps
review and baseline history per story and mode.

### Interaction and event testing

Each interaction scenario is a story-level `play` function next to its component:

- `userEvent` simulates clicks and presses.
- `expect` validates visible state, accessible names, links, and event payloads.
- `fn()` records React callbacks, Angular outputs, and custom events.
- Web Components are exercised inside their shadow root, including a composed event that bubbles to
  the host element.

The interaction runs in Storybook during local development and as part of the visual-test capture, so
the snapshot can represent the post-interaction state.

### Test suite management

Stories are organized per component in `*.stories.*` files. A component's default, responsive, edge,
and interaction cases live together and appear as individual Storybook/Chromatic tests.

The Hub also imports every MDX guide into a matching story under **Visual snapshots**. Edit the MDX
source once; the documentation page and its Chromatic test update together. Run
`pnpm check:onboarding` to verify that every guide has exactly one snapshot story. These stories carry
the `docs-snapshot` tag for filtering and remove Storybook's built-in `test` tag because the Vitest
integration replaces indexed MDX modules with metadata; they remain enabled for Chromatic visual
snapshots.

- **Add:** export another named story, with args, parameters, and optionally a `play` function.
- **Update:** edit that export or its component; the story ID remains stable when the title and export
  name remain stable.
- **Remove:** delete the named export; Chromatic reports the missing test so its baseline can be
  reviewed and archived intentionally.
- **Group:** use the story meta `title` and file location to organize cases by component rather than
  maintaining a separate central suite registry.

## Project layout

```text
storybook-multi-framework-demo/
├── config/responsive.ts
├── packages/
│   ├── hub/
│   ├── react/
│   ├── nextjs/
│   ├── angular/
│   ├── web-components/
│   └── react-native-web/
├── package.json
└── turbo.json
```

The workspace is intentionally self-contained in this repository. Its own pnpm lockfile, workspace
catalog, and Turbo task graph keep package versions aligned while allowing every Storybook to build
and type-check independently.
