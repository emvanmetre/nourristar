module.exports = {
    endOfLine: 'lf',
    printWidth: 180,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    useTabs: false,
    quoteProps: 'as-needed',
    bracketSpacing: true,
    arrowParens: 'avoid',
    overrides: [{ files: ['tokens/**/*.json5', 'tokens-vl/**/*.json5'], options: { quoteProps: 'preserve' } }],
  }
  