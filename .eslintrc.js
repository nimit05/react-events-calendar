module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react'
    ],
    'rules': {
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/require-default-props': 'off',
        'linebreak-style':'off',
        'import/extensions': 'off',
        'no-void': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        camelcase: 'off',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'max-len': ['error', { code: 180 }],
        'no-use-before-define': [
          'error',
          {
            functions: false,
            classes: false,
            variables: false,
            allowNamedExports: false,
          },
        ],
    }
};
