/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	prefix: '',
	theme: {
		extend: {
			colors: {
				secondary: '#808080',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark'],
	},
	darkMode: ['selector', '[data-theme="dark"]'],
}
