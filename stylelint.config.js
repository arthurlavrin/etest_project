export default {
  extends: 'stylelint-config-standard-scss',
  rules: {
    // Disable some strict rules for flexibility
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/at-function-pattern': null,
    
    // Indentation
    'indentation': 2,
    
    // Allow vendor prefixes
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    
    // Color format
    'color-hex-length': 'long',
    
    // Empty lines
    'rule-empty-line-before': ['always', {
      except: ['first-nested'],
      ignore: ['after-comment']
    }],
    
    // No duplicate selectors
    'no-duplicate-selectors': true,
    
    // Font weight
    'font-weight-notation': 'numeric',
    
    // Max nesting depth
    'max-nesting-depth': [4, {
      ignore: ['blockless-at-rules', 'pseudo-classes']
    }],
    
    // Disable warnings for unknown properties (allows custom props)
    'property-no-unknown': [true, {
      ignoreProperties: ['accent-color']
    }],
    
    // Allow @use and @forward
    'scss/at-rule-no-unknown': [true, {
      ignoreAtRules: ['tailwind']
    }],
    
    // SCSS specific
    'scss/at-import-partial-extension': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null
  },
  ignoreFiles: [
    'node_modules/**',
    'dist/**',
    '**/*.min.css'
  ]
};

