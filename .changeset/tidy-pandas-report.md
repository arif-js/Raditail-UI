---
'raditail': patch
---

Fix the published package metadata and ship the documentation.

Packaging:

- **Removed `engines`.** `node: ">=20 <23"` excluded Node 23+ on a browser React library, and
  npm used it to resolve a _different_ version: on Node 24, `npm install raditail` silently
  installed `0.1.0` instead of the current release. The constraint now lives only in the monorepo
  root, and CI installs the packed tarball on Node 20, 22 and 24 to keep it out.
- **`sideEffects` now uses `"**/\*.css"`.** A bare `import 'raditail/theme/styles.css'` has no
  bindings, and a pattern that fails to match nested files lets a bundler drop it — which renders
  every component unstyled with no error.
- **`exports` types resolve correctly under `require`.** The `.` and `./theme` entries declared a
  single `types` target, so TypeScript resolved ESM declarations for CJS imports. Each condition
  now carries its own `types` (`.d.ts` / `.d.cts`). Caught by `publint`.
- `files` now ships `CHANGELOG.md`, `COMPOSITION.md`, `STYLING.md`, `THEMING.md` and the generated
  API reference. Previously only `README.md` and `LICENSE` were included.
- Added `publint` and `@arethetypeswrong/cli` to CI, plus a pack-and-consume smoke test.

Docs:

- New [COMPOSITION.md](https://github.com/arif-js/Raditail-UI/blob/main/packages/raditail/COMPOSITION.md)
  documents the rules that were only discoverable by reading the built output: content components
  render their own portal and overlay, `DropdownMenu` children are a sibling of the trigger, colours
  are namespaced `rt-*`, `Accordion` defaults to `type="single"`, and `DialogContent` has no close
  button by default.
- [THEMING.md](https://github.com/arif-js/Raditail-UI/blob/main/packages/raditail/THEMING.md)
  documents the two layers of CSS variables as the intended design.
- Generated API reference (`docs/api`), built from the source JSDoc and published in the tarball.
