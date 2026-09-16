module.exports = {
  // `root: true` stops ESLint's config cascade, which would otherwise also load
  // the repo-root config and register the react-hooks plugin a second time.
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
