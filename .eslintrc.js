module.exports = {
	extends        : ['eslint:recommended'],
	plugins        : ['react', 'jest', 'tslint'],
	env            : {
		es6    : true,
		jquery : true,
		browser: true,
		node   : true,
		jest   : true
	},
	globals        : {
		DS        : true,
		_         : true,
		jest      : true
	},
	'parser'       : 'babel-eslint',
	'parserOptions': {
		'ecmaVersion' : 6,
		'sourceType'  : 'module',
		'ecmaFeatures': {
			'jsx'                         : true,
			'experimentalObjectRestSpread': true
		}
	},
	rules          : {
		'linebreak-style'             : ['error', 'unix'],
		'quotes'                      : ['error', 'single', { 'allowTemplateLiterals': true }], // Forciert Single Quotes, aber erlaubt Backticks für Template Literals
		'no-mixed-spaces-and-tabs'    : ['error'], // Erlaubt sind Tabs (siehe unter 'indent'), aber nicht Spaces (Auf keinen Fall 'Smart-Tabs' einschalten)
		'no-unused-vars'              : 1, // Warnt bei ungenutzten Variabeln
		'no-undef'                    : 'warn', // Warnt bei undefinierten Variabeln
		'no-tabs'                     : 'off', // Forciert die Nutzung von Tabs vs. Spaces
		'indent'                      : ['error', 'tab', { 'SwitchCase': 1, 'MemberExpression': 1, 'ArrayExpression': 1, 'VariableDeclarator': 1 }], // Forciert die Nutzung von Tabs zur Einrückung
		'no-trailing-spaces'          : 'error', // Löscht Leerzeichen hinter Codezeilen
		'object-curly-spacing'        : ['error', 'always', { 'objectsInObjects': true }], // Definiert das Spacing innerhalb von geschwungenen Klammern
		'semi'                        : ['error', 'always'], // Forciert die Nutzung von Semikola
		'react/jsx-uses-vars'         : 1, // Definiert, dass JSX-Klassen die importiert wurden nicht als unbenutzte Variabeln betrachtet werden
		'react/no-unused-prop-types'  : 2, // Forciert, dass alle PropTypes in Verwendung sein müssen
		'react/jsx-no-duplicate-props': 2, // Erlaubt keine doppelten Props
		'react/require-render-return' : 1, // Erfordert einen return value in Render-Methoden
		'jest/no-disabled-tests'      : 'warn',
		'jest/no-focused-tests'       : 'error',
		'jest/no-identical-title'     : 'error',
		'jest/valid-expect'           : 'error',
		'default-case'                : 'error', // Forciert, dass switch-case immer ein default case haben muss
		'key-spacing'                 : [1, { // Definiert die Darstellung von Leerraum zwischen Key-Value-Paaren
			'singleLine': {
				'beforeColon': false,
				'afterColon' : true,
				'mode'       : 'minimum'
			},
			'multiLine' : {
				'beforeColon': false,
				'afterColon' : true,
				'align'      : 'colon',
				'mode'       : 'minimum'
			}
		}],
		'max-len'                     : [ // Definiert die maximale Länge von Codezeilen
			1,
			{
				code          : 160,
				tabWidth      : 4,
				ignoreComments: true,
				ignoreUrls    : true
			}
		],
		// Wir wollen JSDoc für alles außer Arrow functions und Funktionsausdrücken
		'require-jsdoc'               : ['warn', {
			'require': {
				'FunctionDeclaration'    : false,
				'MethodDefinition'       : false,
				'ClassDeclaration'       : true,
				'ArrowFunctionExpression': false,
				'FunctionExpression'     : false
			}
		}],
/* 		'tslint/config'               : ['warn', {
			lintFile  : './tslint.json',
			configFile: './tsconfig.json'
		}] */
	}
};