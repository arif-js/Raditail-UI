module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: ['../../.eslintrc.cjs'],
  ignorePatterns: ['dist'],
}
