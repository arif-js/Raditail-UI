# Contributing to Raditail UI

Thanks for your interest in improving Raditail UI! ✨  
Whether you spotted a typo, discovered a bug, or want to add a brand‑new component, contributions are welcome.

## Prerequisites

- Node.js 18 or newer
- pnpm 8 or newer (`corepack enable` enables pnpm automatically)
- A GitHub account

## Getting Started

```bash
git clone https://github.com/arif-js/Raditail-UI.git
cd Raditail-UI
pnpm install
```

To build/test locally:

```bash
# Component playground
pnpm --filter raditail storybook

# Run the docs site (Next.js)
pnpm docs:dev

# Type-check, lint, test, build
pnpm typecheck
pnpm lint
pnpm --filter raditail test
pnpm --filter raditail build
```

## Contribution Workflow

1. **Open an issue** describing your proposal or bug (if none exists yet).
2. **Fork** the repository and create a feature branch:
   ```bash
   git checkout -b feat/add-awesome-component
   ```
3. **Make your changes**:
   - Keep code styles consistent.
   - Include Storybook stories for UI work.
   - Add tests if you touch logic or utilities.
4. **Run the quality checks** before committing:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm --filter raditail test
   pnpm --filter raditail build
   ```
5. **Commit using conventional commits** (e.g., `feat: add badge component`).
6. **Push and open a pull request** against `main`.
7. **Fill out the PR template** and link the related issue.

## Changesets

We use [Changesets](https://github.com/changesets/changesets) to manage versioning.

- If your change affects published packages, run `pnpm changeset` to record a summary.
- For docs or tooling-only changes, no changeset is needed.

## Coding Guidelines

- Components live in `packages/raditail/src/components`.
- Utility functions live in `packages/raditail/src/utils`.
- Keep CSS minimal and rely on Tailwind tokens.
- Prefer composable primitives over monolithic components.
- Use TypeScript for type safety and maintainability.

## Reporting Security Issues

Please do **not** create public issues for security concerns.  
Instead, email **security@raditail.dev** with details.

---

Thank you for helping Raditail grow! 💚
