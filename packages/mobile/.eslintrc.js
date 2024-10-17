const defaultPlugins = [
    '@typescript-eslint',
    'import',
    'jest',
    'react',
    'react-compiler',
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
    ],
    'react-compiler/react-compiler': 'error'
};

const typescriptDefaultRules = {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^__unused' }
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
        'error'
    ],
    'quote-props': [
        'error',
        'consistent-as-needed'
    ],
    'quotes': 'off',
    '@typescript-eslint/ban-types': 'off'
};


const javascriptExtensions = [
    'react-app',
    'expo',
    'eslint:recommended'
];

const typescriptExtensions = javascriptExtensions.concat([
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
]);

// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    extends: javascriptExtensions,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        createDefaultProgram: true
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