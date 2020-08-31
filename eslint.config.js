var defaultPlugins = [
    '@typescript-eslint/eslint-plugin',
    'import',
    'jest',
    'react',
    'react-hooks'
];
var defaultEnv = {
    es6: true
};
var defaultGlobals = {

};
var defaultRules = {
    'indent': [
        'error',
        4,
        { SwitchCase: 1 }
    ],
    'comma-dangle': [
        'error',
        'never'
    ],
    'no-trailing-spaces': 'error',
    'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^__unused' }
    ],
    'quotes': [
        'error',
        'single'
    ],
    'quote-props': [
        'error',
        'consistent-as-needed'
    ],
    'semi': [
        'error',
        'always'
    ],
    '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^__unused' }
    ]
};

var javascriptExtensions = [
    'react-app',
    'eslint:recommended'
];

var typescriptExtensions = javascriptExtensions.concat([
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
]);

module.exports = {
    root: true,
    extends: javascriptExtensions,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    globals: defaultGlobals,
    plugins: defaultPlugins,
    rules: defaultRules,
    overrides: [
        {
            files: [
                '*eslint*',
                '*config.js',
                'scripts/*'
            ],
            env: {
                node: true
            }
        },
        {
            files: [
                '**/*.ts', '**/*.tsx'
            ],
            globals: {
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly'
            },
            extends: typescriptExtensions,
            rules: defaultRules
        },
        {
            files: [
                '**/*.test.js',
                '**/*.test.jsx',
                '**/test/**/*.js',
                '**/test/**/*.jsx'
            ],
            env: Object.assign({}, defaultEnv, {
                'jest/globals': true
            }),
            extends: javascriptExtensions,
            rules: defaultRules
        },
        {
            files: [
                '**/*.test.ts',
                '**/*.test.tsx',
                '**/test/**/*.ts',
                '**/test/**/*.tsx'
            ],
            env: Object.assign({}, defaultEnv, {
                'jest/globals': true
            }),
            globals: {
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly'
            },
            extends: typescriptExtensions,
            rules: defaultRules
        }
    ]
};
