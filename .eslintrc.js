module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {

        ecmaVersion: 2020,

    },
    extends: 'eslint:recommended',
    rules: {
        indent: ['error', 4, ],
        'eol-last': 2,
        'linebreak-style': ['error', 'unix', ],
        quotes: ['error', 'single', ],
        semi: ['error', 'always', ],
        'init-declarations': [
            2,
            'never'
        ],
        'no-console': 2,
        'no-catch-shadow': 2,
        'no-delete-var': 2,
        'no-label-var': 2,
        'no-restricted-globals': 2,
        'no-shadow': 2,
        'no-shadow-restricted-names': 2,
        'no-undef': 2,
        'no-undef-init': 2,
        'no-undefined': 2,
        'no-unused-vars': 2,
        'no-use-before-define': 2,
        'array-bracket-spacing': 0,
        'block-spacing': [
            2,
            'always'
        ],
        'brace-style': [
            2,
            '1tbs'
        ],
        camelcase: [
            2,
            {
                properties: 'always'
            }
        ],
        'comma-spacing': [
            2,
            {
                after: true,
                before: false
            }
        ],
        'comma-style': [
            2,
            'last'
        ],
        'computed-property-spacing': [
            2,
            'never'
        ],
        'consistent-this': [
            2,
            'self'
        ],
        'eol-last': 2,
        'func-names': 2,
        'func-style': 0,
        'id-blacklist': [
            2
        ],
        'id-match': 0,
        'jsx-quotes': [
            2,
            'prefer-single'
        ],
        'key-spacing': [
            2,
            {
                afterColon: true,
                beforeColon: false,
                mode: 'strict'
            }
        ],
        'keyword-spacing': [
            2,
            {
                after: true,
                before: true
            }
        ],
        'lines-around-comment': [
            2,
            {
                afterBlockComment: true,
                afterLineComment: true,
                beforeBlockComment: true,
                beforeLineComment: true
            }
        ],
        'max-depth': [
            2,
            2
        ],
        'max-len': 0,
        'max-nested-callbacks': [
            2,
            2
        ],
        'max-params': [
            2,
            4
        ],
        'max-statements': [
            2,
            20,
            {
                ignoreTopLevelFunctions: true
            }
        ],
        'max-statements-per-line': [
            2,
            {
                max: 1
            }
        ],
        'new-cap': 0,
        'new-parens': 2,
        'newline-after-var': 2,
        'newline-before-return': 2,
        'newline-per-chained-call': [
            2,
            {
                ignoreChainWithDepth: 3
            }
        ],
        'no-array-constructor': 2,
        'no-bitwise': 2,
        'no-continue': 2,
        'no-inline-comments': 2,
        'no-lonely-if': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multiple-empty-lines': [
            2,
            {
                max: 1
            }
        ],
        'no-negated-condition': 2,
        'no-nested-ternary': 2,
        'no-new-object': 2,
        'no-plusplus': 2,
        'no-restricted-syntax': 2,
        'no-spaced-func': 2,
        'no-ternary': 0,
        'no-trailing-spaces': 2,
        'no-underscore-dangle': 2,
        'no-unneeded-ternary': 2,
        'no-whitespace-before-property': 2,
        'object-curly-spacing': 0,
        'one-var': [
            2,
            {
                const: 'never',
                let: 'always',
                var: 'always'
            }
        ],
        'one-var-declaration-per-line': [
            2,
            'always'
        ],
        'operator-assignment': [
            2,
            'always'
        ],
        'operator-linebreak': [
            2,
            'after'
        ],
        'padded-blocks': [
            2,
            'always'
        ],
        'quote-props': [
            2,
            'as-needed'
        ],
        'require-jsdoc': 0,
        'semi-spacing': 2,
        'sort-vars': 2,
        'space-before-blocks': [
            2,
            'always'
        ],
        'space-before-function-paren': [
            2,
            'never'
        ],
        'space-in-parens': [
            2,
            'never'
        ],
        'space-infix-ops': 2,
        'space-unary-ops': [
            2,
            {
                nonwords: false,
                words: true
            }
        ],
        'spaced-comment': 2,
        'wrap-regex': 2,
        'accessor-pairs': 2,
        'array-callback-return': 2,
        'block-scoped-var': 2,
        complexity: [
            2,
            4
        ],
        'consistent-return': 2,
        curly: [
            2,
            'all'
        ],
        'default-case': 2,
        'dot-location': [
            2,
            'property'
        ],
        'dot-notation': [
            2,
            {
                allowKeywords: true
            }
        ],
        eqeqeq: 2,
        'guard-for-in': 2,
        'no-alert': 2,
        'no-caller': 2,
        'no-case-declarations': 2,
        'no-div-regex': 2,
        'no-else-return': 2,
        'no-empty-function': 2,
        'no-empty-pattern': 2,
        'no-eq-null': 2,
        'no-eval': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-label': 2,
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-implicit-coercion': 2,
        'no-implicit-globals': 2,
        'no-implied-eval': 2,
        'no-invalid-this': 0,
        'no-iterator': 2,
        'no-labels': 2,
        'no-lone-blocks': 2,
        'no-loop-func': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-native-reassign': 2,
        'no-new': 2,
        'no-new-func': 2,
        'no-new-wrappers': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-param-reassign': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-return-assign': 2,
        'no-script-url': 2,
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-throw-literal': 2,
        'no-unmodified-loop-condition': 2,
        'no-unused-expressions': [
            2,
            {
                allowTernary: true
            }
        ],
        'no-unused-labels': 2,
        'no-useless-call': 2,
        'no-useless-concat': 2,
        'no-useless-escape': 2,
        'no-void': 2,
        'no-warning-comments': 2,
        'no-with': 2,
        radix: [
            2,
            'always'
        ],
        'vars-on-top': 2,
        'wrap-iife': [
            2,
            'outside'
        ],
        yoda: [
            2,
            'never'
        ],
        'arrow-body-style': ['error', 'always'],
        'arrow-spacing': ['error', { before: false, after: true }]
    },
};
