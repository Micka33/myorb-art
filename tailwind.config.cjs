const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
    screens: {
      'xs': '390px',
      ...defaultTheme.screens,
    },
		extend: {
		}
	},

	plugins: []
};

module.exports = config;
