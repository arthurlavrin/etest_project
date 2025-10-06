export default {
  extends: 'stylelint-config-standard-scss',
  rules: {
    // ===== PATTERN RULES - Allow flexible naming =====
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/at-function-pattern': null,
    
    // ===== FORMATTING RULES - Allow flexible formatting =====
    'color-hex-length': null,
    'rule-empty-line-before': null,
    'font-weight-notation': null,
    'value-keyword-case': null,
    
    // ===== VENDOR PREFIXES - Allow them =====
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    
    // ===== SELECTOR ORDERING - Too strict for real projects =====
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    
    // ===== NESTING - Allow deep nesting (common in SCSS) =====
    'max-nesting-depth': null,
    
    // ===== EMPTY RULES - Allow empty blocks and files =====
    'block-no-empty': null,
    'no-empty-source': null,
    
    // ===== PROPERTY RULES - Allow unknown properties =====
    'property-no-unknown': null,
    
    // ===== SCSS SPECIFIC RULES =====
    'scss/at-rule-no-unknown': null,
    'scss/at-import-partial-extension': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/no-global-function-names': null,
    'scss/operator-no-unspaced': null,
    
    // ===== OTHER RULES =====
    'declaration-empty-line-before': null,
    'comment-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'selector-max-compound-selectors': null,
    'selector-max-specificity': null,
    'declaration-block-no-redundant-longhand-properties': null
  },
  ignoreFiles: [
    'node_modules/**',
    'dist/**',
    '**/*.min.css'
  ]
};
