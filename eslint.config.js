const defaultPlugins = [
    '@typescript-eslint',
    'import',
    'jest',
    'react',
    'react-hooks'
];
const defaultEnv = {
    es6: true
};
const defaultGlobals = {

};
const javascriptDefaultRules = {
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
    'no-unused-expressions': [
        'error'
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
    ]
};

const typescriptDefaultRules = {
    '@typescript-eslint/indent': [
        'error',
        4,
        { SwitchCase: 1 }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^__unused' }
    ],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
        'error'
    ],
    'quote-props': [
        'error',
        'consistent-as-needed'
    ],
    'quotes': 'off',
    '@typescript-eslint/quotes': [
        'error',
        'single'
    ],
    'semi': 'off',
    '@typescript-eslint/semi': [
        'error',
        'always'
    ]
};


const javascriptExtensions = [
    'react-app',
    'eslint:recommended'
];

const typescriptExtensions = javascriptExtensions.concat([
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
    rules: javascriptDefaultRules,
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
            rules: typescriptDefaultRules
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
            rules: javascriptDefaultRules
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
            rules: typescriptDefaultRules
        }
    ]
};
