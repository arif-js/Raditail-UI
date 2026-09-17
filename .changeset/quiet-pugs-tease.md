---
'raditail': patch
---

Ship the `raditail/theme` type declarations.

`0.2.0` was published without `dist/theme/index.d.ts` and `dist/theme/index.d.cts`,
even though `exports["./theme"].types` points at the former. Importing from
`raditail/theme` worked at runtime but failed to resolve types under the `node16`
and `bundler` module resolution modes.

The build ran `tsup --clean`, and that flag applies to every config in
`tsup.config.ts`. tsup builds those two configs concurrently, so each one's clean
step could delete output the other had already emitted. Cleaning is now a separate
serial step (`pnpm clean`) that finishes before tsup starts.
