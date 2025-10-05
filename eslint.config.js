import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node
            }
        },
        rules: {
            // Possible Errors
            'no-console': 'off', // Allow console for debugging
            'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
            
            // Best Practices
            'curly': ['error', 'all'],
            'eqeqeq': ['error', 'always'],
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-with': 'error',
            
            // Variables
            'no-undef': 'error',
            'no-use-before-define': ['error', { 'functions': false }],
            
            // Style
            'indent': ['error', 2, { 'SwitchCase': 1 }],
            'quotes': ['error', 'single', { 'avoidEscape': true }],
            'semi': ['error', 'always'],
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            
            // ES6
            'prefer-const': 'error',
            'no-var': 'error',
            'prefer-arrow-callback': 'warn',
            'arrow-spacing': 'error'
        },
        ignores: [
            'node_modules/**',
            'dist/**',
            '*.min.js'
        ]
    }
];

