module.exports = {
  extends: ['next', 'next/core-web-vitals', '../../.eslintrc.cjs'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
